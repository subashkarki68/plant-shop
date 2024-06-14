import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllProductsApi } from "../../apis/Api";

// import testapi

const Homepage = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // get all products
  useEffect(() => {
    getAllProductsApi()
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // instance of navigate hook
  const navigate = useNavigate();

  // navigate to search page when search button is clicked
  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search/${searchQuery}`);
  };

  return (
    <div className='container mt-5'>
      <form action=''>
        <input
          onChange={(e) => setSearchQuery(e.target.value)}
          type='text'
          className='form-control mb-3'
          placeholder='Search products by name'
        />
        <button onClick={handleSearch} type='submit' hidden>
          Search
        </button>
      </form>

      <div
        id='carouselBasicExample'
        className='carousel slide carousel-fade'
        data-mdb-ride='carousel'
      >
        <div className='carousel-indicators'>
          <button
            type='button'
            data-mdb-target='#carouselBasicExample'
            data-mdb-slide-to='0'
            className='active'
            aria-current='true'
            aria-label='Slide 1'
          ></button>
          <button
            type='button'
            data-mdb-target='#carouselBasicExample'
            data-mdb-slide-to='1'
            aria-label='Slide 2'
          ></button>
          <button
            type='button'
            data-mdb-target='#carouselBasicExample'
            data-mdb-slide-to='2'
            aria-label='Slide 3'
          ></button>
        </div>

        <div className='carousel-inner'>
          <div className='carousel-item active'>
            <img
              src='https://hips.hearstapps.com/hmg-prod/images/garden-with-chair-royalty-free-image-1709581539.jpg?crop=0.668xw:1.00xh;0.300xw,0&resize=1200:*'
              className='d-block w-100'
              alt='Sunset Over the City'
            />
            <div className='carousel-caption d-none d-md-block'>
              <h5>Welcome to plant shop</h5>
              <p>plant of your choice</p>
            </div>
          </div>

          <div className='carousel-item'>
            <img
              src='https://cdn.britannica.com/84/73184-050-05ED59CB/Sunflower-field-Fargo-North-Dakota.jpg'
              className='d-block w-100'
              alt='Canyon at Nigh'
            />
            <div className='carousel-caption d-none d-md-block'>
              <h5>Second slide label</h5>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>

          <div className='carousel-item'>
            <img
              src='https://cdn.britannica.com/84/73184-050-05ED59CB/Sunflower-field-Fargo-North-Dakota.jpg'
              className='d-block w-100'
              alt='Cliff Above a Stormy Sea'
            />
            <div className='carousel-caption d-none d-md-block'>
              <h5>Third slide label</h5>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </div>
          </div>
        </div>

        <button
          className='carousel-control-prev'
          type='button'
          data-mdb-target='#carouselBasicExample'
          data-mdb-slide='prev'
        >
          <span
            className='carousel-control-prev-icon'
            aria-hidden='true'
          ></span>
          <span className='visually-hidden'>Previous</span>
        </button>
        <button
          className='carousel-control-next'
          type='button'
          data-mdb-target='#carouselBasicExample'
          data-mdb-slide='next'
        >
          <span
            className='carousel-control-next-icon'
            aria-hidden='true'
          ></span>
          <span className='visually-hidden'>Next</span>
        </button>
      </div>

      <div>
        <h1 className='mt-5 mb-4'>Available products</h1>
        <div className='row row-cols-1 row-cols-md-4 g-4'>
          {products.map((product) => {
            return (
              <Link to={`/product/details/${product._id}`} className='col'>
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
                      <h5 className='card-title text-black'>
                        NPR.{product.price}
                      </h5>
                    </div>
                    <hr />
                    <p className='text-black'>{product.description}</p>
                    <button className='btn w-100 btn-outline-black'>
                      View more
                    </button>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
