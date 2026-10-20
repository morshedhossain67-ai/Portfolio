import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/tokens.css';
import './styles/base.css';
import './styles/ui.css';
import './styles/navmore.css';
import './styles/layout.css';
import './styles/hero.css';
import './styles/portrait.css';
import './styles/chart.css';
import './styles/facts.css';
import './styles/sections.css';
import './styles/timeline.css';
import './styles/career.css';
import './styles/administration.css';
import './styles/education.css';
import './styles/publications.css';
import './styles/contact.css';
import './styles/hover.css';
import './styles/admin.css';
import './styles/loader.css';
import { applyInitialTheme } from './hooks/useTheme.js';
import App from './App.jsx';

applyInitialTheme();

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);