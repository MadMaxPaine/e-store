const jwt = require('jsonwebtoken');
const { Token } = require('../models/models');
const cfg=require('../configs/config');
module.exports.generateTokens = generateTokens = (payload) => {
 const accessToken = jwt.sign(payload, cfg.jwt.secret, { expiresIn: cfg.jwt.accessTokenExpiresIn });
 const refreshToken = jwt.sign(payload, cfg.jwt.secret, { expiresIn: cfg.jwt.refreshTokenExpiresIn });
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
  const userData = jwt.verify(accessToken, cfg.jwt.secret);
  return userData;
 } catch (e) {
  return null;
 }
}

module.exports.validateRefreshToken = function validateRefreshToken(refreshToken) {
 try {
  const userData = jwt.verify(refreshToken, cfg.jwt.secret);
  return userData;
 } catch (e) {
  return null;
 }
}

module.exports.findToken = async function findToken(refreshToken) {
 const tokenData = await Token.findOne({ where: { refreshToken } });
 return tokenData;
}