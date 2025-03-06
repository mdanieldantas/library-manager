module.exports = class HttpError extends Error {
  constructor(status, mensage) {
    super(message)
    this.status = status
  }
};
