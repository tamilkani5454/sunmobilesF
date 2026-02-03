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
        },
        {
            id: "SUN-99231",
            date: "Feb 10, 2026",
            total: 12999,
            status: "Cancelled",
            items: ["Smart Watch V2"]
        }
    ]

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
    }

    return (
        <div className="min-h-screen bg-gray-50/50 py-12">
            <div className="container mx-auto px-4 max-w-6xl">
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
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="lg:col-span-1"
                    >
                         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
                            <div className="p-6 border-b border-gray-50 flex flex-col items-center text-center">
                                <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-3xl mb-4 shadow-lg shadow-orange-500/20">
                                    AM
                                </div>
                                <h3 className="font-bold text-gray-900 text-lg">Alex Morgan</h3>
                                <p className="text-sm text-gray-500">alex@example.com</p>
                            </div>
                            <nav className="p-3 space-y-1">
                                <Link to="/profile" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl font-medium transition-colors">
                                    <User size={18} /> Profile Info
                                </Link>
                                <Link to="/orders" className="flex items-center gap-3 px-4 py-3 bg-orange-50 text-orange-700 rounded-xl font-medium transition-colors">
                                    <Package size={18} /> My Orders
                                </Link>
                                <button className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl font-medium transition-colors mt-2">
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
                        className="lg:col-span-3 space-y-4"
                    >
                        {orders.map((order) => (
                            <motion.div 
                                key={order.id} 
                                variants={itemVariants}
                                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300"
                            >
                                <div className="p-6">
                                    <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-6">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-3">
                                                <h3 className="font-bold text-lg text-gray-900">Order #{order.id}</h3>
                                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide border ${
                                                    order.status === 'Delivered' ? 'bg-green-50 text-green-700 border-green-100' : 
                                                    order.status === 'Processing' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                                    'bg-red-50 text-red-700 border-red-100'
                                                }`}>
                                                    {order.status}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-500">Placed on <span className="font-medium text-gray-700">{order.date}</span></p>
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                                             <p className="font-bold text-xl text-gray-900">₹{order.total.toLocaleString()}</p>
                                        </div>
                                    </div>

                                    {/* Items & Action */}
                                    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between pt-6 border-t border-gray-50">
                                         <div className="flex-1">
                                             <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Items</p>
                                             <div className="flex flex-wrap gap-2">
                                                {order.items.map((item, idx) => (
                                                    <span key={idx} className="inline-flex items-center px-2.5 py-1 rounded-md bg-gray-50 text-gray-600 text-sm font-medium border border-gray-100">
                                                        {item}
                                                    </span>
                                                ))}
                                                {order.items.length > 2 && (
                                                    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-gray-50 text-gray-400 text-sm font-medium border border-gray-100">
                                                        +{order.items.length - 2} more
                                                    </span>
                                                )}
                                             </div>
                                         </div>
                                         
                                         <Link 
                                            to={`/orders/${order.id}`}
                                            className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-white border-2 border-orange-100 text-orange-600 rounded-xl font-semibold hover:bg-orange-50 hover:border-orange-200 transition-all duration-300"
                                         >
                                            View Details <ChevronRight size={16} />
                                         </Link>
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
