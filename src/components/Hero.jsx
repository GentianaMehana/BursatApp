// src/components/Hero.jsx
import { motion } from 'framer-motion';
import { Search, ArrowRight } from 'lucide-react';

const Hero = ({ searchQuery, setSearchQuery }) => {
  const sources = ['DAAD', 'MAShTI', 'York College', 'Erasmus+', 'Fulbright', 'Chevening'];

  const stats = [
    { value: '140', suffix: '+', label: 'Live scholarships' },
    { value: '06',  suffix: '',  label: 'Official sources' },
    { value: '500', suffix: '+', label: 'Students helped' },
  ];

  const handleBrowseClick = () => {
    const el = document.getElementById('scholarships');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    else window.scrollTo({ top: window.innerHeight - 100, behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-[#f7f8fa] dark:bg-[#0d0e12] border-b border-[#e4e6eb] dark:border-[#1e2026]">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-slate-400/25 dark:bg-slate-600/[0.08] blur-[120px] rounded-full pointer-events-none" aria-hidden="true" />
      <div className="absolute top-[10%] left-[8%] w-[600px] h-[600px] bg-sky-200/30 dark:bg-sky-700/[0.06] blur-[130px] rounded-full pointer-events-none" aria-hidden="true" />
      <div className="absolute top-[8%] right-[10%] w-[500px] h-[500px] bg-indigo-200/20 dark:bg-indigo-700/[0.05] blur-[120px] rounded-full pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-20 md:pt-24 pb-16 md:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between gap-6 pb-8 border-b border-[#e4e6eb] dark:border-[#1e2026]"
        >
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-70" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
            </span>
            <span className="text-[11px] font-semibold text-[#4a5160] dark:text-[#98a2b0] uppercase tracking-[0.18em]">
              Live · Updated daily
            </span>
          </div>
          <span className="hidden md:inline text-[11px] font-medium text-[#6a7280] dark:text-[#5a6270] uppercase tracking-[0.18em]">
            Kosovo · {new Date().getFullYear()}
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 pt-14 md:pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="lg:col-span-7"
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="w-8 h-px bg-[#4a5160] dark:bg-[#4a5260]" />
              <span className="text-[11px] font-semibold text-[#4a5160] dark:text-[#8a929f] uppercase tracking-[0.2em]">
                Scholarship Aggregator
              </span>
            </div>

            <h1 className="text-[2.5rem] leading-[1.02] md:text-[3.75rem] lg:text-[4.25rem] font-bold tracking-[-0.045em] text-[#0f1115] dark:text-[#f7f8fa] text-balance">
              Every scholarship
              <br />
              <span className="font-display italic font-normal text-[#5a6470] dark:text-[#98a2b0]">
                worth applying to.
              </span>
            </h1>

            <p className="mt-8 text-base md:text-[17px] text-[#495260] dark:text-[#8a929f] max-w-lg leading-relaxed text-pretty">
              Aggregated daily from six official sources. Filter, compare, and
              apply to the opportunities that match your ambitions.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleBrowseClick}
                className="group inline-flex items-center gap-2 px-6 py-3.5 bg-[#0f1115] dark:bg-[#f7f8fa] hover:bg-[#2a2d34] dark:hover:bg-white text-[#f7f8fa] dark:text-[#0f1115] text-sm font-semibold rounded-full transition-all shadow-[0_4px_14px_rgba(15,17,21,0.18)] dark:shadow-[0_4px_18px_rgba(247,248,250,0.10)]"
              >
                Browse scholarships
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
              <a
                href="/how-to-apply"
                className="group inline-flex items-center gap-2 px-6 py-3.5 text-[#0f1115] dark:text-[#f7f8fa] text-sm font-semibold rounded-full border border-[#d0d4dc] dark:border-[#2a2e36] hover:border-[#0f1115] dark:hover:border-[#f7f8fa] transition-colors"
              >
                How to apply
                <ArrowUpRightSmall />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 lg:pt-14 flex flex-col justify-between"
          >
            <div>
              <label className="block text-[11px] font-semibold text-[#4a5160] dark:text-[#8a929f] uppercase tracking-[0.2em] mb-3">
                Quick search
              </label>
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8a929f] group-focus-within:text-[#0f1115] dark:group-focus-within:text-[#f7f8fa] transition-colors" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Master in Germany..."
                  className="w-full pl-11 pr-4 py-4 bg-white dark:bg-[#14161b] border border-[#e4e6eb] dark:border-[#242832] rounded-xl text-[#0f1115] dark:text-[#f7f8fa] placeholder-[#a0a5b0] text-sm focus:outline-none focus:border-[#0f1115] dark:focus:border-[#f7f8fa] focus:ring-4 focus:ring-[#0f1115]/5 dark:focus:ring-[#f7f8fa]/5 transition-all"
                />
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {['Bachelor', 'Master', 'PhD', 'MBA'].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setSearchQuery(tag)}
                    className="px-2.5 py-1 text-[11px] font-medium text-[#4a5160] dark:text-[#8a929f] bg-white dark:bg-[#14161b] border border-[#e4e6eb] dark:border-[#242832] rounded-md hover:border-[#0f1115] dark:hover:border-[#f7f8fa] hover:text-[#0f1115] dark:hover:text-[#f7f8fa] transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-10 lg:mt-0 space-y-0 divide-y divide-[#e4e6eb] dark:divide-[#1e2026]">
              {stats.map(({ value, suffix, label }, i) => (
                <div key={i} className="flex items-baseline justify-between py-4 first:pt-0 last:pb-0">
                  <span className="text-[11px] font-semibold text-[#6a7280] dark:text-[#5a6270] uppercase tracking-[0.18em]">
                    {label}
                  </span>
                  <span className="font-mono text-[#0f1115] dark:text-[#f7f8fa] tabular-nums tracking-tight">
                    <span className="text-2xl font-bold">{value}</span>
                    <span className="text-base text-[#8a929f] dark:text-[#5a6270] ml-0.5 font-semibold">{suffix}</span>
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 md:mt-20 pt-8 border-t border-[#e4e6eb] dark:border-[#1e2026]"
        >
          <div className="flex items-center gap-6 overflow-hidden">
            <span className="text-[10px] font-semibold text-[#6a7280] dark:text-[#5a6270] uppercase tracking-[0.2em] flex-shrink-0">
              Trusted sources
            </span>
            <div className="hidden md:block w-px h-4 bg-[#d0d4dc] dark:bg-[#2a2e36]" />
            <div className="flex items-center gap-6 md:gap-10 overflow-hidden">
              {sources.map((s) => (
                <span key={s} className="text-sm font-semibold text-[#4a5160] dark:text-[#98a2b0] whitespace-nowrap tracking-tight">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ArrowUpRightSmall = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
    <path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default Hero;