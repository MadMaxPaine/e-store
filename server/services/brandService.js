const { Brand } = require("../models/models");
const ApiError = require("../error/ApiErrors");

module.exports.create = async function create(req, res) {
  const { name } = req.body;
  const brand = await Brand.create({ name });
  return res.json(brand);
};

module.exports.getAll = async function getAll(req, res) {
  const brands = await Brand.findAll();
  return res.json(brands);
};

module.exports.deleteBrand = async function deleteBrand(req, res, next) {
  try {
    const { id } = req.body;
    const brand = await Brand.findByPk(id);
    await brand.destroy();
    return res.json(brand);
  } catch (e) {
    next(ApiError.badRequest(e.message));
  }
};
