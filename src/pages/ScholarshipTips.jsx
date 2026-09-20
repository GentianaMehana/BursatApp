// src/pages/ScholarshipTips.jsx
import { Link } from 'react-router-dom';
import { ArrowLeft, Target, PenTool, Users, Clock, Award, TrendingUp, Sparkles } from 'lucide-react';

const ScholarshipTips = () => {
  const tips = [
    { icon: Target, title: 'Start early', description: 'Begin your scholarship search at least 6–12 months before your intended start date. Many scholarships have early deadlines.' },
    { icon: PenTool, title: 'Write a strong motivation letter', description: 'Tailor each motivation letter to the specific scholarship. Highlight your achievements, goals, and why you deserve it.' },
    { icon: Users, title: 'Get strong recommendations', description: 'Ask professors or employers who know you well to write recommendation letters. Give them plenty of time.' },
    { icon: Clock, title: 'Meet all deadlines', description: 'Create a calendar with all scholarship deadlines. Submit your applications well before the deadline to avoid issues.' },
    { icon: Award, title: 'Highlight your achievements', description: 'Showcase your academic achievements, extracurricular activities, volunteer work, and leadership experience.' },
    { icon: TrendingUp, title: 'Apply to multiple scholarships', description: 'Don\'t put all your eggs in one basket. Apply to as many scholarships as you qualify for to increase your chances.' },
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#4a5160] dark:text-[#8a929f] hover:text-[#0f1115] dark:hover:text-[#f7f8fa] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <header className="mb-10">
          <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center mb-4">
            <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#0f1115] dark:text-[#f7f8fa] tracking-[-0.02em] mb-2">
            Scholarship tips
          </h1>
          <p className="text-[#6a7280] dark:text-[#5a6270]">
            Expert advice to help you succeed in your applications.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tips.map((tip, i) => {
            const Icon = tip.icon;
            return (
              <div
                key={i}
                className="group p-5 bg-white dark:bg-[#0d0e12] rounded-xl border border-[#e4e6eb] dark:border-[#1e2026] hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-[#f2f3f5] dark:bg-[#1a1c22] group-hover:bg-blue-50 dark:group-hover:bg-blue-950/40 flex items-center justify-center mb-4 transition-colors">
                  <Icon className="w-4 h-4 text-[#6a7280] dark:text-[#8a929f] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                </div>
                <h3 className="font-semibold text-[#0f1115] dark:text-[#f7f8fa] mb-1.5">
                  {tip.title}
                </h3>
                <p className="text-sm text-[#6a7280] dark:text-[#5a6270] leading-relaxed">
                  {tip.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-10 p-6 bg-[#0f1115] dark:bg-[#14161b] rounded-xl text-center">
          <p className="text-sm text-[#8a929f] mb-3">
            Ready to find your scholarship?
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#f7f8fa] text-[#0f1115] text-sm font-medium rounded-lg hover:bg-white transition-colors"
          >
            Browse scholarships
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipTips;