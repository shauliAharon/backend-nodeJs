const express = require("express");
const router = express.Router();
const { register, login, getUsers, getUser, editUser, changeStatusBiz, deleteUser } = require("../controllers/usersController");
const auth = require("../../auth/authService");

router.post("/", register);
router.post("/login", login);
router.get("/:id", auth, getUser);
router.get("/",auth ,getUsers);
router.put("/:id", auth, editUser);
router.patch("/:id", auth, changeStatusBiz);
router.delete("/:id", auth, deleteUser);

module.exports = router;
