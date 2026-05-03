import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ReactGA from 'react-ga4';
import './index.css';

// Merre Measurement ID-në nga variablat e ambientit
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

// Inicializo Google Analytics vetëm nëse ID-ja ekziston
if (GA_MEASUREMENT_ID) {
  // Për testim lokal, aktivizo edhe këtu
  // Për produksion, shto edhe kushtin: && import.meta.env.PROD
  ReactGA.initialize(GA_MEASUREMENT_ID);
  console.log('📊 Google Analytics initialized with ID:', GA_MEASUREMENT_ID);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);