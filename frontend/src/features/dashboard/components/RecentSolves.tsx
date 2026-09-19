import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DifficultyBadge, TagBadge } from '@/components/common/Badge';
import type { ProblemItem } from '../types';

interface RecentSolvesProps {
  problems: ProblemItem[];
  onSelectProblem: (problem: ProblemItem) => void;
}

export const RecentSolves: React.FC<RecentSolvesProps> = ({
  problems,
  onSelectProblem,
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#121620] border border-[#1e2533] rounded-2xl p-6 shadow-sm">
      {/* Card Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
          Recent Solves
        </h2>
        <button
          onClick={() => navigate('/problems')}
          className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <span>View all</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Problem Rows */}
      <div className="space-y-2.5">
        {problems.map((problem) => (
          <div
            key={problem.id}
            onClick={() => onSelectProblem(problem)}
            className="group flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 p-3 sm:px-4 sm:py-3.5 rounded-xl hover:bg-[#161c28] border border-transparent hover:border-[#222b3c] transition-all cursor-pointer select-none"
          >
            {/* Left side: status & title */}
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="text-emerald-400 shrink-0">
                <CheckCircle2 className="w-4.5 h-4.5 fill-emerald-500/20 stroke-[2.2]" />
              </div>
              <span className="text-sm sm:text-[15px] font-semibold text-slate-100 group-hover:text-cyan-400 transition-colors truncate">
                {problem.title}
              </span>
            </div>

            {/* Middle: Difficulty badge & Tags */}
            <div className="flex items-center gap-2 flex-wrap shrink-0">
              <DifficultyBadge difficulty={problem.difficulty} />
              <div className="flex items-center gap-1.5 flex-wrap">
                {problem.tags.map((tag) => (
                  <TagBadge key={tag} label={tag} />
                ))}
              </div>
            </div>

            {/* Right: Date */}
            <div className="text-xs font-medium text-slate-400 shrink-0 w-16 text-right">
              {problem.date}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
