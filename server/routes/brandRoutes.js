const Router = require("express");
const brandController = require("../controllers/brandController");
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");


const router = new Router();

router.post("/", checkRoleMiddleware("ADMIN"), brandController.create);
router.get("/", brandController.getAll);
router.delete("/",checkRoleMiddleware("ADMIN"),brandController.deleteBrand);

module.exports = router;
