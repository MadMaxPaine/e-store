const { create, getAll } = require('../services/typeService');
class TypeController {
 constructor() {
  this.create = create;
  this.getAll = getAll;
 }
}
module.exports = new TypeController();