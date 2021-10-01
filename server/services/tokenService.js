const jwt = require('jsonwebtoken');
const { Token } = require('../models/models');
module.exports.generateTokens = generateTokens = (payload) => {
 const accessToken = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '15m' });
 const refreshToken = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '30d' });
 return { accessToken, refreshToken };
}

module.exports.saveToken = async function saveToken(userId, refreshToken) {
 const tokenData = await Token.findOne({ where: { userId } });
 if (tokenData) {
  tokenData.refreshToken = refreshToken;
  return tokenData.save();
 }
 const token = await Token.create({ userId, refreshToken });
 return token;

}

module.exports.removeToken = async function removeToken(refreshToken) {
 const tokenData = await Token.destroy({ where: { refreshToken } });
 return tokenData;

}

module.exports.validateAccessToken = function validateAccessToken(accessToken) {
 try {
  const userData = jwt.verify(accessToken, process.env.SECRET_KEY);
  return userData;
 } catch (e) {
  return null;
 }
}

module.exports.validateRefreshToken = function validateRefreshToken(refreshToken) {
 try {
  const userData = jwt.verify(refreshToken, process.env.SECRET_KEY);
  return userData;
 } catch (e) {
  return null;
 }
}

module.exports.findToken = async function findToken(refreshToken) {
 const tokenData = await Token.findOne({ where: { refreshToken } });
 return tokenData;
}