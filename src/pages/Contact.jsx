// src/pages/Contact.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Message sent. We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const set = (field) => (e) => setFormData({ ...formData, [field]: e.target.value });

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'mehanagenta@gmail.com', href: 'mailto:mehanagenta@gmail.com' },
    { icon: Phone, label: 'Phone', value: '+383 49 427 478', href: 'tel:+38349427478' },
    { icon: MapPin, label: 'Location', value: 'Kosovo' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <header className="mb-10">
          <div className="w-11 h-11 rounded-xl bg-brand-50 dark:bg-brand-950/50 flex items-center justify-center mb-4">
            <MessageSquare className="w-5 h-5 text-brand-600 dark:text-brand-400" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
            Get in touch
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Have questions? We'd love to hear from you.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-3">
            {contactInfo.map(({ icon: Icon, label, value, href }) => {
              const inner = (
                <>
                  <div className="w-10 h-10 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">{label}</div>
                    <div className="text-sm font-medium text-slate-900 dark:text-white truncate">{value}</div>
                  </div>
                </>
              );

              const baseClass = "flex items-center gap-3 p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 transition-colors";
              return href ? (
                <a key={label} href={href} className={`${baseClass} hover:border-brand-300 dark:hover:border-brand-700`}>
                  {inner}
                </a>
              ) : (
                <div key={label} className={baseClass}>{inner}</div>
              );
            })}

            <div className="p-4 bg-brand-50 dark:bg-brand-950/30 rounded-xl border border-brand-100 dark:border-brand-900/50">
              <p className="text-xs text-brand-700 dark:text-brand-300 leading-relaxed">
                We typically respond within 24–48 hours on business days.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Name">
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={set('name')}
                    placeholder="Your name"
                    className="input-base"
                  />
                </Field>
                <Field label="Email">
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={set('email')}
                    placeholder="you@example.com"
                    className="input-base"
                  />
                </Field>
              </div>

              <Field label="Subject">
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={set('subject')}
                  placeholder="What's this about?"
                  className="input-base"
                />
              </Field>

              <Field label="Message">
                <textarea
                  rows="5"
                  required
                  value={formData.message}
                  onChange={set('message')}
                  placeholder="Write your message..."
                  className="input-base resize-none"
                />
              </Field>

              <button
                type="submit"
                className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold rounded-lg transition-colors inline-flex items-center justify-center gap-2 group"
              >
                <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                Send message
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        .input-base {
          width: 100%;
          padding: 0.625rem 0.875rem;
          font-size: 0.875rem;
          border-radius: 0.5rem;
          border: 1px solid rgb(226 232 240);
          background-color: white;
          color: rgb(15 23 42);
          outline: none;
          transition: all 0.15s;
        }
        .input-base::placeholder { color: rgb(148 163 184); }
        .input-base:focus {
          border-color: rgb(99 102 241);
          box-shadow: 0 0 0 3px rgb(99 102 241 / 0.1);
        }
        .dark .input-base {
          background-color: rgb(30 41 59);
          border-color: rgb(51 65 85);
          color: white;
        }
        .dark .input-base:focus { border-color: rgb(129 140 248); }
      `}</style>
    </div>
  );
};

const Field = ({ label, children }) => (
  <div>
    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">{label}</label>
    {children}
  </div>
);

export default Contact;