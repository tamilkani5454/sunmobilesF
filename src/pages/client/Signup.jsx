import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '../../components/ui/button'
import { ArrowLeft, UserPlus } from 'lucide-react'

const Signup = () => {
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
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-orange-500/30">
                  <UserPlus className="text-white" size={28} />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
                <p className="text-gray-500">Join Sun Mobiles for exclusive offers</p>
            </motion.div>

            <motion.form 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="space-y-4"
            >
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 block">First Name</label>
                        <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all duration-300" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 block">Last Name</label>
                        <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all duration-300" placeholder="Doe" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 block">Email Address</label>
                    <input type="email" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all duration-300" placeholder="you@example.com" />
                </div>
                
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 block">Password</label>
                    <input type="password" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all duration-300" placeholder="••••••••" />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 block">Confirm Password</label>
                    <input type="password" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all duration-300" placeholder="••••••••" />
                </div>

                <div className="pt-2">
                    <motion.div whileTap={{ scale: 0.98 }}>
                      <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-xl py-6 text-lg font-bold shadow-xl shadow-orange-500/30 transition-all duration-300 hover:shadow-2xl">
                          Create Account
                      </Button>
                    </motion.div>
                </div>
            </motion.form>

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
