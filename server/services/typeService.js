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