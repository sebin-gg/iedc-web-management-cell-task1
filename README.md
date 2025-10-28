# IEDC BOOTCAMP CEC

Simple React + Vite project for the IEDC Bootcamp CEC site.

Live demo (Vercel)
- Vercel URL: https://iedc-bootcamp-cec-task1.vercel.app 

Prerequisites
- Node.js (14+)
- npm

Local development
1. Install deps
   npm install
2. Start dev server
   npm run dev
3. Open: http://localhost:3000

Build & deploy
1. Build production assets
   npm run build
2. Preview the production build locally (optional)
   npm run preview
3. Deploy the `dist/` folder with your static host (Netlify, Vercel, GitHub Pages, etc.)
   Use the build command above before uploading — do not deploy source files.

Features
- Responsive event listing with cards and hero section
- Class-based dark mode (persisted to localStorage)
- Register modal that stores submissions in localStorage
- Admin-protected Registrations page (client-side password, export CSV, clear)
- Accessible focus states and keyboard-friendly controls
- Theme and accent colors configurable via CSS variables

Project structure
- src/ — React source (pages, components, styles)
- src/styles/tailwind-custom.css — custom theme variables and dark mode
- public/ — static HTML and assets
- dist/ — production output (created by npm run build)

Notable details
- Default admin password: `iedc-admin` (change via browser console)
  - Example: localStorage.setItem('iedc_admin_password', 'new-pass')
- Registrations stored client-side under key `iedc_event_registrations`
- Accent color and theme vars live in src/styles/tailwind-custom.css

Troubleshooting
- If styles look off, stop the dev server and restart after edits: Ctrl+C → npm run dev
- If dark mode or variables don't apply, ensure `html` receives the `dark` class (app toggles this)

License
MIT
