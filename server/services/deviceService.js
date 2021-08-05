const uuid = require('uuid');
const path = require('path');
const { Device, DeviceInfo } = require('../models/models');
const ApiError = require('../error/ApiErrors');
const { parse } = require('dotenv');

module.exports.create = async function create(req, res, next) {
 try {
  let { name, price, brandId, typeId, info } = req.body;
  const { img } = req.files;
  const fileName = uuid.v4() + '.jpg';
  img.mv(path.resolve(__dirname, '..', 'static', fileName));
  const device = await Device.create({ name, price, brandId, typeId, img: fileName });
  if (info) {
   info = json.parse(info);
   info.forEach(element => {
    DeviceInfo.create({
     title: element.title,
     description: element.description,
     deviceId: device.id
    });
   });
  }

  return res.json(device);
 }
 catch (e) {
  next(ApiError.badRequest(e.message));
 }
}
module.exports.getAll = async function getAll(req, res) {
 let { brandId, typeId, limit, page } = req.query;
 //Have to make number , because in some cases it just do not work< and looks on it like on a string
 page = +(page || 1);
 limit = +(limit || 10);
 let offset = page * limit - limit;
 let devices;
 if (!brandId && !typeId) {
  devices = await Device.findAndCountAll({ limit, offset });
 }
 if (brandId && !typeId) {
  devices = await Device.findAndCountAll({ where: { brandId }, limit, offset });
 }
 if (!brandId && typeId) {
  devices = await Device.findAndCountAll({ where: { typeId }, limit, offset });
 }
 if (brandId && typeId) {
  devices = await Device.findAndCountAll({ where: { brandId, typeId }, limit, offset });
 }

 return res.json(devices);
}
module.exports.getOne = async function getOne(req, res) {
 const { id } = req.params;
 const device = await Device.findOne({
  where: { id },
  include: [{ model: DeviceInfo, as: 'info' }]
 });
 return res.json(device);
}