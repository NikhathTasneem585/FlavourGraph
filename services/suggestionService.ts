import { GoogleGenAI, Type } from "@google/genai";
import { ApiResponse, AlgorithmMode, Ingredient } from '../types';

const API_KEY = 'AIzaSyBJPZ08Tg1HH9UMx6A8koMQkwcG2jKCAy0';
const ai = new GoogleGenAI({apiKey: API_KEY});

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
      required: ['algorithm', 'execution_time_ms', 'time_complexity']
    },
    suggestions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          recipe: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.NUMBER, description: "A unique 3-digit numeric ID for the recipe." },
              title: { type: Type.STRING },
              instructions: { type: Type.STRING, description: "A brief summary of the cooking instructions." },
              prep_time_minutes: { type: Type.NUMBER },
            },
            required: ['id', 'title', 'instructions', 'prep_time_minutes']
          },
          match_score: { type: Type.NUMBER, description: "A score from 0.0 to 1.0 indicating how well the available ingredients match the recipe." },
          missing_ingredients: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.NUMBER, description: "A unique 3-digit numeric ID for the ingredient." },
                name: { type: Type.STRING },
              },
              required: ['id', 'name']
            },
          },
          substitutions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                substitute_ingredient_name: { type: Type.STRING },
                reason: { type: Type.STRING },
              },
              required: ['substitute_ingredient_name', 'reason']
            },
          },
        },
        required: ['recipe', 'match_score', 'missing_ingredients', 'substitutions']
      },
    },
  },
  required: ['insights', 'suggestions']
};


export const fetchSuggestions = async (
  available_ingredient_ids: number[],
  mode: AlgorithmMode,
  allIngredients: Ingredient[]
): Promise<ApiResponse> => {
  const availableIngredientNames = available_ingredient_ids.map(id => {
    return allIngredients.find(ing => ing.id === id)?.name;
  }).filter(Boolean).join(', ');

  if (!availableIngredientNames) {
      throw new Error("No valid ingredients selected.");
  }

  const prompt = `
    You are a culinary expert assistant for an app called FlavorGraph.
    Your task is to suggest recipes based on a list of available ingredients.

    Available ingredients: ${availableIngredientNames}

    Search Mode: "${mode}"
    - If mode is "backtracking" (Exhaustive Search), perform a deep and thorough search to find all possible recipes, providing the absolute best matches. Generate a more comprehensive list of suggestions (around 4-6).
    - If mode is "greedy" (Fast Search), perform a quick search to find a few good matches (around 2-3). It doesn't have to be perfect, but should be relevant.

    For each recipe suggestion, you must provide:
    1.  A unique recipe ID (use a random 3-digit number like 101, 204, etc.).
    2.  A recipe title.
    3.  Brief cooking instructions.
    4.  Preparation time in minutes.
    5.  A match score between 0.0 and 1.0, where 1.0 means all ingredients are available. Calculate this based on (number of available ingredients for recipe) / (total ingredients in recipe).
    6.  A list of missing ingredients, if any. Each missing ingredient needs a unique random 3-digit ID and a name.
    7.  A list of smart substitutions for missing ingredients, if any. Provide at least one if ingredients are missing.

    Also provide algorithmic insights based on the Search Mode:
    1. The algorithm used ("backtracking" or "greedy").
    2. A simulated execution time in milliseconds (e.g., between 200-500ms for backtracking, 50-150ms for greedy).
    3. The theoretical time complexity ('O(2^n)' for backtracking, 'O(n*m)' for greedy).

    Return ONLY the JSON object that matches the provided schema. Do not include any markdown formatting like \`\`\`json or any other text.
  `;
  
  const startTime = Date.now();
  
  try {
    const response = await ai.models.generateContent({
       model: "gemini-2.5-flash",
       contents: prompt,
       config: {
         responseMimeType: "application/json",
         responseSchema: responseSchema,
       },
    });

    const jsonText = response.text;
    const result: ApiResponse = JSON.parse(jsonText);
    
    const endTime = Date.now();
    result.insights.algorithm = mode;
    result.insights.time_complexity = mode === 'backtracking' ? 'O(2^n)' : 'O(n*m)';
    result.insights.execution_time_ms = endTime - startTime;

    // Ensure greedy returns fewer results to mimic the original app's behavior
    if (mode === 'greedy' && result.suggestions.length > 3) {
        result.suggestions = result.suggestions.slice(0, 3);
    }
    
    return result;

  } catch(error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get suggestions from the AI model. Please check your API key and try again.");
  }
};