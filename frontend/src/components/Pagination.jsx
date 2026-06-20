import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ page, totalPages, onPageChange }) => {
  if (!totalPages || totalPages <= 1) {
    return null;
  }

  return (
    <div className="mt-8 mb-4 flex items-center justify-center gap-4">
      
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className="flex items-center justify-center gap-1 h-10 px-3 rounded-lg border border-slate-300 bg-white text-slate-700 shadow-sm transition-all hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
        aria-label="Previous page"
      >
        <ChevronLeft size={18} strokeWidth={2.5} />
        <span className="hidden sm:inline text-sm font-medium pr-1">Prev</span>
      </button>

      <div className="flex items-center justify-center px-4 py-2 rounded-lg bg-slate-100 text-sm font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
        Page <span className="mx-1 text-blue-600 dark:text-blue-400">{page}</span> of {totalPages}
      </div>

      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        className="flex items-center justify-center gap-1 h-10 px-3 rounded-lg border border-slate-300 bg-white text-slate-700 shadow-sm transition-all hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
        aria-label="Next page"
      >
        <span className="hidden sm:inline text-sm font-medium pl-1">Next</span>
        <ChevronRight size={18} strokeWidth={2.5} />
      </button>
      
    </div>
  );
};

export default Pagination;