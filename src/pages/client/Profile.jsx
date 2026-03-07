import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { User, MapPin, Package, LogOut, Edit2 } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { useNavigate } from 'react-router-dom'
const Profile = () => {
    const navigate = useNavigate()

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4 max-w-5xl">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl font-bold text-gray-900 mb-8"
                >
                    My Account
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
                                <div className="w-20 h-20 bg-linear-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-3xl mb-4 shadow-lg shadow-orange-500/30">
                                    AM
                                </div>
                                <h3 className="font-bold text-gray-900 text-lg">Alex Morgan</h3>
                                <p className="text-sm text-gray-500">alex@example.com</p>
                            </div>
                            <nav className="p-3">
                                <Link to="/profile" className="flex items-center gap-3 px-4 py-3 bg-orange-50 text-orange-700 rounded-xl font-medium transition-all duration-300 hover:bg-orange-100">
                                    <User size={18} /> Profile Info
                                </Link>
                                <Link to="/orders" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl font-medium transition-all duration-300">
                                    <Package size={18} /> My Orders
                                </Link>
                                <button onClick={() => {
                                    localStorage.removeItem("token");
                                    navigate("/login")
                                }} className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl font-medium transition-all duration-300 mt-2">
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
                        className="lg:col-span-3 space-y-8"
                    >
                        {/* Personal Info Card */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-lg transition-all duration-300"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
                                <button className="text-orange-600 hover:text-orange-700 font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all duration-300">
                                    <Edit2 size={14} /> Edit
                                </button>
                            </div>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="group">
                                    <label className="text-sm text-gray-500 block mb-1">Full Name</label>
                                    <p className="font-medium text-gray-900 text-lg group-hover:text-orange-600 transition-colors">Alex Morgan</p>
                                </div>
                                <div className="group">
                                    <label className="text-sm text-gray-500 block mb-1">Email Address</label>
                                    <p className="font-medium text-gray-900 text-lg group-hover:text-orange-600 transition-colors">alex@example.com</p>
                                </div>
                                <div className="group">
                                    <label className="text-sm text-gray-500 block mb-1">Phone Number</label>
                                    <p className="font-medium text-gray-900 text-lg group-hover:text-orange-600 transition-colors">+91 98765 43210</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Addresses Card */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-lg transition-all duration-300"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <h2 className="text-xl font-bold text-gray-900">Saved Addresses</h2>
                                <Button variant="outline" className="text-orange-600 border-orange-200 bg-orange-50 hover:bg-orange-100 transition-all duration-300">
                                    + Add New
                                </Button>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className="border border-orange-200 bg-orange-50/30 rounded-xl p-5 relative cursor-pointer transition-all duration-300"
                                >
                                    <span className="absolute top-4 right-4 bg-orange-100 text-orange-700 text-xs font-bold px-2 py-1 rounded">DEFAULT</span>
                                    <div className="flex items-center gap-2 mb-3">
                                        <MapPin size={18} className="text-orange-600" />
                                        <span className="font-bold text-gray-900">Home</span>
                                    </div>
                                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                        123, Green Valley Apartments, <br />
                                        Sector 45, MG Road, <br />
                                        Bangalore, Karnataka - 560001
                                    </p>
                                    <div className="flex gap-4">
                                        <button className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Edit</button>
                                        <button className="text-sm font-medium text-gray-500 hover:text-red-600 transition-colors">Delete</button>
                                    </div>
                                </motion.div>

                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className="border border-gray-200 rounded-xl p-5 cursor-pointer hover:border-orange-200 hover:bg-orange-50/20 transition-all duration-300"
                                >
                                    <div className="flex items-center gap-2 mb-3">
                                        <MapPin size={18} className="text-gray-400" />
                                        <span className="font-bold text-gray-900">Office</span>
                                    </div>
                                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                        Tech Park, Tower B, 4th Floor, <br />
                                        Whitefield Main Road, <br />
                                        Bangalore, Karnataka - 560066
                                    </p>
                                    <div className="flex gap-4">
                                        <button className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Edit</button>
                                        <button className="text-sm font-medium text-gray-500 hover:text-red-600 transition-colors">Delete</button>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default Profile
