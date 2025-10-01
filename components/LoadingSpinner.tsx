import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'h-5 w-5',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div className={`relative ${className}`}>
      {/* Outer glow */}
      <div className={`absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-full blur-lg opacity-30 animate-pulse ${sizeClasses[size]}`}></div>
      
      {/* Main spinner */}
      <div
        className={`relative animate-spin rounded-full border-4 border-slate-200 ${sizeClasses[size]} border-t-emerald-500 border-r-cyan-500 border-b-emerald-400 border-l-cyan-400`}
      >
        {/* Inner gradient */}
        <div className="absolute inset-2 bg-gradient-to-br from-emerald-100 to-cyan-100 rounded-full"></div>
      </div>
      
      {/* Pulsing dot */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-cyan-600 rounded-full animate-ping"></div>
    </div>
  );
};

export default LoadingSpinner;