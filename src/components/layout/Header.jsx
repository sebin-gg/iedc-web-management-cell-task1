import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../Ui/ButtonComponents';

const Header = ({ setView, theme, toggleTheme, requestAdminAccess }) => {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY || window.pageYOffset;
      const delta = y - lastY.current;
      // only hide after some scroll and when content is scrolled down
      if (y > 80 && delta > 8) {
        setHidden(true);
      } else if (delta < -8 || y < 80) {
        setHidden(false);
      }
      lastY.current = y;
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { key: 'home', label: 'Home' },
    { key: 'events', label: 'Events' },
    { key: 'team', label: 'Team' },
    { key: 'blog', label: 'Blog' },
    { key: 'testimonials', label: 'Testimonials' },
  ];

  return (
    <header className={`header-wrapper ${hidden ? 'header-hidden' : ''} py-3`}>
      <div className="container-max header-inner">
        <div style={{display:'flex',alignItems:'center',gap:'1rem'}}>
          <div className="title-bar" role="button" onClick={() => { setView('home'); setOpen(false); }}>
            <strong>IEDC BOOTCAMP CEC</strong>
          </div>

          <nav className="hidden md:flex items-center space-x-3">
            {navItems.map(i => (
              <Button key={i.key} variant="link" onClick={() => setView(i.key)}>{i.label}</Button>
            ))}
          </nav>
        </div>

        <div style={{display:'flex',alignItems:'center',gap:'0.5rem'}}>
          <button
            onClick={toggleTheme}
            title="Toggle theme"
            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '🌙' : '☀️'}
          </button>

          <div className="hidden md:block">
            <button className="btn-accent" onClick={() => setView('events')}>Register</button>
          </div>

          {/* Registrations must be visible — use link variant (accent color) */}
          <Button variant="link" onClick={requestAdminAccess}>Registrations</Button>

          <button className="md:hidden p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gray-700 dark:text-gray-200">
              <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden container-max mt-2">
          <div className="bg-[var(--card-bg)] border p-3 rounded shadow-sm">
            {navItems.map(i => (
              <button key={i.key} className="w-full text-left p-2 rounded text-[var(--text-color)] dark:text-[var(--text-color)] hover:bg-gray-50 dark:hover:bg-gray-800" onClick={() => { setView(i.key); setOpen(false); }}>
                {i.label}
              </button>
            ))}
            <button className="w-full text-left p-2 rounded text-[var(--accent)] hover:bg-gray-50 dark:hover:bg-gray-800" onClick={() => { requestAdminAccess(); setOpen(false); }}>
              Registrations
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;