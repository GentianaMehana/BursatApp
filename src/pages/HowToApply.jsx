// src/pages/HowToApply.jsx
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, FileText, FileCheck, Mail, Clock, Lightbulb } from 'lucide-react';

const HowToApply = () => {
  const steps = [
    { icon: Search, title: 'Search for scholarships', description: 'Use our search and filter system to find scholarships that match your profile, field of study, and preferred country.' },
    { icon: FileText, title: 'Read requirements carefully', description: 'Review all eligibility criteria, required documents, and deadlines before starting your application.' },
    { icon: FileCheck, title: 'Prepare your documents', description: 'Gather all necessary documents including CV, motivation letter, transcripts, recommendation letters, and language certificates.' },
    { icon: Mail, title: 'Submit your application', description: 'Follow the application instructions on the official scholarship website. Submit all documents before the deadline.' },
    { icon: Clock, title: 'Track your application', description: 'Keep track of deadlines and follow up with the scholarship provider if you don\'t hear back within the stated timeframe.' },
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
            <FileCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#0f1115] dark:text-[#f7f8fa] tracking-[-0.02em] mb-2">
            How to apply
          </h1>
          <p className="text-[#6a7280] dark:text-[#5a6270]">
            A step-by-step guide to successfully apply for scholarships.
          </p>
        </header>

        <ol className="space-y-3">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <li
                key={i}
                className="flex gap-4 p-5 bg-white dark:bg-[#0d0e12] rounded-xl border border-[#e4e6eb] dark:border-[#1e2026]"
              >
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                      STEP {i + 1}
                    </span>
                  </div>
                  <h3 className="font-semibold text-[#0f1115] dark:text-[#f7f8fa] mb-1">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#6a7280] dark:text-[#5a6270] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="mt-8 p-5 bg-blue-50 dark:bg-blue-950/20 rounded-xl border border-blue-100 dark:border-blue-900/50">
          <div className="flex gap-3">
            <Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-200 mb-1">
                Important
              </h4>
              <p className="text-sm text-blue-800 dark:text-blue-300/90 leading-relaxed">
                Always check the official scholarship website for the most up-to-date application requirements and deadlines.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToApply;