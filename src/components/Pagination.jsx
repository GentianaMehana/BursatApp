import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-center items-center gap-2 mt-8 flex-wrap"
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-1"
      >
        <ChevronLeft className="w-4 h-4" />
        Previous
      </button>

      <div className="flex gap-2">
        {currentPage > 2 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
            >
              1
            </button>
            {currentPage > 3 && <span className="px-2 py-2 text-gray-500">...</span>}
          </>
        )}

        {currentPage > 1 && (
          <button
            onClick={() => onPageChange(currentPage - 1)}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
          >
            {currentPage - 1}
          </button>
        )}

        <button
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md font-semibold"
        >
          {currentPage}
        </button>

        {currentPage < totalPages && (
          <button
            onClick={() => onPageChange(currentPage + 1)}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
          >
            {currentPage + 1}
          </button>
        )}

        {currentPage < totalPages - 1 && (
          <>
            {currentPage < totalPages - 2 && <span className="px-2 py-2 text-gray-500">...</span>}
            <button
              onClick={() => onPageChange(totalPages)}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
            >
              {totalPages}
            </button>
          </>
        )}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-1"
      >
        Next
        <ChevronRight className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

export default Pagination;