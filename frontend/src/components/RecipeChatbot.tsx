import React, { useState } from 'react';
import { Recipe } from '../types';

interface RecipeChatbotProps {
  recipe: Recipe;
  onClose: () => void;
}

const RecipeChatbot: React.FC<RecipeChatbotProps> = ({ recipe, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = recipe.instructions.split('\n').filter(step => step.trim());

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center justify-center">
      <div className="bg-white w-full sm:w-96 sm:rounded-lg shadow-xl max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="border-b p-4 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Recipe Guide</h2>
            <p className="text-sm text-gray-500">{recipe.title}</p>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Chat content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="bg-green-50 p-3 rounded-lg">
            <p className="text-green-800">
              👋 Hi! I'll guide you through making {recipe.title}. 
              This recipe takes about {recipe.prep_time_minutes} minutes to prepare.
            </p>
          </div>

          {steps.slice(0, currentStep + 1).map((step, index) => (
            <div key={index} className="space-y-2">
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-blue-800 font-medium">Step {index + 1}:</p>
                <p className="text-gray-800">{step.trim()}</p>
              </div>
            </div>
          ))}

          {currentStep === steps.length && (
            <div className="bg-green-50 p-3 rounded-lg">
              <p className="text-green-800">
                🎉 Congratulations! You've completed all steps. Enjoy your {recipe.title}!
              </p>
            </div>
          )}
        </div>

        {/* Footer with navigation */}
        <div className="border-t p-4 flex justify-between items-center bg-gray-50">
          <button
            onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous Step
          </button>
          <span className="text-sm text-gray-500">
            Step {currentStep + 1} of {steps.length}
          </span>
          <button
            onClick={() => setCurrentStep(prev => Math.min(steps.length, prev + 1))}
            disabled={currentStep >= steps.length}
            className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentStep >= steps.length ? 'Finished!' : 'Next Step'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeChatbot;