const http2 = require('node:http2');
const HTTPError = require('./http-error');

class BadRequestError extends HTTPError {
  constructor(message) {
    super(message, http2.constants.HTTP_STATUS_BAD_REQUEST);
  }
}

module.exports = BadRequestError;
