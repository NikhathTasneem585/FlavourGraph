import { Ingredient, ModeInfo } from './types';

export const AVAILABLE_INGREDIENTS: Ingredient[] = [
  { id: 1, name: 'Chicken Breast' },
  { id: 2, name: 'Garlic' },
  { id: 3, name: 'Onion' },
  { id: 4, name: 'Tomato' },
  { id: 5, name: 'Pasta' },
  { id: 6, name: 'Olive Oil' },
  { id: 7, name: 'Bell Pepper' },
  { id: 8, name: 'Rice' },
  { id: 9, name: 'Black Beans' },
  { id: 10, name: 'Cheese' },
  { id: 11, name: 'Lettuce' },
  { id: 12, name: 'Ground Beef' },
  { id: 13, name: 'Potatoes' },
  { id: 14, name: 'Carrots' },
  { id: 15, name: 'Eggs' },
  { id: 16, name: 'Flour' },
  { id: 17, name: 'Sugar' },
  { id: 18, name: 'Butter' }
];

export const ALGORITHM_MODES: ModeInfo[] = [
  {
    id: 'backtracking',
    name: 'Exhaustive Search',
    description: 'Uses backtracking to find optimal recipe matches by exploring all possibilities. Provides the most thorough results but may take longer to execute. Complexity: O(2^n).',
    details: 'Backtracking: Finds optimal recipe matches by exploring all possibilities, ensuring you get the best possible combinations of ingredients.'
  },
  {
    id: 'graph',
    name: 'Graph Theory',
    description: 'Uses ingredient relationship graphs to find common and complementary ingredient combinations. Balances accuracy and speed.',
    details: 'Graph theory: Uses ingredient relationship graphs to find common combinations, identifying patterns in successful recipes.'
  },
  {
    id: 'greedy',
    name: 'Fast Search',
    description: 'Quick matching with ingredient substitution suggestions. Ideal for when you need instant results. Complexity: O(n*m).',
    details: 'Greedy Algorithm: Quick matching with ingredient substitution suggestions, perfect for rapid recipe exploration.'
  }
];
