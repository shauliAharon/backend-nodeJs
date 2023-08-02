const { generateAuthToken } = require("../../auth/Providers/jwt");
const { handleError } = require("../../utils/handleErrors");
const { comparePassword } = require("../helpers/bcrypt");
const normalizeUser = require("../helpers/normalizeUser");
const loginValidation = require("../models/joi/loginValidation");
const registerValidation = require("../models/joi/registerValidation");
const User = require("../models/mongoose/User");

const register = async (req, res) => {
  try {
    const user = req.body;
    const { email } = user;

    const { error } = registerValidation(user);
    if (error)
      return handleError(res, 400, `Joi Error: ${error.details[0].message}`);
    const isUserExistInDB = await User.findOne({ email });
    if (isUserExistInDB) throw new Error("User already registered");
    const normalizedUser = normalizeUser(user);
    const userForBD = new User(normalizedUser);
    const userFromDB = await userForBD.save();
    res.send(userFromDB);
  } catch (error) {
    return handleError(res, 500, `Mongoose Error: ${error.message}`);
  }
};

const login = async (req, res) => {
  try {
    const user = req.body;
    const { email } = user;
    const { error } = loginValidation(user);
    if (error)
      return handleError(res, 400, `Joi Error: ${error.details[0].message}`);
    const userInDb = await User.findOne({ email });
    if (!userInDb)
      throw new Error("Authentication Error: Invalid email or password");
    const isPasswordValid = comparePassword(user.password, userInDb.password);
    if (!isPasswordValid)
      throw new Error("Authentication Error: Invalid email or password");
    const { _id, isBusiness, isAdmin } = userInDb;
    const token = generateAuthToken({ _id, isBusiness, isAdmin });
    res.send(token);
  } catch (error) {
    const isAuthError =
      error.message === "Authentication Error: Invalid email or password";
    return handleError(
      res,
      isAuthError ? 403 : 500,
      `Mongoose Error: ${error.message}`
    );}
  };

const getUsers = async (req, res) => {
  try {
    const token = req.user;
    if (!token.isAdmin)
      throw new Error(
        "To get information about the all users the  user must be admin"
      );
    const users = await User.find();
    res.status(201).send(users);
  } catch (error) {
    handleError(res, 500, `mongo error: ${error.message}`);
  }
};

const getUser = async (req, res) => {
  try {
    const token = req.user;
    const id = req.params.id.trim();
    if (!token.isAdmin && token._id !== id) {
      throw new Error("Only an admin user or a registered user may view a user");
    }
    const user = await User.findById(id);
    if (!user) throw new Error("user id not found");
    res.status(201).send(user);
  } catch (error) {
    handleError(res, 500, `mongo error: ${error.message}`);
  }
};

const editUser = async (req, res) => {
  try {
    const token = req.user;
    const { id } = req.params;
    if (token._id !== id)
    throw new Error("Only the user is self can make changes to this profile");
    const UserFromClient = req.body;
    const updateUser = await User.findByIdAndUpdate(id, UserFromClient, {
      new: true,
    });
    if (!updateUser) throw new Error("user id not found");
    res.status(201).send(updateUser);
  } catch (error) {
    handleError(res, 403, error.message);
  }
};

const changeStatusBiz = async (req, res) => {
  try {
    const { id } = req.params;
    const token = req.user;

       if (id !== token._id) {
      throw new Error(
        'Only the user may change the status'
      );
    }
    const userFromDB = await User.findById(id);
    if (!userFromDB) throw new Error("User not found");
    userFromDB.isBusiness = !userFromDB.isBusiness;
    await userFromDB.save();
    res.status(201).send(userFromDB);
  } catch (error) {
    handleError(res, 403, error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = req.user;
    const id = req.params.id.trim();
    if (!user.isAdmin && user._id !== id) { 
      throw new Error("Only an admin user or register user may delete a user");
    }
    const userDelete = await User.findByIdAndDelete(id);
    if (!userDelete) throw new Error("user id not found");
    res.status(201).send(userDelete);
  } catch (error) {
    handleError(res, 403, error.message);
  }
};

exports.register = register;
exports.login = login;
exports.getUsers = getUsers;
exports.getUser = getUser;
exports.editUser = editUser;
exports.changeStatusBiz = changeStatusBiz;
exports.deleteUser = deleteUser;
