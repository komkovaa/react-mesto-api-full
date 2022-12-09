const { Router } = require('express');
const { celebrate, Joi } = require('celebrate');

const userRouter = require('./users');
const cardRouter = require('./cards');
const { login } = require('../controllers/users');
const { createUser } = require('../controllers/users');
const { urlLink } = require('../models/user');
const { auth } = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-error');

const authRouter = new Router();
const router = new Router();

// authRouter.get('/crash-test', () => {
//   setTimeout(() => {
//     throw new Error('Сервер сейчас упадёт');
//   }, 0);
// }); // Удалить после ревью

authRouter.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(urlLink),
    about: Joi.string().min(2).max(30),
  }),
}), createUser);

authRouter.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

router.use('/', authRouter);
router.use(auth);

router.use('/users', userRouter);
router.use('/cards', cardRouter);

router.all('/*', (req, res, next) => {
  next(new NotFoundError('Страница не существует'));
});

module.exports = router;
