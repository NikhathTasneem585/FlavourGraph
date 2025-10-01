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
  const getIngredientColor = (index: number, isSelected: boolean) => {
    const colors = [
      { bg: 'bg-gradient-to-r from-orange-500 to-red-600', text: 'text-white', border: 'border-orange-600' },
      { bg: 'bg-gradient-to-r from-yellow-500 to-amber-600', text: 'text-white', border: 'border-yellow-600' },
      { bg: 'bg-gradient-to-r from-green-500 to-emerald-600', text: 'text-white', border: 'border-green-600' },
      { bg: 'bg-gradient-to-r from-purple-500 to-pink-600', text: 'text-white', border: 'border-purple-600' },
      { bg: 'bg-gradient-to-r from-blue-500 to-cyan-600', text: 'text-white', border: 'border-blue-600' },
    ];
    
    const color = colors[index % colors.length];
    
    if (isSelected) {
      return `${color.bg} ${color.text} ${color.border} shadow-lg`;
    }
    
    return 'bg-white text-slate-700 border-slate-300 hover:border-slate-400 hover:bg-slate-50 hover:shadow-md';
  };

  return (
    <div className="max-h-80 overflow-y-auto">
      <div className="grid grid-cols-3 gap-2 p-1">
        {availableIngredients.map((ingredient, index) => {
          const isSelected = selectedIngredients.includes(ingredient.id);
          return (
            <button
              key={ingredient.id}
              onClick={() => onIngredientToggle(ingredient.id)}
              className={`relative p-2 rounded-lg border-2 transition-all duration-200 ease-out ${
                getIngredientColor(index, isSelected)
              } group overflow-hidden min-h-[44px] flex items-center justify-center`}
            >
              {/* Animated background effect */}
              <div className={`absolute inset-0 bg-gradient-to-br from-white/20 to-transparent transition-opacity duration-200 ${
                isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}></div>
              
              {/* Content */}
              <div className="relative z-10 w-full">
                <span className={`font-medium text-xs transition-all duration-200 break-words hyphens-auto line-clamp-2 leading-tight px-1 ${
                  isSelected ? 'text-white' : 'text-slate-700'
                }`} style={{ wordBreak: 'break-word' }}>
                  {ingredient.name}
                </span>
                
                {/* Selection indicator */}
                {isSelected && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  </div>
                )}
              </div>
              
              {/* Hover glow effect */}
              <div className={`absolute inset-0 rounded-lg bg-gradient-to-r from-orange-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
                isSelected ? 'opacity-100' : ''
              }`}></div>
            </button>
          );
        })}
      </div>
      
      {availableIngredients.length === 0 && (
        <div className="text-center py-6">
          <div className="w-12 h-12 bg-slate-200 rounded-xl flex items-center justify-center mx-auto mb-2">
            <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <p className="text-slate-500 text-xs">No ingredients available</p>
          <p className="text-slate-400 text-xs mt-1">Add ingredients using the search above</p>
        </div>
      )}
    </div>
  );
};

export default IngredientSelector;