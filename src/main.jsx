import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import App from './App';
import ReactGA from 'react-ga4';
import './index.css';

// ============================================
// 1. GDPR Consent (Pëlqimi për cookie)
// ============================================
const checkGDPRConsent = () => {
  const consent = localStorage.getItem('ga_consent');
  if (consent === 'accepted') return true;
  if (consent === 'rejected') return false;
  
  // Nëse është testim lokal, mos pyet
  if (import.meta.env.DEV) return true;
  
  const userConsent = window.confirm(
    'This website uses Google Analytics to analyze traffic and improve user experience. Do you accept?'
  );
  localStorage.setItem('ga_consent', userConsent ? 'accepted' : 'rejected');
  return userConsent;
};

// ============================================
// 2. Page Tracking Component
// ============================================
const TrackPageViews = () => {
  const location = useLocation();
  
  useEffect(() => {
    const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
    if (GA_MEASUREMENT_ID && checkGDPRConsent()) {
      ReactGA.send({ 
        hitType: "pageview", 
        page: location.pathname + location.search,
        title: document.title 
      });
      console.log(`📊 Pageview sent: ${location.pathname}`);
    }
  }, [location]);
  
  return null;
};

// ============================================
// 3. Helper functions për evente
// ============================================
export const trackEvent = (category, action, label = null, value = null) => {
  const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (GA_MEASUREMENT_ID && checkGDPRConsent()) {
    ReactGA.event({ category, action, label, value });
  }
};

// Evente specifike
export const trackScholarshipView = (title, source) => {
  trackEvent('Scholarship', 'View Details', title, 1);
};

export const trackSubscription = (email) => {
  trackEvent('User', 'Subscribe', 'Email Subscription', 1);
};

export const trackFilter = (filterType, filterValue) => {
  trackEvent('Search', 'Apply Filter', `${filterType}: ${filterValue}`);
};

export const trackSearch = (searchTerm, resultsCount) => {
  trackEvent('Search', 'Search', searchTerm, resultsCount);
};

// ============================================
// 4. Inicializimi
// ============================================
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
const userAccepted = checkGDPRConsent();

if (GA_MEASUREMENT_ID && userAccepted) {
  ReactGA.initialize(GA_MEASUREMENT_ID);
  console.log('📊 Google Analytics initialized with ID:', GA_MEASUREMENT_ID);
} else if (GA_MEASUREMENT_ID && !userAccepted) {
  console.log('🔒 Google Analytics not initialized: User declined consent');
} else {
  console.log('⚠️ Google Analytics not initialized: No Measurement ID found');
}

// ============================================
// 5. Render-i i aplikacionit
// ============================================
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <TrackPageViews />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);