import React from 'react';
import { BarChart3, TrendingUp, Zap, Target } from 'lucide-react';

export const AnalyticsPage: React.FC = () => {
  const patternStats = [
    { name: 'Hash Map', solved: 8, total: 12, percent: 66 },
    { name: 'Two Pointers', solved: 5, total: 10, percent: 50 },
    { name: 'Sliding Window', solved: 4, total: 8, percent: 50 },
    { name: 'Dynamic Programming', solved: 4, total: 15, percent: 26 },
    { name: 'Graph / DFS', solved: 3, total: 9, percent: 33 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Analytics & Mastery
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Detailed metrics on your problem solving speed, pattern retention, and streak health.
        </p>
      </div>

      {/* Top summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-[#121620] border border-[#1e2533] rounded-2xl p-5">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Completion Rate</span>
            <Target className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-bold text-white">78%</div>
          <p className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +12% from last month
          </p>
        </div>

        <div className="bg-[#121620] border border-[#1e2533] rounded-2xl p-5">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Avg Time / Solve</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-bold text-white">22 min</div>
          <p className="text-xs text-amber-400 mt-1">4m faster than baseline</p>
        </div>

        <div className="bg-[#121620] border border-[#1e2533] rounded-2xl p-5">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Strongest Pattern</span>
            <BarChart3 className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-bold text-cyan-400">Hash Map</div>
          <p className="text-xs text-slate-400 mt-1">8 problems solved cleanly</p>
        </div>
      </div>

      {/* Pattern Progress Bars */}
      <div className="bg-[#121620] border border-[#1e2533] rounded-2xl p-6">
        <h2 className="text-lg font-bold text-white mb-4">Pattern Mastery Breakdown</h2>
        <div className="space-y-4">
          {patternStats.map((item) => (
            <div key={item.name} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs sm:text-sm font-semibold">
                <span className="text-slate-200">{item.name}</span>
                <span className="text-slate-400">
                  {item.solved} / {item.total} solved ({item.percent}%)
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#1c222e] overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
                  style={{ width: `${item.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
