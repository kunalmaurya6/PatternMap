import React from 'react';
import { Lightbulb } from 'lucide-react';
import { mockLearningInsight } from '../data/mockDashboardData';

interface LearningInsightProps {
  title?: string;
  content?: string;
}

export const LearningInsight: React.FC<LearningInsightProps> = ({
  title = mockLearningInsight.title,
  content = mockLearningInsight.content,
}) => {
  return (
    <div className="bg-[#121620] border border-[#1e2533] rounded-2xl p-5 sm:p-6 shadow-sm flex items-start gap-4 sm:gap-5">
      {/* Glowing Lightbulb Badge */}
      <div className="shrink-0 w-12 h-12 rounded-full bg-[#181e2b] border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
        <Lightbulb className="w-6 h-6 stroke-[2]" />
      </div>

      {/* Insight Text */}
      <div className="space-y-1">
        <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          {content}
        </p>
      </div>
    </div>
  );
};
