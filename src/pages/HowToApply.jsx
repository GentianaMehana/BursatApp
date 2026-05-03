import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, Search, FileCheck, Mail, Clock } from 'lucide-react';

const HowToApply = () => {
  const steps = [
    {
      icon: Search,
      title: 'Search for Scholarships',
      description: 'Use our search and filter system to find scholarships that match your profile, field of study, and preferred country.'
    },
    {
      icon: FileText,
      title: 'Read Requirements Carefully',
      description: 'Review all eligibility criteria, required documents, and deadlines before starting your application.'
    },
    {
      icon: FileCheck,
      title: 'Prepare Your Documents',
      description: 'Gather all necessary documents including CV, motivation letter, transcripts, recommendation letters, and language certificates.'
    },
    {
      icon: Mail,
      title: 'Submit Your Application',
      description: 'Follow the application instructions on the official scholarship website. Submit all documents before the deadline.'
    },
    {
      icon: Clock,
      title: 'Track Your Application',
      description: 'Keep track of deadlines and follow up with the scholarship provider if you don\'t hear back within the stated timeframe.'
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">How to Apply for Scholarships</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Follow this step-by-step guide to successfully apply for scholarships through our platform.
          </p>

          <div className="space-y-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Step {index + 1}: {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <p className="text-yellow-800 dark:text-yellow-300 text-sm">
              ⚠️ Important: Always check the official scholarship website for the most up-to-date application requirements and deadlines.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HowToApply;