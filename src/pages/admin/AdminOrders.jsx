import React, { useEffect, useState, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Filter,
  Eye,
  X,
  Clock,
  CheckCircle2,
  Truck,
  AlertCircle,
  Package,
  MapPin,
  Phone,
  Mail
} from 'lucide-react'
import { appContext } from '../../context/Context'
import toast from 'react-hot-toast'

const statusConfig = {
  placed: { icon: Clock, color: 'text-blue-600 bg-blue-50 border-blue-200', label: 'Placed' },
  pending: { icon: Clock, color: 'text-yellow-600 bg-yellow-50 border-yellow-200', label: 'Pending' },
  processing: { icon: AlertCircle, color: 'text-blue-600 bg-blue-50 border-blue-200', label: 'Processing' },
  shipped: { icon: Truck, color: 'text-purple-600 bg-purple-50 border-purple-200', label: 'Shipped' },
  delivered: { icon: CheckCircle2, color: 'text-green-600 bg-green-50 border-green-200', label: 'Delivered' },
  cancelled: { icon: X, color: 'text-red-600 bg-red-50 border-red-200', label: 'Cancelled' },
}

const AdminOrders = () => {
  const { URL } = useContext(appContext)
  const [orders, setOrders] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [statusFilter, setStatusFilter] = useState('all')
  const [loading, setLoading] = useState(false)
  const filteredOrders = orders.filter(order => {
    const orderIdStr = order.orderId || order._id || '';
    const nameStr = `${order.shippingAddress?.firstName || ''} ${order.shippingAddress?.lastName || ''}`;
    const matchesSearch =
      orderIdStr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      nameStr.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === 'all' || order.orderStatus === statusFilter
    return matchesSearch && matchesStatus
  })

  const token = localStorage.getItem("adminToken");

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

  const updateOrderStatus = async (orderId, newStatus) => {
    setLoading(true)
    try {
      const res = await fetch(URL + "/update/edit-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ orderStatus: newStatus, id: orderId })
      })
      const data = await res.json()
      if (data.success) {
        setOrders(orders.map(o => o._id === orderId ? { ...o, orderStatus: newStatus } : o));
        setSelectedOrder(prev => prev && prev._id === orderId ? { ...prev, orderStatus: newStatus } : prev);
        setSelectedOrder(null)
        toast.success(data.message)
      }
    } catch (error) {
      console.error("Failed to update order status", error);
    } finally {
      setLoading(false)
    }
  }
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    )
  }
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
        <p className="text-gray-500 mt-1">Manage and track customer orders</p>
      </div>

      {/* Filters Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4 overflow-x-auto">
        <div className="flex-1 min-w-50 flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-2.5">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search by order ID or customer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-sm text-gray-700 placeholder:text-gray-400 w-full"
          />
        </div>
        <div className="flex gap-2 flex-nowrap whitespace-nowrap overflow-x-auto pb-1 sm:pb-0">
          {['all', 'placed', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer ${statusFilter === status
                ? 'bg-gray-900 text-white'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Order ID</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Customer</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4 hidden lg:table-cell">Date</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Total</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Status</th>
                <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.map((order) => {
                const status = order.orderStatus || 'pending';
                const statusInfo = statusConfig[status] || statusConfig.pending;
                const StatusIcon = statusInfo.icon;
                const orderId = order.orderId || order._id;
                const name = `${order.shippingAddress?.firstName || ''} ${order.shippingAddress?.lastName || ''}`;
                const email = order.shippingAddress?.email || '';
                const date = order.createdAt ? new Date(order.createdAt).toLocaleDateString() : '';
                const total = order.finalAmount || 0;

                return (
                  <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-semibold text-gray-900">{orderId}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{name}</p>
                        <p className="text-sm text-gray-500">{email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 hidden lg:table-cell">{date}</td>
                    <td className="px-6 py-4 font-semibold text-gray-900">₹{total.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${statusInfo.color}`}>
                        <StatusIcon size={12} />
                        {statusInfo.label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm font-medium text-gray-700 transition-colors cursor-pointer"
                        >
                          <Eye size={14} />
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <Package size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No orders found</h3>
            <p className="text-gray-500 mt-1">Try adjusting your filters or wait for new orders</p>
          </div>
        )}
      </motion.div>

      {/* Order Details Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedOrder(null)}
              className="fixed inset-0 bg-black/50 z-50 cursor-pointer"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl bg-white rounded-2xl shadow-2xl z-50 overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Order {selectedOrder.orderId || selectedOrder._id}</h2>
                  <p className="text-sm text-gray-500 mt-0.5">{selectedOrder.createdAt ? new Date(selectedOrder.createdAt).toLocaleString() : ''}</p>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 space-y-6 overflow-y-auto flex-1">
                {/* Status */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <span className="text-sm font-medium text-gray-600">Order Status</span>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border ${statusConfig[selectedOrder.orderStatus || 'pending']?.color || statusConfig.pending.color}`}>
                    {React.createElement(statusConfig[selectedOrder.orderStatus || 'pending']?.icon || statusConfig.pending.icon, { size: 14 })}
                    {statusConfig[selectedOrder.orderStatus || 'pending']?.label || 'Pending'}
                  </span>
                </div>

                {/* Customer Info */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Customer Information</h3>
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Mail size={14} className="text-gray-500" />
                      </div>
                      <span className="text-gray-600">{selectedOrder.shippingAddress?.email || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Phone size={14} className="text-gray-500" />
                      </div>
                      <span className="text-gray-600">{selectedOrder.shippingAddress?.phoneNumber || 'N/A'}</span>
                    </div>
                    <div className="flex items-start gap-3 text-sm">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                        <MapPin size={14} className="text-gray-500" />
                      </div>
                      <span className="text-gray-600">
                        {`${selectedOrder.shippingAddress?.firstName || ''} ${selectedOrder.shippingAddress?.lastName || ''}, `}
                        {`${selectedOrder.shippingAddress?.address || ''}, ${selectedOrder.shippingAddress?.city || ''}, `}
                        {`${selectedOrder.shippingAddress?.state || ''} ${selectedOrder.shippingAddress?.pincode || ''}`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Order Items</h3>
                  <div className="space-y-3">
                    {selectedOrder.products?.map((item, index) => {
                      const product = item.productId;
                      const hasDetails = !!product;
                      return (
                        <div
                          key={index}
                          onClick={() => hasDetails && window.open(`/products/${product._id}`, '_blank')}
                          className={`flex items-center justify-between p-3 bg-gray-50 rounded-xl transition-colors ${hasDetails ? 'cursor-pointer hover:bg-gray-100' : ''}`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-xl border border-gray-200 overflow-hidden shrink-0">
                              {product && product.images && product.images.length > 0 && product.images[0].url ? (
                                <img src={product.images[0].url} alt={product.name} className="w-full h-full object-cover" />
                              ) : (
                                <span>📦</span>
                              )}
                            </div>
                            <div>
                              <p className={`font-medium ${hasDetails ? 'text-blue-600 hover:underline' : 'text-gray-900'}`}>
                                {product?.name || `Product Details Available`}
                              </p>
                              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                            </div>
                          </div>
                          <span className="font-semibold text-gray-900">₹{item.price?.toLocaleString()}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Payment Method</span>
                    <span className="font-medium text-gray-900">
                      {selectedOrder.paymentMethod === 'PAS' ? 'Pay at Store' : (selectedOrder.paymentMethod || 'Online')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Payment Status</span>
                    <span className="font-medium text-gray-900 capitalize">{selectedOrder.paymentStatus || 'pending'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-lg font-bold text-gray-900">₹{(selectedOrder.finalAmount || 0).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-100 flex gap-3">
                <select
                  className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 cursor-pointer"
                  value={selectedOrder.orderStatus || 'pending'}
                  onChange={(e) => setSelectedOrder({ ...selectedOrder, orderStatus: e.target.value })}
                >
                  <option value="placed">Placed</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <button
                  onClick={() => updateOrderStatus(selectedOrder._id, selectedOrder.orderStatus)}
                  className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-medium transition-colors shadow-lg shadow-orange-500/20 cursor-pointer"
                >
                  Update Status
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AdminOrders
