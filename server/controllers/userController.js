const { registration, login, logout, activate, refresh, getUsers, check } = require('../services/userService');
class UserController {
  constructor() {
    this.registration = registration;
    this.login = login;
    this.logout = logout;
    this.activate = activate;
    this.refresh = refresh;
    this.getUsers = getUsers;
    
  }
}
module.exports = new UserController();