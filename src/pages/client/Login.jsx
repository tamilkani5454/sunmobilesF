import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '../../components/ui/button'
import { ArrowLeft, LogIn } from 'lucide-react'
import { useState, useEffect, useContext } from 'react'
import { appContext } from '../../context/Context'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import UserCheck from '../../context/UserCheck'
const Login = () => {
  const navigate = useNavigate()
  const { isUser } = UserCheck()
  const { URL } = useContext(appContext)
  const [users, setUsers] = useState({
    email: "",
    password: ""
  })
  useEffect(() => {
    if (isUser) {
      navigate("/profile");
    }
  }, [isUser]);
  const sendLogin = async () => {
    const res = await fetch(URL + "/register/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(users)
    })
    const data = await res.json()
    console.log("message", data)
    console.log(data)
    if (data.success) {
      toast.success(data.message)
      localStorage.setItem("token", data.token)
      navigate("/profile")
    }
    if (!data.success) {
      toast.error(data.message)
    }
  }
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-100 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden relative z-10 border border-gray-100"
      >
        <div className="p-8 md:p-12">
          <Link to="/" className="inline-flex items-center text-gray-500 hover:text-orange-600 mb-8 transition-colors text-sm font-medium group">
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center mb-10"
          >
            <div className="w-16 h-16 bg-linear-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-orange-500/30">
              <LogIn className="text-white" size={28} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back!</h1>
            <p className="text-gray-500">Sign in to continue to Sun Mobiles</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="space-y-6"

          >
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">Email Address</label>
              <input type="email" onChange={(e) => setUsers({ ...users, email: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all duration-300" placeholder="you@example.com" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <a href="#" className="text-xs font-semibold text-orange-600 hover:text-orange-700 transition-colors">Forgot Password?</a>
              </div>
              <input type="password" onChange={(e) => setUsers({ ...users, password: e.target.value })} autoComplete='current' className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all duration-300" placeholder="••••••••" />
            </div>

            <motion.div whileTap={{ scale: 0.98 }}>
              <Button onClick={sendLogin}
                className="w-full bg-linear-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white rounded-xl py-6 text-lg font-bold shadow-xl shadow-gray-900/20 transition-all duration-300 hover:shadow-2xl" >
                Sign In
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-8 text-center"
          >
            <p className="text-gray-500 text-sm">
              Don't have an account? <Link to="/signup" className="font-bold text-orange-600 hover:text-orange-700 transition-colors">Create Account</Link>
            </p>
          </motion.div>
        </div>
        <div className="bg-gray-50 p-4 text-center border-t border-gray-100">
          <Link to="/admin" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">Admin Login</Link>
        </div>
      </motion.div>
    </div>
  )
}

export default Login
