const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const mailService = require('./mailService');
const { generateTokens, saveToken } = require('./tokenService');
const { User, Basket } = require('../models/models');
const ApiError = require('../error/ApiErrors');
const UserDto = require('../dtos/user-dtos');
const generrateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role },
    process.env.SECRET_KEY,
    {
      expiresIn: '24h'
    });

}


module.exports.registration = async function registration(req, res, next) {
  try {
    const { email, password, role } = req.body;
    if (!email || !password) {
      next(ApiError.badRequest('Wrong email or password'));
    }
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      next(ApiError.badRequest('User with current e-mail exists!'));
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const activationLink = uuid.v4();
    const user = await User.create({ email, role, password: hashPassword, activationLink });
    await mailService.sendActivationMail(email, `${process.env.API_URL}/api/user/activate/${activationLink}`);
    const basket = await Basket.create({ userId: user.id });
    const userDto = new UserDto(user);
    const token = generateTokens({ ...userDto });
    await saveToken(userDto.id, token.refreshToken);
    res.cookie('refreshToken',
      token.refreshToken,
      {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true
      });
    return res.json({ ...token, userDto });
  }
  catch (e) {
    console.log(e);
  }

}

module.exports.login = async function login(req, res, next) {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) {
    next(ApiError.internal('User not found!'));
  }
  let comparePassword = bcrypt.compareSync(password, user.password);
  if (!comparePassword) {
    next(ApiError.internal('Wrong password'));
  }
  const token = generrateJwt(user.id, user.email, user.role);
  return res.json({ token });
}

module.exports.logout = async function logout(req, res, next) {

}
module.exports.activate = async function activate(req, res, next) {

}
module.exports.refresh = async function refresh(req, res, next) {

}
module.exports.getUsers = async function getUsers(req, res, next) {

}

// module.exports.check = async function check(req, res, next) {
//   const token = generrateJwt(req.user.id, req.user.email, req.user.role);
//   return res.json({ token });
// }