const cardsRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  loadInitialCards,
  createCard,
  removeCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardsRouter.get('/cards', loadInitialCards);

cardsRouter.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(/http(s)?:\/\/w{0,3}?[a-zA-Z0-9]+[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]*/),
  }),
}), createCard);

cardsRouter.delete('/cards/:cardId', celebrate({
  body: Joi.object().keys({
    cardId: Joi.string().length(24),
  }),
}), removeCard);

cardsRouter.put('/cards/:cardId/likes', celebrate({
  body: Joi.object().keys({
    cardId: Joi.string().length(24),
  }),
}), likeCard);

cardsRouter.delete('/cards/:cardId/likes', celebrate({
  body: Joi.object().keys({
    cardId: Joi.string().length(24),
  }),
}), dislikeCard);

module.exports = cardsRouter;
