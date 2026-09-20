// src/components/SortBar.jsx
import { ArrowUpDown } from 'lucide-react';

const SORT_OPTIONS = [
  { value: 'deadline_asc',  label: 'Deadline · Soonest' },
  { value: 'deadline_desc', label: 'Deadline · Latest' },
  { value: 'title_asc',     label: 'Title · A–Z' },
  { value: 'title_desc',    label: 'Title · Z–A' },
  { value: 'relevance',     label: 'Most relevant' },
];

const SortBar = ({ sortBy, onSortChange }) => (
  <div className="flex items-center gap-2">
    <ArrowUpDown className="w-3.5 h-3.5 text-[#8a929f]" />
    <select
      value={sortBy}
      onChange={(e) => onSortChange(e.target.value)}
      className="px-3 py-1.5 rounded-lg border border-[#e4e6eb] dark:border-[#242832] bg-white dark:bg-[#14161b] text-[#4a5160] dark:text-[#98a2b0] text-xs font-medium focus:outline-none focus:border-[#0f1115] dark:focus:border-[#f7f8fa] cursor-pointer transition-colors"
    >
      {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  </div>
);

export default SortBar;