const { registration, login, logout, activate, refresh, getUsers, check } = require('../services/userService');
class UserInfoController {
 constructor() {
  this.create = create;
  this.getOne = getOne;
  this.getAll = getAll;

 }
}
module.exports = new UserController();