const router = require("express").Router();
const taskController = require("../controllers/taskController");
const authMiddleware = require("../middlewares/auth");

// o authMiddleware entra para validar o token do usuário, só depois de validado prossegue para as rotas
router.use(authMiddleware);
router.route("/createTask").post((req, res) => taskController.createTask(req, res));
router.route("/getTask").get((req, res) => taskController.getAllTasks(req, res));
router.route("/getTask/:id").get((req, res) => taskController.getTask(req, res));
router.route("/deleteTask/:id").delete((req, res) => taskController.deleteTask(req, res));
router.route("/updateTask/:id").put((req, res) => taskController.updateTask(req, res));

module.exports = router;