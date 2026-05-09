// src/components/FilterBar.jsx
import React, { useState } from 'react';
import { Search, Filter, X, ChevronDown, ChevronUp, GraduationCap, BookOpen } from 'lucide-react';
import ReactGA from 'react-ga4';

export default function FilterBar({ filters, onFilterChange, onReset, options, resultsCount }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const levelOptions = [
    { value: 'all', label: 'All Levels', icon: '🎓' },
    { value: 'Bachelor', label: 'Bachelor', icon: '📘' },
    { value: 'Master', label: 'Master', icon: '📙' },
    { value: 'PhD', label: 'PhD', icon: '🔬' },
    { value: 'MBA', label: 'MBA', icon: '💼' },
    { value: 'High School', label: 'High School', icon: '🏫' },
  ];

  const hasActiveFilters = filters.level !== 'all' || 
    filters.field_of_study !== 'all' || 
    filters.search;

  const getSelectedLabel = (value, options) => {
    const option = options.find(opt => opt.value === value);
    return option ? option.label : 'All';
  };

  // ============================================
  // FUNKSIONI PËR NDRYSHIMIN E FILTRAVE (ME GOOGLE ANALYTICS)
  // ============================================
  const handleFilterChange = (newFilters) => {
    // ✅ GOOGLE ANALYTICS - Event për filtrim sipas nivelit
    if (newFilters.level !== undefined && newFilters.level !== filters.level) {
      ReactGA.event({
        category: 'Search',
        action: 'Apply Filter',
        label: 'Level',
        value: newFilters.level
      });
    }
    
    // ✅ GOOGLE ANALYTICS - Event për filtrim sipas fushës
    if (newFilters.field_of_study !== undefined && newFilters.field_of_study !== filters.field_of_study) {
      ReactGA.event({
        category: 'Search',
        action: 'Apply Filter',
        label: 'Field of Study',
        value: newFilters.field_of_study
      });
    }
    
    // ✅ GOOGLE ANALYTICS - Event për kërkim
    if (newFilters.search !== undefined && newFilters.search !== filters.search) {
      ReactGA.event({
        category: 'Search',
        action: 'Search Query',
        label: 'Search',
        value: newFilters.search?.length || 0
      });
    }
    
    onFilterChange(newFilters);
  };

  // ============================================
  // FUNKSIONI PËR RIVENDOSJEN E FILTRAVE (ME GOOGLE ANALYTICS)
  // ============================================
  const handleReset = () => {
    // ✅ GOOGLE ANALYTICS - Event për rivendosjen e filtrave
    ReactGA.event({
      category: 'Search',
      action: 'Reset Filters',
      label: 'All filters cleared'
    });
    onReset();
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-8 transition-all duration-300">
      {/* Search Bar - Hero Style */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400 dark:text-gray-500" />
        </div>
        <input
          type="text"
          placeholder="🔍 Search scholarships by title, description, or field..."
          value={filters.search || ''}
          onChange={(e) => handleFilterChange({ search: e.target.value })}
          className="block w-full pl-11 pr-4 py-4 border-0 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-0 focus:outline-none text-base"
        />
        {filters.search && (
          <button
            onClick={() => handleFilterChange({ search: '' })}
            className="absolute inset-y-0 right-0 pr-4 flex items-center"
          >
            <X className="h-4 w-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors" />
          </button>
        )}
      </div>

      {/* Active Filters Tags */}
      {hasActiveFilters && (
        <div className="px-4 pb-3 flex flex-wrap gap-2 border-b border-gray-100 dark:border-gray-700">
          {filters.level !== 'all' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs rounded-full font-medium shadow-sm">
              <GraduationCap className="w-3 h-3" />
              {getSelectedLabel(filters.level, levelOptions)}
              <button
                onClick={() => handleFilterChange({ level: 'all' })}
                className="ml-1 hover:bg-white/20 rounded-full p-0.5 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.field_of_study !== 'all' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-purple-500 to-purple-600 text-white text-xs rounded-full font-medium shadow-sm">
              <BookOpen className="w-3 h-3" />
              {filters.field_of_study}
              <button
                onClick={() => handleFilterChange({ field_of_study: 'all' })}
                className="ml-1 hover:bg-white/20 rounded-full p-0.5 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {hasActiveFilters && (
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full font-medium hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400 transition-all"
            >
              <X className="w-3 h-3" />
              Clear all
            </button>
          )}
        </div>
      )}

      {/* Expand/Collapse Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all duration 200"
      >
        <div className="flex items-center gap-2">
          <div className={`p-1 rounded-lg transition-all duration-300 ${isExpanded ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600' : 'text-gray-500'}`}>
            <Filter className="w-4 h-4" />
          </div>
          <span className="font-medium text-gray-700 dark:text-gray-300 text-sm">
            Advanced Filters
          </span>
          {hasActiveFilters && (
            <span className="ml-2 px-2 py-0.5 bg-blue-500 text-white text-xs rounded-full font-semibold shadow-sm">
              Active
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
          <span className="text-xs">{isExpanded ? 'Less filters' : 'More filters'}</span>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 transition-transform" />
          ) : (
            <ChevronDown className="w-4 h-4 transition-transform" />
          )}
        </div>
      </button>

      {/* Expanded Filters */}
      {isExpanded && (
        <div className="p-5 bg-gray-50/50 dark:bg-gray-800/30 border-t border-gray-200 dark:border-gray-700 animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Study Level */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-blue-500" />
                Study Level
              </label>
              <div className="relative">
                <select
                  value={filters.level}
                  onChange={(e) => handleFilterChange({ level: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white appearance-none cursor-pointer transition-all hover:border-blue-400"
                >
                  {levelOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>
                      {opt.icon} {opt.label}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Field of Study */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-purple-500" />
                Field of Study
              </label>
              <div className="relative">
                <select
                  value={filters.field_of_study}
                  onChange={(e) => handleFilterChange({ field_of_study: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white appearance-none cursor-pointer transition-all hover:border-purple-400"
                  disabled={!options.fields || options.fields.length === 0}
                >
                  <option value="all">📚 All Fields</option>
                  {options.fields?.map(field => (
                    <option key={field} value={field}>{field}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </div>
              </div>
              {(!options.fields || options.fields.length === 0) && (
                <p className="text-xs text-gray-500 mt-2 animate-pulse">Loading available fields...</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Results Counter */}
      <div className="px-5 py-3 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Found
            </span>
            <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {resultsCount || 0}
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              scholarships
            </span>
          </div>
          {!hasActiveFilters && !isExpanded && (
            <div className="text-xs text-gray-400">
              Use filters to narrow your search
            </div>
          )}
        </div>
      </div>
    </div>
  );
}