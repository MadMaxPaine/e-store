const { Brand } = require('../models/models');
const ApiError = require('../error/ApiErrors');

module.exports.create = async function create(req, res) {
 const { name } = req.body;
 const brand = await Brand.create({ name });
 return res.json(brand);
};

module.exports.getAll = async function getAll(req, res) {
 const brands = await Brand.findAll();
 return res.json(brands);
}