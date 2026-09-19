import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, CheckCircle2, Circle } from 'lucide-react';
import { DifficultyBadge, TagBadge, type DifficultyLevel } from '@/components/common/Badge';
import { mockRecentSolves, mockRecommendedList } from '../dashboard/data/mockDashboardData';
import type { ProblemItem } from '../dashboard/types';
import { ProblemModal } from '../dashboard/components/ProblemModal';

// Combined problem bank for the Problems view
const initialAllProblems: ProblemItem[] = [
  ...mockRecentSolves,
  ...mockRecommendedList,
  {
    id: 'p6',
    title: 'Trapping Rain Water',
    difficulty: 'Hard',
    tags: ['Array', 'Two Pointers', 'Stack'],
    date: 'Oct 24',
    solved: false,
    pattern: 'Two Pointers (Left/Right Max)',
    description: 'Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.',
    approach: 'Maintain left and right max heights while advancing pointers inward.',
    leetcodeNumber: 42,
  },
  {
    id: 'p7',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    tags: ['String', 'Sliding Window', 'Hash Map'],
    date: 'Oct 23',
    solved: true,
    pattern: 'Sliding Window with Set/Map',
    description: 'Given a string s, find the length of the longest substring without duplicate characters.',
    approach: 'Expand right pointer while storing last seen indices; contract left pointer upon duplicates.',
    leetcodeNumber: 3,
  },
];

export const ProblemsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [problems, setProblems] = useState<ProblemItem[]>(initialAllProblems);
  const [search, setSearch] = useState(initialQuery);
  const [selectedDifficulty, setSelectedDifficulty] = useState<'All' | DifficultyLevel>('All');
  const [selectedPattern, setSelectedPattern] = useState<string>('All');
  const [selectedProblem, setSelectedProblem] = useState<ProblemItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Available pattern filters
  const patterns = ['All', 'Hash Map', 'Two Pointers', 'Sliding Window', 'Stack', 'Dynamic Programming', 'Graph'];

  const filteredProblems = problems.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.pattern.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

    const matchesDifficulty =
      selectedDifficulty === 'All' || p.difficulty === selectedDifficulty;

    const matchesPattern =
      selectedPattern === 'All' ||
      p.pattern.toLowerCase().includes(selectedPattern.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(selectedPattern.toLowerCase()));

    return matchesSearch && matchesDifficulty && matchesPattern;
  });

  const handleToggleSolved = (id: string) => {
    setProblems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, solved: !p.solved } : p))
    );
    if (selectedProblem && selectedProblem.id === id) {
      setSelectedProblem((prev) => (prev ? { ...prev, solved: !prev.solved } : null));
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Problems & Patterns
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Master algorithms by pattern rather than memorizing individual solutions.
        </p>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="bg-[#121620] border border-[#1e2533] rounded-2xl p-4 sm:p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search problems, patterns, tags..."
              className="w-full h-10 pl-10 pr-4 rounded-xl bg-[#171c26] border border-[#232b3a] text-sm text-white placeholder-slate-400 focus:outline-hidden focus:border-cyan-500/50 transition-all"
            />
          </div>

          {/* Difficulty Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 bg-[#171c26] border border-[#232b3a] rounded-xl self-start sm:self-auto">
            {(['All', 'Easy', 'Medium', 'Hard'] as const).map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedDifficulty === diff
                    ? 'bg-[#222938] text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>

        {/* Pattern tags scrollable row */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-400 shrink-0 font-medium flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Pattern:
          </span>
          {patterns.map((pat) => (
            <button
              key={pat}
              onClick={() => setSelectedPattern(pat)}
              className={`px-3 py-1 rounded-full whitespace-nowrap transition-all border ${
                selectedPattern === pat
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 font-semibold'
                  : 'bg-[#171c26] text-slate-400 border-[#232b3a] hover:text-slate-200'
              }`}
            >
              {pat}
            </button>
          ))}
        </div>
      </div>

      {/* Problems List */}
      <div className="bg-[#121620] border border-[#1e2533] rounded-2xl p-4 sm:p-6 space-y-2">
        <div className="flex items-center justify-between pb-3 border-b border-[#1c2331] text-xs font-semibold text-slate-400 uppercase tracking-wider px-3">
          <span>Problem</span>
          <span>Details</span>
        </div>

        {filteredProblems.length === 0 ? (
          <div className="py-12 text-center text-slate-400">
            No problems found matching your filters.
          </div>
        ) : (
          filteredProblems.map((problem) => (
            <div
              key={problem.id}
              onClick={() => {
                setSelectedProblem(problem);
                setIsModalOpen(true);
              }}
              className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 p-3 sm:px-4 sm:py-3.5 rounded-xl hover:bg-[#161c28] border border-transparent hover:border-[#222b3c] transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleSolved(problem.id);
                  }}
                  className="shrink-0"
                >
                  {problem.solved ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-500/20" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-500 hover:text-cyan-400" />
                  )}
                </button>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm sm:text-base font-semibold text-white group-hover:text-cyan-400 transition-colors">
                      {problem.title}
                    </span>
                    <DifficultyBadge difficulty={problem.difficulty} />
                  </div>
                  <span className="text-xs text-slate-400 block mt-0.5">
                    Pattern: <span className="text-slate-300 font-medium">{problem.pattern}</span>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 flex-wrap">
                {problem.tags.map((tag) => (
                  <TagBadge key={tag} label={tag} />
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      <ProblemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        problem={selectedProblem}
        onToggleSolved={handleToggleSolved}
      />
    </div>
  );
};
