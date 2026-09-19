import React from 'react';
import { Check, Flame, BarChart3, Clock } from 'lucide-react';
import type { MetricItem } from '../types';
import { mockMetrics } from '../data/mockDashboardData';

interface MetricCardsProps {
  metrics?: MetricItem[];
}

export const MetricCards: React.FC<MetricCardsProps> = ({ metrics = mockMetrics }) => {
  const renderIcon = (item: MetricItem) => {
    switch (item.icon) {
      case 'check':
        return (
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Check className="w-5 h-5 stroke-[2.5]" />
          </div>
        );
      case 'flame':
        return (
          <div className="w-10 h-10 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400">
            <Flame className="w-5 h-5 fill-orange-400" />
          </div>
        );
      case 'chart':
        return (
          <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <BarChart3 className="w-5 h-5 stroke-[2.5]" />
          </div>
        );
      case 'clock':
        return (
          <div className="w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Clock className="w-5 h-5 stroke-[2.5]" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8">
      {metrics.map((metric) => (
        <div
          key={metric.id}
          className="bg-[#121620] border border-[#1e2533] hover:border-[#273245] rounded-2xl p-5 flex items-center gap-4 transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
        >
          {/* Icon */}
          <div className="shrink-0">{renderIcon(metric)}</div>

          {/* Metric details */}
          <div className="min-w-0">
            <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-none">
              {metric.value}
            </div>
            <div className="text-xs sm:text-sm font-medium text-slate-400 mt-1 whitespace-nowrap">
              {metric.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
