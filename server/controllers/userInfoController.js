const { create } = require('../services/userInfoService');
class UserInfoController {
 constructor() {
  this.create = create;  
 }
}
module.exports = new UserInfoController();