const ApiError = require('../error/ApiErrors');
class UserController {
 async registration(req, res) {

 }
 async login(req, res) {

 }
 async check(req, res, next) {  
  const { id } = req.query;
  if (!id) { return next(ApiError.badRequest("No Id")); }
  res.json({ message: id });
 }
}

module.exports = new UserController();