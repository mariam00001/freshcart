import React from 'react'
import style from './Home.module.css'
import MainSlider from '../MainSlider/MainSlider'
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider'
import { Helmet } from 'react-helmet'
import Products from '../Products/Products'
export default function Home() {
  return (
  <>
  <Helmet>
                <title>Home</title>
            </Helmet>
  
  <MainSlider/>
  <CategoriesSlider/>
  <Products/>
  </>
  )
}
