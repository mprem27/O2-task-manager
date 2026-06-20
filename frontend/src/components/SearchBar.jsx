import React from "react";
import { Search, X } from "lucide-react";

const SearchBar = ({
  value,
  onChange,
  placeholder = "Search tasks...",
  className = ""
}) => {
  const handleClear = () => {
    onChange("");
  };

  return (
    <div className={`relative w-full max-w-md ${className}`}>
      <Search size={18} strokeWidth={2.5} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"/>

      <input type="text" value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} aria-label="Search"
        className="h-10 w-full rounded-lg border border-gray-300 bg-white pl-10 pr-10 text-sm text-gray-800 shadow-sm outline-none transition-all placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-900/30"
      />

      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:hover:bg-slate-800 dark:hover:text-white"
          aria-label="Clear search"
          title="Clear search"
        >
          <X size={16} strokeWidth={2.5} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;