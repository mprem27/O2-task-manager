import React, { useEffect, useMemo, useState } from "react";
import { Filter, PlusCircle, XCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import EmptyState from "../components/EmptyState.jsx";
import Loader from "../components/Loader.jsx";
import Pagination from "../components/Pagination.jsx";
import SearchBar from "../components/SearchBar.jsx";
import StatsCards from "../components/StatsCards.jsx";
import TaskCard from "../components/TaskCard.jsx";
import { useTasks } from "../context/TaskContext.jsx";

const filters = [
    { label: "All Tasks", value: "" },
    { label: "Pending", value: "Pending" },
    { label: "In Progress", value: "In Progress" },
    { label: "Completed", value: "Completed" }
];

const Dashboard = () => {
    const navigate = useNavigate();
    const {
        tasks,
        stats,
        pagination,
        loading,
        error,
        fetchTasks,
        saveTask,
        removeTask
    } = useTasks();

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [page, setPage] = useState(1);

    const queryParams = useMemo(
        () => ({
            search: search || undefined,
            status: status || undefined,
            page,
            limit: 6,
            sort: "desc"
        }),
        [search, status, page]
    );

    useEffect(() => {
        fetchTasks(queryParams).catch(() => { });
    }, [fetchTasks, queryParams]);

    const handleSearch = (value) => {
        setSearch(value);
        setPage(1);
    };

    const handleFilter = (value) => {
        setStatus(value);
        setPage(1);
    };

    const handleComplete = async (task) => {
        await saveTask(task._id, { status: "Completed" });
        fetchTasks(queryParams).catch(() => { });
    };

    const handleDelete = async (taskId) => {
        await removeTask(taskId);
        fetchTasks(queryParams).catch(() => { });
    };

    const clearFilters = () => {
        setSearch("");
        setStatus("");
        setPage(1);
    };

    const isFiltering = search !== "" || status !== "";

    return (
        <section className="mx-auto max-w-7xl space-y-8 pb-8">

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                        Dashboard
                    </p>
                    <h2 className="mt-1 text-2xl font-extrabold text-gray-900 dark:text-white">
                        Task Overview
                    </h2>
                    <p className="mt-2 text-sm text-gray-500 dark:text-slate-400">
                        View, search, and manage your project tasks efficiently.
                    </p>
                </div>

                <Link
                    to="/add-task"
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    <PlusCircle size={20} strokeWidth={2.5} />
                    <span>Add Task</span>
                </Link>
            </div>

            <StatsCards stats={stats} />

            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all dark:border-slate-700 dark:bg-slate-800">
                <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                    <div className="w-full md:max-w-md">
                        <SearchBar
                            value={search}
                            onChange={handleSearch}
                            placeholder="Search by title or description..."
                        />
                    </div>

                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        <div className="flex items-center gap-2 pr-2 text-sm font-semibold text-gray-500 dark:text-slate-400">
                            <Filter size={18} />
                            <span className="hidden sm:inline">Filter:</span>
                        </div>

                        {filters.map((item) => {
                            const isActive = status === item.value;
                            return (
                                <button
                                    key={item.label}
                                    type="button"
                                    onClick={() => handleFilter(item.value)}
                                    className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 ${isActive
                                            ? "bg-blue-600 text-white shadow-md dark:bg-blue-500"
                                            : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
                                        }`}
                                >
                                    {item.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-400">
                    {error}
                </div>
            )}

            {loading ? (
                <Loader text="Loading your tasks..." />
            ) : tasks.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {tasks.map((task) => (
                            <TaskCard
                                key={task._id}
                                task={task}
                                onComplete={handleComplete}
                                onEdit={() => navigate(`/edit-task/${task._id}`)} // Fixed empty onEdit function
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>

                    <Pagination
                        page={pagination.page}
                        totalPages={pagination.totalPages}
                        onPageChange={setPage}
                    />
                </>
            ) : (
                <EmptyState
                    title={isFiltering ? "No matching tasks found" : "No tasks available"}
                    description={
                        isFiltering
                            ? "We couldn't find any tasks matching your current search and filter settings."
                            : "Your dashboard is currently empty. Get started by creating a new task."
                    }
                >
                    {isFiltering ? (
                        <button
                            onClick={clearFilters}
                            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-200 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
                        >
                            <XCircle size={18} />
                            Clear Filters
                        </button>
                    ) : (
                        <Link
                            to="/add-task"
                            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                        >
                            <PlusCircle size={18} />
                            Add First Task
                        </Link>
                    )}
                </EmptyState>
            )}
        </section>
    );
};

export default Dashboard;