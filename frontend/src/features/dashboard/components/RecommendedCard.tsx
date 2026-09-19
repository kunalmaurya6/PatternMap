import React, { useState } from 'react';
import { ArrowRight, RefreshCw } from 'lucide-react';
import { DifficultyBadge, TagBadge } from '@/components/common/Badge';
import type { ProblemItem } from '../types';
import { mockRecommendedList } from '../data/mockDashboardData';

interface RecommendedCardProps {
  onSelectProblem?: (problem: ProblemItem) => void;
}

export const RecommendedCard: React.FC<RecommendedCardProps> = ({ onSelectProblem }) => {
  const [index, setIndex] = useState(0);
  const [isRotating, setIsRotating] = useState(false);

  const handleRefresh = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsRotating(true);
    setIndex((prev) => (prev + 1) % mockRecommendedList.length);
    setTimeout(() => setIsRotating(false), 400);
  };

  const problem = mockRecommendedList[index];

  return (
    <div className="bg-[#121620] border border-[#1e2533] rounded-2xl p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
          Recommended Next
        </h2>
        <button
          onClick={handleRefresh}
          className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-[#19202c] transition-all"
          title="Shuffle recommendation"
        >
          <RefreshCw className={`w-4 h-4 transition-transform ${isRotating ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Subtitle */}
      <p className="text-xs sm:text-sm text-slate-400 mb-4">
        Based on your recent solves
      </p>

      {/* Problem Box */}
      <div
        onClick={() => onSelectProblem && onSelectProblem(problem)}
        className="flex items-center justify-between gap-4 p-4 rounded-xl bg-[#161b26] border border-[#212837] hover:border-[#2f3a4e] transition-all cursor-pointer group"
      >
        <div className="min-w-0 space-y-2">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="text-sm sm:text-[15px] font-bold text-white group-hover:text-cyan-400 transition-colors">
              {problem.title}
            </span>
            <DifficultyBadge difficulty={problem.difficulty} />
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {problem.tags.map((tag) => (
              <TagBadge key={tag} label={tag} />
            ))}
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (onSelectProblem) onSelectProblem(problem);
          }}
          className="shrink-0 w-10 h-10 rounded-xl bg-[#1f2635] border border-[#2c364a] text-slate-300 group-hover:text-cyan-400 group-hover:border-cyan-500/40 group-hover:bg-[#252f42] flex items-center justify-center transition-all shadow-xs"
          aria-label="Solve recommended problem"
        >
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};
