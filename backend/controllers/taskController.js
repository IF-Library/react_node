const Task = require("../models/Task");
const User = require("../models/User");

const taskController = {
  createTask: async (req, res) => {
    try {
      const { title, description } = req.body;
      const user = req.userId;
      const task = await Task.create({ title, description, user });
      res.status(200).json({ task, msg: "Task have been created" });
    } catch (error) {
      return res.status(400).json({ errors: "Error creating new task" });
    }
  },
  getTask: async (req, res) => {
    try {
      const taskId = req.params.id;
      const task = await Task.findById(taskId);
      res.status(200).json({ task });
    } catch (error) {
      return res.status(400).json({ errors: "Task not found" });
    }
  },
  getAllTasks: async (req, res) => {
    try {
      const user = req.userId;
      const tasks = await Task.find({ user });
      res.status(200).json({ tasks });
    } catch (error) {
      return res.status(400).json({ errors: "Tasks not found" });
    }
  },
  updateTask: async (req, res) => {
    try {
      const taskId = req.params.id;
    // { new: true } permite que retornemos a nova tarefa e não a antiga
      Task.findByIdAndUpdate(taskId, req.body, { new: true }).then((updatedTask) => {
        res.status(200).json({ updatedTask });
      });
    } catch (error) {
      return res.status(400).json({ errors: "Cannot update task" });
    }
  },
  deleteTask: async (req, res) => {
    try {
      const taskId = req.params.id;
      await Task.findByIdAndDelete(taskId);
      res.status(200).json({ msg: "Task has been deleted" });
    } catch (error) {
      return res.status(400).json({ errors: "Cannot delete task" });
    }
  },
};

module.exports = taskController;
