module.exports = class ApiError extends Error {
 constructor(status, message, errors = []) {
  super(message);
  this.status = status;
  this.message = message;
  this.errors = errors;
 }
 static unathourizedError() {
  return new ApiError(401, "User doesn't authorized!");
 }
 static badRequest(message, errors = []) {
  return new ApiError(400, message, errors);
 }

 static internal(message) {
  return new ApiError(500, message);
 }

 static forbidden(message) {
  return new ApiError(403, message);
 }


 static notFound(message) {
    return new ApiError(404, message || 'Not found');
  }
}

