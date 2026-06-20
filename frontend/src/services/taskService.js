import api from "./api.js";

export const getTasks = async (params = {}) => {
  const response = await api.get("/tasks", { params });
  return response.data;
};

export const createTask = async (formData) => {
  const response = await api.post("/tasks", formData);
  return response.data;
};

export const updateTask = async (taskId, formData) => {
  const response = await api.put(`/tasks/${taskId}`, formData);
  return response.data;
};

export const deleteTask = async (taskId) => {
  const response = await api.delete(`/tasks/${taskId}`);
  return response.data;
};

export const getTaskHistory = async () => {
  const response = await api.get("/tasks/meta/history");
  return response.data;
};

export const getDeletedTasks = async () => {
  const response = await api.get("/tasks/meta/deleted");
  return response.data;
};

export const restoreTask = async (taskId) => {
  const response = await api.put(`/tasks/${taskId}/restore`);
  return response.data;
};