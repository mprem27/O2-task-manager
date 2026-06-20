import React, { useEffect, useState } from "react";
import { CalendarDays, RotateCcw, Trash2, XCircle, Loader2 } from "lucide-react";
import EmptyState from "../components/EmptyState.jsx";
import Loader from "../components/Loader.jsx";
import SearchBar from "../components/SearchBar.jsx";
import { useTasks } from "../context/TaskContext.jsx";

const DeletedTasks = () => {
  const { fetchDeletedTasks, restoreDeletedTask } = useTasks();

  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [restoringId, setRestoringId] = useState("");

  const loadDeletedTasks = async () => {
    setLoading(true);
    try {
      const data = await fetchDeletedTasks();
      setTasks(data);
    } catch (error) {
      console.error("Failed to load deleted tasks", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDeletedTasks();
  }, []);

  const handleRestore = async (taskId) => {
    setRestoringId(taskId);
    try {
      await restoreDeletedTask(taskId);
      await loadDeletedTasks();
    } catch (error) {
       console.error("Failed to restore task", error);
    } finally {
      setRestoringId("");
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const keyword = search.toLowerCase();
    return (
      task.title.toLowerCase().includes(keyword) ||
      task.description.toLowerCase().includes(keyword) ||
      task.status.toLowerCase().includes(keyword)
    );
  });

  const isSearching = search !== "";

  return (
    <section className="mx-auto max-w-7xl space-y-8 pb-8">
      
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
            Archive
          </p>
          <h2 className="mt-1 text-2xl font-extrabold text-gray-900 dark:text-white">
            Deleted Tasks
          </h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-slate-400">
            View your recently removed tasks and restore them to your active dashboard if needed.
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all dark:border-slate-700 dark:bg-slate-800">
        <div className="w-full md:max-w-md">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search deleted tasks..."
          />
        </div>
      </div>

      {loading ? (
        <Loader text="Loading deleted tasks..." />
      ) : filteredTasks.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredTasks.map((task) => (
            <div
              key={task._id}
              className="flex flex-col h-full rounded-xl border border-red-100 bg-red-50/30 p-6 shadow-sm transition-all duration-300 hover:shadow-md dark:border-red-900/30 dark:bg-slate-800/80"
            >
              
              <div className="mb-4 flex items-start justify-between gap-3">
                <span className="rounded-full bg-red-100 border border-red-200 px-3 py-1 text-xs font-semibold text-red-700 dark:bg-red-900/40 dark:border-red-800 dark:text-red-400">
                  Deleted
                </span>

                <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-slate-400">
                  <CalendarDays size={14} />
                  <span>
                    {task.deletedAt
                      ? new Date(task.deletedAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric"
                        })
                      : "Unknown date"}
                  </span>
                </div>
              </div>

              <div className="flex-1">
                <h3 className="line-clamp-2 text-lg font-bold text-gray-900 dark:text-white">
                  {task.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-gray-600 dark:text-slate-400">
                  {task.description}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between gap-3 pt-4 border-t border-red-100 dark:border-red-900/30">
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-red-500 dark:text-red-400">
                  <Trash2 size={16} />
                  In Trash
                </span>

                <button
                  type="button"
                  onClick={() => handleRestore(task._id)}
                  disabled={restoringId === task._id}
                  className="inline-flex h-9 items-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 disabled:cursor-not-allowed disabled:bg-blue-400 dark:disabled:bg-blue-800"
                  aria-label={`Restore ${task.title}`}
                >
                  {restoringId === task._id ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <RotateCcw size={16} strokeWidth={2.5} />
                  )}
                  <span>{restoringId === task._id ? "Restoring" : "Restore"}</span>
                </button>
              </div>
              
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          title={isSearching ? "No matches found" : "Trash is empty"}
          description={
            isSearching
              ? "No deleted tasks match your search criteria."
              : "You have no deleted tasks. Any tasks you delete will appear here."
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

export default DeletedTasks;