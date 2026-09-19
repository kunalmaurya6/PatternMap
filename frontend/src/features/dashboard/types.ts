import type { DifficultyLevel } from '@/components/common/Badge';

export interface ProblemItem {
  id: string;
  title: string;
  difficulty: DifficultyLevel;
  tags: string[];
  date: string;
  solved: boolean;
  pattern: string;
  description?: string;
  approach?: string;
  leetcodeNumber?: number;
}

export interface MetricItem {
  id: string;
  label: string;
  value: string;
  icon: 'check' | 'flame' | 'chart' | 'clock';
  color: 'green' | 'orange' | 'blue' | 'purple';
}

export interface StreakDay {
  day: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';
  active: boolean;
}

export interface QuoteItem {
  quote: string;
  author: string;
}

export interface LearningInsightItem {
  title: string;
  content: string;
}
