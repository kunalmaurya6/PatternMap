import React, { useState } from 'react';
import { Quote as QuoteIcon, RefreshCw } from 'lucide-react';
import { mockQuotes } from '../data/mockDashboardData';

export const GreetingSection: React.FC = () => {
  // const [quoteIndex, setQuoteIndex] = useState(0);

  // Dynamic time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'GOOD MORNING,';
    if (hour < 17) return 'GOOD AFTERNOON,';
    return 'GOOD EVENING,';
  };

  // const handleNextQuote = () => {
  //   setQuoteIndex((prev) => (prev + 1) % mockQuotes.length);
  // };

  const currentQuote = mockQuotes[Math.floor(Math.random() * mockQuotes.length)];

  return (
    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
      {/* Left Greeting Text */}
      <div className="space-y-1.5">
        <span className="text-xs font-bold tracking-widest text-slate-400 uppercase">
          {getGreeting()}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
          <span>Keep going</span>
          <span className="inline-block animate-wave origin-[70%_70%] text-3xl">👋</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-400 font-normal">
          Small consistent steps make you a better problem solver.
        </p>
      </div>

      {/* Right Quote Card matching screenshot */}
      <div className="relative group lg:max-w-md w-full bg-[#121620] border border-[#1d2534] rounded-2xl p-5 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="text-slate-500/60 shrink-0">
            <QuoteIcon className="w-8 h-8 rotate-180 fill-current" />
          </div>
          <div className="flex-1 min-w-0 pr-4">
            <p className="text-sm font-medium text-slate-200 leading-relaxed italic">
              &ldquo;{currentQuote.quote}&rdquo;
            </p>
            <p className="text-xs font-semibold text-slate-400 mt-2 tracking-wide">
              — {currentQuote.author}
            </p>
          </div>
          {/* <button
            onClick={handleNextQuote}
            title="Next quote"
            className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-[#1a212f] transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button> */}
        </div>
      </div>
    </div>
  );
};
