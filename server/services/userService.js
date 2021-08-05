const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Basket } = require('../models/models');
const ApiError = require('../error/ApiErrors');

const generrateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role },
    process.env.SECRET_KEY,
    {
      expiresIn: '24h'
    });

}


module.exports.registration = async function registration(req, res, next) {
  const { email, password, role } = req.body;
  if (!email || !password) {
    next(ApiError.badRequest('Wrong email or password'));
  }
  const candidate = await User.findOne({ where: { email } });
  if (candidate) {
    next(ApiError.badRequest('User with current e-mail exists!'));
  }
  const hashPassword = await bcrypt.hash(password, 5);
  const user = await User.create({ email, role, password: hashPassword });
  const basket = await Basket.create({ userId: user.id });
  const token = generrateJwt(user.id, user.email, user.role);
  return res.json({ token });
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
module.exports.check = async function check(req, res, next) {
  const token = generrateJwt(req.user.id, req.user.email, req.user.role);
  return res.json({ token });
}