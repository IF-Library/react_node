const router = require("express").Router();
const authController = require("../controllers/authController");

router.route("/register").post((req, res) => authController.register(req, res));
router.route("/authenticate").post((req, res) => authController.authenticate(req, res));
router.route("/forgot_password").post((req, res) => authController.forgot_password(req, res));
router.route("/reset_password").post((req, res) => authController.reset_password(req, res));

module.exports = router;