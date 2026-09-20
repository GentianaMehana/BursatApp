// src/App.jsx
import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import ReactGA from 'react-ga4';
import HomePage from './pages/HomePage';
import ScholarshipDetailPage from './pages/ScholarshipDetailPage';
import HowToApply from './pages/HowToApply';
import ScholarshipTips from './pages/ScholarshipTips';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import './index.css';

function RouteChangeTracker() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    const id = import.meta.env.VITE_GA_MEASUREMENT_ID;
    if (id && typeof ReactGA.ga === 'function') {
      ReactGA.send({ hitType: 'pageview', page: pathname + search });
    }
  }, [pathname, search]);
  return null;
}

function App() {
  return (
    <>
      <RouteChangeTracker />
      <div className="min-h-screen bg-[#f7f8fa] dark:bg-[#0d0e12]">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/scholarship/:id" element={<ScholarshipDetailPage />} />
          <Route path="/how-to-apply" element={<HowToApply />} />
          <Route path="/scholarship-tips" element={<ScholarshipTips />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
      </div>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#0f1115',
            color: '#f7f8fa',
            borderRadius: '10px',
            padding: '12px 16px',
            fontSize: '13px',
            fontWeight: '500',
            border: '1px solid #2a2e36',
            boxShadow: '0 16px 40px -12px rgba(15,17,21,0.30)',
          },
          success: { iconTheme: { primary: '#10b981', secondary: '#0f1115' } },
          error:   { iconTheme: { primary: '#ef4444', secondary: '#0f1115' } },
        }}
      />
    </>
  );
}

export default App;