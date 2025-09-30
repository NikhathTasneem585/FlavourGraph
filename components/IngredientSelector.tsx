
import React from 'react';
import { Ingredient } from '../types';

interface IngredientSelectorProps {
  availableIngredients: Ingredient[];
  selectedIngredients: number[];
  onIngredientToggle: (id: number) => void;
}

const IngredientSelector: React.FC<IngredientSelectorProps> = ({
  availableIngredients,
  selectedIngredients,
  onIngredientToggle,
}) => {
  return (
    <div className="flex flex-wrap gap-2 max-h-60 overflow-y-auto pr-2">
      {availableIngredients.map(ingredient => {
        const isSelected = selectedIngredients.includes(ingredient.id);
        return (
          <button
            key={ingredient.id}
            onClick={() => onIngredientToggle(ingredient.id)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ease-in-out border-2 ${
              isSelected
                ? 'bg-brand-primary border-brand-primary text-white'
                : 'bg-white text-gray-700 border-gray-200 hover:border-brand-secondary'
            }`}
          >
            {ingredient.name}
          </button>
        );
      })}
    </div>
  );
};

export default IngredientSelector;
