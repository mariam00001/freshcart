import React, { useContext } from 'react'
import style from './Navbar.module.css'
import logo from '../../Assets/images/freshcart-logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import { TokenContext } from '../../context/token'
import { CartContext } from '../../context/cartContext'

export default function Navbar() {
  const { token, setToken } = useContext(TokenContext)
 const {numOfCart,numOfCartWish}= useContext(CartContext)
  let navigate = useNavigate()

  function logOut() {
    localStorage.removeItem("userToken")
    setToken(null)
    navigate('/login')
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <Link className="navbar-brand" to={'home'}>
            <img src={logo} alt="logo" />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {token ? <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to={'home'}>Home</Link>
              </li>
              <li className="nav-item ">
                <Link className="nav-link" to={'product'}>Products</Link>
                
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={'categories'}>Categories</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={'brands'}>Brands</Link>
              </li>
              <li className="nav-item position-relative">
                <Link className="nav-link" to={'cart'}>Cart  <i className='fa-solid fa-shopping-cart'></i></Link>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-maiin mt-1">
                 {numOfCart}
               
                </span>
              </li>
              <li className="nav-item position-relative ms-1">
                <Link className="nav-link" to={'wishlist'}>WishList  <i className="fa-regular fa-heart"></i></Link>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-maiin mt-1">
                {numOfCartWish}
                </span>
              </li>
            </ul> : null}

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item align-self-center">
                <i className="fa-brands mx-1 fa-instagram"></i>
                <i className="fa-brands mx-1 fa-facebook"></i>
                <i className="fa-brands mx-1 fa-tiktok"></i>
                <i className="fa-brands mx-1 fa-twitter"></i>
                <i className="fa-brands mx-1 fa-linkedin"></i>
                <i className="fa-brands mx-1 fa-youtube"></i>
              </li>

              {token ? <li className="nav-item">
                <button className="nav-link" onClick={logOut}>logout</button>
              </li> : <>
                <li className="nav-item">
                  <Link className="nav-link" to={'register'}>Register</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'login'}>Login</Link>
                </li>
              </>}
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
