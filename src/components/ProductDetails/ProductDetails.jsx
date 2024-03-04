import React, { useContext, useEffect, useState } from 'react'
import style from './ProductDetails.module.css'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { BallTriangle } from 'react-loader-spinner'
import toast from 'react-hot-toast'
import { CartContext } from '../../context/cartContext'
import { Helmet } from 'react-helmet'
export default function ProductDetails() {
  const[details,setDetails]=useState({})
  const [loading,setLoading]=useState(true)
  const { addProductCart,setNumOfCart ,addProductCartWish,numberItemWish,setNumOfCartWish} = useContext(CartContext)
  let { id }= useParams()
  async function getProductDetails(){
    let {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    setDetails(data.data)
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
  useEffect(()=>{
    getProductDetails()
  },[])
  if (loading) return <BallTriangle
  height={100}
  width={100}
  radius={5}
  color="#4fa94d"
  ariaLabel="ball-triangle-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  className="spiner"
  />
  return (
   <>
    <Helmet>
                <title>Details</title>
    </Helmet>
   <div className="container">
    <div className="row justify-content-center align-items-center">
      <div className="col-md-3 mt-5">
      <img src={details.imageCover} className='w-100' alt="" />
      </div>
    <div className="col-md-9 mb-5  ">
        <h2 className=' fw-bold'>{details.title}</h2>
        <p>{details.description}</p>
        <p>{details.name}</p>
        <div className="price d-flex justify-content-between  mt-4">
        <p>{details.price}EGP</p>
        <div className="items mb-5">
        <i class="fa-solid fa-star star-color">
          </i>
          <span>{details.ratingsAverage}</span>
        </div>
   
        </div>
        <div className="d-flex justify-content-between">
        <div className="bottom pb-3">
        <button onClick={() =>{addProduct(details.id)}} className='bg-main3'>Add To Cart </button>
        </div>
        <div className="bottom pb-3">
        <button onClick={() =>{addProductwish(details.id)}} className='bg-main2'><i class="fa-regular fa-heart"></i> </button>
        </div>
        </div>
      </div>
    </div>
   </div>
   </>
  )

}
