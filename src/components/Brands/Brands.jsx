import React, { useContext, useEffect, useState } from 'react'
import style from './Brands.module.css'
import axios from 'axios'
import { BallTriangle } from 'react-loader-spinner'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { CartContext } from '../../context/cartContext'
import { Helmet } from 'react-helmet'
export default function Brands() {
  const [brands, setBrandsCat] = useState([])
  const [loading, setLoading] = useState(true)
  async function getBrands() {
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
    setBrandsCat(data.data)
    setLoading(false)
  }

  useEffect(() => {
    getBrands()
  }, [])

  if (loading) return <BallTriangle
    height={100}
    width={100}
    radius={5}
    color="#4fa94d"
    ariaLabel="ball-triangle-loading"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
  />
  return (
    <>
    <Helmet>
                <title>Brands</title>
    </Helmet>
      <div className="container mt-5">
        <div className="row">
          {brands.map(product => <div className="col-md-2 mb-5 product"key={product.id}>
            <Link to={`/details/${product.id}`}>
              <img src={product.image} className='w-100' height={200} alt="" />
              <h5 className='text-main text-center py-3'>{product.name}</h5>
            </Link>
          </div>)}
        </div>
      </div>

    </>
  )
}
