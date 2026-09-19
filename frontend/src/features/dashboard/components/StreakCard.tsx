import React from 'react';
import type { StreakDay } from '../types';
import { mockStreakDays } from '../data/mockDashboardData';

interface StreakCardProps {
  days?: StreakDay[];
  streakCount?: number;
}

export const StreakCard: React.FC<StreakCardProps> = ({
  days = mockStreakDays,
  streakCount = 7,
}) => {
  return (
    <div className="bg-[#121620] border border-[#1e2533] rounded-2xl p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
          Your Streak
        </h2>
        <span className="text-base sm:text-lg font-bold text-cyan-400">
          {streakCount} days
        </span>
      </div>

      {/* Weekday Circles Indicator */}
      <div className="flex items-center justify-between gap-1 sm:gap-2 py-2 mb-4">
        {days.map((d) => (
          <div key={d.day} className="flex flex-col items-center gap-2.5">
            <span className="text-xs font-semibold text-slate-400 select-none">
              {d.day}
            </span>
            <div
              className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full transition-all ${
                d.active
                  ? 'bg-[#22c55e] shadow-[0_0_10px_rgba(34,197,94,0.6)]'
                  : 'border-2 border-[#2b3547] bg-transparent'
              }`}
            />
          </div>
        ))}
      </div>

      {/* Encouragement message */}
      <p className="text-xs sm:text-sm font-medium text-slate-400">
        You&apos;re on fire! Keep it up.
      </p>
    </div>
  );
};
