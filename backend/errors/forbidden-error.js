const http2 = require('node:http2');
const HTTPError = require('./http-error');

class ForbiddenError extends HTTPError {
  constructor(message) {
    super(message, http2.constants.HTTP_STATUS_FORBIDDEN);
  }
}

module.exports = ForbiddenError;
