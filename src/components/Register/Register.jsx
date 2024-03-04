import React, { useState } from 'react'
import style from './Register.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function Register() {
  let navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  async function callRegister(reqBody) {
    setErrorMessage("")
    setIsLoading(true)
    let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, reqBody)
      .catch(err => {
        setErrorMessage(err.response.data.message)
      })
    if (data.message == "success") {
      navigate('/login')
    }
  }
  const validationSchema = Yup.object({
    name: Yup.string().min(3, "name is to short").max(10, "name is to long"),
    email: Yup.string().email("email is valid").required("email is required"),
    password: Yup.string().required('No password provided.').min(8, 'Password is too short - should be 8 chars minimum.').matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
    rePassword: Yup.string().oneOf([Yup.ref('password')], "password andrePassword should match").required("password is required"),
    phone: Yup.string().matches(/^01[0125][0-9]{8}$/, 'invalid phone').required("phone is required"),
  })
  const registerForm = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: ''
    },
    validationSchema,
    onSubmit: callRegister
  })
  return (
    <>
      <div className=" w-50 mx-auto my-5">
        <h2>Register Now :</h2>
        {errorMessage ? (<div className="alert alert-danger">{errorMessage}</div>) : null}
        <form onSubmit={registerForm.handleSubmit}>
          <div className="form-group mb-2">
            <label htmlFor='Full Name'>Full Name</label>
            <input type='text' name='name' id='Full Name' value={registerForm.values.name} className='form-control ' onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} />
            {registerForm.errors.name && registerForm.touched.name ? (<div className='alert alert-danger'>{registerForm.errors.name}</div>) : null}
          </div>
          <div className="form-group mb-2">
            <label htmlFor='Email'>Email</label>
            <input type='email' name='email' id='Email' value={registerForm.values.email} className='form-control ' onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} />
            {registerForm.errors.email && registerForm.touched.email ? (<div className='alert alert-danger'>{registerForm.errors.email}</div>) : null}
          </div>
          <div className="form-group mb-2">
            <label htmlFor='Password'>Password</label>
            <input type='password' name='password' id='Password' value={registerForm.values.password} className='form-control ' onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} />
            {registerForm.errors.password && registerForm.touched.password ? (<div className='alert alert-danger'>{registerForm.errors.password}</div>) : null}
          </div>
          <div className="form-group mb-2">
            <label htmlFor='rePassword'>repassword</label>
            <input type='password' name='rePassword' id='rePassword' value={registerForm.values.rePassword} className='form-control ' onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} />
            {registerForm.errors.rePassword && registerForm.touched.rePassword ? (<div className='alert alert-danger'>{registerForm.errors.rePassword}</div>) : null}
          </div>
          <div className="form-group mb-2">
            <label htmlFor='Phone'>Phone</label>
            <input type='tel' name='phone' id='Phone' value={registerForm.values.phone} className='form-control ' onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} />
            {registerForm.errors.phone && registerForm.touched.phone ? (<div className='alert alert-danger'>{registerForm.errors.phone}</div>) : null}
          </div>
          <button type='submit' className='btn bg-main d-block ms-auto text-white'>
            {isLoading ? (<i className='fa fa-spinner fa-spin'>{setIsLoading}</i>) : "Register"}
          </button>
        </form>
      </div>
    </>
  )
}
