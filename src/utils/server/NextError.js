// src/utils/server/NextError.js
export class NextError extends Error {
  constructor(status, message, error = null, data = null) {
    super();
    this.status = status;
    this.message = message;
    this.data = data;
    this.error = error;
  }
}