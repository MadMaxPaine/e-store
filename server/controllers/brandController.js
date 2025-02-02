const { create, getAll, deleteBrand } = require('../services/brandService');
class BrandController {
 constructor() {
  this.create = create;
  this.getAll = getAll;
  this.deleteBrand = deleteBrand;
 }
}

module.exports = new BrandController();