import React from "react";

const Card = ({ product }) => {
  return (
    <div className='card'>
      <img
        src={product.image}
        className='card-img-top object-cover'
        alt='Hollywood Sign on The Hill'
        width={"100px"}
        height={"220px"}
      />
      <div className='card-body'>
        <div className='d-flex justify-content-between'>
          <h5 className='card-title text-black'>{product.name}</h5>
          <h5 className='card-title text-black'>NPR.{product.price}</h5>
        </div>
        <hr />
        <p className='text-black'>{product.description}</p>
        <button className='btn w-100 btn-outline-black'>View more</button>
      </div>
    </div>
  );
};

export default Card;
