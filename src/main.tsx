import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // Tailwind 스타일 포함
import App from './components/App'; // App 컴포넌트 불러오기

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
