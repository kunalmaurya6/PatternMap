import React, { useState } from 'react';
import { GreetingSection } from './components/GreetingSection';
import { MetricCards } from './components/MetricCards';
import { RecentSolves } from './components/RecentSolves';
import { StreakCard } from './components/StreakCard';
import { RecommendedCard } from './components/RecommendedCard';
import { LearningInsight } from './components/LearningInsight';
import { ProblemModal } from './components/ProblemModal';
import { mockRecentSolves, mockMetrics } from './data/mockDashboardData';
import type { ProblemItem } from './types';

export const DashboardPage: React.FC = () => {
  const [problems, setProblems] = useState<ProblemItem[]>(mockRecentSolves);
  const [selectedProblem, setSelectedProblem] = useState<ProblemItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectProblem = (problem: ProblemItem) => {
    setSelectedProblem(problem);
    setIsModalOpen(true);
  };

  const handleToggleSolved = (id: string) => {
    setProblems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, solved: !p.solved } : p))
    );
    if (selectedProblem && selectedProblem.id === id) {
      setSelectedProblem((prev) => (prev ? { ...prev, solved: !prev.solved } : null));
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* 1. Header Greeting & Quote */}
      <GreetingSection />

      {/* 2. 4 Metric stat cards */}
      <MetricCards metrics={mockMetrics} />

      {/* 3. Main Dashboard 2-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (Recent Solves + Learning Insight) */}
        <div className="lg:col-span-8 space-y-6">
          <RecentSolves
            problems={problems}
            onSelectProblem={handleSelectProblem}
          />
          <LearningInsight />
        </div>

        {/* Right Column (Your Streak + Recommended Next) */}
        <div className="lg:col-span-4 space-y-6">
          <StreakCard />
          <RecommendedCard onSelectProblem={handleSelectProblem} />
        </div>
      </div>

      {/* 4. Bottom Right Signature Tagline from screenshot */}
      <div className="flex justify-end pt-4 sm:pt-6 pb-2">
        <div className="text-right select-none group">
          <p className="font-handwriting text-2xl sm:text-3xl text-slate-400 font-semibold tracking-wide group-hover:text-slate-200 transition-colors">
            Better problems. A better you.
          </p>
          <div className="h-0.5 w-36 ml-auto bg-gradient-to-r from-transparent via-slate-500/40 to-slate-400/80 rounded-full mt-0.5" />
        </div>
      </div>

      {/* 5. Problem Detail Modal */}
      <ProblemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        problem={selectedProblem}
        onToggleSolved={handleToggleSolved}
      />
    </div>
  );
};
