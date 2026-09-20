// src/lib/design.js
export const levelColors = {
  Bachelor:      'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 ring-blue-600/15',
  Master:        'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400 ring-indigo-600/15',
  PhD:           'bg-violet-50 text-violet-700 dark:bg-violet-950/40 dark:text-violet-400 ring-violet-600/15',
  MBA:           'bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-400 ring-sky-600/15',
  'High School': 'bg-teal-50 text-teal-700 dark:bg-teal-950/40 dark:text-teal-400 ring-teal-600/15',
};

export const deadlineColors = {
  urgent: { dot: 'bg-red-500',     text: 'text-red-600 dark:text-red-400' },
  soon:   { dot: 'bg-amber-500',   text: 'text-amber-600 dark:text-amber-400' },
  active: { dot: 'bg-emerald-500', text: 'text-emerald-600 dark:text-emerald-400' },
  closed: { dot: 'bg-slate-400',   text: 'text-slate-500 dark:text-slate-500' },
};