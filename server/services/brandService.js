const { Brand, Device } = require("../models/models");
const ApiError = require("../error/ApiErrors");

module.exports.create = async function create(req, res, next) {
  try {
    const { name } = req.body;   
    const existingBrand = await Brand.findOne({ where: { name } });

    if (existingBrand) {
      return res.status(400).json({ message: "Brand already exists" });
    }
    const brand = await Brand.create({ name });
    return res.json(brand);
  } catch (e) {
    next(e); 
  }
};

module.exports.getAll = async function getAll(req, res) {
  const brands = await Brand.findAll();
  return res.json(brands);
};

module.exports.deleteBrand = async function deleteBrand(req, res, next) {
  try {
    const { name } = req.body;
    console.log(req.body);
    const brand = await Brand.findOne({ where: { name } });
    const relatedDevicesCount = await Device.count({
      where: { brandId: brand.id },
    });

    if (relatedDevicesCount > 0) {
      return next(
        ApiError.badRequest(
          `Unable to remove '${name}', because ${relatedDevicesCount} connected goods.`
        )
      );
    }
    await brand.destroy();
    return res.json(brand);
  } catch (e) {
    next(ApiError.badRequest(e.message));
  }
};
