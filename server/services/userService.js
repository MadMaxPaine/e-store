const bcrypt = require('bcrypt');
const uuid = require('uuid');
const { validationResult } = require('express-validator');
const mailService = require('./mailService');
const { generateTokens,
  saveToken,
  removeToken,  
  validateRefreshToken,
  findToken } = require('./tokenService');
const { User, Basket } = require('../models/models');
const ApiError = require('../error/ApiErrors');
const UserDto = require('../dtos/user-dtos');


module.exports.registration = async function registration(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiError.badRequest('Validation error', errors.array()));
    }
    const { email, password } = req.body;
    if (!email || !password ) {
      next(ApiError.badRequest('Wrong email or password'));
    }
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      next(ApiError.badRequest('User with current e-mail exists!'));
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const activationLink = uuid.v4();
    const user = await User.create({ email, password: hashPassword, activationLink });
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
    next(e)
  }

}
module.exports.activate = async function activate(req, res, next) {
  try {
    const activationLink = req.params.link;
    const user = await User.findOne({ activationLink });
    if (!user) { throw ApiError.badRequest("Wrong activation link!"); }
    user.isActivated = true;
    await user.save();
    return res.redirect(process.env.CLIENT_URL);
  }
  catch (e) {
    next(e);
  }
}
module.exports.login = async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    console.log(user);
    if (!user) {
      next(ApiError.internal('User not found!'));
    }
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      next(ApiError.internal('Wrong password'));
    }
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
    next(e);
  }
}

module.exports.logout = async function logout(req, res, next) {
  try {
    const { refreshToken } = req.cookies;
    const token = await removeToken(refreshToken);
    res.clearCookie('refreshToken');
    return res.json({ token });
  } catch (e) {
    next(e);
  }
}

module.exports.refresh = async function refresh(req, res, next) {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {      
      throw ApiError.unathourizedError();
    }
    const userData = validateRefreshToken(refreshToken);
    const tokenFromDb = await findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.unathourizedError();
    }
    const user = await User.findOne({ where: { id: userData.id } });
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
  } catch (e) {
    next(e);
  }
}
module.exports.getUsers = async function getUsers(req, res, next) {
  try {
    const users = await User.findAll();
    return res.json({ users });
  } catch (e) {
    next(e);
  }
}