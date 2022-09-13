const { create, getOne } = require('../services/userInfoService');
class UserInfoController {
 constructor() {
  this.create = create;
  this.getOne = getOne;
 }
}
module.exports = new UserInfoController();