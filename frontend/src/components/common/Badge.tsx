import React from 'react';
import { cn } from '@/utils/cn';

export type DifficultyLevel = 'Easy' | 'Medium' | 'Hard';

interface DifficultyBadgeProps {
  difficulty: DifficultyLevel;
  className?: string;
}

export const DifficultyBadge: React.FC<DifficultyBadgeProps> = ({ difficulty, className }) => {
  const styles: Record<DifficultyLevel, string> = {
    Easy: 'bg-[#0e271a] text-[#4ade80] border-[#18492e]',
    Medium: 'bg-[#291f09] text-[#facc15] border-[#493812]',
    Hard: 'bg-[#2c1117] text-[#fb7185] border-[#4d1f28]',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border tracking-wide',
        styles[difficulty],
        className
      )}
    >
      {difficulty}
    </span>
  );
};

interface TagBadgeProps {
  label: string;
  className?: string;
  onClick?: () => void;
}

export const TagBadge: React.FC<TagBadgeProps> = ({ label, className, onClick }) => {
  return (
    <span
      onClick={onClick}
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#171c26] text-[#94a3b8] border border-[#232b3a] transition-colors',
        onClick && 'cursor-pointer hover:bg-[#1f2633] hover:text-[#cbd5e1] hover:border-[#334155]',
        className
      )}
    >
      {label}
    </span>
  );
};
