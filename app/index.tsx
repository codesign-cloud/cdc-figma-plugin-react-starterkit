/*  This would be the entry point for the React app (Figma Plugin's UI) */
import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './react/App';

document.addEventListener('DOMContentLoaded', function () {
  const container = document.getElementById('react-app-container') || document.body;
  if (container) {
    const root = createRoot(container);
    root.render(<App />);
  }
});
