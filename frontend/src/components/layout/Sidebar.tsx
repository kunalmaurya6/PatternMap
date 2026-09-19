import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Home,
  FileText,
  BarChart2,
  BookOpen,
  Bookmark,
  Settings,
  Code2,
  X,
} from 'lucide-react';
import { cn } from '@/utils/cn';

interface SidebarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

interface NavItem {
  label: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { label: 'Home', path: '/', icon: Home },
  { label: 'Problems', path: '/problems', icon: FileText },
  { label: 'Analytics', path: '/analytics', icon: BarChart2 },
  { label: 'Notes', path: '/notes', icon: BookOpen },
  { label: 'Bookmarks', path: '/bookmarks', icon: Bookmark },
];

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, onMobileClose }) => {
  const navigate = useNavigate();

  const handleNavClick = (path: string) => {
    navigate(path);
    if (onMobileClose) onMobileClose();
  };

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-xs lg:hidden"
          onClick={onMobileClose}
        />
      )}

      <aside
        className={cn(
          'fixed top-0 left-0 bottom-0 z-40 w-64 bg-[#0d1017] border-r border-[#1a202c] flex flex-col justify-between transition-transform duration-200 lg:translate-x-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Top Header Logo */}
        <div>
          <div className="flex items-center justify-between h-18 px-6 border-b border-[#161c26]">
            <div
              onClick={() => handleNavClick('/')}
              className="flex items-center gap-3 cursor-pointer group select-none"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-indigo-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-inner group-hover:border-cyan-400/50 transition-colors">
                <Code2 className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="flex items-baseline font-bold tracking-tight text-xl">
                <span className="text-white">Code</span>
                <span className="text-cyan-400 ml-0.5">Pattern</span>
              </div>
            </div>

            {/* Mobile close button */}
            {onMobileClose && (
              <button
                onClick={onMobileClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#161c26] lg:hidden"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Main Navigation links */}
          <nav className="p-4 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => onMobileClose && onMobileClose()}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 select-none',
                      isActive
                        ? 'bg-[#1b222e] text-white shadow-xs font-semibold'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-[#131822]'
                    )
                  }
                >
                  <Icon className="w-4.5 h-4.5 shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section - Settings */}
        <div className="p-4 border-t border-[#161c26]">
          <NavLink
            to="/settings"
            onClick={() => onMobileClose && onMobileClose()}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-colors select-none',
                isActive
                  ? 'bg-[#1b222e] text-white font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-[#131822]'
              )
            }
          >
            <Settings className="w-4.5 h-4.5 shrink-0" />
            <span>Settings</span>
          </NavLink>
        </div>
      </aside>
    </>
  );
};
