const router = require("express").Router();
const { createTask, deleteTask, getAllTasks, getTask, updateTask } = require("../controllers/taskController");
const auth = require("../middlewares/auth");

// o authMiddleware entra para validar o token do usuário, só depois de validado prossegue para as rotas
router.post("/createTask", auth, createTask);
router.get("/getTasks", auth, getAllTasks);
router.get("/getTask", auth, getTask);
router.delete("/deleteTask/:id", auth, deleteTask);
router.put("/updateTask/:id", auth, updateTask);

module.exports = router;