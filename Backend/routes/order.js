const { createOrder } = require("../order_controller");
const authGuard = require("../auth/authGuard");
var router = require("express").Router();
const orderControllerRouter = require("../controllers/orderController");

router.use(orderControllerRouter);
router.post("/create", authGuard, createOrder);

module.exports = router;
