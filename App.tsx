import React, { useState, useCallback, useMemo } from 'react';
import { Suggestion, Insights, AlgorithmMode, Ingredient } from './types';
import { fetchSuggestions } from './services/suggestionService';
import { AVAILABLE_INGREDIENTS, ALGORITHM_MODES } from './constants';
import IngredientSelector from './components/IngredientSelector';
import RecipeCard from './components/RecipeCard';
import AlgorithmModeSelector from './components/AlgorithmModeSelector';
import LoadingSpinner from './components/LoadingSpinner';
import InsightsPanel from './components/InsightsPanel';

const App: React.FC = () => {
  const [availableIngredients, setAvailableIngredients] = useState<Ingredient[]>(AVAILABLE_INGREDIENTS);
  const [newIngredientName, setNewIngredientName] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState<number[]>([]);
  // Update the default state to use the new algorithm name
  const [selectedMode, setSelectedMode] = useState<AlgorithmMode>('masalaMaster');
  const [suggestions, setSuggestions] = useState<Suggestion[] | null>(null);
  const [insights, setInsights] = useState<Insights | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'ingredients' | 'algorithm'>('ingredients');

  // ... rest of your App component code remains the same

  const handleIngredientToggle = (id: number) => {
    setSelectedIngredients(prev =>
      prev.includes(id) ? prev.filter(ingId => ingId !== id) : [...prev, id]
    );
  };

  const handleAddNewIngredient = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = newIngredientName.trim();
    if (trimmedName) {
      const existingIngredient = availableIngredients.find(
        (ing) => ing.name.toLowerCase() === trimmedName.toLowerCase()
      );

      if (existingIngredient) {
        if (!selectedIngredients.includes(existingIngredient.id)) {
          setSelectedIngredients((prev) => [...prev, existingIngredient.id]);
        }
      } else {
        const newIngredient = {
          id: Date.now(),
          name: trimmedName,
        };
        setAvailableIngredients((prev) => [...prev, newIngredient]);
        setSelectedIngredients((prev) => [...prev, newIngredient.id]);
      }
      setNewIngredientName('');
    }
  };

  const handleGetSuggestions = useCallback(async () => {
    if (selectedIngredients.length === 0) {
      setError('Please select at least one ingredient.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuggestions(null);
    setInsights(null);
    setSearchQuery('');

    try {
      const response = await fetchSuggestions(selectedIngredients, selectedMode, availableIngredients);
      setSuggestions(response.suggestions);
      setInsights(response.insights);
    } catch (err) {
      setError('Failed to fetch recipe suggestions. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [selectedIngredients, selectedMode, availableIngredients]);

  const filteredSuggestions = useMemo(() => {
    if (!suggestions) return null;
    if (!searchQuery) return suggestions;
    return suggestions.filter(suggestion =>
      suggestion.recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [suggestions, searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/40 font-sans">
      {/* Enhanced Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                  <span className="text-white font-bold text-xl">🌿</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full border-2 border-white shadow-sm"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-emerald-700 bg-clip-text text-transparent" 
                    style={{ fontFamily: "'Playfair Display', serif" }}>
                  FlavorGraph
                </h1>
                <p className="text-slate-500 text-sm font-medium">Intelligent Recipe Discovery</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-2 bg-slate-100/80 rounded-2xl px-4 py-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-slate-700">
                {selectedIngredients.length} ingredients selected
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Enhanced Controls Sidebar */}
          <div className="xl:col-span-1 space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-slate-200/60 overflow-hidden">
              {/* Tab Navigation */}
              <div className="flex border-b border-slate-200/60">
                <button
                  onClick={() => setActiveTab('ingredients')}
                  className={`flex-1 py-4 font-semibold text-sm transition-all duration-200 ${
                    activeTab === 'ingredients'
                      ? 'text-emerald-600 border-b-2 border-emerald-500 bg-gradient-to-t from-emerald-50/50 to-transparent'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  🥕 Ingredients
                </button>
                <button
                  onClick={() => setActiveTab('algorithm')}
                  className={`flex-1 py-4 font-semibold text-sm transition-all duration-200 ${
                    activeTab === 'algorithm'
                      ? 'text-emerald-600 border-b-2 border-emerald-500 bg-gradient-to-t from-emerald-50/50 to-transparent'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  ⚡ Algorithm
                </button>
              </div>

              <div className="p-6">
                {activeTab === 'ingredients' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800 mb-3">Add Ingredients</h3>
                      <form onSubmit={handleAddNewIngredient} className="relative">
                        <input
                          type="text"
                          value={newIngredientName}
                          onChange={(e) => setNewIngredientName(e.target.value)}
                          placeholder="Search or add ingredients..."
                          className="w-full px-4 py-3 pl-11 bg-slate-50 border border-slate-300/50 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200 outline-none"
                          aria-label="Add new ingredient"
                        />
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </div>
                        <button
                          type="submit"
                          disabled={!newIngredientName.trim()}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-300 text-white p-2 rounded-xl transition-all duration-200 disabled:scale-100 hover:scale-110 active:scale-95 shadow-lg shadow-emerald-500/25 disabled:shadow-none"
                          aria-label="Add Ingredient"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </form>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold text-slate-800">Selected Ingredients</h3>
                        <span className="bg-emerald-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                          {selectedIngredients.length}
                        </span>
                      </div>
                      <IngredientSelector
                        availableIngredients={availableIngredients}
                        selectedIngredients={selectedIngredients}
                        onIngredientToggle={handleIngredientToggle}
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'algorithm' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">Choose Algorithm</h3>
                    <AlgorithmModeSelector
                      modes={ALGORITHM_MODES}
                      selectedMode={selectedMode}
                      onModeChange={setSelectedMode}
                    />
                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/60">
                      <h4 className="font-semibold text-slate-700 text-sm mb-2">Algorithm Info</h4>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {selectedMode === 'backtracking' && 'Explores all possible ingredient combinations systematically'}
                        {selectedMode === 'genetic' && 'Uses evolutionary algorithms to find optimal flavor pairings'}
                        {selectedMode === 'flavorGraph' && 'Leverages flavor compound analysis for perfect matches'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGetSuggestions}
              disabled={isLoading || selectedIngredients.length === 0}
              className="w-full bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-600 hover:to-cyan-700 disabled:from-slate-300 disabled:to-slate-400 text-white font-bold py-4 px-6 rounded-2xl shadow-xl shadow-emerald-500/25 hover:shadow-2xl hover:shadow-emerald-500/30 disabled:shadow-none transform transition-all duration-200 hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
            >
              {isLoading ? (
                <>
                  <LoadingSpinner />
                  <span className="ml-2">Crafting Recipes...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>Generate Recipes</span>
                </>
              )}
            </button>
            
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4 animate-shake">
                <p className="text-red-700 text-sm font-medium flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {error}
                </p>
              </div>
            )}
          </div>

          {/* Enhanced Results Panel */}
          <div className="xl:col-span-3">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-slate-200/60 overflow-hidden flex flex-col h-full">
              {/* Results Header */}
              <div className="p-6 border-b border-slate-200/60 bg-gradient-to-r from-slate-50 to-white/50">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">Recipe Suggestions</h2>
                    {suggestions && (
                      <p className="text-slate-600 mt-1">
                        Found {suggestions.length} recipes matching your ingredients
                      </p>
                    )}
                  </div>
                  
                  {suggestions && suggestions.length > 0 && (
                    <div className="relative w-full sm:w-64">
                      <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <input
                        type="search"
                        placeholder="Filter recipes..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300/50 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200 outline-none"
                        aria-label="Filter recipes"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Insights Panel */}
              {insights && (
                <div className="border-b border-slate-200/60">
                  <InsightsPanel insights={insights} />
                </div>
              )}

              {/* Results Content */}
              <div className="flex-grow p-6">
                {isLoading && (
                  <div className="flex flex-col items-center justify-center py-20">
                    <div className="relative mb-6">
                      <LoadingSpinner size="lg" />
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-full blur-xl"></div>
                    </div>
                    <p className="text-slate-600 text-lg font-medium">Analyzing flavor profiles...</p>
                    <p className="text-slate-500 text-sm mt-2">Finding perfect ingredient combinations</p>
                  </div>
                )}

                {!isLoading && !suggestions && (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-slate-200 to-slate-300 rounded-3xl flex items-center justify-center mb-6 shadow-inner">
                      <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-slate-700 mb-2">Ready to Discover Recipes</h3>
                    <p className="text-slate-500 max-w-md">
                      Select your ingredients and choose an algorithm to generate personalized recipe suggestions.
                    </p>
                  </div>
                )}
                
                {suggestions && suggestions.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-amber-200 to-orange-300 rounded-3xl flex items-center justify-center mb-6 shadow-inner">
                      <svg className="w-12 h-12 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-slate-700 mb-2">No Recipes Found</h3>
                    <p className="text-slate-500 max-w-md">
                      Try adding more ingredients or selecting a different algorithm to expand your options.
                    </p>
                  </div>
                )}

                {filteredSuggestions && filteredSuggestions.length > 0 && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6 auto-rows-fr">
                    {filteredSuggestions.map(suggestion => (
                      <RecipeCard key={suggestion.recipe.id} suggestion={suggestion} />
                    ))}
                  </div>
                )}
                
                {suggestions && suggestions.length > 0 && filteredSuggestions?.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-slate-200 to-slate-300 rounded-2xl flex items-center justify-center mb-4 shadow-inner">
                      <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-700 mb-2">No Matching Recipes</h3>
                    <p className="text-slate-500">Try adjusting your search terms</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;