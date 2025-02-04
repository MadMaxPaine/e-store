// server/routes/userInfoRoutes.js
const Router = require("express");
const userInfoController = require("../controllers/userInfoController");
const authMiddleware = require("../middleware/authMiddleware");
const ApiError = require("../error/ApiErrors");

const router = new Router();

router.get("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("Received ID:", id);

    if (isNaN(id)) {
      return next(ApiError.badRequest("Invalid ID format"));
    }

    const userInfo = await userInfoController.getOne(id);
    return res.json(userInfo);
  } catch (e) {
    next(e);
  }
});
module.exports.update = async function update(req, res, next) {
  try {
    const { firstName, lastName, phone, gender } = req.body;
    const avatar = req.files?.avatar;

    if (avatar) {
      const ext = path.extname(avatar.name).toLowerCase();
      if (![".jpg", ".jpeg", ".png"].includes(ext)) {
        return next(ApiError.badRequest("Only image files are allowed."));
      }

      const fileName = uuid.v4() + ext;

      avatar.mv(
        path.resolve(__dirname, "..", "static", fileName),
        async (err) => {
          if (err) {
            return next(ApiError.internal("Error saving avatar"));
          }

          await UserInfo.update(
            {
              firstName,
              secondName: lastName,
              phone,
              gender,
              avatar: fileName,
            },
            { where: { id: req.user.id } }
          );

          return res.json({ message: "User info updated successfully" });
        }
      );
    } else {
      await UserInfo.update(
        { firstName, secondName: lastName, phone, gender },
        { where: { id: req.user.id } }
      );

      return res.json({
        message: "User info updated successfully without avatar",
      });
    }
  } catch (e) {
    next(e);
  }
};

module.exports = router;
