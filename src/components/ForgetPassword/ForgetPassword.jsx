import React, { useState } from "react";
import Style from "./ForgetPassword.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function ForgetPassword() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  async function handleSubmit(values) {
    const { data } = await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values
      )
      .catch((err) => {
        setError(err.response.data.message);
      });

    if (data.statusMsg === "success") {
      navigate("/verificationcode");
    }
  }

  const validationSchema = Yup.object({
    email: Yup.string().email("email is valid").required("email is required"),
  })
  const loginForm = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit:handleSubmit
  })
  return (
    <>
      <div className=" w-50 mx-auto my-5">
        <h2>Forget Password :</h2>
        <form onSubmit={loginForm.handleSubmit}>
          <div className="form-group mb-2">
            <label htmlFor='Email'>Email</label>
            <input type='email' name='email' id='Email' value={loginForm.values.email} className='form-control ' onChange={loginForm.handleChange} onBlur={loginForm.handleBlur} />
          </div>
          <button className=' bg-main d-block ms-auto text-white' disabled={!(loginForm.isValid && loginForm.dirty)}type="submit" >Send</button>
        </form>
        
      </div>
    </>
  )
}
