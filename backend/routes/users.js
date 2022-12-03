const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { urlLink } = require('../models/user');
const {
  getUsers, getUserId, updateProfileInfo, updateAvatar, currentUser,
} = require('../controllers/users');

userRouter.get('/', getUsers);

userRouter.get('/me', currentUser);

userRouter.get('/:userId', celebrate({
  params: Joi.object({
    userId: Joi.alternatives().try(
      Joi.string().equal(':userId'),
      Joi.string().hex().length(24).required(),
    ).required(),
  }).required(),
}), getUserId);

userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateProfileInfo);

userRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(urlLink).uri({ scheme: ['http', 'https'] }),
  }),
}), updateAvatar);

module.exports = userRouter;
