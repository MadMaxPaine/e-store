const { create, getAll } = require('../services/brandService');
class BrandController {
 constructor() {
  this.create = create;
  this.getAll = getAll;
 }
}

module.exports = new BrandController();