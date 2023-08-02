const express = require("express");
const router = express.Router();
const cardsRoutes = require("../cards/routes/cardsRoutes");
const usersRoutes = require("../users/routes/usersRoutes");
const { handleError } = require("../utils/handleErrors");

router.use("/cards", cardsRoutes);
router.use("/users", usersRoutes);

router.use((req, res) => handleError(res));
// router.use("*",(req, res) => handleError(res));

module.exports = router;
