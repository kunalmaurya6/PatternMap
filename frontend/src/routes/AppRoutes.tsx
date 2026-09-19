import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { DashboardPage } from '@/features/dashboard/DashboardPage';
import { ProblemsPage } from '@/features/problems/ProblemsPage';
import { AnalyticsPage } from '@/features/analytics/AnalyticsPage';
import { NotesPage } from '@/features/notes/NotesPage';
import { BookmarksPage } from '@/features/bookmarks/BookmarksPage';
import { SettingsPage } from '@/features/settings/SettingsPage';
import { AuthPage } from '@/features/auth/AuthPage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Standalone Authentication Route */}
      <Route path="/auth" element={<AuthPage />} />

      {/* Main App Layout Shell with Sidebar & Header */}
      <Route path="/" element={<AppLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="problems" element={<ProblemsPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="notes" element={<NotesPage />} />
        <Route path="bookmarks" element={<BookmarksPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
