import React from 'react';
import { Sparkles } from 'lucide-react';

const DualOutput = ({ model1Data, model2Data, isLoading }) => {
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                {[1, 2].map((i) => (
                    <div key={i} className="bg-base-200 rounded-2xl p-4 border border-base-300">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="loading loading-dots loading-sm"></span>
                            <span className="text-xs text-base-content/60">Generating...</span>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {/* Model 1 Output */}
            <div className="bg-base-200 rounded-2xl p-4 border border-base-300 hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-base-300">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-xs font-semibold text-primary">{model1Data?.name || 'Model 1'}</span>
                </div>
                <div className="prose prose-sm max-w-none">
                    <p className="text-sm text-base-content/90 whitespace-pre-wrap leading-relaxed">
                        {model1Data?.response || ''}
                    </p>
                </div>
            </div>

            {/* Model 2 Output */}
            <div className="bg-base-200 rounded-2xl p-4 border border-base-300 hover:border-secondary/50 transition-colors">
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-base-300">
                    <Sparkles className="w-4 h-4 text-secondary" />
                    <span className="text-xs font-semibold text-secondary">{model2Data?.name || 'Model 2'}</span>
                </div>
                <div className="prose prose-sm max-w-none">
                    <p className="text-sm text-base-content/90 whitespace-pre-wrap leading-relaxed">
                        {model2Data?.response || ''}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DualOutput;
