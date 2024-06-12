import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createOrderApi } from "../../apis/Api";
import {
  decreaseQuantity,
  increaseQuantity,
  removeProduct,
} from "../../store/cartSlice";

const Cart = () => {
  const { cart } = useSelector((state) => ({
    cart: state.cart.cart,
  }));

  const [totalAmount, setTotalAmount] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  // Calculate total amount and total quantity
  const calculateTotals = () => {
    let totalPrice = 0;
    let quantity = 0;
    cart.forEach((item) => {
      const itemTotal = item.price * item.quantity;
      totalPrice += itemTotal;
      quantity += item.quantity;
    });
    setTotalAmount(totalPrice);
    setTotalQuantity(quantity);
  };

  // Update totals when cart changes
  useEffect(() => {
    calculateTotals();
  }, [cart]);

  const [shippingAddress, setShippingAddress] = useState("");
  const dispatch = useDispatch();

  const handleQuantityDecrease = (itemId) => {
    dispatch(decreaseQuantity({ itemId }));
  };

  const handleQuantityIncrease = (itemId) => {
    dispatch(increaseQuantity({ itemId }));
  };

  const handleRemoveProduct = (itemId) => {
    dispatch(removeProduct({ itemId }));
  };

  // Create orders
  const handleCreateOrder = () => {
    if (!shippingAddress) {
      alert("Please enter shipping address");
      return;
    }

    const orderDetails = {
      cart: cart,
      totalAmount: totalAmount,
      shippingAddress: shippingAddress,
      product_code: "EPAYTEST",
    };

    createOrderApi(orderDetails)
      .then((res) => {
        toast.success("Order created successfully");
        console.log("orderDetails:", orderDetails);
        console.log("formData with signature", res.data.formData);
        esewaCall(res.data.formData);
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  };

  const esewaCall = (formData) => {
    console.log(formData);
    var path = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

    var form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", path);

    for (var key in formData) {
      var hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", formData[key]);
      form.appendChild(hiddenField);
    }

    document.body.appendChild(form);
    form.submit();
  };

  return (
    <div className='container'>
      <ToastContainer />
      <section className='h-100'>
        <div className='container py-5 h-100'>
          <div className='row d-flex justify-content-center align-items-center h-100'>
            <div className='col-12'>
              <div
                className='card card-registration card-registration-2'
                style={{ borderRadius: "15px" }}
              >
                <div className='card-body p-0'>
                  <div className='row g-0'>
                    <div className='col-lg-8'>
                      <div className='p-5'>
                        <h1 className='fw-bold mb-0 text-black'>
                          Shopping Cart
                        </h1>
                        <hr className='my-4' />

                        {cart.map((item) => (
                          <div
                            className='row mb-4 d-flex justify-content-between align-items-center'
                            key={item.id}
                          >
                            <div className='col-md-2 col-lg-2 col-xl-2'>
                              <img
                                src={item.image}
                                className='img-fluid rounded-3'
                                alt={item.name}
                              />
                            </div>
                            <div className='col-md-3 col-lg-3 col-xl-3'>
                              <h6 className='text-muted'>{item.category}</h6>
                              <h6 className='text-black mb-0'>{item.name}</h6>
                            </div>
                            <div className='col-md-3 col-lg-3 col-xl-2 d-flex'>
                              <button
                                className='btn btn-link px-2'
                                onClick={() => handleQuantityDecrease(item.id)}
                              >
                                <i className='fas fa-minus'></i>
                              </button>

                              <input
                                id='form1'
                                min='0'
                                name='quantity'
                                value={item.quantity}
                                type='number'
                                className='form-control form-control-sm'
                                readOnly
                              />

                              <button
                                className='btn btn-link px-2'
                                onClick={() => handleQuantityIncrease(item.id)}
                              >
                                <i className='fas fa-plus'></i>
                              </button>
                            </div>
                            <div className='col-md-3 col-lg-2 col-xl-2 offset-lg-1'>
                              <h6 className='mb-0'>NPR. {item.price}</h6>
                            </div>
                            <div className='col-md-1 col-lg-1 col-xl-1 text-end'>
                              <button className='btn'>
                                <i
                                  className='fas fa-times'
                                  onClick={() => handleRemoveProduct(item.id)}
                                ></i>
                              </button>
                            </div>
                          </div>
                        ))}
                        <hr className='my-4' />
                      </div>
                    </div>
                    <div className='col-lg-4 bg-grey'>
                      <div className='p-5'>
                        <h3 className='fw-bold mb-5 mt-2 pt-1'>Summary</h3>
                        <h6 className='text-muted'>
                          Total quantity: {totalQuantity}
                        </h6>
                        <h6 className='text-muted'>Total price:</h6>
                        <h3 className='fw-bold'>
                          NPR. {totalAmount.toFixed(2)}
                        </h3>
                        <hr />
                        <p>Shipping Address</p>
                        <input
                          type='text'
                          className='form-control m-0 p-0'
                          onChange={(e) => setShippingAddress(e.target.value)}
                        />

                        <button
                          className='btn btn-primary btn-lg btn-block mt-3'
                          onClick={handleCreateOrder}
                        >
                          Pay with esewa
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cart;
