import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { LanguageProvider } from './i18n/LanguageContext.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode><ErrorBoundary><BrowserRouter><LanguageProvider><App /></LanguageProvider></BrowserRouter></ErrorBoundary></React.StrictMode>
);
