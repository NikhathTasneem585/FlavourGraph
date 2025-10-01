import React from 'react';
import { Insights } from '../types';

interface InsightsPanelProps {
  insights: Insights;
}

const InsightItem: React.FC<{ label: string; value: string | number; unit?: string }> = ({ label, value, unit }) => (
    <div className="text-center bg-gray-100 p-3 rounded-lg">
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-lg font-bold text-brand-dark">
            {value}
            {unit && <span className="text-sm font-normal ml-1">{unit}</span>}
        </p>
    </div>
);


const InsightsPanel: React.FC<InsightsPanelProps> = ({ insights }) => {
  return (
    <div className="bg-brand-light/30 border border-brand-secondary/50 rounded-lg p-4 mb-6">
        <h4 className="text-md font-semibold text-gray-700 mb-3 text-center">Algorithmic Insights</h4>
        <div className="grid grid-cols-3 gap-3">
            <InsightItem 
              label="Algorithm" 
              value={
                insights.algorithm === 'backtracking' ? 'Exhaustive' :
                insights.algorithm === 'graph' ? 'Graph Theory' :
                'Fast'
              } 
            />
            <InsightItem label="Execution Time" value={insights.execution_time_ms} unit="ms" />
            <InsightItem label="Complexity" value={insights.time_complexity} />
        </div>
    </div>
  );
};

export default InsightsPanel;
