import { Ingredient, ModeInfo } from './types';

export const AVAILABLE_INGREDIENTS: Ingredient[] = [
  { id: 1, name: 'Paneer' },
  { id: 2, name: 'Basmati Rice' },
  { id: 3, name: 'Chicken' },
  { id: 4, name: 'Lamb' },
  { id: 5, name: 'Potato' },
  { id: 6, name: 'Onion' },
  { id: 7, name: 'Tomato' },
  { id: 8, name: 'Garlic' },
  { id: 9, name: 'Ginger' },
  { id: 10, name: 'Chili' },
  { id: 11, name: 'Cumin' },
  { id: 12, name: 'Coriander' },
  { id: 13, name: 'Turmeric' },
  { id: 14, name: 'Garam Masala' },
  { id: 15, name: 'Chili Powder' },
  { id: 16, name: 'Cumin Powder' },
  { id: 17, name: 'Coriander Leaves' },
  { id: 18, name: 'Mint' },
  { id: 19, name: 'Yogurt' },
  { id: 20, name: 'Cream' },
  { id: 21, name: 'Ghee' },
  { id: 22, name: 'Oil' },
  { id: 23, name: 'Lentils' },
  { id: 24, name: 'Chickpeas' },
  { id: 25, name: 'Kidney Beans' },
  { id: 26, name: 'Spinach' },
  { id: 27, name: 'Cauliflower' },
  { id: 28, name: 'Peas' },
  { id: 29, name: 'Bell Pepper' },
  { id: 30, name: 'Eggplant' }
];

export const ALGORITHM_MODES: ModeInfo[] = [
  {
    id: 'masalaMaster',
    name: 'Masala Master',
    description: 'Comprehensive search that explores all traditional spice combinations',
    details: 'Masala Master: Deep exploration of traditional spice blends and cooking techniques'
  },
  {
    id: 'tadkaTechnique',
    name: 'Tadka Technique',
    description: 'Smart algorithm that focuses on tempering and layering flavors',
    details: 'Tadka Technique: Mimics the art of Indian tempering for rapid recipe generation'
  },
  {
    id: 'spiceSynergy',
    name: 'Spice Synergy',
    description: 'Advanced algorithm that analyzes spice compatibility',
    details: 'Spice Synergy: Uses flavor pairing science for unique culinary creations'
  }
];