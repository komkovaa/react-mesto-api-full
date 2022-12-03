const express = require('express');
const mongoose = require('mongoose');
const http2 = require('node:http2');

const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();

app.use(requestLogger);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(router);

app.use(errorLogger);

app.use(errors());
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;
  const message = statusCode === http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR ? 'На сервере произошла ошибка' : err.message;
  res.status(statusCode).send({ message });
  next();
});

app.listen(PORT);
