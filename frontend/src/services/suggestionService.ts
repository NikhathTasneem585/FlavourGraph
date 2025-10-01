import { ApiResponse, AlgorithmMode, Ingredient } from '../types';

// The backend is expected to be running on the same host, proxied to this path.
const API_URL = '/api/suggest/'; 

export const fetchSuggestions = async (
  available_ingredient_ids: number[],
  mode: AlgorithmMode,
  allIngredients: Ingredient[]
): Promise<ApiResponse> => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        available_ingredient_ids, 
        mode,
        allIngredients // Pass the entire list so backend can map IDs to names
      }),
    });

    if (!response.ok) {
      // Try to parse error from backend, or fall back to status text
      const errorData = await response.json().catch(() => null);
      const errorMessage = errorData?.error || `Server responded with status: ${response.status}`;
      throw new Error(errorMessage);
    }

    const data: ApiResponse = await response.json();
    return data;

  } catch (error) {
    console.error("Error fetching suggestions from backend:", error);
    // Re-throw the error so it can be caught by the component
    if (error instanceof Error) {
        throw new Error(`Network or server error: ${error.message}`);
    }

    throw new Error("An unknown error occurred while fetching suggestions.");
  }
};


export const fetchRecipeDetail = async (recipeId: number): Promise<any> => {
  const response = await fetch(`/api/recipe/${recipeId}/`);
  if (!response.ok) {
    throw new Error('Failed to fetch recipe details');
  }
  return await response.json();
};
