const ApiError = require('../error/ApiErrors');
const { validateAccessToken } = require('../services/tokenService');

module.exports = function (req, res, next) {
 try {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
   return next(ApiError.unathourizedError());
  }
  const accessToken = authorizationHeader.split(' ')[1];
  if (!accessToken) {
   return next(ApiError.unathourizedError());
  }
  const userData = validateAccessToken(accessToken);
  if (!userData) {
   return next(ApiError.unathourizedError());
  }
  req.user = userData;
  next();
 } catch (e) {
  return next(ApiError.unathourizedError());
 }
}