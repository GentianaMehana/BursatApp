// src/pages/PrivacyPolicy.jsx
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Database, Eye, Lock, Trash2 } from 'lucide-react';

const PrivacyPolicy = () => {
  const sections = [
    { icon: Shield, title: 'Information we collect', body: 'We do not collect any personal information from our users. The only data stored locally in your browser are your favorite scholarships and saved filters.' },
    { icon: Database, title: 'Data storage', body: 'All scholarship data is aggregated from public sources including DAAD, MAShTI, York College, and other official organizations. We do not store any user data on our servers.' },
    { icon: Eye, title: 'Third-party links', body: 'Our platform contains links to external websites. We are not responsible for the privacy practices or content of these third-party sites.' },
    { icon: Lock, title: 'Data security', body: 'We use industry-standard security measures to protect our platform. However, no method of transmission over the internet is 100% secure.' },
    { icon: Trash2, title: 'Your rights', body: 'You can clear your local storage data at any time through your browser settings. This will remove your saved favorites and filters.' },
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#4a5160] dark:text-[#8a929f] hover:text-[#0f1115] dark:hover:text-[#f7f8fa] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <header className="mb-10">
          <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center mb-4">
            <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#0f1115] dark:text-[#f7f8fa] tracking-[-0.02em] mb-2">
            Privacy policy
          </h1>
          <p className="text-sm text-[#6a7280] dark:text-[#5a6270]">
            Last updated {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </header>

        <div className="space-y-3">
          {sections.map(({ icon: Icon, title, body }, i) => (
            <div
              key={i}
              className="p-5 bg-white dark:bg-[#0d0e12] rounded-xl border border-[#e4e6eb] dark:border-[#1e2026]"
            >
              <div className="flex items-center gap-3 mb-2">
                <Icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <h2 className="font-semibold text-[#0f1115] dark:text-[#f7f8fa]">{title}</h2>
              </div>
              <p className="text-sm text-[#6a7280] dark:text-[#5a6270] leading-relaxed pl-7">
                {body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 p-5 bg-white dark:bg-[#0d0e12] rounded-xl border border-[#e4e6eb] dark:border-[#1e2026]">
          <p className="text-sm text-[#6a7280] dark:text-[#5a6270]">
            Questions? Contact us at{' '}
            <a
              href="mailto:mehanagenta@gmail.com"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              mehanagenta@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;