import axios from "axios";
import { createContext, useEffect, useState } from "react";
export const CartContext = createContext()
let headers = {token:localStorage.getItem("userToken")}


function addProductCart(id) {
        return  axios.post('https://ecommerce.routemisr.com/api/v1/cart', {
            productId:id
        }, {headers}).then((response) => response).catch((err) => err)
    }
    function addProductCartWish(id) {
        return  axios.post('https://ecommerce.routemisr.com/api/v1/wishlist', {
            productId:id
        }, {headers}).then((response) => response).catch((err) => err)
    }
    function addCartWish() {
        return  axios.get('https://ecommerce.routemisr.com/api/v1/wishlist'
        , {headers}).then((response) => response).catch((err) => err)
    }
    function deletCartWish(id) {
        return  axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`
        , {headers}).then((response) => response).catch((err) => err)
    }
    function addCart() {
        return  axios.get('https://ecommerce.routemisr.com/api/v1/cart'
        , {headers}).then((response) => response).catch((err) => err)
    }
    function deletCart(id) {
        return  axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`
        , {headers}).then((response) => response).catch((err) => err)
    }
    function updateCart(id,count) {
        return  axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
            "count":count
        }
        , {headers}).then((response) => response).catch((err) => err)
    }
   
    
export default function CartContextProvider(props) {
    const [numOfCart,setNumOfCart]=useState(0)
    const [numOfCartId,setNumOfCartId]=useState(null)
    const [numOfCartWish,setNumOfCartWish]=useState(0)
    const [numOfCartIdWish,setNumOfCartIdWish]=useState(null)
    function paymentCart(shippingAddress) {
        return  axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${numOfCartId}?url=http://localhost:3000`,{
            shippingAddress
        }
        , {headers}).then((response) => response).catch((err) => err)
    }
    async function numberItem(){
        let {data}= await addCart()
        setNumOfCart(data?.numOfCartItems)
        setNumOfCartId(data?.data._id)
    }
    async function numberItemWish(){
        let {data}= await addCartWish()
        setNumOfCartWish(data?.count)
        setNumOfCartIdWish(data?.id)
    }
    useEffect(()=>{
        numberItem()
        numberItemWish()
        
    },[])


    return <CartContext.Provider value={{addProductCart,addCart,deletCart, updateCart,numOfCart,setNumOfCart, paymentCart,addProductCartWish,addCartWish,deletCartWish,numOfCartWish,setNumOfCartWish,numOfCartIdWish,setNumOfCartIdWish, numberItemWish}}>
        {props.children}
    </CartContext.Provider>
}
