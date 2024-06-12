import React from 'react'

const Card = ({product}) => {
    return (
        <div class="card">
            <img src={product.image} class="card-img-top object-cover" alt="Hollywood Sign on The Hill" width={'100px'} height={'220px'} />
            <div class="card-body">
                <div className="d-flex justify-content-between">
                    <h5 class="card-title text-black">{product.name}</h5>
                    <h5 class="card-title text-black">NPR.{product.price}</h5>
                </div>
                <hr />
                <p className="text-black">
                    {product.description}
                </p>
                <button className="btn w-100 btn-outline-black">
                    View more
                </button>
            </div>
        </div>
    )
}

export default Card
