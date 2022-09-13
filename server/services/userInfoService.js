const fs = require('fs');
const { UserInfo } = require('../models/models');
const ApiError = require('../error/ApiErrors');
const path = require('path');
const uuid = require('uuid');


module.exports.create = async function create(req, res, next) {
 try {
  const { firstName, lastName, phone, gender, avatar } = req.body;
  let regex = /^data:.+\/(.+);base64,(.*)$/;
  let matches = avatar.match(regex);
  let ext = matches[1];
  let data = matches[2];
  let buffer = Buffer.from(data, 'base64');
  const fileName = uuid.v4() + '.' + ext;
  fs.writeFileSync(path.resolve(__dirname, '..', 'static', fileName), buffer);
  await UserInfo.create({ firstName, 'secondName': lastName, phone, gender, 'avatar': fileName });
 }
 catch (e) {
  next(e);
 }
}

module.exports.getOne = async function getOne(id) {
 const userInfo = await UserInfo.findOne({
  where: { id },
 });
 return { ...userInfo.dataValues };
}
