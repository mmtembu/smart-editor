// Entry: src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');

if (rootElement !== null) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
      <App />
  );
}