import React, { useState } from "react";
import { Save, AlertCircle, Loader2 } from "lucide-react";

const initialForm = {
    title: "",
    description: "",
    status: "Pending"
};

const TaskForm = ({ onSubmit, submitting = false }) => {
    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((prev) => ({
            ...prev,
            [name]: value
        }));

        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: null }));
        }
    };

    const validateForm = () => {
        const nextErrors = {};

        if (!form.title.trim()) {
            nextErrors.title = "Task title is required";
        }

        if (!form.description.trim()) {
            nextErrors.description = "Description is required";
        } else if (form.description.trim().length < 20) {
            nextErrors.description = "Description must be at least 20 characters";
        }

        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        await onSubmit(form);
        setForm(initialForm);
        setErrors({});
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm transition-all dark:border-slate-700 dark:bg-slate-800"
        >
            <div className="grid gap-6">

                <div>
                    <label htmlFor="title" className="mb-2 block text-sm font-semibold text-gray-700 dark:text-slate-200">
                        Task Title <span className="text-red-500">*</span>
                    </label>

                    <input
                        id="title"
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        placeholder="Enter task title"
                        className={`h-11 w-full rounded-lg border bg-white px-4 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 dark:bg-slate-900 dark:text-white
              ${errors.title
                                ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 dark:border-red-500 dark:focus:ring-red-900/30'
                                : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:focus:border-blue-400 dark:focus:ring-blue-900/30'
                            }
            `}   />
                    {errors.title && (
                        <div className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-red-600 dark:text-red-400">
                            <AlertCircle size={14} />
                            <p>{errors.title}</p>
                        </div>
                    )}
                </div>

                <div>
                    <label htmlFor="description" className="mb-2 block text-sm font-semibold text-gray-700 dark:text-slate-200">
                        Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Enter a detailed description (min. 20 characters)"
                        rows="5"
                        className={`w-full resize-none rounded-lg border bg-white p-4 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 dark:bg-slate-900 dark:text-white
              ${errors.description
                                ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 dark:border-red-500 dark:focus:ring-red-900/30'
                                : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:focus:border-blue-400 dark:focus:ring-blue-900/30'
                            }
            `} />
                    {errors.description && (
                        <div className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-red-600 dark:text-red-400">
                            <AlertCircle size={14} />
                            <p>{errors.description}</p>
                        </div>
                    )}
                </div>

                <div>
                    <label htmlFor="status" className="mb-2 block text-sm font-semibold text-gray-700 dark:text-slate-200">
                        Status
                    </label>

                    <select
                        id="status"
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        className="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-900 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-900 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-900/30"
                    >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                    </select>
                </div>

                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={submitting}
                        className="inline-flex h-11 w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-blue-400 dark:disabled:bg-blue-800"
                    >
                        {submitting ? (
                            <>
                                <Loader2 size={18} className="animate-spin" />
                                <span>Saving...</span>
                            </>
                        ) : (
                            <>
                                <Save size={18} strokeWidth={2.5} />
                                <span>Save Task</span>
                            </>
                        )}
                    </button>
                </div>

            </div>
        </form>
    );
};

export default TaskForm;