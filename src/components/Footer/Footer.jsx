import React from 'react'
import style from './Footer.module.css'
export default function Footer() {
  return (
    <>
      <footer className='footer-bg'>
        <div className='container  py-5'>
          <h3>Get The FreshCart app</h3>
          <p>we will send you a link, open it on your phone to downlod the app</p>
          <div className="d-flex">
          <input type='email' className='form-control w-75 me-5' placeholder='Email'/>
          <button className='btn bg-main text-white '>Share App</button>
          </div>
        </div>
      </footer>


    </>
  )
}
