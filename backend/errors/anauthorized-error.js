const http2 = require('node:http2');
const HTTPError = require('./http-error');

class UnauthorizedError extends HTTPError {
  constructor(message) {
    super(message, http2.constants.HTTP_STATUS_UNAUTHORIZED);
  }
}

module.exports = UnauthorizedError;
