import React from 'react';
import { Suggestion } from '../types';

interface RecipeCardProps {
  suggestion: Suggestion;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ suggestion }) => {
  const { recipe, match_score, missing_ingredients, substitutions } = suggestion;
  const matchPercentage = Math.round(match_score * 100);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'from-emerald-500 to-green-600 shadow-emerald-500/25';
    if (score >= 50) return 'from-amber-500 to-orange-600 shadow-amber-500/25';
    return 'from-rose-500 to-pink-600 shadow-rose-500/25';
  };

  const getScoreText = (score: number) => {
    if (score >= 80) return 'Excellent match';
    if (score >= 50) return 'Good match';
    return 'Fair match';
  };

  return (
    <div className="group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-slate-200/60 overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Animated border */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm group-hover:blur-md"></div>
      <div className="absolute inset-[1px] rounded-3xl bg-white"></div>

      <div className="relative z-10 p-6 flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-bold text-slate-800 leading-tight pr-4 group-hover:text-slate-900 transition-colors duration-300">
            {recipe.title}
          </h3>
          <div className="flex-shrink-0">
            <div className={`bg-gradient-to-br ${getScoreColor(matchPercentage)} text-white px-3 py-1.5 rounded-2xl shadow-lg text-sm font-bold min-w-[60px] text-center`}>
              {matchPercentage}%
            </div>
            <p className="text-xs text-slate-500 mt-1 text-center font-medium">
              {getScoreText(matchPercentage)}
            </p>
          </div>
        </div>

        {/* Prep time */}
        <div className="flex items-center text-slate-600 mb-4">
          <svg className="w-4 h-4 mr-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm font-medium">{recipe.prep_time_minutes} min prep time</span>
        </div>

        {/* Missing ingredients */}
        {missing_ingredients.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <svg className="w-4 h-4 mr-2 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <h4 className="font-semibold text-sm text-rose-700">Missing Ingredients</h4>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {missing_ingredients.map(ing => (
                <span 
                  key={ing.id}
                  className="px-2.5 py-1 bg-rose-50 text-rose-700 text-xs font-medium rounded-full border border-rose-200"
                >
                  {ing.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Substitutions */}
        {substitutions.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              <h4 className="font-semibold text-sm text-blue-700">Smart Substitutions</h4>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed bg-blue-50/50 rounded-xl p-3 border border-blue-200/50">
              Try using <span className="font-semibold text-blue-800">{substitutions[0].substitute_ingredient_name}</span>. {substitutions[0].reason}
            </p>
          </div>
        )}

        {/* Action button */}
        <div className="mt-auto pt-4">
          <button className="w-full bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-600 hover:to-cyan-700 text-white font-semibold py-3 px-4 rounded-2xl shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 transform transition-all duration-300 hover:scale-105 group/btn">
            <span className="flex items-center justify-center space-x-2">
              <svg className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Start Cooking</span>
            </span>
          </button>
        </div>
      </div>

      {/* Hover effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
    </div>
  );
};

export default RecipeCard;