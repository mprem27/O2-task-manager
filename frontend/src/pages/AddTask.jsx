import React, { useState } from "react";
import { ArrowLeft, PlusCircle, AlertCircle, CheckCircle2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm.jsx";
import { useTasks } from "../context/TaskContext.jsx";

const AddTask = () => {
  const navigate = useNavigate();
  const { addTask } = useTasks();

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (formData) => {
    setSubmitting(true);
    setError("");
    setSuccess("");

    try {
      await addTask({
        title: formData.title.trim(),
        description: formData.description.trim(),
        status: formData.status
      });

      setSuccess("Task created successfully! Redirecting...");

      setTimeout(() => {
        navigate("/");
      }, 1200);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to create task. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mx-auto max-w-3xl px-4 py-8">
      
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Create Task
          </p>

          <h2 className="mt-1 text-2xl font-extrabold text-gray-900 dark:text-white">
            Add New Task
          </h2>

          <p className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-slate-400 max-w-xl">
            Fill out the details below to add a new task to your board. Ensure your description is detailed enough (minimum 20 characters) for clear tracking.
          </p>
        </div>

        <Link
          to="/"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
        >
          <ArrowLeft size={18} strokeWidth={2.5} />
          <span>Back</span>
        </Link>
      </div>

      <div aria-live="polite" className="mb-6">
        {error && (
          <div className="flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-400">
            <AlertCircle size={18} className="flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {success && (
          <div className="flex items-center gap-3 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-900/20 dark:text-emerald-400">
            <CheckCircle2 size={18} className="flex-shrink-0" />
            <p>{success}</p>
          </div>
        )}
      </div>

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden dark:border-slate-700 dark:bg-slate-800">
        
        <div className="flex items-center gap-4 border-b border-gray-100 px-6 py-5 dark:border-slate-700/50">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
            <PlusCircle size={24} strokeWidth={2} />
          </div>

          <div>
            <h3 className="font-bold text-gray-900 dark:text-white text-lg">
              Task Information
            </h3>
            <p className="text-sm text-gray-500 dark:text-slate-400">
              Set the foundational details for this assignment.
            </p>
          </div>
        </div>

        <div className="p-2 sm:p-4">
          <TaskForm onSubmit={handleSubmit} submitting={submitting} />
        </div>
        
      </div>
    </section>
  );
};

export default AddTask;