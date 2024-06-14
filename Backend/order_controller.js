const orderService = require("./services/order_services");
const axios = require("axios");
const crypto = require("crypto");

exports.createOrder = async (req, res) => {
  try {
    console.log("order_controller req.body", req.body);
    console.log("req User", req.user);
    const newOrder = {
      cart: req.body.cart,
      totalAmount: req.body.totalAmount,
      shippingAddress: req.body.shippingAddress,
      product_code: req.body.product_code,
      user: req.user.id,
    };
    console.log("nre ORder", newOrder);
    const order = await orderService.save(newOrder);
    console.log("order:", order);

    const signature = this.createSignature(
      `total_amount=${order.totalAmount},transaction_uuid=${order._id},product_code=EPAYTEST`
    );
    const formData = {
      amount: order.totalAmount,
      failure_url: "http://localhost:3000",
      product_delivery_charge: "0",
      product_service_charge: "0",
      product_code: "EPAYTEST",
      signature: signature,
      signed_field_names: "total_amount,transaction_uuid,product_code",
      success_url: "http://localhost:4000/esewa/success",
      tax_amount: "0",
      total_amount: order.totalAmount,
      transaction_uuid: order._id,
    };
    // console.log("Order:", order);
    console.log("FormData", formData);

    res.json({ message: "Order Created Sucessfully", order, formData });
  } catch (err) {
    console.log("TEST", err);
    return res.status(400).json({ error: err?.message || "No Orders found" });
  }
};

exports.updateOrderAfterPayment = async (req, res, next) => {
  try {
    console.log(req.body);
    const order = await orderService.findById(req.transaction_uuid);
    order.status = "paid";
    order.transaction_code = req.transaction_code;

    await orderService.save(order);
    res.redirect("http://localhost:3000"); //After Success change this page...
  } catch (err) {
    return res.status(400).json({ error: err?.message || "No Orders found" });
  }
};

exports.createSignature = (message) => {
  const secret = "8gBm/:&EnhH.1/q";
  return crypto.createHmac("sha256", secret).update(message).digest("base64");
};
