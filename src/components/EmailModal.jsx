// src/components/EmailModal.jsx
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const EmailModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // ============================================
  // KONSTANTAT - Supabase credentials
  // ============================================
  const SUPABASE_URL = 'https://xmwqdnlfcptzqqhayfkd.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhtd3FkbmxmY3B0enFxaGF5ZmtkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3ODc2MjksImV4cCI6MjA5MDM2MzYyOX0.buOmnTN1k2s438e_XGskGO4mLHB_127dXgHpsFTvz0c';

  // ============================================
  // FUNKSIONI PËR TË KONTROLLUAR ABONIMIN
  // ============================================
  const checkSubscription = async (emailToCheck) => {
    try {
      const response = await fetch(
        `${SUPABASE_URL}/rest/v1/email_subscriptions?email=eq.${encodeURIComponent(emailToCheck)}&select=email,is_active`,
        {
          method: 'GET',
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (!response.ok) {
        console.error('Fetch error:', response.status);
        return { exists: false, isActive: false };
      }
      
      const data = await response.json();
      console.log('Check result:', data);
      
      if (data && data.length > 0) {
        return { exists: true, isActive: data[0].is_active === true };
      }
      
      return { exists: false, isActive: false };
      
    } catch (error) {
      console.error('Error checking subscription:', error);
      return { exists: false, isActive: false };
    }
  };

  // ============================================
  // FUNKSIONI PËR TË RIAKTIVUAR ABONIMIN
  // ============================================
  const reactivateSubscription = async (emailToReactivate) => {
    const unsubscribeToken = Math.random().toString(36).substring(2, 15) + 
                           Math.random().toString(36).substring(2, 15);
    
    try {
      const response = await fetch(
        `${SUPABASE_URL}/rest/v1/email_subscriptions?email=eq.${encodeURIComponent(emailToReactivate)}`,
        {
          method: 'PATCH',
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal'
          },
          body: JSON.stringify({
            is_active: true,
            unsubscribe_token: unsubscribeToken,
            updated_at: new Date().toISOString()
          })
        }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      return true;
    } catch (error) {
      console.error('Error reactivating:', error);
      return false;
    }
  };

  // ============================================
  // FUNKSIONI PËR REGJISTRIM TË RI
  // ============================================
  const createSubscription = async (emailToSubscribe) => {
    const unsubscribeToken = Math.random().toString(36).substring(2, 15) + 
                           Math.random().toString(36).substring(2, 15);
    
    try {
      const response = await fetch(
        `${SUPABASE_URL}/rest/v1/email_subscriptions`,
        {
          method: 'POST',
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal'
          },
          body: JSON.stringify({
            email: emailToSubscribe.toLowerCase(),
            is_active: true,
            unsubscribe_token: unsubscribeToken,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
        }
      );
      
      if (response.status === 201 || response.status === 200) {
        return true;
      }
      
      if (response.status === 409) {
        // Konflikt - emaili ekziston, provo ta riaktivizosh
        return await reactivateSubscription(emailToSubscribe);
      }
      
      const errorText = await response.text();
      console.error('Insert error:', errorText);
      return false;
      
    } catch (error) {
      console.error('Error creating subscription:', error);
      return false;
    }
  };

  // ============================================
  // FUNKSIONI KRYESOR PËR SUBMIT
  // ============================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Invalid email address');
      return;
    }

    setLoading(true);

    try {
      // Kontrollo nëse emaili ekziston
      const { exists, isActive } = await checkSubscription(email.toLowerCase());
      
      if (exists) {
        if (isActive) {
          toast.error('This email is already subscribed! You will receive notifications.');
          setLoading(false);
          return;
        } else {
          // RIAKTIVO - ishte i çabonuar
          const success = await reactivateSubscription(email.toLowerCase());
          if (success) {
            toast.success('✅ Successfully re-subscribed to notifications!');
            localStorage.setItem('emailSubscribed', 'true');
            setEmail('');
            onClose();
          } else {
            toast.error('Something went wrong. Please try again.');
          }
          setLoading(false);
          return;
        }
      }
      
      // Krijo abonim të ri
      const success = await createSubscription(email.toLowerCase());
      
      if (success) {
        toast.success('✅ Successfully subscribed to notifications!');
        localStorage.setItem('emailSubscribed', 'true');
        setEmail('');
        onClose();
      } else {
        toast.error('Something went wrong. Please try again.');
      }
      
    } catch (error) {
      console.error('Subscription error:', error);
      toast.error('Something went wrong. Please try again.');
    }
    
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-all duration-300"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-md w-full mx-auto overflow-hidden transform transition-all duration-300 animate-slide-up">
        
        {/* Decorative top gradient */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 z-10"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="p-8">
          {/* Icon with pulsing animation */}
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-blue-400 rounded-full blur-xl opacity-30 animate-pulse"></div>
            <div className="relative w-24 h-24 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto shadow-xl transform rotate-3 hover:rotate-6 transition-transform duration-300">
              <span className="text-5xl">📧</span>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-2">
            Never Miss a <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Scholarship</span>!
          </h2>
          <p className="text-center text-gray-500 dark:text-gray-400 text-sm mb-6">
            Get instant email notifications when new scholarships are added.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                disabled={loading}
                autoFocus
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="relative w-full py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 shadow-lg overflow-hidden group"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    <span>Subscribing...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    <span>Subscribe to Notifications</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </span>
            </button>
          </form>

          {/* Feature list */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Instant alerts</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>No spam</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Free service</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Unsubscribe anytime</span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
            <p className="text-xs text-center text-gray-400 dark:text-gray-500">
              🔒 We respect your privacy. Your email is safe with us.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailModal;