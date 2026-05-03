import { ArrowUpDown, Calendar, Clock, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const SortBar = ({ sortBy, onSortChange }) => {
  const sortOptions = [
    { value: 'deadline_asc', label: 'Deadline (Earliest First)', icon: Calendar },
    { value: 'deadline_desc', label: 'Deadline (Latest First)', icon: Calendar },
    { value: 'title_asc', label: 'Title (A-Z)', icon: ArrowUpDown },
    { value: 'title_desc', label: 'Title (Z-A)', icon: ArrowUpDown },
    { value: 'relevance', label: 'Most Relevant', icon: TrendingUp },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center gap-3"
    >
      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
        <Clock className="w-4 h-4" />
        <span className="text-sm font-medium">Sort by:</span>
      </div>
      
      <div className="relative">
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="px-4 py-2 pr-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none cursor-pointer"
        >
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ArrowUpDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
      </div>
    </motion.div>
  );
};

export default SortBar;