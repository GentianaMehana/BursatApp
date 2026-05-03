import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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

// Komponenti për të gjurmuar ndryshimet e faqes
function RouteChangeTracker() {
  const location = useLocation();

  useEffect(() => {
    // Dërgo pageview sa herë që ndryshon rruga
    if (typeof ReactGA.ga === 'function') {
      ReactGA.send({ 
        hitType: "pageview", 
        page: location.pathname + location.search 
      });
      console.log(`📊 Pageview sent: ${location.pathname}`);
    }
  }, [location]);

  return null;
}

function App() {
  return (
    <Router>
      <RouteChangeTracker />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/scholarship/:id" element={<ScholarshipDetailPage />} />
          <Route path="/how-to-apply" element={<HowToApply />} />
          <Route path="/scholarship-tips" element={<ScholarshipTips />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
              borderRadius: '12px',
              padding: '16px',
            },
            success: {
              iconTheme: {
                primary: '#10B981',
                secondary: '#fff',
              },
              style: {
                background: '#059669',
              },
            },
            error: {
              iconTheme: {
                primary: '#EF4444',
                secondary: '#fff',
              },
              style: {
                background: '#DC2626',
              },
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;