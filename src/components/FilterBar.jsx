// src/components/FilterBar.jsx
import { useState } from 'react';
import { Search, X, ChevronDown, SlidersHorizontal } from 'lucide-react';
import ReactGA from 'react-ga4';

const LEVELS = [
  { value: 'all',          label: 'All levels' },
  { value: 'Bachelor',     label: 'Bachelor' },
  { value: 'Master',       label: 'Master' },
  { value: 'PhD',          label: 'PhD' },
  { value: 'MBA',          label: 'MBA' },
  { value: 'High School',  label: 'High School' },
];

export default function FilterBar({ filters, onFilterChange, onReset, options, resultsCount }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const hasActiveFilters =
    filters.level !== 'all' || filters.field_of_study !== 'all' || filters.search;

  const track = (action, label) => ReactGA.event({ category: 'Search', action, label, value: 1 });

  const handleChange = (next) => {
    if (next.level !== undefined && next.level !== filters.level) track('Apply Filter', 'Level');
    if (next.field_of_study !== undefined && next.field_of_study !== filters.field_of_study) track('Apply Filter', 'Field');
    if (next.search !== undefined && next.search !== filters.search) track('Search Query', next.search || 'empty');
    onFilterChange(next);
  };

  const handleReset = () => {
    track('Reset Filters', 'All filters cleared');
    onReset();
  };

  return (
    <div className="bg-white dark:bg-[#0d0e12] rounded-2xl border border-[#e4e6eb] dark:border-[#1e2026] overflow-hidden mb-6">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#8a929f]" />
        <input
          type="text"
          value={filters.search || ''}
          onChange={(e) => handleChange({ search: e.target.value })}
          placeholder="Search scholarships..."
          className="w-full pl-12 pr-10 py-4 bg-transparent border-0 text-[#0f1115] dark:text-[#f7f8fa] placeholder-[#a0a5b0] focus:outline-none text-sm"
        />
        {filters.search && (
          <button
            onClick={() => handleChange({ search: '' })}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-[#8a929f] hover:text-[#0f1115] dark:hover:text-[#f7f8fa] hover:bg-[#f2f3f5] dark:hover:bg-[#1a1c22] transition-colors"
            aria-label="Clear"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex items-center justify-between border-t border-[#e4e6eb] dark:border-[#1e2026] hover:bg-[#f7f8fa] dark:hover:bg-[#14161b]/50 transition-colors"
      >
        <div className="flex items-center gap-2 text-xs font-semibold text-[#4a5160] dark:text-[#8a929f] uppercase tracking-wide">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Filters</span>
          {hasActiveFilters && (
            <span className="px-1.5 py-0.5 rounded bg-[#0f1115] dark:bg-[#f7f8fa] text-[#f7f8fa] dark:text-[#0f1115] text-[10px] font-bold">
              ON
            </span>
          )}
        </div>
        <ChevronDown className={`w-4 h-4 text-[#8a929f] transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
      </button>

      {isExpanded && (
        <div className="p-4 border-t border-[#e4e6eb] dark:border-[#1e2026] bg-[#f7f8fa]/50 dark:bg-[#14161b]/30 grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
          <div>
            <label className="block text-[10px] font-semibold text-[#6a7280] dark:text-[#5a6270] mb-2 uppercase tracking-wide">
              Study level
            </label>
            <select
              value={filters.level}
              onChange={(e) => handleChange({ level: e.target.value })}
              className="w-full px-3 py-2.5 rounded-lg border border-[#e4e6eb] dark:border-[#242832] bg-white dark:bg-[#14161b] text-[#0f1115] dark:text-[#f7f8fa] text-sm focus:outline-none focus:border-[#0f1115] dark:focus:border-[#f7f8fa] focus:ring-4 focus:ring-[#0f1115]/5 dark:focus:ring-[#f7f8fa]/5 appearance-none cursor-pointer transition-all"
            >
              {LEVELS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-semibold text-[#6a7280] dark:text-[#5a6270] mb-2 uppercase tracking-wide">
              Field of study
            </label>
            <select
              value={filters.field_of_study}
              onChange={(e) => handleChange({ field_of_study: e.target.value })}
              disabled={!options.fields?.length}
              className="w-full px-3 py-2.5 rounded-lg border border-[#e4e6eb] dark:border-[#242832] bg-white dark:bg-[#14161b] text-[#0f1115] dark:text-[#f7f8fa] text-sm focus:outline-none focus:border-[#0f1115] dark:focus:border-[#f7f8fa] focus:ring-4 focus:ring-[#0f1115]/5 dark:focus:ring-[#f7f8fa]/5 appearance-none cursor-pointer disabled:opacity-50 transition-all"
            >
              <option value="all">All fields</option>
              {options.fields?.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
        </div>
      )}

      {(hasActiveFilters || resultsCount !== undefined) && (
        <div className="px-4 py-3 border-t border-[#e4e6eb] dark:border-[#1e2026] flex items-center justify-between gap-3 flex-wrap">
          <div className="flex flex-wrap gap-1.5">
            {filters.level !== 'all' && (
              <Tag onRemove={() => handleChange({ level: 'all' })}>
                {LEVELS.find(l => l.value === filters.level)?.label}
              </Tag>
            )}
            {filters.field_of_study !== 'all' && (
              <Tag onRemove={() => handleChange({ field_of_study: 'all' })}>
                {filters.field_of_study}
              </Tag>
            )}
          </div>

          <div className="flex items-center gap-3 text-xs text-[#6a7280] dark:text-[#5a6270]">
            <span>
              <span className="font-bold text-[#0f1115] dark:text-[#f7f8fa] tabular-nums">{resultsCount || 0}</span> results
            </span>
            {hasActiveFilters && (
              <button onClick={handleReset} className="font-semibold text-[#0f1115] dark:text-[#f7f8fa] hover:underline">
                Clear all
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const Tag = ({ children, onRemove }) => (
  <span className="inline-flex items-center gap-1 pl-2.5 pr-1 py-1 rounded-md bg-[#f2f3f5] dark:bg-[#1a1c22] text-[#4a5160] dark:text-[#98a2b0] text-xs font-medium">
    {children}
    <button
      onClick={onRemove}
      className="p-0.5 hover:bg-[#e4e6eb] dark:hover:bg-[#242832] rounded transition-colors"
      aria-label="Remove filter"
    >
      <X className="w-3 h-3" />
    </button>
  </span>
);