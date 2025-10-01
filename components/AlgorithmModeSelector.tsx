import React from 'react';
import { AlgorithmMode, ModeInfo } from '../types';

interface AlgorithmModeSelectorProps {
  modes: ModeInfo[];
  selectedMode: AlgorithmMode;
  onModeChange: (mode: AlgorithmMode) => void;
}

const AlgorithmModeSelector: React.FC<AlgorithmModeSelectorProps> = ({
  modes,
  selectedMode,
  onModeChange,
}) => {
  const getModeIcon = (modeId: AlgorithmMode) => {
    switch (modeId) {
      case 'masalaMaster':
        return '👨‍🍳';
      case 'tadkaTechnique':
        return '🍳';
      case 'spiceSynergy':
        return '🌶️';
      default:
        return '⚡';
    }
  };

  const getModeGradient = (modeId: AlgorithmMode, isSelected: boolean) => {
    if (!isSelected) return 'from-slate-50 to-slate-100';
    
    switch (modeId) {
      case 'masalaMaster':
        return 'from-orange-50 to-red-100 border-orange-200';
      case 'tadkaTechnique':
        return 'from-yellow-50 to-amber-100 border-yellow-200';
      case 'spiceSynergy':
        return 'from-green-50 to-emerald-100 border-green-200';
      default:
        return 'from-slate-50 to-slate-100';
    }
  };

  const getModeColor = (modeId: AlgorithmMode, isSelected: boolean) => {
    if (!isSelected) return 'from-slate-400 to-slate-500';
    
    switch (modeId) {
      case 'masalaMaster':
        return 'from-orange-500 to-red-600';
      case 'tadkaTechnique':
        return 'from-yellow-500 to-amber-600';
      case 'spiceSynergy':
        return 'from-green-500 to-emerald-600';
      default:
        return 'from-slate-400 to-slate-500';
    }
  };

  const getTextColor = (modeId: AlgorithmMode, isSelected: boolean) => {
    if (!isSelected) return 'text-slate-700';
    
    switch (modeId) {
      case 'masalaMaster':
        return 'text-orange-700';
      case 'tadkaTechnique':
        return 'text-amber-700';
      case 'spiceSynergy':
        return 'text-green-700';
      default:
        return 'text-slate-700';
    }
  };

  const getDotColor = (modeId: AlgorithmMode) => {
    switch (modeId) {
      case 'masalaMaster':
        return 'bg-orange-500';
      case 'tadkaTechnique':
        return 'bg-amber-500';
      case 'spiceSynergy':
        return 'bg-green-500';
      default:
        return 'bg-slate-500';
    }
  };

  return (
    <div className="space-y-3">
      {modes.map(mode => {
        const isSelected = selectedMode === mode.id;
        return (
          <div
            key={mode.id}
            className={`relative cursor-pointer transition-all duration-300 transform hover:scale-105 ${
              isSelected ? 'scale-105' : 'hover:scale-102'
            }`}
            onClick={() => onModeChange(mode.id)}
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${getModeGradient(mode.id, isSelected)} rounded-2xl border-2 ${
              isSelected ? 'border-orange-300 shadow-lg shadow-orange-500/10' : 'border-slate-200/60 shadow-md'
            } transition-all duration-300`}></div>
            
            <div className="relative p-4 rounded-2xl">
              <div className="flex items-start space-x-4">
                <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${getModeColor(mode.id, isSelected)} flex items-center justify-center text-white font-bold text-lg shadow-lg transition-all duration-300`}>
                  {getModeIcon(mode.id)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-sm font-bold transition-colors duration-200 ${getTextColor(mode.id, isSelected)}`}>
                      {mode.name}
                    </span>
                    {isSelected && (
                      <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {mode.description}
                  </p>
                  
                  {isSelected && (
                    <div className="mt-2 flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${getDotColor(mode.id)}`}></div>
                      <span className={`text-xs font-medium ${getTextColor(mode.id, isSelected)}`}>
                        Currently selected
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AlgorithmModeSelector;