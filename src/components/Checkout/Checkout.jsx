import React, { useContext } from 'react'
import style from './Checkout.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { CartContext } from '../../context/cartContext';
export default function Checkout() {
  const { paymentCart } = useContext(CartContext)
  async function payNow(values) {
    let { data } = await paymentCart(values)
    window.location.href = data.session.url
  }
  const validationSchema = Yup.object({
    details: Yup.string().min(3, "details is to short").max(20, "details is to long"),
    phone: Yup.string().matches(/^01[0125][0-9]{8}$/, 'invalid phone').required("phone is required"),
    city: Yup.string().min(1, "name is to short").max(10, "name is to long"),
  })
  const checkoutForm = useFormik({
    initialValues: {
      details: '',
      phone: '',
      city: ''
    },
    validationSchema,
    onSubmit: payNow
  })
  return (
    <>
      <div className="container my-5">
        <div className=" mx-auto bg-main-light p-5 ">
          <h2>Shipping Address</h2>
          <form onSubmit={checkoutForm.handleSubmit}>
            <div className="form-group pt-4">
              <label htmlFor="details">Details</label>
              <input type="text" className='form-control' name='details' id='details' onBlur={checkoutForm.handleBlur} value={checkoutForm.values.details} onChange={checkoutForm.handleChange} />
            </div>
            <div className="form-group pt-3">
              <label htmlFor="phone">Phone</label>
              <input type="tel" name='phone' className='form-control' id='phone' onBlur={checkoutForm.handleBlur} value={checkoutForm.values.phone} onChange={checkoutForm.handleChange} />
            </div>
            <div className="form-group pt-3 pb-5 ">
              <label htmlFor="city">City</label>
              <input type="text" name='city' className='form-control' id='city' onBlur={checkoutForm.handleBlur} value={checkoutForm.values.city} onChange={checkoutForm.handleChange} />
            </div>
            <button type='submit' className='btn bg-main2'>Pay Now</button>
          </form>
        </div>
      </div>
    </>
  )
}
