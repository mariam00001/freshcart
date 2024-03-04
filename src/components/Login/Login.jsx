import React, { useContext, useState } from 'react'
import style from './Login.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { TokenContext } from '../../context/token';

export default function Login() {
  let navigate = useNavigate()
  const [errorMessage,setErrorMessage]=useState("")
  const [isLoading,setIsLoading]=useState(false)
  const {setToken}=useContext(TokenContext)
  async function callLogin(reqBody) {
    setErrorMessage("")
    setIsLoading(true)
    let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,reqBody)
    .catch(err=>{
      setErrorMessage(err.response.data.message)})
    if(data.message == "success"){
      localStorage.setItem("userToken",data.token)
      setToken(data.token)
      navigate('/home')
    }
  }
  const validationSchema = Yup.object({
    email: Yup.string().email("email is valid").required("email is required"),
    password: Yup.string().required('No password provided.').min(8, 'Password is too short - should be 8 chars minimum.').matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
  })
  const loginForm = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema,
    onSubmit:callLogin
  })
  return (
    <>
      <div className=" w-50 mx-auto my-5">
        <h2>Login Now :</h2>
        {errorMessage ?(<div className="alert alert-danger">{errorMessage}</div>):null }
        <form onSubmit={loginForm.handleSubmit}>
          <div className="form-group mb-2 mt-3">
            <label htmlFor='Email'>Email</label>
            <input type='email' name='email' id='Email' value={loginForm.values.email} className='form-control ' onChange={loginForm.handleChange} onBlur={loginForm.handleBlur} />
            {loginForm.errors.email && loginForm.touched.email  ? (<div className='alert alert-danger'>{loginForm.errors.email}</div>) : null}
          </div>
          <div className="form-group mb-2">
            <label htmlFor='Password'>Password</label>
            <input type='password' name='password' id='Password' value={loginForm.values.password} className='form-control ' onChange={loginForm.handleChange} onBlur={loginForm.handleBlur} />
            {loginForm.errors.password&& loginForm.touched.password ? (<div className='alert alert-danger'>{loginForm.errors.password}</div>) : null}
          </div>
          <div className="d-flex mt-3">
          <Link className="text-main" to={'/forgetpassword'}>Forget Password... ?</Link>
          <button type='submit' className=' bg-main d-block ms-auto text-white'>
         {isLoading? (<i className='fa fa-spinner fa-spin'>{setIsLoading}</i>): "Login"}
          </button>
          </div>
          
        
        </form> 
      </div>
    </>
  )
}
