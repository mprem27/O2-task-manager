import React from "react";
import { CalendarDays, CheckCircle2, Pencil, Trash2 } from "lucide-react";

const statusStyles = {
  Pending: "bg-amber-100 text-amber-700 border border-amber-200 dark:bg-amber-900/40 dark:text-amber-400 dark:border-amber-800",
  "In Progress": "bg-blue-100 text-blue-700 border border-blue-200 dark:bg-blue-900/40 dark:text-blue-400 dark:border-blue-800",
  Completed: "bg-emerald-100 text-emerald-700 border border-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-400 dark:border-emerald-800"
};

const TaskCard = ({ task, onComplete, onEdit, onDelete }) => {
  const formattedDate = new Date(task.createdAt || Date.now()).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });

  const isCompleted = task.status === "Completed";

  return (
    <div 
      className={`flex flex-col h-full rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 ${isCompleted ? 'opacity-80' : ''}`}
    >
      
      <div className="mb-4 flex items-start justify-between gap-3">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            statusStyles[task.status] ||
            "bg-gray-100 text-gray-700 border border-gray-200 dark:bg-slate-700 dark:text-slate-300"
          }`}
        >
          {task.status}
        </span>

        <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-slate-400">
          <CalendarDays size={14} />
          <span>{formattedDate}</span>
        </div>
      </div>

      <div className="flex-1">
        <h3 
          className={`line-clamp-2 text-lg font-bold transition-colors ${
            isCompleted ? 'text-gray-400 line-through dark:text-gray-500' : 'text-gray-900 dark:text-white'
          }`}
        >
          {task.title}
        </h3>

        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-gray-600 dark:text-slate-400">
          {task.description}
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between gap-3 pt-4 border-t border-gray-100 dark:border-slate-700">
        
        <button
          type="button"
          onClick={() => onComplete(task)}
          disabled={isCompleted}
          className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1"
          aria-label={`Mark ${task.title} as completed`}
        >
          <CheckCircle2 size={16} strokeWidth={2.5} />
          {isCompleted ? "Done" : "Complete"}
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onEdit(task)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-300 text-gray-600 transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
            title="Edit task"
            aria-label={`Edit ${task.title}`}
          >
            <Pencil size={16} />
          </button>

          <button
            type="button"
            onClick={() => onDelete(task._id)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-200 text-red-600 transition-colors hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-900/30"
            title="Delete task"
            aria-label={`Delete ${task.title}`}
          >
            <Trash2 size={16} />
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default TaskCard;