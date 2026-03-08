import { useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Route, Routes } from 'react-router-dom'
import About from './pages/client/About'
import Contact from './pages/client/Contact'
import Products from './pages/client/Products'
import ProductDetails from './pages/client/ProductDetails'
import Home from './pages/client/Home'
import Faq from './pages/client/Faq'
import PrivacyPolicy from './pages/client/PrivacyPolicy'
import TOS from './pages/client/TOS'
import Shipping from './pages/client/Shipping'
import Cart from './pages/client/Cart'
import Checkout from './pages/client/Checkout'
import Login from './pages/client/Login'
import Signup from './pages/client/Signup'
import AdminLogin from './pages/admin/AdminLogin'
import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminProducts from './pages/admin/AdminProducts'
import AdminOrders from './pages/admin/AdminOrders'

import AdminSettings from './pages/admin/AdminSettings'
import AdminCategories from './pages/admin/AdminCategories'
import Profile from './pages/client/Profile'
import Orders from './pages/client/Orders'
import OrderDetails from './pages/client/OrderDetails'
import ScrollToTop from './common/ScrollToTop'
import ScrollToTopOnNavigate from './common/ScrollToTopOnNavigate'
import PrivateRoutes from './components/PrivateRoutes'
import AdminRoutes from './components/AdminRoutes'
import { Toaster } from 'react-hot-toast';

function App() {


  return (
    <>
      <ScrollToTopOnNavigate />
      <Routes>
        {/* Admin Routes - No Navbar/Footer */}

        <Route path='/admin' element={<AdminLogin />} />
        <Route element={<AdminRoutes />}>
          <Route path='/admin/*' element={<AdminLayout />}>
            <Route path='dashboard' element={<AdminDashboard />} />
            <Route path='products' element={<AdminProducts />} />
            <Route path='orders' element={<AdminOrders />} />
            <Route path='categories' element={<AdminCategories />} />
            <Route path='settings' element={<AdminSettings />} />
          </Route>
        </Route>


        {/* Client Routes - With Navbar/Footer */}
        <Route path='/*' element={
          <>
            <Navbar />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/products' element={<Products />} />
              <Route path='/products/:id' element={<ProductDetails />} />
              <Route path='/faq' element={<Faq />} />
              <Route path='/privacy-policy' element={<PrivacyPolicy />} />
              <Route path='/terms' element={<TOS />} />
              <Route path='/shipping' element={<Shipping />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
              <Route element={<PrivateRoutes />}>
                <Route path='/profile' element={<Profile />} />
                <Route path='/checkout' element={<Checkout />} />
                <Route path='/orders' element={<Orders />} />
                <Route path='/orders/:id' element={<OrderDetails />} />
              </Route>
            </Routes>
            <ScrollToTop />
            <Footer />
          </>
        } />
      </Routes>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toasterId="default"
        toastOptions={{
          // Define default options
          className: '',
          duration: 5000,
          removeDelay: 1000,
          style: {
            background: '#363636',
            color: '#fff',
          },

          // Default options for specific types
          success: {
            duration: 3000,
            iconTheme: {
              primary: 'green',
              secondary: 'black',
            },
          },
        }}
      />
    </>
  )
}

export default App

