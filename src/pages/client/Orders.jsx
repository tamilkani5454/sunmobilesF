import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { User, Package, LogOut, ChevronRight, Box, Truck, CheckCircle } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { appContext } from '../../context/Context'
import { useContext, useState, useEffect } from 'react'


const Orders = () => {
    const { URL } = useContext(appContext)
    const [orders, setOrders] = useState([])
    const [loadingOrders, setLoadingOrders] = useState(true)

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                // Using hardcoded userId from previous implementation
                const userId = "6992b349449c6ac69a7f7768"
                const res = await fetch(URL + "/get-user-order", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userId })
                })
                const data = await res.json()
                if (data.success && data.order) {
                    setOrders(data.order)
                } else if (data.order) {
                    setOrders(data.order)
                } else if (Array.isArray(data)) {
                    setOrders(data)
                }
            } catch (error) {
                console.error("Error fetching orders:", error)
            } finally {
                setLoadingOrders(false)
            }
        }
        fetchOrders()
    }, [URL])

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
                    className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8"
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
                                <div className="w-20 h-20 bg-linear-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-3xl mb-4 shadow-lg shadow-orange-500/20">
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
                                <button className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl font-medium transition-colors mt-2">dont change anything 
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
                        {loadingOrders ? (
                            <div className="text-center py-12 text-gray-500">Loading orders...</div>
                        ) : orders.length === 0 ? (
                            <div className="text-center py-12 text-gray-500">No orders found.</div>
                        ) : orders.map((order) => (
                            <motion.div
                                key={order._id || order.orderId}
                                variants={itemVariants}
                                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300"
                            >
                                <div className="p-6">
                                    <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-6">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-3">
                                                <h3 className="font-bold text-base md:text-lg text-gray-900">Order #{order.orderId}</h3>
                                                <span className={`px-2 md:px-2.5 py-0.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wide border ${['delivered', 'completed'].includes(order.orderStatus?.toLowerCase()) ? 'bg-green-50 text-green-700 border-green-100' :
                                                        ['processing', 'placed', 'pending'].includes(order.orderStatus?.toLowerCase()) ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                                            'bg-red-50 text-red-700 border-red-100'
                                                    }`}>
                                                    {order.orderStatus || 'Pending'}
                                                </span>
                                            </div>
                                            <p className="text-xs md:text-sm text-gray-500">Placed on <span className="font-medium text-gray-700">
                                                {order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'Unknown Date'}
                                            </span></p>
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                                            <p className="font-bold text-lg md:text-xl text-gray-900">₹{order.finalAmount?.toLocaleString()}</p>
                                        </div>
                                    </div>

                                    {/* Items & Action */}
                                    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between pt-6 border-t border-gray-50">
                                        <div className="flex-1 w-full md:w-auto">
                                            <p className="text-[10px] md:text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Items</p>
                                            <div className="flex flex-wrap gap-2">
                                                {order.products && order.products.map((prod, idx) => {
                                                    const productInfo = allProducts?.find(p => p._id === prod.productId) || {};
                                                    return (
                                                    <Link to={`/products/${prod.productId}`} key={idx} className="inline-flex items-center gap-2 px-2 py-1 md:px-2.5 md:py-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-100 group">
                                                        {productInfo.images && productInfo.images[0] ? (
                                                            <img src={productInfo.images[0].url} alt={productInfo.name || "Product"} className="w-5 h-5 md:w-8 md:h-8 object-cover rounded-md group-hover:scale-105 transition-transform" />
                                                        ) : (
                                                            <Package size={16} className="text-gray-400" />
                                                        )}
                                                        <span className="text-[10px] md:text-sm font-medium text-gray-700 max-w-25 md:max-w-50 truncate group-hover:text-orange-600 transition-colors">{productInfo.name || `Product ID: ${prod.productId}`}</span>
                                                        <span className="text-[9px] md:text-xs font-semibold text-gray-500 bg-white px-1.5 py-0.5 rounded border border-gray-200">x{prod.quantity}</span>
                                                    </Link>
                                                    )
                                                })}
                                            </div>
                                        </div>

                                        <Link
                                            to={`/orders/${order.orderId || order._id}`}
                                            className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 md:px-6 md:py-2.5 bg-white border-2 border-orange-100 text-orange-600 rounded-xl text-sm md:text-base font-semibold hover:bg-orange-50 hover:border-orange-200 transition-all duration-300"
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
