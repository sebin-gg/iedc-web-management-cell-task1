import React, { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import EventsPage from './pages/EventsPage';
import TeamPage from './pages/TeamPage';
import BlogPage from './pages/BlogPage';
import TestimonialsPage from './pages/TestimonialsPage';
import RegistrationsPage from './pages/RegistrationsPage';
import AdminPasswordModal from './components/shared/AdminPasswordModal';

// This component acts as a simple "router"
export default function App() {
  const [view, setView] = useState('home');
  const [theme, setTheme] = useState(() => localStorage.getItem('iedc_theme') || 'light');
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPwdModal, setShowPwdModal] = useState(false);
  const [pwdError, setPwdError] = useState('');

  useEffect(() => {
    // apply class-based dark mode
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('iedc_theme', theme);
  }, [theme]);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const requestAdminAccess = () => {
    // open password modal
    setPwdError('');
    setShowPwdModal(true);
  };

  const verifyAdminPassword = (pw) => {
    // default password (change via localStorage key 'iedc_admin_password')
    const configured = localStorage.getItem('iedc_admin_password') || 'iedc-admin';
    if (pw === configured) {
      setIsAdmin(true);
      setShowPwdModal(false);
      setView('registrations');
      setPwdError('');
      return true;
    } else {
      setPwdError('Invalid password');
      return false;
    }
  };

  const renderView = () => {
    switch (view) {
      case 'home':
        return <HomePage setView={setView} />;
      case 'events':
        return <EventsPage />;
      case 'team':
        return <TeamPage />;
      case 'blog':
        return <BlogPage />;
      case 'testimonials':
        return <TestimonialsPage />;
      case 'registrations':
        // double-check admin
        return isAdmin ? <RegistrationsPage /> : <div className="p-6">Unauthorized — please open Registrations via header and enter admin password.</div>;
      default:
        return <HomePage setView={setView} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-white dark:bg-gray-900 dark:text-white text-black">
      <Header
        setView={setView}
        theme={theme}
        toggleTheme={() => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))}
        requestAdminAccess={requestAdminAccess}
      />
      <main className="flex-grow">
        {renderView()}
      </main>
      <Footer setView={setView} />
      {showPwdModal && (
        <AdminPasswordModal
          onSubmit={verifyAdminPassword}
          onClose={() => setShowPwdModal(false)}
          error={pwdError}
        />
      )}
    </div>
  );
}