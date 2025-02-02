const { Type } = require('../models/models');
const ApiError = require('../error/ApiErrors');

module.exports.create = async function create(req, res) {
 const { name } = req.body;
 const type = await Type.create({ name });
 return res.json(type);
}
module.exports.getAll = async function getAll(req, res) {
 const types = await Type.findAll();
 return res.json(types);
}
module.exports.deleteType = async function deleteType(req, res, next) {
    try {
      const { id } = req.body;
      const type = await Type.findByPk(id);
      await type.destroy();
      return res.json(type);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  };