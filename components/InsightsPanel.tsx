import React from 'react';
import { Insights } from '../types';

interface InsightItemProps { 
  label: string; 
  value: string | number; 
  unit?: string;
  icon: React.ReactNode;
  gradient: string;
}

const InsightItem: React.FC<InsightItemProps> = ({ label, value, unit, icon, gradient }) => (
  <div className={`relative overflow-hidden rounded-2xl p-4 backdrop-blur-sm ${gradient} border border-white/20 shadow-lg`}>
    {/* Background pattern */}
    <div className="absolute inset-0 bg-black/5"></div>
    
    {/* Content */}
    <div className="relative z-10">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-slate-700 uppercase tracking-wide">{label}</span>
        <div className="text-slate-600">
          {icon}
        </div>
      </div>
      <div className="flex items-baseline space-x-1">
        <span className="text-2xl font-bold text-slate-800">
          {value}
        </span>
        {unit && (
          <span className="text-sm font-medium text-slate-600">{unit}</span>
        )}
      </div>
    </div>
    
    {/* Shine effect */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
  </div>
);

const InsightsPanel: React.FC<{ insights: Insights }> = ({ insights }) => {
  const getAlgorithmIcon = (algorithm: string) => {
    switch (algorithm) {
      case 'backtracking':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      case 'genetic':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case 'flavorGraph':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
    }
  };

  const getAlgorithmName = (algorithm: string) => {
    switch (algorithm) {
      case 'backtracking': return 'Exhaustive Search';
      case 'genetic': return 'Genetic Algorithm';
      case 'flavorGraph': return 'Flavor Network';
      default: return algorithm;
    }
  };

  const insightsData = [
    {
      label: "Algorithm",
      value: getAlgorithmName(insights.algorithm),
      icon: getAlgorithmIcon(insights.algorithm),
      gradient: "bg-gradient-to-br from-blue-50 to-cyan-100"
    },
    {
      label: "Execution Time",
      value: insights.execution_time_ms,
      unit: "ms",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      gradient: "bg-gradient-to-br from-emerald-50 to-teal-100"
    },
    {
      label: "Complexity",
      value: insights.time_complexity,
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      gradient: "bg-gradient-to-br from-purple-50 to-pink-100"
    }
  ];

  return (
    <div className="bg-gradient-to-r from-slate-50/80 to-blue-50/50 border border-slate-200/60 rounded-2xl p-6 backdrop-blur-sm">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <div>
          <h4 className="text-lg font-bold text-slate-800">Performance Insights</h4>
          <p className="text-sm text-slate-600">Algorithm execution metrics</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {insightsData.map((insight, index) => (
          <div key={index} className="group">
            <InsightItem {...insight} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InsightsPanel;