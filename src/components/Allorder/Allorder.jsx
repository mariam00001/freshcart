import React from 'react'
import { Link } from 'react-router-dom'
import img from '../../Assets/images/9001177.jpg'
export default function ALLOrder() {
  return (
   <>
   <div className="container my-5">
      <div className=" mx-auto bg-main-light p-5 ">
      <h2>Shop Cart:</h2>
      <h3 className='h5 text-main py-2'>Total Cart Price: EGP</h3>
   <div className="img d-flex justify-content-center align-items-center pb-5">
  <img src={img} className='w-50' alt=''/>
        </div>
        <Link className='btn w-100 bg-maiin text-white' to={'/home'}>Start Shopping Now</Link>
        </div>
        </div>
   </>
  )
}
