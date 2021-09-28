const jwt = require('jsonwebtoken');
const { Token } = require('../models/models');
module.exports.generateTokens = generateTokens = (payload) => {
 const accessToken = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '30m' });
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