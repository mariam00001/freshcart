import React, { useEffect, useState } from 'react'
import style from './CategoriesSlider.module.css'
import axios from 'axios'
import Slider from 'react-slick';
export default function CategoriesSlider() {
  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };
const [categories,setCategories]=useState([])
async function getCategories(){
let {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
setCategories(data.data)
  }
  useEffect(()=>{
    getCategories()
  }
  
  ,[])
  return (
    <>
    <div className="container">
      <h2>Show Popular Categories</h2>
      <Slider {...settings}>
      {categories.map(cat =><div className='cat' key={cat._id}>
        <img src={cat.image} height={'200'} className='w-100' alt="" />
        <h5 className='mt-2 text-center'>{cat.name}</h5>
      </div>
      )}
    </Slider>
    </div>
    </>
  )
}
