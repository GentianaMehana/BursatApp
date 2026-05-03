import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Target, PenTool, Users, Clock, Award, TrendingUp } from 'lucide-react';

const ScholarshipTips = () => {
  const tips = [
    {
      icon: Target,
      title: 'Start Early',
      description: 'Begin your scholarship search at least 6-12 months before your intended start date. Many scholarships have early deadlines.'
    },
    {
      icon: PenTool,
      title: 'Write a Strong Motivation Letter',
      description: 'Tailor each motivation letter to the specific scholarship. Highlight your achievements, goals, and why you deserve the scholarship.'
    },
    {
      icon: Users,
      title: 'Get Strong Recommendations',
      description: 'Ask professors or employers who know you well to write recommendation letters. Give them plenty of time and provide them with your CV.'
    },
    {
      icon: Clock,
      title: 'Meet All Deadlines',
      description: 'Create a calendar with all scholarship deadlines. Submit your applications well before the deadline to avoid technical issues.'
    },
    {
      icon: Award,
      title: 'Highlight Your Achievements',
      description: 'Showcase your academic achievements, extracurricular activities, volunteer work, and leadership experience.'
    },
    {
      icon: TrendingUp,
      title: 'Apply to Multiple Scholarships',
      description: 'Don\'t put all your eggs in one basket. Apply to as many scholarships as you qualify for to increase your chances.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 mb-8">
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Scholarship Tips & Advice</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Expert tips to help you succeed in your scholarship applications.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tips.map((tip, index) => {
              const Icon = tip.icon;
              return (
                <div key={index} className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                  <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{tip.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{tip.description}</p>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ScholarshipTips;