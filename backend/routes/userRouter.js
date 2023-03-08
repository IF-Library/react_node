const router = require("express").Router();
const { imageUpload } = require("../middlewares/imageUpload");

// Controller
const {
  register,
  login,
  forgot_password,
  reset_password,
  update,
} = require("../controllers/userController");

// middlewares
const {
  userCreateValidation,
  loginValidation,
  userUpdateValidation,
} = require("../middlewares/userValidation");
const validate = require("../middlewares/handleValidations");


router.post("/register", userCreateValidation(), validate, register);
router.post("/login", loginValidation(), validate, login);
router.post("/forgot_password", forgot_password);
router.post("/reset_password", reset_password);
router.put("/user", validate,  imageUpload.single("profileImage"), update);

module.exports = router;