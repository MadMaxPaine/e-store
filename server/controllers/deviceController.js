const {
  create,
  getAll,
  getOne,
  deleteDevice,
} = require("../services/deviceService");

class DeviceController {
  constructor() {
    this.create = create;
    this.getAll = getAll;
    this.getOne = getOne;
    this.deleteDevice = deleteDevice;
  }
}

module.exports = new DeviceController();
