import React from 'react';

const Footer = ({ setView }) => {
  return (
    <footer className="mt-8">
      <div className="container-max">
        <div className="card-adapt p-4 flex items-center justify-between">
          <div>© {new Date().getFullYear()} IEDC BOOTCAMP CEC</div>
          <div className="flex items-center gap-4">
            <button onClick={() => setView && setView('home')} className="text-muted">Home</button>
            <button onClick={() => setView && setView('events')} className="text-muted">Events</button>
            <a href="#" className="text-muted">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;