import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Bookmark } from 'lucide-react';
import toast from 'react-hot-toast';

const SaveFilterModal = ({ isOpen, onClose, filters, onSave, savedFilters }) => {
  const [filterName, setFilterName] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');

  const handleSave = () => {
    if (!filterName.trim()) {
      toast.error('Please enter a filter name');
      return;
    }
    onSave({ name: filterName, filters });
    setFilterName('');
    onClose();
    toast.success('Filter saved successfully');
  };

  const handleLoadFilter = () => {
    if (selectedFilter) {
      const savedFilter = savedFilters.find(f => f.id === selectedFilter);
      if (savedFilter) {
        onSave(savedFilter.filters);
        toast.success('Filter loaded successfully');
        onClose();
      }
    }
  };

  const handleDeleteFilter = (id) => {
    const updatedFilters = savedFilters.filter(f => f.id !== id);
    localStorage.setItem('savedFilters', JSON.stringify(updatedFilters));
    toast.success('Filter deleted');
    window.location.reload(); // Refresh to update the list
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-hidden"
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-blue-500" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Save Filters</h2>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              {/* Save new filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Save current filters
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={filterName}
                    onChange={(e) => setFilterName(e.target.value)}
                    placeholder="e.g., Master in Germany"
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                </div>
              </div>

              {/* Load saved filters */}
              {savedFilters.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Your saved filters
                  </label>
                  <div className="space-y-2">
                    <select
                      value={selectedFilter}
                      onChange={(e) => setSelectedFilter(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white mb-3"
                    >
                      <option value="">Select a saved filter...</option>
                      {savedFilters.map(filter => (
                        <option key={filter.id} value={filter.id}>
                          {filter.name}
                        </option>
                      ))}
                    </select>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={handleLoadFilter}
                        disabled={!selectedFilter}
                        className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Load Filter
                      </button>
                      <button
                        onClick={() => selectedFilter && handleDeleteFilter(selectedFilter)}
                        disabled={!selectedFilter}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Current filters preview */}
              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Current Filters:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {filters.search && (
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs rounded-full">
                      Search: {filters.search}
                    </span>
                  )}
                  {filters.level !== 'all' && (
                    <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs rounded-full">
                      Level: {filters.level}
                    </span>
                  )}
                  {filters.field_of_study !== 'all' && (
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs rounded-full">
                      Field: {filters.field_of_study}
                    </span>
                  )}
                  {filters.country !== 'all' && (
                    <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 text-xs rounded-full">
                      Country: {filters.country}
                    </span>
                  )}
                  {filters.show_inactive && (
                    <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs rounded-full">
                      Show Inactive
                    </span>
                  )}
                  {filters.search === '' && filters.level === 'all' && filters.field_of_study === 'all' && filters.country === 'all' && !filters.show_inactive && (
                    <span className="text-gray-500 dark:text-gray-400 text-sm">
                      No active filters
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SaveFilterModal;