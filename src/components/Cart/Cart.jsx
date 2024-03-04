import React, { useContext, useEffect, useState } from 'react'
import style from './Cart.module.css'
import { CartContext } from '../../context/cartContext'
import { BallTriangle } from 'react-loader-spinner'
import img from '../../Assets/images/9001177.jpg'
import { Link} from 'react-router-dom'
import { Helmet } from 'react-helmet'
export default function Cart() {
let {addCart,deletCart, updateCart,setNumOfCart}=useContext(CartContext)
const [getCart,setGetCart]=useState({})
 async function addCartProduct(){
let {data}= await addCart()
setGetCart(data)
 }
async function delet(id){
  let {data} =await deletCart(id)
  setGetCart(data)
  setNumOfCart(data.numOfCartItems)
 }
 async function update(id,count){
  let {data} =await updateCart(id,count)
  setGetCart(data)
 }
 useEffect(()=>{
addCartProduct()
 },[])
  return (
   
    <>
    <Helmet>
                <title>Cart</title>
    </Helmet>
     {getCart.data ?<div className="container my-5">
      <div className=" mx-auto bg-main-light p-5 ">
      <h2>Shop Cart:</h2>
      <h3 className='h5 text-main py-2'>Total Cart Price: {getCart.data.totalCartPrice} EGP</h3>
      {getCart.data.products.length=== 0?<>
        <div className="img d-flex justify-content-center align-items-center pb-5">
        <img src={img} className='w-50' alt=''/>
        </div>
        <Link className='btn w-100 bg-maiin text-white'  to={'/home'}>Start Shopping Now</Link>
          </>
      :<>
      {getCart.data.products.map((ele)=><div key={ele.product._id} className="row my-3 border-bottom">
        <div className="col-md-2">
          <img src={ele.product.imageCover} className='w-100 mb-4' alt="" />
        </div>
        <div className="col-md-10 ">
          <div className="d-flex justify-content-between align-items-center  ">
            <div className="left-side ">
              <h3>{ele.product.title}</h3>
              <p className='text-main'>price:{ele.price}</p>
              <p className=' cursor-pointer' onClick={()=>{delet(ele.product._id)}}><i class="fa-solid fa-trash-can text-main pe-2" ></i>Remove</p>
            </div>
            <div className="right-side">
              <button className='btn bg-maiin' onClick={()=>{update(ele.product._id,ele.count+1)}}>+</button>
              <span className='mx-2'>{ele.count}</span>
              <button className='btn bg-maiin' disabled= {ele.count=== 1?"disabled":false} onClick={()=>{update(ele.product._id,ele.count-1)}}>-</button>
            </div>
          </div>
        </div>
      </div>)}
      <Link className='btn w-100 bg-maiin text-white'  to={'/checkout'}>Check out</Link>
      </>}
      
      </div>
    </div>:<BallTriangle
    height={100}
    width={100}
    radius={5}
    color="#4fa94d"
    ariaLabel="ball-triangle-loading"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
  />}
   
    </>
  )
}
