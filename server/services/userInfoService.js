const { UserInfo } = require('../models/models');
const ApiError = require('../error/ApiErrors');
const path = require('path');
const uuid = require('uuid');

module.exports.create = async (req,res,next) => {
 try{
 const { firstName, lastName, phone, gender } = req.body;
 const { avatar } = req.files;
 const fileName = uuid.v4() + '.jpg';
 avatar.mv(path.resolve(__dirname, '..', 'static', fileName));
 const userInfo = await UserInfo.create({ firstName, 'secondName': lastName, phone, gender, 'avatar': fileName });
 }
 catch(e){
  next(e);
 }
}
