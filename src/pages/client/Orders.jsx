import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { User, Package, LogOut, ChevronRight, Box, Truck, CheckCircle } from 'lucide-react'
import { Button } from '../../components/ui/button'

const Orders = () => {
    const orders = [
        {
            id: "SUN-88294",
            date: "Jan 25, 2026",
            total: 49997,
            status: "Processing",
            items: ["Sun X Pro 5G", "Redmi Note 13 (x2)"]
        },
        {
            id: "SUN-77401",
            date: "Dec 12, 2025",
            total: 1999,
            status: "Delivered",
            items: ["Wireless Earbuds S2"]
        }
    ]

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4 max-w-5xl">
                <motion.h1 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl font-bold text-gray-900 mb-8"
                >
                    My Orders
                </motion.h1>

                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="lg:col-span-1"
                    >
                         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-24 hover:shadow-lg transition-shadow duration-300">
                            <div className="p-6 border-b border-gray-100 flex flex-col items-center text-center">
                                <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-3xl mb-4 shadow-lg shadow-orange-500/30">
                                    AM
                                </div>
                                <h3 className="font-bold text-gray-900 text-lg">Alex Morgan</h3>
                                <p className="text-sm text-gray-500">alex@example.com</p>
                            </div>
                            <nav className="p-3">
                                <Link to="/profile" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl font-medium transition-all duration-300">
                                    <User size={18} /> Profile Info
                                </Link>
                                <Link to="/orders" className="flex items-center gap-3 px-4 py-3 bg-orange-50 text-orange-700 rounded-xl font-medium transition-all duration-300 hover:bg-orange-100">
                                    <Package size={18} /> My Orders
                                </Link>
                                <button className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl font-medium transition-all duration-300 mt-2">
                                    <LogOut size={18} /> Log Out
                                </button>
                            </nav>
                        </div>
                    </motion.div>

                    {/* Content */}
                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="lg:col-span-3 space-y-6"
                    >
                        {orders.map((order, index) => (
                            <motion.div 
                                key={order.id} 
                                variants={itemVariants}
                                whileHover={{ scale: 1.01, y: -4 }}
                                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
                            >
                                <div className="p-6">
                                    <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
                                        <div>
                                            <div className="flex items-center gap-3 mb-1">
                                                <h3 className="font-bold text-lg text-gray-900">Order #{order.id}</h3>
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                                                    order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                                                }`}>
                                                    {order.status}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-500">Placed on {order.date}</p>
                                        </div>
                                        <div className="text-left md:text-right">
                                            <p className="font-bold text-xl text-gray-900">₹{order.total.toLocaleString()}</p>
                                            <Link to="#" className="text-sm text-orange-600 font-medium hover:underline flex items-center md:justify-end gap-1 group">
                                                View Details <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Order Items Preview */}
                                    <div className="bg-gray-50 rounded-xl p-4">
                                        <p className="text-sm font-medium text-gray-600 mb-2">Items in this order:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {order.items.map((item, idx) => (
                                                <span key={idx} className="bg-white border border-gray-200 px-3 py-1.5 rounded-lg text-sm text-gray-700 shadow-sm hover:border-orange-200 hover:text-orange-700 transition-all duration-300">
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    {/* Order Status Timeline (Simple) */}
                                    <div className="mt-6 pt-6 border-t border-gray-100 grid grid-cols-3 gap-4 text-center">
                                        <div className="flex flex-col items-center gap-2 group">
                                            <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                                                <Box size={18} />
                                            </div>
                                            <span className="text-xs font-medium text-gray-900">Confirmed</span>
                                        </div>
                                         <div className="flex flex-col items-center gap-2 group">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm ${
                                                order.status === 'Processing' ? 'bg-blue-100 text-blue-600 animate-pulse' : 'bg-green-100 text-green-600'
                                            }`}>
                                                <Truck size={18} />
                                            </div>
                                            <span className="text-xs font-medium text-gray-900">Shipped</span>
                                        </div>
                                         <div className="flex flex-col items-center gap-2 group">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm ${
                                                 order.status === 'Delivered' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                                            }`}>
                                                <CheckCircle size={18} />
                                            </div>
                                            <span className="text-xs font-medium text-gray-900">Delivered</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default Orders
