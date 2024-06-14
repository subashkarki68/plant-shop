import React, { useEffect, useState } from "react";
import { getOrdersByUserApi } from "../../apis/Api";

const Order = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrdersByUserApi()
      .then((res) => {
        console.log(res.data);
        setOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className='container mt-3'>
      <h3>My Orders</h3>

      {orders.map((order) => (
        <div className='card'>
          <div className='card-header d-flex justify-content-between'>
            <h6>ORDER - {order.orderNumber}</h6>
            <h6>{order.status}</h6>
          </div>
          <div className='card-body'>
            <table className='table'>
              <thead>
                <tr>
                  <th scope='col'>Image</th>
                  <th scope='col'>Product Name</th>
                  <th scope='col'>Category</th>
                  <th scope='col'>Price</th>
                  <th scope='col'>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {order.cart.map((item) => (
                  <tr>
                    <th scope='row'>
                      <img src={item.image} alt='' width='50' />
                    </th>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>{item.price}</td>
                    <td>{item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className='card-footer d-flex justify-content-between'>
            <div>
              <h6>Order Date : 12/12/2021</h6>
            </div>
            <div>
              <h6>Shipping info : {order.shippingAddress}</h6>
            </div>
            <div>
              <h6>Total Price : {order.totalAmount}</h6>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Order;
