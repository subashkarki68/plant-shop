const authGuard = require("../auth/authGuard");
const Order = require("../models/orderModel");
const { createOrder } = require("../order_controller");

const router = require("express").Router();

router.post("/create-old", authGuard, async (req, res) => {
  console.log("orderController req body:", req.body);
  const { cart, totalAmount, shippingAddress } = req.body;
  if (!cart || !totalAmount || !shippingAddress) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  try {
    const order = new Order({
      cart: cart,
      totalAmount: totalAmount,
      shippingAddress: shippingAddress,
      user: req.user.id,
    });
    createOrder(req, res);
    await order.save();
    // res.json("Order created successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.get("/get_single", authGuard, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.get("/get_all", authGuard, async (req, res) => {
  try {
    const orders = await Order.find({});
    res.json(orders);
  } catch (error) {
    res.json("Order Fetch Failed");
  }
});

// change order status
router.put("/change_status/:id", async (req, res) => {
  try {
    // Find the order
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }

    // Update the order status
    order.status = req.body.status;
    await order.save();
    res.json("Order status changed successfully");
    // If the status is "Delivered", set a timeout to delete the order after 2 minutes
    if (order.status === "Delete") {
      setTimeout(async () => {
        try {
          await Order.findByIdAndDelete(order._id);
          console.log(
            `Order ${order._id} deleted after status changed to Delivered`
          );
        } catch (err) {
          console.log(`Error deleting order ${order._id}:`, err);
        }
      }, 1000); //  10 days
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
});

module.exports = router;
