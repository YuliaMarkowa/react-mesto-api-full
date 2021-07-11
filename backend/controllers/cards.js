const Card = require('../models/card');

const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');

const cardError = (res, card) => {
  if (!card) {
    throw new NotFoundError('Карточка отсутствует');
  }
  res.status(200).send(card);
};

const castCardError = (res, err, next) => {
  if (err.name === 'CastError') {
    throw new BadRequestError('Неправильный запрос');
  } else {
    next(err);
  }
};

const loadInitialCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Данные не прошли валидацию');
      } else {
        next(err);
      }
    })
    .catch(next);
};

const removeCard = (req, res, next) => {
  const id = req.params.cardId;
  Card.findById(id)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка отсутствует');
      }
      if (req.user._id === String(card.owner)) {
        return Card.findByIdAndRemove(id)
          .then(() => res.status(200).send({ message: 'Карточка удалена' }));
      }
      throw new ForbiddenError('Невозможно удалить карточку');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Неправильный запрос');
      } else {
        next(err);
      }
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  const id = req.params.cardId;
  Card.findByIdAndUpdate(
    id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => cardError(res, card))
    .catch((err) => castCardError(res, err, next))
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  const id = req.params.cardId;
  Card.findByIdAndUpdate(
    id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => cardError(res, card))
    .catch((err) => castCardError(res, err, next))
    .catch(next);
};

module.exports = {
  loadInitialCards,
  createCard,
  removeCard,
  likeCard,
  dislikeCard,
};
