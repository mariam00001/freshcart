import React from 'react'
import style from './NotFound.module.css'
import imgError from '../../Assets/images/error.svg'
export default function NotFound() {
  return (
   <>
   <section className='container my-5'>
    <img src={imgError} className='w-75' alt="" />
   </section>
   </>
  )
}
