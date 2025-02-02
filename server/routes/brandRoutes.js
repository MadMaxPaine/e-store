const Router = require("express");
const brandController = require("../controllers/brandController");
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");
const deviceController = require("../controllers/deviceController");

const router = new Router();

router.post("/", checkRoleMiddleware("ADMIN"), brandController.create);
router.get("/", brandController.getAll);
router.delete("/",brandController.deleteBrand);

module.exports = router;
