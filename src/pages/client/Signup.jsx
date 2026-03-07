import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '../../components/ui/button'
import { ArrowLeft, UserPlus } from 'lucide-react'
import { appContext } from '../../context/Context'
import toast from 'react-hot-toast'

const Signup = () => {
  const { URL } = useContext(appContext)
  const [password, setPassword] = useState({
    password: "",
    confirmPassword: "",
  })
  const [match, setMatch] = useState(null)
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: ""
  })
  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatePassword = { ...password, [name]: value };
    setPassword(updatePassword);

    if (name === "password") {
      setUser({ ...user, password: value });
    }

    if (name === "confirmPassword") {
      setMatch(updatePassword.password === value);
    }
  };
  const handleCreate = async () => {
    const newUser = {
      ...user,
      password: password.password
    }
    console.log(newUser)
    const res = await fetch(URL + "/register/sign-up", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser)
    })
    const data = await res.json()
    console.log(data)
    if (data.success) {
      toast.success(data.message)
    }
    if (!data.success) {
      toast.error(data.message)
    }
  }



  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4 py-12 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-orange-100 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-40"></div>
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
              <UserPlus className="text-white" size={28} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
            <p className="text-gray-500">Join Sun Mobiles for exclusive offers</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block">First Name</label>
                <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all duration-300" placeholder="John" onChange={(e) => setUser({ ...user, firstName: e.target.value })} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block">Last Name</label>
                <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all duration-300" placeholder="Doe" onChange={(e) => setUser({ ...user, lastName: e.target.value })} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">Phone Number</label>
              <input type="number" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all duration-300" placeholder="9876543210" onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })} />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">Email Address</label>
              <input type="email" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all duration-300" placeholder="you@example.com" onChange={(e) => setUser({ ...user, email: e.target.value })} />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">Password</label>
              <input type="password" name="password" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all duration-300" placeholder="••••••••" onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">Confirm Password</label>
              <input type="password" name="confirmPassword" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all duration-300" placeholder="••••••••" onChange={handleChange} />
            </div>
            {match === true && (
              <p style={{ color: "green" }}>✅ Password matched</p>
            )}

            {match === false && (
              <p style={{ color: "red" }}>❌ Password missmatch</p>
            )}

            <div className="pt-2">
              <motion.div whileTap={{ scale: 0.98 }}>
                <Button onClick={handleCreate} disabled={!match} className="w-full bg-linear-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-xl py-6 text-lg font-bold shadow-xl shadow-orange-500/30 transition-all duration-300 hover:shadow-2xl">
                  Create Account
                </Button>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-8 text-center"
          >
            <p className="text-gray-500 text-sm">
              Already have an account? <Link to="/login" className="font-bold text-gray-900 hover:text-orange-600 transition-colors">Sign In</Link>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default Signup
