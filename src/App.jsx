import logo from './logo.svg';
import './App.css';
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Cart from './components/Cart/Cart';
import Categories from './components/Categories/Categories';
import Footer from './components/Footer/Footer';
import Register from './components/Register/Register';
import NotFound from './components/NotFound/NotFound';
import Brands from './components/Brands/Brands';
import Login from './components/Login/Login';
import Logout from './components/Logout/Logout';
import Products from './components/Products/Products';
import TokenContextProvider, { TokenContext } from './context/token';
import { useContext, useEffect } from 'react';
import ProtectedRoutes from './components/ProtectedRoutes';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Checkout from './components/Checkout/Checkout';
import Allorder from './components/Allorder/Allorder';
import ForgetPassword from './components/ForgetPassword/ForgetPassword';
import VerificationCode from './components/VerevicationCode/VerevicationCode';
import ResetPassword from './components/ResetPassword/ResetPassword';
import WishList from './components/WishList/WishList';






function App() {

let {setToken}=useContext(TokenContext)
 const routes= createHashRouter([
    {path:"",element: <Layout/> , children:[
      {path:"home",element: <ProtectedRoutes> <Home/></ProtectedRoutes>},
      {path:"cart",element: <ProtectedRoutes><Cart/></ProtectedRoutes> },
      {path:"categories",element: <ProtectedRoutes><Categories/></ProtectedRoutes> },
      {path:"register",element: <Register/>},
      {path:"brands",element: <ProtectedRoutes><Brands/></ProtectedRoutes> },
      {path:"login",element: <Login/>},
      {path:"logout",element: <Logout/>},
      {path:"product",element:  <ProtectedRoutes><Products/></ProtectedRoutes> },
      {path:"checkout",element:  <ProtectedRoutes><Checkout/></ProtectedRoutes> },
      {path:"allorders",element:  <ProtectedRoutes><Allorder/></ProtectedRoutes> },
      {path:"forgetpassword",element: <ForgetPassword/> },
      {path:"verificationcode",element: <VerificationCode/> },
      {path:"wishlist",element:  <ProtectedRoutes><WishList/></ProtectedRoutes> },
      {path:"resetpassword",element:  <ProtectedRoutes><ResetPassword/></ProtectedRoutes> },
      {path:"details/:id",element:  <ProtectedRoutes><ProductDetails/></ProtectedRoutes> },
      {path:"*",element: <NotFound/>},
    ] }
  ])
  useEffect(()=>{
      if(localStorage.getItem("userToken") !=null){
        setToken(localStorage.getItem("userToken"))
      }
    },[])
  return <RouterProvider router={routes}></RouterProvider>;

  
}

export default App;
