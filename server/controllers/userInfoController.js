// server/controllers/userInfoController.js
const { create, getOne, update } = require("../services/userInfoService");
const ApiError = require("../error/ApiErrors");

class UserInfoController {
  constructor() {
    this.create = create;
    this.getOne = getOne;
    this.update = update;
  }

  async update(req, res, next) {
    try {
      const { id, firstName, secondName, phone, gender, avatar } = req.body;

      if (!id) {
        return next(ApiError.badRequest("ID is required"));
      }

      const updatedUser = await update(
        id,
        firstName,
        secondName,
        phone,
        gender,
        avatar
      );
      return res.json(updatedUser);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserInfoController();
