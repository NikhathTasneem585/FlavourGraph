
import React from 'react';
import { Suggestion } from '../types';

interface RecipeCardProps {
  suggestion: Suggestion;
  onStartRecipe: (suggestion: Suggestion) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ suggestion, onStartRecipe }) => {
  const { recipe, match_score, missing_ingredients, substitutions } = suggestion;
  const matchPercentage = Math.round(match_score * 100);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col">
      <div className="p-5 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-800 leading-tight">{recipe.title}</h3>
          <span className={`text-sm font-bold text-white px-2 py-1 rounded-full ${getScoreColor(matchPercentage)}`}>
            {matchPercentage}% Match
          </span>
        </div>
        <div className="text-sm text-gray-500 mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {recipe.prep_time_minutes} min prep time
        </div>

        {missing_ingredients.length > 0 && (
          <div className="mb-4">
            <h4 className="font-semibold text-sm text-red-600">Missing Ingredients:</h4>
            <ul className="list-disc list-inside text-sm text-gray-600">
              {missing_ingredients.map(ing => (
                <li key={ing.id}>{ing.name}</li>
              ))}
            </ul>
          </div>
        )}

        {substitutions.length > 0 && (
          <div>
            <h4 className="font-semibold text-sm text-blue-600">Smart Substitutions:</h4>
             <p className="text-sm text-gray-600">
                Try using <span className="font-medium">{substitutions[0].substitute_ingredient_name}</span>. {substitutions[0].reason}
            </p>
          </div>
        )}
      </div>
      <div className="bg-gray-100 p-3 text-center">
        <button
          onClick={() => onStartRecipe(suggestion)}
          className="text-sm font-semibold text-green-700 hover:bg-green-500 hover:text-white transition-colors px-4 py-2 rounded"
        >
            Start
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
