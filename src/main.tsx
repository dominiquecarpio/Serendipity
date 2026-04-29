import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const root = createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Wait for React to paint before hiding loader
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.style.display = 'none';
  });
});