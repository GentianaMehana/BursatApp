import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'How do I find scholarships on this platform?',
      answer: 'You can use our search bar to search by keywords, or use the advanced filters to filter by study level, field of study, country, and more. You can also browse all scholarships on the home page.'
    },
    {
      question: 'Are all scholarships on this platform legitimate?',
      answer: 'Yes! We only aggregate scholarships from official sources including DAAD, MAShTI, York College, and other verified organizations. Always double-check the official website before applying.'
    },
    {
      question: 'How often are new scholarships added?',
      answer: 'Our system automatically scrapes scholarship data from 6 different sources daily. New scholarships are added as soon as they are published by the source organizations.'
    },
    {
      question: 'Do I need to pay to use this platform?',
      answer: 'No, our platform is completely free for all students. We believe that access to scholarship information should be free and accessible to everyone.'
    },
    {
      question: 'How can I save scholarships I\'m interested in?',
      answer: 'Click the heart icon on any scholarship card to save it to your favorites. Your favorites are saved locally in your browser.'
    },
    {
      question: 'What should I do if a scholarship link is broken?',
      answer: 'Please contact us at mehanagenta@gmail.com with the scholarship details, and we will fix the link as soon as possible.'
    },
    {
      question: 'Can I apply for scholarships directly through this platform?',
      answer: 'No, you need to apply through the official scholarship website. We provide direct links to the official application pages.'
    },
    {
      question: 'How do I know if I\'m eligible for a scholarship?',
      answer: 'Check the eligibility criteria section on each scholarship detail page. This includes requirements like citizenship, academic background, language skills, and more.'
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Find answers to commonly asked questions about our platform and scholarships.
          </p>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
                >
                  <span className="font-semibold text-gray-900 dark:text-white text-left">
                    {faq.question}
                  </span>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;