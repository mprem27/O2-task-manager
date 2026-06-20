import express from "express";
import {
  createTask,
  deleteTask,
  getDeletedTasks,
  getHistory,
  getTasks,
  restoreTask,
  updateTask
} from "../controllers/taskController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", getTasks);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.get("/meta/history", getHistory);
router.get("/meta/deleted", getDeletedTasks);
router.put("/:id/restore", restoreTask);

export default router;
