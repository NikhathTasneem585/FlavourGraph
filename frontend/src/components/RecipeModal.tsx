
import React, { useEffect, useState } from 'react';
import { Suggestion, Ingredient, Recipe } from '../types';
import { fetchRecipeDetail } from '../services/suggestionService';

interface RecipeModalProps {
    suggestion: Suggestion;
    onClose: () => void;
    ownedIngredientIds: number[];
}

const RecipeModal: React.FC<RecipeModalProps> = ({ suggestion, onClose, ownedIngredientIds }) => {
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        fetchRecipeDetail(suggestion.recipe.id)
            .then(data => setRecipe(data))
            .catch(err => setError('Failed to load recipe details'))
            .finally(() => setLoading(false));
    }, [suggestion.recipe.id]);

    if (loading) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
                <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl flex flex-col items-center justify-center p-8">
                    <span className="text-lg text-gray-600">Loading full recipe...</span>
                </div>
            </div>
        );
    }
    if (error || !recipe) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
                <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl flex flex-col items-center justify-center p-8">
                    <span className="text-lg text-red-600">{error || 'Recipe not found.'}</span>
                </div>
            </div>
        );
    }

    return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="recipe-modal-title"
    >
      <div 
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <header className="sticky top-0 bg-white border-b p-5 flex justify-between items-center flex-shrink-0">
            <h2 id="recipe-modal-title" className="text-2xl font-bold text-gray-800" style={{ fontFamily: "'Playfair Display', serif" }}>{recipe.title}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600" aria-label="Close modal">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </header>
        
        <div className="p-6 overflow-y-auto">
            <div className="text-md text-gray-500 mb-6 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {recipe.prep_time_minutes} min prep time
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                    <h3 className="font-bold text-xl text-gray-700 mb-3 border-b pb-2">Ingredients</h3>
                    <ul className="space-y-2">
                        {recipe.all_ingredients.map(ing => {
                            const hasIngredient = ownedIngredientIds.includes(ing.id);
                            return (
                                <li key={ing.id} className="flex items-center">
                                    {hasIngredient ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                    <span className={hasIngredient ? 'text-gray-600' : 'text-red-600 font-medium'}>{ing.name}</span>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                 <div>
                    <h3 className="font-bold text-xl text-gray-700 mb-3 border-b pb-2">Instructions</h3>
                    <div className="prose prose-sm max-w-none text-gray-600 whitespace-pre-wrap">
                      {recipe.instructions}
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;