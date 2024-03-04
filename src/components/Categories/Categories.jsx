import React, { useContext, useEffect, useState } from 'react'
import style from './Categories.module.css'
import axios from 'axios'
import { BallTriangle } from 'react-loader-spinner'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { CartContext } from '../../context/cartContext'
import { Helmet } from 'react-helmet'
export default function Categories() {
  const [productCat, setProductCat] = useState([])
  const { addProductCart,setNumOfCart } = useContext(CartContext)
  const [loading, setLoading] = useState(true)
  async function getCategories() {
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    setProductCat(data.data)
    setLoading(false)
  }

  useEffect(() => {
    getCategories()
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
                <title>Categories</title>
    </Helmet>
      <div className="container mt-5">
        <div className="row">
          {productCat.map(product => <div className="col-md-2 mb-5 product"key={product.id}>
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
