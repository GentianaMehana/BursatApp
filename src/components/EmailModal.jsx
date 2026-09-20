// src/components/EmailModal.jsx
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import ReactGA from 'react-ga4';
import { X, Loader2, ArrowRight, Check } from 'lucide-react';

const SUPABASE_URL = 'https://xmwqdnlfcptzqqhayfkd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhtd3FkbmxmY3B0enFxaGF5ZmtkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3ODc2MjksImV4cCI6MjA5MDM2MzYyOX0.buOmnTN1k2s438e_XGskGO4mLHB_127dXgHpsFTvz0c';

const EmailModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const checkSubscription = async (e) => {
    try {
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/email_subscriptions?email=eq.${encodeURIComponent(e)}&select=email,is_active`,
        { headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` } }
      );
      if (!res.ok) return { exists: false, isActive: false };
      const data = await res.json();
      return data.length > 0
        ? { exists: true, isActive: data[0].is_active === true }
        : { exists: false, isActive: false };
    } catch { return { exists: false, isActive: false }; }
  };

  const patchSubscription = async (e) => {
    const token = Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/email_subscriptions?email=eq.${encodeURIComponent(e)}`,
      {
        method: 'PATCH',
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({
          is_active: true,
          unsubscribe_token: token,
          updated_at: new Date().toISOString(),
        }),
      }
    );
    return res.ok;
  };

  const createSubscription = async (e) => {
    const token = Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
    const res = await fetch(`${SUPABASE_URL}/rest/v1/email_subscriptions`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({
        email: e.toLowerCase(),
        is_active: true,
        unsubscribe_token: token,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }),
    });
    if (res.status === 201 || res.status === 200) return true;
    if (res.status === 409) return patchSubscription(e);
    return false;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!email) return toast.error('Please enter your email');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return toast.error('Invalid email address');

    setLoading(true);
    try {
      const { exists, isActive } = await checkSubscription(email.toLowerCase());
      if (exists && isActive) {
        toast.error('This email is already subscribed');
      } else if (exists) {
        const ok = await patchSubscription(email.toLowerCase());
        if (ok) {
          ReactGA.event({ category: 'User', action: 'Reactivate Subscription', value: 1 });
          toast.success('Welcome back — notifications re-enabled');
          localStorage.setItem('emailSubscribed', 'true');
          setEmail(''); onClose();
        } else toast.error('Something went wrong');
      } else {
        const ok = await createSubscription(email);
        if (ok) {
          ReactGA.event({ category: 'User', action: 'generate_lead', label: 'Email Subscription', value: 1 });
          toast.success('You are subscribed');
          localStorage.setItem('emailSubscribed', 'true');
          setEmail(''); onClose();
        } else toast.error('Something went wrong');
      }
    } catch { toast.error('Something went wrong'); }
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#0f1115]/60 backdrop-blur-sm animate-fade-in" onClick={onClose} />

      <div className="relative bg-white dark:bg-[#0d0e12] rounded-3xl max-w-md w-full overflow-hidden animate-scale-in border border-[#e4e6eb] dark:border-[#1e2026] shadow-[0_24px_80px_-20px_rgba(15,17,21,0.35)]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-[#8a929f] hover:text-[#0f1115] hover:bg-[#f2f3f5] dark:hover:bg-[#1a1c22] dark:hover:text-[#f7f8fa] transition-colors z-10"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-8 pt-10">
          <div className="mb-6">
            <div className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-[0.15em] mb-3">
              Notifications
            </div>
            <h2 className="text-2xl font-bold text-[#0f1115] dark:text-[#f7f8fa] tracking-[-0.02em] leading-tight mb-2 text-balance">
              Never miss a scholarship.
            </h2>
            <p className="text-sm text-[#6a7280] dark:text-[#5a6270] leading-relaxed">
              New opportunities, delivered to your inbox. No noise, no spam.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              disabled={loading}
              autoFocus
              className="w-full px-4 py-3.5 rounded-xl border border-[#e4e6eb] dark:border-[#242832] bg-[#f7f8fa] dark:bg-[#14161b] text-[#0f1115] dark:text-[#f7f8fa] placeholder-[#a0a5b0] text-sm focus:outline-none focus:border-[#0f1115] dark:focus:border-[#f7f8fa] focus:ring-4 focus:ring-[#0f1115]/5 dark:focus:ring-[#f7f8fa]/5 transition-all"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#0f1115] dark:bg-[#f7f8fa] hover:bg-[#2a2d34] dark:hover:bg-white disabled:opacity-60 text-[#f7f8fa] dark:text-[#0f1115] text-sm font-semibold rounded-xl transition-colors inline-flex items-center justify-center gap-2 group"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Subscribing
                </>
              ) : (
                <>
                  Subscribe
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-[#e4e6eb] dark:border-[#1e2026] space-y-2.5">
            {['Instant alerts when new scholarships match', 'Unsubscribe in one click, any time'].map((t, i) => (
              <div key={i} className="flex items-center gap-2.5 text-xs text-[#6a7280] dark:text-[#5a6270]">
                <div className="w-4 h-4 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <Check className="w-2.5 h-2.5 text-blue-600 dark:text-blue-400" strokeWidth={3} />
                </div>
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailModal;