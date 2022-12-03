const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/anauthorized-error');

module.exports.auth = (req, res, next) => {
  const { authorization = '' } = req.headers;
  if (!authorization) {
    next(new UnauthorizedError('Необходима авторизация.ОШИБКА'));
  } else {
    const token = authorization.replace(/^Bearer*\s*/i, '');
    try {
      const decoded = jwt.verify(token, 'some-secret-key');
      req.user = { _id: decoded._id };
      next();
    } catch (err) {
      next(new UnauthorizedError('Необходима авторизация.'));
    }
  }
};
