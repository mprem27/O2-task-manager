import History from "../models/History.js";
import Task from "../models/Task.js";

const recordHistory = async (task, userId, action) => {
  await History.create({
    task: task._id,
    user: userId,
    action,
    titleSnapshot: task.title,
    statusSnapshot: task.status
  });
};

const buildTaskQuery = (userId, query) => {
  const filter = {
    user: userId,
    deletedAt: null
  };

  if (query.status) {
    filter.status = query.status;
  }

  if (query.search) {
    filter.$or = [
      { title: { $regex: query.search, $options: "i" } },
      { description: { $regex: query.search, $options: "i" } }
    ];
  }

  return filter;
};

export const getTasks = async (req, res, next) => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 50);
    const skip = (page - 1) * limit;
    const sortDirection = req.query.sort === "asc" ? 1 : -1;
    const filter = buildTaskQuery(req.user._id, req.query);

    const [tasks, total, stats] = await Promise.all([
      Task.find(filter).sort({ createdAt: sortDirection }).skip(skip).limit(limit),
      Task.countDocuments(filter),
      Task.aggregate([
        { $match: { user: req.user._id, deletedAt: null } },
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 }
          }
        }
      ])
    ]);

    const statusCounts = stats.reduce(
      (counts, item) => ({
        ...counts,
        [item._id]: item.count
      }),
      {}
    );

    res.json({
      success: true,
      data: tasks,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      },
      stats: {
        total: Object.values(statusCounts).reduce((sum, count) => sum + count, 0),
        pending: statusCounts.Pending || 0,
        inProgress: statusCounts["In Progress"] || 0,
        completed: statusCounts.Completed || 0
      }
    });
  } catch (error) {
    next(error);
  }
};

export const createTask = async (req, res, next) => {
  try {
    const { title, description, status = "Pending" } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required"
      });
    }

    if (description.trim().length < 20) {
      return res.status(400).json({
        success: false,
        message: "Description must be at least 20 characters"
      });
    }

    const task = await Task.create({
      title,
      description,
      status,
      user: req.user._id
    });

    await recordHistory(task, req.user._id, "CREATED");

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: task
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const { title, description, status } = req.body;
    const updates = {};

    if (title !== undefined) {
      updates.title = title;
    }

    if (description !== undefined) {
      if (description.trim().length < 20) {
        return res.status(400).json({
          success: false,
          message: "Description must be at least 20 characters"
        });
      }

      updates.description = description;
    }

    if (status !== undefined) {
      updates.status = status;
    }

    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id,
        deletedAt: null
      },
      updates,
      {
        new: true,
        runValidators: true
      }
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    await recordHistory(task, req.user._id, status === "Completed" ? "COMPLETED" : "UPDATED");

    res.json({
      success: true,
      message: "Task updated successfully",
      data: task
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id,
        deletedAt: null
      },
      {
        deletedAt: new Date()
      },
      {
        new: true
      }
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    await recordHistory(task, req.user._id, "DELETED");

    res.json({
      success: true,
      message: "Task deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};

export const getDeletedTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({
      user: req.user._id,
      deletedAt: { $ne: null }
    }).sort({ deletedAt: -1 });

    res.json({
      success: true,
      data: tasks
    });
  } catch (error) {
    next(error);
  }
};

export const restoreTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id,
        deletedAt: { $ne: null }
      },
      {
        deletedAt: null
      },
      {
        new: true
      }
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Deleted task not found"
      });
    }

    await recordHistory(task, req.user._id, "RESTORED");

    res.json({
      success: true,
      message: "Task restored successfully",
      data: task
    });
  } catch (error) {
    next(error);
  }
};

export const getHistory = async (req, res, next) => {
  try {
    const history = await History.find({ user: req.user._id })
      .populate("task", "title status deletedAt")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: history
    });
  } catch (error) {
    next(error);
  }
};
