import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Lock, Eye, Database, Trash2 } from 'lucide-react';

const PrivacyPolicy = () => {
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Privacy Policy</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="space-y-6">
            <div className="flex gap-4">
              <Shield className="w-6 h-6 text-blue-500 flex-shrink-0" />
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Information We Collect</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  We do not collect any personal information from our users. The only data stored locally in your browser are your favorite scholarships and saved filters.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Database className="w-6 h-6 text-blue-500 flex-shrink-0" />
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Data Storage</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  All scholarship data is aggregated from public sources including DAAD, MAShTI, York College, and other official organizations. We do not store any user data on our servers.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Eye className="w-6 h-6 text-blue-500 flex-shrink-0" />
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Third-Party Links</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Our platform contains links to external websites. We are not responsible for the privacy practices or content of these third-party sites.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Lock className="w-6 h-6 text-blue-500 flex-shrink-0" />
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Data Security</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  We use industry-standard security measures to protect our platform. However, no method of transmission over the internet is 100% secure.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Trash2 className="w-6 h-6 text-blue-500 flex-shrink-0" />
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Your Rights</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  You can clear your local storage data at any time through your browser settings. This will remove your saved favorites and filters.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              If you have any questions about this Privacy Policy, please contact us at mehanagenta@gmail.com
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;