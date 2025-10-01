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
  return (
    <div className="space-y-3">
      {modes.map(mode => (
        <label
          key={mode.id}
          className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
            selectedMode === mode.id
              ? 'border-brand-primary bg-brand-light'
              : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <input
            type="radio"
            name="algorithm-mode"
            value={mode.id}
            checked={selectedMode === mode.id}
            onChange={() => onModeChange(mode.id)}
            className="h-4 w-4 text-brand-primary focus:ring-brand-secondary"
          />
          <div className="ml-3">
            <span className="block text-md font-semibold text-gray-800">{mode.name}</span>
            <span className="block text-sm text-gray-500">{mode.description}</span>
          </div>
        </label>
      ))}
    </div>
  );
};

export default AlgorithmModeSelector;
