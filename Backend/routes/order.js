const { createOrder } = require("../order_controller");
const authGuard = require("../auth/authGuard");
var router = require("express").Router();

router.post("/create", authGuard, createOrder);

module.exports = router;
