const router = require("express").Router();

const userRouter = require("./userRouter");
router.use("/user", userRouter);

const taskRouter = require("./taskRouter");
router.use("/task", taskRouter);

module.exports = router;