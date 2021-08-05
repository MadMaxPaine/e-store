const { registration, login, check } = require('../services/userService');
class UserController {
  constructor() {
    this.registration = registration;
    this.login = login;
    this.check = check;
  }
}
module.exports = new UserController();