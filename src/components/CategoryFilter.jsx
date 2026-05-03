import { motion } from 'framer-motion';
import { BookOpen, GraduationCap, Globe, Briefcase, Heart, Star } from 'lucide-react';

const CategoryFilter = ({ selectedCategory, onCategoryChange, scholarships }) => {
  const categories = [
    { id: 'all', label: 'All Scholarships', icon: Star, count: scholarships.length },
    { id: 'bachelor', label: 'Bachelor', icon: GraduationCap, count: scholarships.filter(s => s.level?.includes('Bachelor')).length },
    { id: 'master', label: 'Master', icon: BookOpen, count: scholarships.filter(s => s.level?.includes('Master')).length },
    { id: 'phd', label: 'PhD', icon: Briefcase, count: scholarships.filter(s => s.level?.includes('PhD')).length },
    { id: 'mba', label: 'MBA', icon: Briefcase, count: scholarships.filter(s => s.level?.includes('MBA')).length },
    { id: 'international', label: 'International', icon: Globe, count: scholarships.filter(s => s.country && s.country[0] !== 'Kosovo').length },
    { id: 'favorites', label: 'Favorites', icon: Heart, count: 0 }, // Will be updated dynamically
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => {
          const Icon = category.icon;
          const isSelected = selectedCategory === category.id;
          
          return (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`relative px-5 py-2.5 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                isSelected
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{category.label}</span>
              {category.count > 0 && (
                <span className={`ml-1 px-2 py-0.5 text-xs rounded-full ${
                  isSelected
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}>
                  {category.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default CategoryFilter;