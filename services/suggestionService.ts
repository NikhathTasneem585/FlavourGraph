import { GoogleGenAI, Type } from "@google/genai";
import { ApiResponse, AlgorithmMode, Ingredient } from '../types';

/**
 * Configuration via Vite environment variables:
 *  - VITE_GEMINI_API_KEY: string | undefined
 *  - VITE_USE_BACKEND: "true" | "false" (default "false")
 *  - VITE_API_BASE_URL: e.g., "http://localhost:8000"
 */
const GEMINI_API_KEY = import.meta?.env?.VITE_GEMINI_API_KEY as string | undefined;
const USE_BACKEND = (import.meta?.env?.VITE_USE_BACKEND ?? "false") === "true";
const API_BASE_URL = (import.meta?.env?.VITE_API_BASE_URL ?? "").replace(/\/$/, "");

const ai = GEMINI_API_KEY ? new GoogleGenAI({ apiKey: GEMINI_API_KEY }) : null;

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    insights: {
      type: Type.OBJECT,
      properties: {
        algorithm: { type: Type.STRING, description: "The mode provided: 'greedy' or 'backtracking'." },
        execution_time_ms: { type: Type.NUMBER, description: "A realistic but simulated execution time in milliseconds." },
        time_complexity: { type: Type.STRING, description: "The theoretical time complexity for the mode." },
      },
      required: ["algorithm", "execution_time_ms", "time_complexity"]
    },
    suggestions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.NUMBER },
          title: { type: Type.STRING },
          instructions: { type: Type.STRING },
          prep_time_minutes: { type: Type.NUMBER }
        },
        required: ["id","title","instructions","prep_time_minutes"]
      }
    }
  },
  required: ["insights","suggestions"]
} as const;

// Backend fetch fallback or primary, depending on USE_BACKEND
async function fetchFromBackend(ingredients: Ingredient[], mode: AlgorithmMode): Promise<ApiResponse> {
  if (!API_BASE_URL) {
    throw new Error("VITE_API_BASE_URL is not set. Please set it in your .env.local when VITE_USE_BACKEND=true.");
  }
  const resp = await fetch(`${API_BASE_URL}/api/suggestions/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ingredients: ingredients.map(i => i.name),
      algorithm: mode
    })
  });
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`Backend error ${resp.status}: ${text}`);
  }
  return await resp.json() as ApiResponse;
}

export const fetchSuggestions = async (
  selectedIngredientIds: number[],
  availableIngredients: Ingredient[],
  mode: AlgorithmMode
): Promise<ApiResponse> => {
  const startTime = performance.now();

  const selected = availableIngredients.filter(i => selectedIngredientIds.includes(i.id));
  if (selected.length === 0) {
    throw new Error("Please select at least one ingredient.");
  }

  // If explicitly using backend OR no Gemini key is set, call backend
  if (USE_BACKEND || !GEMINI_API_KEY) {
    const result = await fetchFromBackend(selected, mode);
    const endTime = performance.now();
    // Ensure required insights fields exist; add defaults if backend missing them
    (result as any).insights = {
      algorithm: (result as any).insights?.algorithm ?? mode,
      execution_time_ms: (result as any).insights?.execution_time_ms ?? (endTime - startTime),
      time_complexity: (result as any).insights?.time_complexity ?? (mode === 'backtracking' ? 'O(2^n)' : 'O(n*m)')
    };
    return result;
  }

  if (!ai) {
    throw new Error("Gemini client not initialized.");
  }

  try {
    const model = ai.models.getGenerativeModel({
      model: "gemini-1.5-pro",
      generationConfig: { responseMimeType: "application/json", responseSchema }
    });

    const prompt = `
You are FlavorGraph, a cooking assistant. Given a list of ingredients and an algorithm mode ("greedy" or "backtracking"),
produce a JSON object that matches the responseSchema. Provide a few creative recipe suggestions with realistic prep times,
and include insights describing the chosen algorithm and a simulated execution time.

Ingredients: ${selected.map(i => i.name).join(", ")}
Mode: ${mode}
`;

    const res = await model.generateContent(prompt);
    const text = res.response.text();

    const parsed = JSON.parse(text) as ApiResponse;

    const endTime = performance.now();
    parsed.insights.time_complexity = mode === 'backtracking' ? 'O(2^n)' : 'O(n*m)';
    parsed.insights.execution_time_ms = endTime - startTime;

    // Optionally mimic greedy returning fewer suggestions
    if (mode === 'greedy' && parsed.suggestions.length > 3) {
      parsed.suggestions = parsed.suggestions.slice(0, 3);
    }
    return parsed;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get suggestions from the AI model. Check VITE_GEMINI_API_KEY or switch to backend by setting VITE_USE_BACKEND=true.");
  }
};