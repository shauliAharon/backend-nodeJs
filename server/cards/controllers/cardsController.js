const { handleError } = require("../../utils/handleErrors");
const normalizeCard = require("../helpers/normalizeCard");
const validateCard = require("../models/joi/validateCard");
const Card = require("../models/mongoose/Card");

const getCards = async (req, res) => {
  try {
    const cards = await Card.find().sort({ createdAt: "descending" });
    if (!cards) throw new Error("is no have a cards in the database");
    return res.send(cards);
  } catch (error) {
    return handleError(res, 500, `Mongoose Error: ${error.message}`);
  }
};

const getCard = async (req, res, next) => {
try {
  const id = req.params.cardId;
  const card = await Card.findById(id);
  if(!card) 
  throw new Error("card whit this id not exist");
  if(!req.user)
   return res.status(201).send(card)
  req.card = card;
  next()
} catch (error) {
  handleError(res, 403, error.message);
}
};

const getmyCards = async (req, res) => {
  try {
    const {_id} = req.user;
    if (!req.user.isBusiness)
      throw new Error("You need to be a business user to see the tickets");
    const myCards = await  Card.find({ user_id: _id});
    if (!myCards) throw new Error("this user does not have cards in the database");
    res.status(201).send(myCards);
  } catch (error) {
    handleError(res, 403, error.message);
  }
};

const editCard = async (req, res) => {
  try {
    const card = req.card;
    const { _id } = req.user;
    if (`${card.user_id}` !== _id)
      throw new Error(
        "Only the user who created the card can make changes"
      );
    const cardFromClient = req.body;
    const editCard = await Card.findByIdAndUpdate(card._id, cardFromClient, {
      new: true,
    });
    if (!editCard)
      throw new Error("There was an error updating the business card");
    res.status(201).send(editCard);
  } catch (error) {
    handleError(res, 403, error.message);
  }
};

const likeCard = async (req, res) => {
  try {
    const userId = req.user._id;
    const id = req.params.cardId;
    const card = await Card.findById(id);
    if (!card)
      throw new Error("A card with this ID cannot be found in the database");
    const likesCard = card.likes.findIndex((id) => id === userId);
    if (likesCard === -1) {
      card.likes.push(userId);
      card.save();
    }
    if (likesCard >= 0) {
      card.likes.splice(likesCard, likesCard + 1);
      card.save();
    }
    res.status(201).send(card);
  } catch (error) {
    handleError(res, 400, error.message);
  }
};

const deleteCard = async (req, res) => {
    try {
      const user = req.user;
      const { cardId } = req.params;
      const card = await Card.findById(cardId);
      if (!user.isAdmin && user._id !== `${card.user_id}`)
        throw new Error(
          "Only an admin user or the user who created this card is authorized to perform this action"
        );
      const deleteCard = await Card.findByIdAndDelete(cardId);
      if (!deleteCard) throw new Error("user id not found");
      res.status(201).send(deleteCard);
    } catch (error) {
      handleError(res, 403, `mongoDB Error: ${error.message}`);
    }
};

const createCard = async (req, res) => {
  try {
    const card = req.body;
    const user = req.user;
    if (!user.isBusiness)
      throw new Error(
        "You must be a business type user in order to create a new business card"
      );
      const { error } = validateCard(card);
if (error)
return handleError(res, 400, `Joi Error: ${error.details[0].message}`);
const normalizedCard = await normalizeCard(card, user._id);
const cardToDB = new Card(normalizedCard);
const cardFromDB = await cardToDB.save();
    res.send(cardFromDB);
  } catch (error) {
    return handleError(res, 500, `Mongoose Error: ${error.message}`);
  }
};

exports.getCards = getCards;
exports.getCard = getCard;
exports.createCard = createCard;
exports.getmyCards = getmyCards;
exports.editCard = editCard;
exports.likeCard = likeCard;
exports.deleteCard = deleteCard;
