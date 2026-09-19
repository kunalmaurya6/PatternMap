import React from 'react';
import { ExternalLink, CheckCircle, Tag, Layers } from 'lucide-react';
import { Modal } from '@/components/common/Modal';
import { DifficultyBadge, TagBadge } from '@/components/common/Badge';
import type { ProblemItem } from '../types';

interface ProblemModalProps {
  problem: ProblemItem | null;
  isOpen: boolean;
  onClose: () => void;
  onToggleSolved?: (problemId: string) => void;
}

export const ProblemModal: React.FC<ProblemModalProps> = ({
  problem,
  isOpen,
  onClose,
  onToggleSolved,
}) => {
  if (!problem) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Problem Details">
      <div className="space-y-6">
        {/* Title and Badges */}
        <div>
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <span className="text-xl font-bold text-white tracking-tight">
              {problem.leetcodeNumber ? `#${problem.leetcodeNumber} ` : ''}
              {problem.title}
            </span>
            <DifficultyBadge difficulty={problem.difficulty} />
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>Pattern: </span>
            <span className="font-semibold text-slate-200">{problem.pattern}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Tag className="w-3.5 h-3.5 text-slate-400" />
            <span>Topics / Data Structures:</span>
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            {problem.tags.map((tag) => (
              <TagBadge key={tag} label={tag} />
            ))}
          </div>
        </div>

        {/* Description */}
        {problem.description && (
          <div className="space-y-1.5">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Problem Summary
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed bg-[#171c26] border border-[#222938] rounded-xl p-4">
              {problem.description}
            </p>
          </div>
        )}

        {/* Approach */}
        {problem.approach && (
          <div className="space-y-1.5">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Pattern & Strategy
            </h4>
            <div className="text-sm text-slate-300 leading-relaxed bg-[#111927] border border-cyan-950/40 rounded-xl p-4">
              {problem.approach}
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-[#1c2331]">
          <a
            href={`https://leetcode.com/problems/${problem.title.toLowerCase().replace(/\s+/g, '-')}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-[#1a2130] text-cyan-400 border border-cyan-500/20 hover:bg-[#202a3d] hover:border-cyan-500/40 transition-all"
          >
            <span>Open on LeetCode</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {onToggleSolved && (
            <button
              onClick={() => onToggleSolved(problem.id)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                problem.solved
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400'
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              <span>{problem.solved ? 'Solved' : 'Mark as Solved'}</span>
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};
