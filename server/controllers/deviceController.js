const { create, getAll, getOne } = require('../services/deviceService');

class DeviceController {
 constructor() {
  this.create = create;
  this.getAll = getAll;
  this.getOne = getOne;
 }
}

module.exports = new DeviceController();