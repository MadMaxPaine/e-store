const { create, getAll, deleteType } = require("../services/typeService");
class TypeController {
  constructor() {
    this.create = create;
    this.getAll = getAll;
    this.deleteType = deleteType;
  }
}
module.exports = new TypeController();
