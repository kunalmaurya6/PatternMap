import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Code2,
  ChevronDown,
  CheckCircle2,
  MessageSquare,
  Bookmark,
  Zap,
  Sparkles,
  BarChart3,
  Clock,
  Cpu,
  Layers,
  X,
  Copy,
  Check,
} from "lucide-react";
import IDE from "./IDE";
import { submitAnalytics } from "@/services/analytics";

interface LanguageOption {
  id: string;
  name: string;
  fileName: string;
  boilerplate: string;
}

const languages: LanguageOption[] = [
  {
    id: "typescript",
    name: "TypeScript 5.3",
    fileName: "solution.ts",
    boilerplate: `function twoSum(nums: number[], target: number): number[] {
    const lookupMap = new Map<number, number>();

    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (lookupMap.has(complement)) {
            return [lookupMap.get(complement)!, i];
        }
        lookupMap.set(nums[i], i);
    }

    return [];
}`,
  },
  {
    id: "python",
    name: "Python 3.11",
    fileName: "solution.py",
    boilerplate: `from typing import List, Dict

class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        # Hash map to store index of seen values: value -> index
        lookup_map: Dict[int, int] = {}

        for current_idx, num in enumerate(nums):
            complement = target - num
            if complement in lookup_map:
                return [lookup_map[complement], current_idx]
            lookup_map[num] = current_idx

        # Guarantee by problem description: exactly one valid solution exists
        return []

# Time Complexity: O(N) | Space Complexity: O(N)
__all__ = ["Solution"]`,
  },
  {
    id: "javascript",
    name: "JavaScript (Node 20)",
    fileName: "solution.js",
    boilerplate: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    const lookupMap = new Map();

    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (lookupMap.has(complement)) {
            return [lookupMap.get(complement), i];
        }
        lookupMap.set(nums[i], i);
    }

    return [];
};`,
  },
  {
    id: "cpp",
    name: "C++ 20",
    fileName: "solution.cpp",
    boilerplate: `#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> lookup_map;
        for (int i = 0; i < (int)nums.size(); ++i) {
            int complement = target - nums[i];
            if (lookup_map.count(complement)) {
                return {lookup_map[complement], i};
            }
            lookup_map[nums[i]] = i;
        }
        return {};
    }
};`,
  },
  {
    id: "java",
    name: "Java 21",
    fileName: "Solution.java",
    boilerplate: `import java.util.HashMap;
