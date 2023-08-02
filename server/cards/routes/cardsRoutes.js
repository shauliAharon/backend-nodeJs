const express = require("express");
const {
  getCards,
  getCard,
  createCard,deleteCard,editCard,likeCard, getmyCards
} = require("../controllers/cardsController");
const auth = require("../../auth/authService");
const router = express.Router();

router.put("/:cardId",auth, getCard ,editCard);
router.get("/my_cards",auth,getmyCards); 
router.get("/", getCards);
router.get("/:cardId", getCard);
router.post("/", auth, createCard);
router.patch("/:cardId", auth, likeCard);
router.delete("/:cardId",auth, deleteCard);

module.exports = router;
