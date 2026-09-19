import React, { useState } from 'react';
import { Bookmark } from 'lucide-react';
import { DifficultyBadge, TagBadge } from '@/components/common/Badge';
import { mockRecentSolves, mockRecommendedList } from '../dashboard/data/mockDashboardData';
import type { ProblemItem } from '../dashboard/types';
import { ProblemModal } from '../dashboard/components/ProblemModal';

export const BookmarksPage: React.FC = () => {
  const [bookmarked] = useState<ProblemItem[]>([
    mockRecentSolves[0], // Two Sum
    mockRecentSolves[2], // Merge Intervals
    mockRecommendedList[0], // Contains Duplicate
  ]);
  const [selectedProblem, setSelectedProblem] = useState<ProblemItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Bookmarks & Saved Problems
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Handy problems saved for quick review before your interviews.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {bookmarked.map((problem) => (
          <div
            key={problem.id}
            onClick={() => {
              setSelectedProblem(problem);
              setIsModalOpen(true);
            }}
            className="bg-[#121620] border border-[#1e2533] hover:border-cyan-500/40 rounded-2xl p-5 flex flex-col justify-between transition-all cursor-pointer group shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <DifficultyBadge difficulty={problem.difficulty} />
                <Bookmark className="w-4 h-4 text-cyan-400 fill-cyan-400/20" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors mb-2">
                {problem.title}
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                Pattern: <span className="text-slate-200 font-medium">{problem.pattern}</span>
              </p>
            </div>

            <div className="flex items-center gap-1.5 flex-wrap pt-3 border-t border-[#1a212e]">
              {problem.tags.map((tag) => (
                <TagBadge key={tag} label={tag} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <ProblemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        problem={selectedProblem}
      />
    </div>
  );
};
