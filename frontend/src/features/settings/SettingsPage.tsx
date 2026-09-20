import React, { useState } from 'react';
import { User, Bell, Sliders, Check } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export const SettingsPage: React.FC = () => {
  const { success } = useToast();
  const [name, setName] = useState('Kunal Maurya');
  const [email, setEmail] = useState('akash.sharma@example.com');
  const [dailyTarget, setDailyTarget] = useState('2');
  const [emailDigest, setEmailDigest] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    success('Settings updated successfully!', 'Preferences Saved');
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-3xl animate-in fade-in duration-200">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Settings & Preferences
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Configure your daily targets, profile details, and notifications.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile Details */}
        <div className="bg-[#121620] border border-[#1e2533] rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-base font-bold text-white pb-3 border-b border-[#1c2331]">
            <User className="w-5 h-5 text-cyan-400" />
            <span>Profile Information</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-10 px-3.5 rounded-xl bg-[#171c26] border border-[#232b3a] text-sm text-white focus:outline-hidden focus:border-cyan-500/50"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-10 px-3.5 rounded-xl bg-[#171c26] border border-[#232b3a] text-sm text-white focus:outline-hidden focus:border-cyan-500/50"
              />
            </div>
          </div>
        </div>

        {/* Practice Target */}
        <div className="bg-[#121620] border border-[#1e2533] rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-base font-bold text-white pb-3 border-b border-[#1c2331]">
            <Sliders className="w-5 h-5 text-cyan-400" />
            <span>Daily Practice Goals</span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              Daily Target (problems / day)
            </label>
            <select
              value={dailyTarget}
              onChange={(e) => setDailyTarget(e.target.value)}
              className="w-full sm:w-60 h-10 px-3.5 rounded-xl bg-[#171c26] border border-[#232b3a] text-sm text-white focus:outline-hidden focus:border-cyan-500/50"
            >
              <option value="1">1 problem / day (Gentle)</option>
              <option value="2">2 problems / day (Standard)</option>
              <option value="3">3 problems / day (Accelerated)</option>
              <option value="5">5 problems / day (Hardcore)</option>
            </select>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-[#121620] border border-[#1e2533] rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-base font-bold text-white pb-3 border-b border-[#1c2331]">
            <Bell className="w-5 h-5 text-cyan-400" />
            <span>Notifications</span>
          </div>

          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={emailDigest}
              onChange={(e) => setEmailDigest(e.target.checked)}
              className="w-4 h-4 rounded-sm border-[#232b3a] text-cyan-500 focus:ring-cyan-500/30"
            />
            <span className="text-sm text-slate-300">
              Receive daily streak reminder and weekly pattern mastery recap
            </span>
          </label>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-all shadow-md"
          >
            {saved ? <Check className="w-4 h-4" /> : null}
            <span>{saved ? 'Saved!' : 'Save Preferences'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
