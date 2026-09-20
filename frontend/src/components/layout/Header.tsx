import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, Menu, User, LogOut, CheckCircle2 } from 'lucide-react';
import { logout } from '@/services/authService';

interface HeaderProps {
  onMenuToggle?: () => void;
  onSearch?: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (onSearch) onSearch(val);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/problems?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-30 h-18 bg-[#0b0e14]/90 backdrop-blur-md border-b border-[#161c26] flex items-center justify-between px-4 sm:px-8">
      {/* Left side: Mobile menu toggle button */}
      <div className="flex items-center gap-3 lg:hidden">
        <button
          onClick={onMenuToggle}
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#151a24] transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <span className="font-bold text-white text-lg lg:hidden">
          Code<span className="text-cyan-400">Pattern</span>
        </span>
      </div>

      {/* Center/Left Spacer on desktop */}
      <div className="hidden lg:block flex-1 max-w-sm" />

      {/* Right side: Search bar & User controls */}
      <div className="flex items-center gap-4 ml-auto">
        {/* Search Bar matching screenshot */}
        <div className="relative w-48 sm:w-72 md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyDown}
            placeholder="Search problems, patterns..."
            className="w-full h-10 pl-10 pr-4 rounded-full bg-[#121620] border border-[#1e2533] text-sm text-slate-200 placeholder-slate-400 focus:outline-hidden focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all"
          />
        </div>

        {/* Notifications Icon with Unread Indicator */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative p-2.5 rounded-full text-slate-400 hover:text-slate-200 hover:bg-[#141923] border border-transparent hover:border-[#1e2533] transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {/* Gold/Orange badge dot from screenshot */}
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
          </button>

          {/* Notifications Dropdown */}
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-[#121620] border border-[#1e2533] rounded-2xl shadow-2xl p-3 z-50 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between px-3 py-2 border-b border-[#1c2331]">
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Notifications
                </span>
                <span className="text-[11px] text-cyan-400 font-medium cursor-pointer hover:underline">
                  Mark all read
                </span>
              </div>
              <div className="divide-y divide-[#171c26] text-sm">
                <div className="p-3 hover:bg-[#171c26] rounded-xl transition-colors cursor-pointer">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Streak Maintained!</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    You solved 2 problems today and hit your 7-day streak milestone.
                  </p>
                  <span className="text-[10px] text-slate-400 mt-1 block">2 hours ago</span>
                </div>
                <div className="p-3 hover:bg-[#171c26] rounded-xl transition-colors cursor-pointer">
                  <span className="text-xs font-semibold text-cyan-400">Pattern Insight Ready</span>
                  <p className="text-xs text-slate-300 mt-1">
                    New recommendations available based on Hash Map mastery.
                  </p>
                  <span className="text-[10px] text-slate-400 mt-1 block">5 hours ago</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar with Initials "AS" */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="w-10 h-10 rounded-full bg-[#1e2532] border border-[#2b3547] text-slate-200 font-bold text-xs flex items-center justify-center hover:border-cyan-500/50 transition-all select-none focus:outline-hidden"
            aria-label="User Profile"
          >
            AS
          </button>

          {/* Profile Dropdown */}
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-[#121620] border border-[#1e2533] rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95">
              <div className="px-3 py-2.5 border-b border-[#1c2331]">
                <p className="text-sm font-semibold text-white">Kunal Maurya</p>
                <p className="text-xs text-slate-400 truncate">akash.sharma@example.com</p>
              </div>
              <div className="py-1">
                <button
                  onClick={() => {
                    navigate('/settings');
                    setProfileOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-[#171c26] rounded-xl transition-colors"
                >
                  <User className="w-4 h-4 text-slate-400" />
                  <span>Profile & Target</span>
                </button>
                <button
                  onClick={async () => {
                    navigate('/auth');
                    setProfileOpen(false);
                    await logout()
                    .then(data=>{
                      console.log(data);
                      
                    });
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-950/20 rounded-xl transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
