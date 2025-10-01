export interface Ingredient {
  id: number;
  name: string;
}

export interface Recipe {
  id: number;
  title: string;
  prep_time_minutes: number;
  ingredients: Ingredient[];
}

export interface Substitution {
  original_ingredient_id: number;
  substitute_ingredient_name: string;
  reason: string;
}

export interface Suggestion {
  recipe: Recipe;
  match_score: number;
  missing_ingredients: Ingredient[];
  substitutions: Substitution[];
}

export interface Insights {
  algorithm: AlgorithmMode;
  execution_time_ms: number;
  time_complexity: string;
}

export interface ModeInfo {
  id: AlgorithmMode;
  name: string;
  description: string;
  details: string;
}

// Update this type to include the new algorithm names
export type AlgorithmMode = 'masalaMaster' | 'tadkaTechnique' | 'spiceSynergy';