import { createContext, useCallback, useContext, useMemo, useState } from "react";
import {
  createTask,
  deleteTask,
  getDeletedTasks,
  getTaskHistory,
  getTasks,
  restoreTask,
  updateTask
} from "../services/taskService.js";

const TaskContext = createContext(null);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0
  });

  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 6,
    totalPages: 1
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTasks = useCallback(async (params = {}) => {
    setLoading(true);
    setError("");

    try {
      const response = await getTasks(params);

      setTasks(response.data || []);
      setStats(
        response.stats || {
          total: 0,
          pending: 0,
          inProgress: 0,
          completed: 0
        }
      );
      setPagination(
        response.pagination || {
          total: 0,
          page: 1,
          limit: 6,
          totalPages: 1
        }
      );

      return response;
    } catch (err) {
      const message = err.response?.data?.message || "Unable to load tasks";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const addTask = useCallback(async (formData) => {
    const response = await createTask(formData);
    return response.data;
  }, []);

  const saveTask = useCallback(async (taskId, formData) => {
    const response = await updateTask(taskId, formData);
    return response.data;
  }, []);

  const removeTask = useCallback(async (taskId) => {
    const response = await deleteTask(taskId);
    return response;
  }, []);

  const fetchHistory = useCallback(async () => {
    const response = await getTaskHistory();
    return response.data || [];
  }, []);

  const fetchDeletedTasks = useCallback(async () => {
    const response = await getDeletedTasks();
    return response.data || [];
  }, []);

  const restoreDeletedTask = useCallback(async (taskId) => {
    const response = await restoreTask(taskId);
    return response.data;
  }, []);

  const value = useMemo(
    () => ({
      tasks,
      stats,
      pagination,
      loading,
      error,
      fetchTasks,
      addTask,
      saveTask,
      removeTask,
      fetchHistory,
      fetchDeletedTasks,
      restoreDeletedTask
    }),
    [
      tasks,
      stats,
      pagination,
      loading,
      error,
      fetchTasks,
      addTask,
      saveTask,
      removeTask,
      fetchHistory,
      fetchDeletedTasks,
      restoreDeletedTask
    ]
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTasks = () => {
  return useContext(TaskContext);
};