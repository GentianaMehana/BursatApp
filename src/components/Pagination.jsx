// src/components/Pagination.jsx
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = [];
  const range = 1;
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - range && i <= currentPage + range)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== '…') {
      pages.push('…');
    }
  }

  const btn = 'inline-flex items-center justify-center min-w-[36px] h-9 px-2.5 rounded-lg text-xs font-semibold transition-colors';

  return (
    <nav className="flex items-center justify-center gap-1 mt-10" aria-label="Pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${btn} text-[#4a5160] dark:text-[#8a929f] hover:bg-[#f2f3f5] dark:hover:bg-[#1a1c22] disabled:opacity-30 disabled:cursor-not-allowed`}
        aria-label="Previous"
      >
        <ChevronLeft className="w-3.5 h-3.5" />
      </button>

      {pages.map((p, i) =>
        p === '…' ? (
          <span key={`gap-${i}`} className="px-1.5 text-[#8a929f] text-xs">…</span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`${btn} tabular-nums ${
              p === currentPage
                ? 'bg-[#0f1115] dark:bg-[#f7f8fa] text-[#f7f8fa] dark:text-[#0f1115]'
                : 'text-[#4a5160] dark:text-[#8a929f] hover:bg-[#f2f3f5] dark:hover:bg-[#1a1c22]'
            }`}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${btn} text-[#4a5160] dark:text-[#8a929f] hover:bg-[#f2f3f5] dark:hover:bg-[#1a1c22] disabled:opacity-30 disabled:cursor-not-allowed`}
        aria-label="Next"
      >
        <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </nav>
  );
};

export default Pagination;