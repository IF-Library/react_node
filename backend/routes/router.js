const router = require("express").Router();

const authRouter = require("./authRouter");
router.use("/", authRouter);

const taskRouter = require("./taskRouter");
router.use("/", taskRouter);

module.exports = router;