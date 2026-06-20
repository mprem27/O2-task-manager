import React from "react";
import { CheckCircle2, ListTodo, Timer, TrendingUp } from "lucide-react";

const statsConfig = [
  {
    key: "total",
    label: "Total Tasks",
    icon: ListTodo,
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400"
  },
  {
    key: "pending",
    label: "Pending Tasks",
    icon: Timer,
    color: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400"
  },
  {
    key: "inProgress",
    label: "In Progress",
    icon: TrendingUp,
    color: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400"
  },
  {
    key: "completed",
    label: "Completed",
    icon: CheckCircle2,
    color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400"
  }
];

const StatsCards = ({ stats = {} }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-6">
      {statsConfig.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.key}
            className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
          >
            <div className="flex items-center justify-between gap-4">
              
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-slate-400">
                  {item.label}
                </p>
                <h3 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                  {stats[item.key] || 0}
                </h3>
              </div>

              <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg ${item.color}`}>
                <Icon size={24} strokeWidth={2} />
              </div>
              
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;