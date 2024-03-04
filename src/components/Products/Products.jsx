import React, { useContext, useEffect, useState } from 'react'
import style from './Products.module.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { BallTriangle } from 'react-loader-spinner'
import { CartContext } from '../../context/cartContext'
import toast from 'react-hot-toast'
import { Helmet } from 'react-helmet'
export default function Products() {
  const { addProductCart,setNumOfCart,addProductCartWish,setNumOfCartWish,numberItemWish } = useContext(CartContext)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  

  async function getProducts() {
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    setProducts(data.data)
    setLoading(false)
  }
  async function addProduct(id) {
    let res = await addProductCart(id)
    if (res.data.status === "success") {
      toast.success(res.data.message, {
        position: 'bottom-right'
      })
      setNumOfCart(res.data.numOfCartItems)
    }
  }
  async function addProductwish(id) {
    let res = await addProductCartWish(id)
    if (res.data.status === "success") {
      toast.success(res.data.message, {
        position: 'bottom-right'
      })
      setNumOfCartWish(res.data.count)
      numberItemWish()
    }
  }

  useEffect(() => {
    getProducts()
  }

    , [])
  if (loading) return <BallTriangle
    height={100}
    width={100}
    radius={5}
    color="#4fa94d"
    ariaLabel="ball-triangle-loading"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
  />
  return (
    <>
    <Helmet>
                <title>Product</title>
    </Helmet>
      <div className="container mt-5">
        <div className="row">
          {products.map(product => <div className="col-md-2 mb-5 product" key={product.id}>
            <Link to={`/details/${product.id}`}>
              <img src={product.imageCover} className='w-100' alt="" />
              <p className='text-main'>{product.category.name}</p>
              <h5 className=' fw-bold'>{product.title.split(' ').slice(0, 2).join(' ')}</h5>
              <div className="price d-flex justify-content-between  mt-4">
                <p>{product.price}EGP</p>
                <div className="items">
                  <i className="fa-solid fa-star star-color">
                  </i>
                  <span>{product.ratingsAverage}</span>
                </div>
              </div>
            </Link>
            <div className="d-flex">
            <div className="bottom pb-3 me-2 ">
              <button className=' bg-main2' onClick={() =>{addProduct(product.id)}}>Add To Cart </button>
            </div>
            <div className="bottom pb-3 " >
              <p className=' bg-wish' onClick={ ()=>{addProductwish(product.id)}}><i className="fa-regular fa-heart fa-xl"></i></p>
            </div>
            </div>
          </div>)}
        </div>
      </div>

    </>
  )
}
