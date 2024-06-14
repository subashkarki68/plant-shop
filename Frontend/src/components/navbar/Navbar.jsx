import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  //  get user from local storage
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);

  // logout function
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // get cart value form reducer
  const { cart } = useSelector((state) => ({
    cart: state.cart.cart,
  }));

  return (
    <>
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <div className='container'>
          <Link to={"/"} className='navbar-brand me-2'>
            <h3 className=' fw-bold'>
              Plant-
              <span className='text-success'>Shop</span>
            </h3>
          </Link>

          <button
            className='navbar-toggler'
            type='button'
            data-mdb-toggle='collapse'
            data-mdb-target='#navbarButtonsExample'
            aria-controls='navbarButtonsExample'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <i className='fas fa-bars'></i>
          </button>

          <div className='collapse navbar-collapse' id='navbarButtonsExample'>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
              <li className='nav-item'>
                <a className='nav-link' href='#'>
                  Dashboard
                </a>
              </li>
            </ul>

            <Link to={"/cart"} className='m-4'>
              <i className='fa fa-shopping-cart fa-lg'></i>
              <span className='badge rounded-pill badge-notification bg-danger'>
                {cart.length}
              </span>
            </Link>

            <div className='d-flex align-items-center'>
              {user ? (
                <div className='dropdown'>
                  <button
                    className='btn btn-primary dropdown-toggle'
                    type='button'
                    id='dropdownMenuButton'
                    data-mdb-toggle='dropdown'
                    aria-expanded='false'
                  >
                    {user.fname}
                  </button>
                  <ul
                    className='dropdown-menu'
                    aria-labelledby='dropdownMenuButton'
                  >
                    {user.isAdmin ? (
                      <>
                        <li>
                          <Link
                            to={"/admin-dashboard"}
                            className='dropdown-item'
                          >
                            Admin Dashboard
                          </Link>
                        </li>
                        <li>
                          <Link to={"/admin/orders"} className='dropdown-item'>
                            All Orders
                          </Link>
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          <Link to={"/profile"} className='dropdown-item'>
                            Profile
                          </Link>
                        </li>
                        <li>
                          <Link to={"/order"} className='dropdown-item'>
                            My Orders
                          </Link>
                        </li>
                      </>
                    )}
                    <li>
                      <Link className='dropdown-item' onClick={logout}>
                        Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              ) : (
                <>
                  <Link to={"/register"}>
                    <button type='button' className='btn btn-primary px-3 me-2'>
                      Register
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
