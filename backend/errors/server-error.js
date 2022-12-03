const http2 = require('node:http2');
const HTTPError = require('./http-error');

class ServerError extends HTTPError {
  constructor(message) {
    super(message, http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR);
  }
}

module.exports = ServerError;
