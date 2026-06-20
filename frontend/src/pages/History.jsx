import React, { useEffect, useState } from "react";
import { Clock3, History as HistoryIcon, XCircle } from "lucide-react";
import EmptyState from "../components/EmptyState.jsx";
import Loader from "../components/Loader.jsx";
import SearchBar from "../components/SearchBar.jsx";
import { useTasks } from "../context/TaskContext.jsx";

const actionLabels = {
  CREATED: "Created",
  UPDATED: "Updated",
  COMPLETED: "Completed",
  DELETED: "Deleted",
  RESTORED: "Restored"
};

const actionStyles = {
  CREATED: "bg-blue-100 text-blue-700 border border-blue-200 dark:bg-blue-900/40 dark:text-blue-400 dark:border-blue-800",
  UPDATED: "bg-purple-100 text-purple-700 border border-purple-200 dark:bg-purple-900/40 dark:text-purple-400 dark:border-purple-800",
  COMPLETED: "bg-emerald-100 text-emerald-700 border border-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-400 dark:border-emerald-800",
  DELETED: "bg-red-100 text-red-700 border border-red-200 dark:bg-red-900/40 dark:text-red-400 dark:border-red-800",
  RESTORED: "bg-amber-100 text-amber-700 border border-amber-200 dark:bg-amber-900/40 dark:text-amber-400 dark:border-amber-800"
};

const History = () => {
  const { fetchHistory } = useTasks();

  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const loadHistory = async () => {
    setLoading(true);
    try {
      const data = await fetchHistory();
      setHistory(data);
    } catch (error) {
      console.error("Failed to load history", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const filteredHistory = history.filter((item) => {
    const keyword = search.toLowerCase();
    return (
      item.titleSnapshot?.toLowerCase().includes(keyword) ||
      item.statusSnapshot?.toLowerCase().includes(keyword) ||
      item.action?.toLowerCase().includes(keyword)
    );
  });

  const isSearching = search !== "";

  return (
    <section className="mx-auto max-w-7xl space-y-8 pb-8">
      
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Activity
          </p>
          <h2 className="mt-1 text-2xl font-extrabold text-gray-900 dark:text-white">
            Task History
          </h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-slate-400">
            Track a complete audit log of all created, updated, completed, deleted, and restored tasks.
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all dark:border-slate-700 dark:bg-slate-800">
        <div className="w-full md:max-w-md">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search activity log..."
          />
        </div>
      </div>

      {loading ? (
        <Loader text="Loading history..." />
      ) : filteredHistory.length > 0 ? (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left border-collapse">
              
              <thead className="bg-gray-50 border-b border-gray-200 dark:bg-slate-800/50 dark:border-slate-700">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold tracking-wider uppercase text-gray-500 dark:text-slate-400">
                    Task Details
                  </th>
                  <th className="px-6 py-4 text-xs font-bold tracking-wider uppercase text-gray-500 dark:text-slate-400">
                    Action Taken
                  </th>
                  <th className="px-6 py-4 text-xs font-bold tracking-wider uppercase text-gray-500 dark:text-slate-400">
                    Task Status
                  </th>
                  <th className="px-6 py-4 text-xs font-bold tracking-wider uppercase text-gray-500 dark:text-slate-400">
                    Timestamp
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100 dark:divide-slate-700/50">
                {filteredHistory.map((item) => (
                  <tr
                    key={item._id}
                    className="transition-colors hover:bg-gray-50/50 dark:hover:bg-slate-700/30"
                  >
                    
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-600 dark:bg-slate-700 dark:text-slate-300">
                          <HistoryIcon size={18} strokeWidth={2} />
                        </div>
                        <span className="font-semibold text-gray-900 dark:text-white line-clamp-1">
                          {item.titleSnapshot || "Unknown Task"}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          actionStyles[item.action] ||
                          "bg-gray-100 text-gray-700 border border-gray-200 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600"
                        }`}
                      >
                        {actionLabels[item.action] || item.action}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-sm font-medium text-gray-600 dark:text-slate-300">
                      {item.statusSnapshot || "N/A"}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-slate-400">
                        <Clock3 size={16} />
                        <span>
                          {new Date(item.createdAt).toLocaleString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit"
                          })}
                        </span>
                      </div>
                    </td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <EmptyState
          title={isSearching ? "No matches found" : "No history recorded"}
          description={
            isSearching
              ? "We couldn't find any activity logs matching your search."
              : "Your task activity timeline is currently empty. Actions you take will appear here."
          }
        >
          {isSearching && (
            <button
              onClick={() => setSearch("")}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-200 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
            >
              <XCircle size={18} />
              Clear Search
            </button>
          )}
        </EmptyState>
      )}
    </section>
  );
};

export default History;