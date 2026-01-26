import React from 'react'
import { motion } from 'framer-motion'
import { 
  Store, 
  Bell, 
  Shield, 
  CreditCard, 
  Truck,
  ChevronRight,
  Save
} from 'lucide-react'

const settingsSections = [
  {
    title: 'Store Settings',
    description: 'Configure your store name, logo, and branding',
    icon: Store,
    color: 'orange'
  },
  {
    title: 'Notifications',
    description: 'Manage email and push notification preferences',
    icon: Bell,
    color: 'blue'
  },
  {
    title: 'Security',
    description: 'Update password and two-factor authentication',
    icon: Shield,
    color: 'green'
  },
  {
    title: 'Payment Methods',
    description: 'Configure payment gateways and options',
    icon: CreditCard,
    color: 'purple'
  },
  {
    title: 'Shipping',
    description: 'Set up shipping zones and delivery options',
    icon: Truck,
    color: 'pink'
  },
]

const colorClasses = {
  orange: 'bg-orange-500/10 text-orange-600',
  blue: 'bg-blue-500/10 text-blue-600',
  green: 'bg-green-500/10 text-green-600',
  purple: 'bg-purple-500/10 text-purple-600',
  pink: 'bg-pink-500/10 text-pink-600',
}

const AdminSettings = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-500 mt-1">Manage your store configuration</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-medium transition-colors shadow-lg shadow-orange-500/20">
          <Save size={18} />
          Save Changes
        </button>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {settingsSections.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClasses[section.color]}`}>
                <section.icon size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                  {section.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{section.description}</p>
              </div>
              <ChevronRight size={20} className="text-gray-400 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Store Info Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
      >
        <h2 className="text-lg font-bold text-gray-900 mb-6">Store Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-semibold text-gray-900 block mb-2">Store Name</label>
            <input 
              type="text" 
              defaultValue="Sun Mobiles"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-900 block mb-2">Contact Email</label>
            <input 
              type="email" 
              defaultValue="admin@sunmobiles.com"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-900 block mb-2">Phone Number</label>
            <input 
              type="tel" 
              defaultValue="+91 98765 43210"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-900 block mb-2">Currency</label>
            <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all">
              <option value="INR">Indian Rupee (₹)</option>
              <option value="USD">US Dollar ($)</option>
              <option value="EUR">Euro (€)</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-gray-900 block mb-2">Store Address</label>
            <textarea 
              rows={3}
              defaultValue="123 Tech Street, Electronic City, Bangalore, Karnataka 560100"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all resize-none"
            />
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default AdminSettings
