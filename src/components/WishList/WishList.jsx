import React, { useContext, useEffect, useState } from 'react'
import style from './WishList.module.css'
import { CartContext } from '../../context/cartContext'
import { BallTriangle } from 'react-loader-spinner'
import { Link} from 'react-router-dom'
import { Helmet } from 'react-helmet'
export default function WishList() {
let {addCartWish,deletCartWish,setNumOfCartWish,numberItemWish}=useContext(CartContext)
const [getCart,setGetCart]=useState({})
 async function addCartProductWish(){
let {data}= await addCartWish()
setGetCart(data)
 }
async function deletWish(id){
  let {data} =await deletCartWish(id)
  setGetCart(data)
  setNumOfCartWish(data.count)
  addCartProductWish()
  numberItemWish()
 }
 useEffect(()=>{
  addCartProductWish()
 },[])
  return (
   
    <>
    <Helmet>
                <title>Wishlist</title>
    </Helmet>
     {getCart.data? <div className="container my-5">
      <div className=" mx-auto bg-main-light p-5 ">
      <h2 className='pb-3'>WishList Cart:</h2>
      {getCart.data.map((ele)=><div key={(ele.id)} className="row my-3 border-bottom ">
        <div className="col-md-2">
          <img src={ele.imageCover} className='w-100 mb-4' alt="" />
        </div>
        <div className="col-md-10 ">
          <div className="d-flex justify-content-between align-items-center  ">
            <div className="left-side ">
              <h3>{ele.title}</h3>
              <p className='text-main'>price:{ele.price}</p>
              <p className=' cursor-pointer' onClick={()=>{deletWish(ele.id)}}><i class="fa-solid fa-trash-can text-main pe-2" ></i>Remove</p>
            </div>
          </div>
        </div>
      </div>)}
      
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
