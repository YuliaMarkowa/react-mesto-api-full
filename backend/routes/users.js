const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  loadUsers,
  loadActualUser,
  loadUserId,
  updateUserBio,
  updateAvatar,
} = require('../controllers/users');

usersRouter.get('/users', loadUsers);
usersRouter.get('/users/me', loadActualUser);

usersRouter.get('/users/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().min(24).hex(),
  }),
}), loadUserId);

usersRouter.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUserBio);

usersRouter.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(/http(s)?:\/\/w{0,3}?[a-zA-Z0-9]+[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]*/),
  }),
}), updateAvatar);

module.exports = usersRouter;
