import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { QuotesContextProvider } from './context/QuoteContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <QuotesContextProvider>
      <App />
    </QuotesContextProvider>
  </AuthContextProvider>

);