import java.util.Map;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> lookupMap = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (lookupMap.containsKey(complement)) {
                return new int[] { lookupMap.get(complement), i };
            }
            lookupMap.put(nums[i], i);
        }
        return new int[0];
    }
}`,
  },
];

export const CheckAnalyticsPage: React.FC = () => {
  const [selectedLang, setSelectedLang] = useState<LanguageOption>(
    languages[0],
  );
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [data, setData] = useState<string>(selectedLang.boilerplate);
  const [promptText, setPromptText] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSaved, setLastSaved] = useState("Auto-saved");
  const [analysisModalOpen, setAnalysisModalOpen] = useState(false);

  const handleLanguageSelect = (lang: LanguageOption) => {
    setSelectedLang(lang);
    setData(lang.boilerplate);
    setLangMenuOpen(false);
  };

  const handleSubmit = () => {
    // setIsSubmitting(true);
    // setTimeout(() => {
    //   setIsSubmitting(false);
    //   setAnalysisModalOpen(true);
    // }, 1000);
    // handleReset();
    // return;
    if (!data || data.length < 10) {
      alert("Write somthing");
      return;
    }
    submitAnalytics({ data, language: selectedLang.id, prompt: promptText });
  };

  const handleReset = () => {
    setData("");
    setPromptText("");
  };

  return (
    <div className="space-y-2 animate-in fade-in duration-200 pb-12">
      {/* 1. Breadcrumbs */}

      {/* 2. Page Title & Language Selector Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Submit Code & Prompt
          </h1>
        </div>

        {/* Language dropdown button */}
        <div className="relative self-start sm:self-auto">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">
              Language:
            </span>
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#141a24] hover:bg-[#1a2230] border border-[#232c3d] text-xs font-semibold text-white transition-all shadow-xs"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>{selectedLang.name}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>

          {/* Language Menu */}
          {langMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-xl bg-[#121722] border border-[#222b3b] shadow-2xl py-1.5 z-50 animate-in fade-in zoom-in-95">
              {languages.map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => handleLanguageSelect(lang)}
                  className={`w-full flex items-center justify-between px-3.5 py-2 text-xs font-medium transition-colors ${
                    selectedLang.id === lang.id
                      ? "bg-cyan-500/15 text-cyan-400 font-semibold"
                      : "text-slate-300 hover:text-white hover:bg-[#182030]"
                  }`}
                >
                  <span>{lang.name}</span>
                  {selectedLang.id === lang.id && (
                    <Check className="w-3.5 h-3.5 text-cyan-400" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Code Editor Body */}
      <IDE selectedLang={{ ...selectedLang, setData, data }} />

      {/* 4. Prompt & Instructions Section */}
      <div className="rounded-2xl border border-[#1b2230] bg-[#0c1017] p-5 space-y-3 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm sm:text-base font-semibold text-white">
              Prompt & Instructions
            </h3>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#161d2a] text-slate-400 border border-[#222b3a]">
            Optional
          </span>
        </div>

        <textarea
          rows={3}
          value={promptText}
          onChange={(e) => setPromptText(e.target.value)}
          placeholder="Enter optional instructions, context, or prompt for this code..."
          className="w-full p-3.5 rounded-xl bg-[#090d14] border border-[#1b2333] text-sm text-slate-200 placeholder-slate-500 focus:outline-hidden focus:border-cyan-500/50 transition-all resize-y"
        />
      </div>

      {/* 5. Bottom Action Buttons */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 active:bg-cyan-500 text-slate-950 font-bold text-sm transition-all shadow-md hover:shadow-cyan-500/25 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <Zap className="w-4 h-4 fill-slate-950" />
          <span>{isSubmitting ? "Analyzing..." : "Submit Solution"}</span>
        </button>
      </div>

      {/* 6. Submission & Check Analytics Modal */}
      {analysisModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-[#0e131d] border border-cyan-500/30 rounded-2xl shadow-2xl p-6 space-y-6 animate-in zoom-in-95">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#1a2232]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    Check Analytics Report
                  </h3>
                  <p className="text-xs text-slate-400">
                    Submission Evaluation & Pattern Analysis
                  </p>
                </div>
              </div>
              <button
                onClick={() => setAnalysisModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#18202e] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Verdict summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-[#121824] border border-[#1e2738] rounded-xl p-3.5">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                  Pattern Detected
                </span>
                <span className="text-base font-bold text-cyan-400 flex items-center gap-1.5">
                  <Layers className="w-4 h-4" /> Hash Map
                </span>
              </div>

              <div className="bg-[#121824] border border-[#1e2738] rounded-xl p-3.5">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                  Time Complexity
                </span>
                <span className="text-base font-bold text-emerald-400 flex items-center gap-1.5">
                  <Clock className="w-4 h-4" /> O(N) Optimal
                </span>
              </div>

              <div className="bg-[#121824] border border-[#1e2738] rounded-xl p-3.5">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                  Space Complexity
                </span>
                <span className="text-base font-bold text-amber-400 flex items-center gap-1.5">
                  <Cpu className="w-4 h-4" /> O(N)
                </span>
              </div>
            </div>

            {/* AI Review & Insights */}
            <div className="bg-[#121824] border border-[#1e2738] rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                <span className="flex items-center gap-1.5 text-cyan-400">
                  <BarChart3 className="w-4 h-4" /> Algorithmic Feedback
                </span>
                <span className="text-emerald-400">Score: 98 / 100</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Great job! You achieved linear time complexity by using a hash
                map for constant time complement lookups. The solution handles
                negative integers and duplicate values accurately.
              </p>
              {promptText && (
                <div className="mt-2 pt-2 border-t border-[#1a2232] text-xs text-slate-400">
                  <span className="text-slate-300 font-medium">
                    Your prompt context:{" "}
                  </span>
                  &ldquo;{promptText}&rdquo;
                </div>
              )}
            </div>

            {/* Footer close button */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setAnalysisModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs sm:text-sm transition-all"
              >
                Close & Return
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
