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
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#4a5160] dark:text-[#8a929f] hover:text-[#0f1115] dark:hover:text-[#f7f8fa] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <header className="mb-10">
          <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center mb-4">
            <MessageSquare className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#0f1115] dark:text-[#f7f8fa] tracking-[-0.02em] mb-2">
            Get in touch
          </h1>
          <p className="text-[#6a7280] dark:text-[#5a6270]">
            Have questions? We'd love to hear from you.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2 space-y-3">
            {contactInfo.map(({ icon: Icon, label, value, href }) => {
              const inner = (
                <>
                  <div className="w-10 h-10 rounded-lg bg-white dark:bg-[#14161b] border border-[#e4e6eb] dark:border-[#242832] flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-[#6a7280] dark:text-[#5a6270] uppercase tracking-wide">{label}</div>
                    <div className="text-sm font-medium text-[#0f1115] dark:text-[#f7f8fa] truncate">{value}</div>
                  </div>
                </>
              );

              const baseClass = "flex items-center gap-3 p-4 bg-white dark:bg-[#0d0e12] rounded-xl border border-[#e4e6eb] dark:border-[#1e2026] transition-colors";
              return href ? (
                <a key={label} href={href} className={`${baseClass} hover:border-blue-400 dark:hover:border-blue-600`}>
                  {inner}
                </a>
              ) : (
                <div key={label} className={baseClass}>{inner}</div>
              );
            })}

            <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-100 dark:border-blue-900/50">
              <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
                We typically respond within 24–48 hours on business days.
              </p>
            </div>
          </div>

          <div className="lg:col-span-3 bg-white dark:bg-[#0d0e12] rounded-xl border border-[#e4e6eb] dark:border-[#1e2026] p-6 md:p-8">
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
                className="w-full py-3 bg-[#0f1115] dark:bg-[#f7f8fa] hover:bg-[#2a2d34] dark:hover:bg-white text-[#f7f8fa] dark:text-[#0f1115] text-sm font-semibold rounded-lg transition-colors inline-flex items-center justify-center gap-2 group"
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
          border: 1px solid #e4e6eb;
          background-color: white;
          color: #0f1115;
          outline: none;
          transition: all 0.15s;
        }
        .input-base::placeholder { color: #a0a5b0; }
        .input-base:focus {
          border-color: #0f1115;
          box-shadow: 0 0 0 4px rgba(15,17,21,0.05);
        }
        .dark .input-base {
          background-color: #14161b;
          border-color: #242832;
          color: #f7f8fa;
        }
        .dark .input-base:focus { border-color: #f7f8fa; }
      `}</style>
    </div>
  );
};

const Field = ({ label, children }) => (
  <div>
    <label className="block text-xs font-medium text-[#4a5160] dark:text-[#8a929f] mb-1.5">{label}</label>
    {children}
  </div>
);

export default Contact;