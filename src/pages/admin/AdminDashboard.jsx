import React, { useEffect, useContext, useState } from 'react'
import { motion } from 'framer-motion'
import {
  DollarSign,
  ShoppingCart,
  Package,
  Users,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Clock,
  CheckCircle2,
  Truck,
  AlertCircle
} from 'lucide-react'
import { appContext } from '../../context/Context'
import { useNavigate } from 'react-router-dom'

const statusConfig = {
  placed: { icon: Clock, color: 'text-blue-600 bg-blue-50', label: 'Placed' },
  pending: { icon: Clock, color: 'text-yellow-600 bg-yellow-50', label: 'Pending' },
  processing: { icon: AlertCircle, color: 'text-blue-600 bg-blue-50', label: 'Processing' },
  shipped: { icon: Truck, color: 'text-purple-600 bg-purple-50', label: 'Shipped' },
  delivered: { icon: CheckCircle2, color: 'text-green-600 bg-green-50', label: 'Delivered' },
  cancelled: { icon: AlertCircle, color: 'text-red-600 bg-red-50', label: 'Cancelled' },
}

const colorClasses = {
  orange: 'bg-orange-500/10 text-orange-600',
  blue: 'bg-blue-500/10 text-blue-600',
  purple: 'bg-purple-500/10 text-purple-600',
  green: 'bg-green-500/10 text-green-600',
}

const AdminDashboard = () => {
  const navigate=useNavigate()
  const token = localStorage.getItem("adminToken");
  const { URL, products,userCounts } = useContext(appContext)
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const resData = await fetch(URL + "/gets/all-orders", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const data = await resData.json()
        if (Array.isArray(data)) {
          setOrders(data.reverse());
        } else if (data && Array.isArray(data.orders)) {
          setOrders(data.orders.reverse());
        } else {
          setOrders(data || []);
        }
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    }

    if (token) {
      fetchOrders()
    }
  }, [URL, token])

  const totalRevenue = orders.reduce((sum, order) => sum + (order.orderStatus !== 'cancelled' ? (order.finalAmount || 0) : 0), 0);

  const stats = [
    {
      name: 'Total Revenue',
      value: `₹${totalRevenue.toLocaleString()}`,
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'orange'
    },
    {
      name: 'Total Orders',
      value: orders.length.toLocaleString(),
      change: '+8.2%',
      trend: 'up',
      icon: ShoppingCart,
      color: 'blue'
    },
    {
      name: 'Products',
      value: products.length,
      change: '+3.1%',
      trend: 'up',
      icon: Package,
      color: 'purple'
    },
    {
      name: 'Customers',
      value: userCounts,
      change: '+15.3%',
      trend: 'up',
      icon: Users,
      color: 'green'
    },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back! Here's what's happening with your store.</p>
        </div>
        
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClasses[stat.color]}`}>
                <stat.icon size={24} />
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                {stat.trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                {stat.change}
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-gray-500 text-sm mt-1">{stat.name}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Orders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100"
      >
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
            <p className="text-gray-500 text-sm mt-0.5">Latest orders from your store</p>
          </div>
          <button onClick={()=>navigate("/admin/orders")} className="text-orange-600 hover:text-orange-700 hover:cursor-pointer font-medium text-sm flex items-center gap-1">
            View All <ArrowRight size={14} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Order ID</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Customer</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4 hidden md:table-cell">Product</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Amount</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Status</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4 hidden sm:table-cell">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.slice(0, 5).map((order) => {
                const status = order.orderStatus || 'pending';
                const statusInfo = statusConfig[status] || statusConfig.pending;
                const StatusIcon = statusInfo.icon;

                const productName = order.products && order.products.length > 0
                  ? (order.products[0].productId?.name || 'Product Details Available') + (order.products.length > 1 ? '...' : '')
                  : 'N/A';

                const customerName = `${order.shippingAddress?.firstName || ''} ${order.shippingAddress?.lastName || ''}`.trim() || 'N/A';

                return (
                  <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-medium text-gray-900">{order.orderId || order._id}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{customerName}</td>
                    <td className="px-6 py-4 text-gray-600 hidden md:table-cell">{productName}</td>
                    <td className="px-6 py-4 font-semibold text-gray-900">₹{(order.finalAmount || 0).toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
                        <StatusIcon size={12} />
                        {statusInfo.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-sm hidden sm:table-cell">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          {orders.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No recent orders found.
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default AdminDashboard
