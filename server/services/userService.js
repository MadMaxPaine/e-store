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
const userInfoController = require('../controllers/userInfoController');
const cfg=require('../configs/config');


module.exports.registration = async function registration(req, res, next) {
  try {
    // Валідація запиту
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiError.badRequest('Validation error', errors.array()));
    }

    const { email, password, firstName, lastName, phone } = req.body;

    // Перевірка на наявність необхідних полів
    if (!email || !password) {
      return next(ApiError.badRequest('Wrong email or password'));
    }
    if (!firstName || !lastName || !phone) {
      return next(ApiError.badRequest('Wrong Name, Lastname or Phone'));
    }

    console.log(req.body);

    // Перевірка на існування користувача з таким email
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(ApiError.badRequest('User with current e-mail exists!'));
    }

    // Створення запису в userInfo (якщо це потрібно)
    try {
      await userInfoController.create(req);
    } catch (err) {
      return next(ApiError.badRequest('Error creating user info'));
    }

    // Хешування пароля
    const hashPassword = await bcrypt.hash(password, 5);

    // Генерація activationLink
    const activationLink = uuid.v4();

    // Створення користувача
    const user = await User.create({ email, password: hashPassword, activationLink });
    // Створення кошика для користувача
    let basket = await Basket.findOne({ where: { userId:user.id, status: 'open' } });
    if (!basket) {
        basket = await Basket.create({ userId:user.id });
    }  

    // Відправка активаційного листа
    await mailService.sendActivationMail(email, `${cfg.server.apiUrl}/api/user/activate/${activationLink}`);

    
    // Отримання інформації про користувача
    const userInfo = await userInfoController.getOne(user.id);
    const { firstName: userFirstName, secondName, avatar} = userInfo;

    // Створення DTO для користувача
    const userDto = new UserDto(user, userFirstName, secondName, avatar);

    // Генерація токенів
    const token = generateTokens({ ...userDto });

    // Збереження refreshToken в базі
    await saveToken(userDto.id, token.refreshToken);

    // Встановлення refreshToken в cookie
    res.cookie('refreshToken', token.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 днів
      httpOnly: true,
    });

    // Відправка відповіді
    return res.json({ ...token, userDto });
  } catch (e) {
    next(e);
  }
};
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
    if (!user) {
      next(ApiError.internal('User not found!'));
    }
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      next(ApiError.internal('Wrong password'));
    }
    const userInfo = await userInfoController.getOne(user.id);
    const firstName = userInfo.firstName;
    const secondName = userInfo.secondName;
    const avatar = userInfo.avatar;
    const userDto = new UserDto(user, firstName, secondName, avatar);
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
      // Логування для дебагу
      console.error('Invalid or expired refresh token');      
      console.log(tokenFromDb);
      
      // Викидаємо помилку авторизації
      throw ApiError.unathourizedError();
    }
    const user = await User.findOne({ where: { id: userData.id } });
    const userInfo = await userInfoController.getOne(user.id);
    const firstName = userInfo.firstName;
    const secondName = userInfo.secondName;
    const avatar = userInfo.avatar;
    const userDto = new UserDto(user, firstName, secondName, avatar);
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