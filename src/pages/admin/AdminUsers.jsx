import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  Filter, 
  MoreVertical,
  Mail,
  Phone,
  Calendar,
  ShoppingBag,
  Users as UsersIcon
} from 'lucide-react'

const usersData = [
  { 
    id: 1, 
    name: 'Rahul Kumar', 
    email: 'rahul.kumar@email.com', 
    phone: '+91 98765 43210',
    orders: 12, 
    totalSpent: 245000,
    joinDate: '2025-08-15',
    avatar: 'RK',
    status: 'active'
  },
  { 
    id: 2, 
    name: 'Priya Sharma', 
    email: 'priya.sharma@email.com', 
    phone: '+91 87654 32109',
    orders: 8, 
    totalSpent: 189000,
    joinDate: '2025-09-22',
    avatar: 'PS',
    status: 'active'
  },
  { 
    id: 3, 
    name: 'Amit Patel', 
    email: 'amit.patel@email.com', 
    phone: '+91 76543 21098',
    orders: 5, 
    totalSpent: 98500,
    joinDate: '2025-10-10',
    avatar: 'AP',
    status: 'active'
  },
  { 
    id: 4, 
    name: 'Sneha Reddy', 
    email: 'sneha.reddy@email.com', 
    phone: '+91 65432 10987',
    orders: 15, 
    totalSpent: 342000,
    joinDate: '2025-06-05',
    avatar: 'SR',
    status: 'active'
  },
  { 
    id: 5, 
    name: 'Vikram Singh', 
    email: 'vikram.singh@email.com', 
    phone: '+91 54321 09876',
    orders: 3, 
    totalSpent: 67500,
    joinDate: '2025-11-18',
    avatar: 'VS',
    status: 'inactive'
  },
  { 
    id: 6, 
    name: 'Ananya Das', 
    email: 'ananya.das@email.com', 
    phone: '+91 43210 98765',
    orders: 9, 
    totalSpent: 156000,
    joinDate: '2025-07-30',
    avatar: 'AD',
    status: 'active'
  },
  { 
    id: 7, 
    name: 'Karthik Nair', 
    email: 'karthik.nair@email.com', 
    phone: '+91 32109 87654',
    orders: 7, 
    totalSpent: 123000,
    joinDate: '2025-09-01',
    avatar: 'KN',
    status: 'active'
  },
  { 
    id: 8, 
    name: 'Meera Iyer', 
    email: 'meera.iyer@email.com', 
    phone: '+91 21098 76543',
    orders: 2, 
    totalSpent: 45000,
    joinDate: '2025-12-05',
    avatar: 'MI',
    status: 'inactive'
  },
]

const avatarColors = [
  'bg-orange-500',
  'bg-blue-500',
  'bg-purple-500',
  'bg-green-500',
  'bg-pink-500',
  'bg-indigo-500',
  'bg-teal-500',
  'bg-rose-500',
]

const AdminUsers = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredUsers = usersData.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
        <p className="text-gray-500 mt-1">View and manage customer accounts</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
              <UsersIcon size={24} className="text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{usersData.length}</p>
              <p className="text-sm text-gray-500">Total Customers</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
              <ShoppingBag size={24} className="text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{usersData.reduce((acc, u) => acc + u.orders, 0)}</p>
              <p className="text-sm text-gray-500">Total Orders</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center">
              <span className="text-orange-600 font-bold">₹</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">₹{(usersData.reduce((acc, u) => acc + u.totalSpent, 0) / 100000).toFixed(1)}L</p>
              <p className="text-sm text-gray-500">Total Revenue</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-2.5">
          <Search size={18} className="text-gray-400" />
          <input 
            type="text" 
            placeholder="Search customers by name or email..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-sm text-gray-700 placeholder:text-gray-400 w-full"
          />
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-50 hover:bg-gray-100 rounded-xl text-gray-700 font-medium transition-colors">
          <Filter size={18} />
          Filters
        </button>
      </div>

      {/* Users Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Customer</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4 hidden lg:table-cell">Phone</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Orders</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4 hidden md:table-cell">Total Spent</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4 hidden sm:table-cell">Status</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4 hidden xl:table-cell">Join Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map((user, index) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 ${avatarColors[index % avatarColors.length]} rounded-xl flex items-center justify-center text-white font-semibold text-sm`}>
                        {user.avatar}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 hidden lg:table-cell">{user.phone}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 rounded-lg text-sm font-medium text-gray-700">
                      <ShoppingBag size={12} />
                      {user.orders}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 hidden md:table-cell">₹{user.totalSpent.toLocaleString()}</td>
                  <td className="px-6 py-4 hidden sm:table-cell">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                      user.status === 'active' 
                        ? 'bg-green-50 text-green-600' 
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      {user.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600 hidden xl:table-cell">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} className="text-gray-400" />
                      {user.joinDate}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <UsersIcon size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No customers found</h3>
            <p className="text-gray-500 mt-1">Try adjusting your search query</p>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default AdminUsers
