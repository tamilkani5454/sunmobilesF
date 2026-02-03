import React, { useState } from 'react'
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

const ordersData = [
  { 
    id: 'ORD-001', 
    customer: { name: 'Rahul Kumar', email: 'rahul@email.com', phone: '+91 98765 43210' },
    items: [{ name: 'iPhone 15 Pro Max', qty: 1, price: 159900 }],
    address: '123 MG Road, Bangalore, Karnataka 560001',
    total: 159900, 
    status: 'delivered', 
    date: '2026-01-25',
    paymentMethod: 'UPI'
  },
  { 
    id: 'ORD-002', 
    customer: { name: 'Priya Sharma', email: 'priya@email.com', phone: '+91 87654 32109' },
    items: [{ name: 'Samsung Galaxy S24 Ultra', qty: 1, price: 129999 }],
    address: '456 Anna Nagar, Chennai, Tamil Nadu 600040',
    total: 129999, 
    status: 'shipped', 
    date: '2026-01-24',
    paymentMethod: 'Credit Card'
  },
  { 
    id: 'ORD-003', 
    customer: { name: 'Amit Patel', email: 'amit@email.com', phone: '+91 76543 21098' },
    items: [
      { name: 'OnePlus 12', qty: 1, price: 64999 },
      { name: 'OnePlus Buds Pro 2', qty: 1, price: 11999 }
    ],
    address: '789 SG Highway, Ahmedabad, Gujarat 380015',
    total: 76998, 
    status: 'processing', 
    date: '2026-01-24',
    paymentMethod: 'Debit Card'
  },
  { 
    id: 'ORD-004', 
    customer: { name: 'Sneha Reddy', email: 'sneha@email.com', phone: '+91 65432 10987' },
    items: [{ name: 'Google Pixel 8 Pro', qty: 1, price: 106999 }],
    address: '321 Jubilee Hills, Hyderabad, Telangana 500033',
    total: 106999, 
    status: 'pending', 
    date: '2026-01-23',
    paymentMethod: 'COD'
  },
  { 
    id: 'ORD-005', 
    customer: { name: 'Vikram Singh', email: 'vikram@email.com', phone: '+91 54321 09876' },
    items: [{ name: 'Nothing Phone 2', qty: 1, price: 44999 }],
    address: '654 Connaught Place, New Delhi 110001',
    total: 44999, 
    status: 'delivered', 
    date: '2026-01-22',
    paymentMethod: 'UPI'
  },
  { 
    id: 'ORD-006', 
    customer: { name: 'Ananya Das', email: 'ananya@email.com', phone: '+91 43210 98765' },
    items: [{ name: 'iPhone 15', qty: 2, price: 79900 }],
    address: '987 Park Street, Kolkata, West Bengal 700016',
    total: 159800, 
    status: 'shipped', 
    date: '2026-01-21',
    paymentMethod: 'Net Banking'
  },
]

const statusConfig = {
  pending: { icon: Clock, color: 'text-yellow-600 bg-yellow-50 border-yellow-200', label: 'Pending' },
  processing: { icon: AlertCircle, color: 'text-blue-600 bg-blue-50 border-blue-200', label: 'Processing' },
  shipped: { icon: Truck, color: 'text-purple-600 bg-purple-50 border-purple-200', label: 'Shipped' },
  delivered: { icon: CheckCircle2, color: 'text-green-600 bg-green-50 border-green-200', label: 'Delivered' },
}

const AdminOrders = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredOrders = ordersData.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
        <p className="text-gray-500 mt-1">Manage and track customer orders</p>
      </div>

      {/* Filters Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-2.5">
          <Search size={18} className="text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by order ID or customer..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-sm text-gray-700 placeholder:text-gray-400 w-full"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all', 'pending', 'processing', 'shipped', 'delivered'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                statusFilter === status
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
                const StatusIcon = statusConfig[order.status].icon
                return (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-semibold text-gray-900">{order.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{order.customer.name}</p>
                        <p className="text-sm text-gray-500">{order.customer.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 hidden lg:table-cell">{order.date}</td>
                    <td className="px-6 py-4 font-semibold text-gray-900">₹{order.total.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${statusConfig[order.status].color}`}>
                        <StatusIcon size={12} />
                        {statusConfig[order.status].label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end">
                        <button 
                          onClick={() => setSelectedOrder(order)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm font-medium text-gray-700 transition-colors"
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
            <p className="text-gray-500 mt-1">Try adjusting your filters</p>
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
              className="fixed inset-0 bg-black/50 z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl bg-white rounded-2xl shadow-2xl z-50 overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Order {selectedOrder.id}</h2>
                  <p className="text-sm text-gray-500 mt-0.5">{selectedOrder.date}</p>
                </div>
                <button 
                  onClick={() => setSelectedOrder(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 space-y-6 overflow-y-auto flex-1">
                {/* Status */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <span className="text-sm font-medium text-gray-600">Order Status</span>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border ${statusConfig[selectedOrder.status].color}`}>
                    {React.createElement(statusConfig[selectedOrder.status].icon, { size: 14 })}
                    {statusConfig[selectedOrder.status].label}
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
                      <span className="text-gray-600">{selectedOrder.customer.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Phone size={14} className="text-gray-500" />
                      </div>
                      <span className="text-gray-600">{selectedOrder.customer.phone}</span>
                    </div>
                    <div className="flex items-start gap-3 text-sm">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                        <MapPin size={14} className="text-gray-500" />
                      </div>
                      <span className="text-gray-600">{selectedOrder.address}</span>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Order Items</h3>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-xl border border-gray-200">
                            📱
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{item.name}</p>
                            <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                          </div>
                        </div>
                        <span className="font-semibold text-gray-900">₹{item.price.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Payment Method</span>
                    <span className="font-medium text-gray-900">{selectedOrder.paymentMethod}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-lg font-bold text-gray-900">₹{selectedOrder.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-100 flex gap-3">
                <select className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500">
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>
                <button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-medium transition-colors shadow-lg shadow-orange-500/20">
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
