const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const User = require('../models/user');

const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const ConflictingRequestError = require('../errors/conflicting-request-err');
const UnauthorizedError = require('../errors/unauthorized-err');

const loadUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
};

const loadUserId = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.status(200).send(user);
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

const loadActualUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((data) => {
      if (!data) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.status(200).send(data);
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then(() => res.status(200).send({ message: 'Регистрация прошла успешно' }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Данные не прошли валидацию');
      } else if (err.name === 'MongoError' && err.code === 11000) {
        throw new ConflictingRequestError('Такая почта уже есть');
      } else {
        next(err);
      }
    })
    .catch(next);
};

const updateUserBio = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Данные не прошли валидацию');
      } else if (err.name === 'CastError') {
        throw new BadRequestError('Данные не прошли валидацию');
      } else {
        next(err);
      }
    })
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Данные не прошли валидацию');
      } else if (err.name === 'CastError') {
        throw new BadRequestError('Данные не прошли валидацию');
      } else {
        next(err);
      }
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(() => {
      throw new UnauthorizedError('Неправильный запрос');
    })
    .catch(next);
};

module.exports = {
  loadUsers,
  loadUserId,
  loadActualUser,
  createUser,
  updateUserBio,
  updateAvatar,
  login,
};
