const mongoose = require('mongoose');
const { urlLink } = require('./user');

// Опишем схему
const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (link) => urlLink.test(link),
      message: () => 'Требуется http(s) ссылка',
    },
  },
  owner: {
    type: mongoose.ObjectId,
    ref: 'user', // показывает, у какой модели берем ID
    required: true,
  },
  likes: {
    type: Array,
    default: [],
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});
// Создаем модель и экспортируем ее
module.exports = mongoose.model('card', cardSchema);
