// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { CsrfTokenProvider } from './components/CsrfTokenContext';

const rootElement = document.getElementById('root');

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <CsrfTokenProvider>
        <App />
      </CsrfTokenProvider>
    </BrowserRouter>
  </React.StrictMode>
);
