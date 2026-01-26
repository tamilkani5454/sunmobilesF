import React from 'react'
import { motion } from 'framer-motion'
import { Search, Bell, ChevronDown, Menu } from 'lucide-react'

const AdminHeader = ({ onMenuClick }) => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-40">
      {/* Left Side - Mobile menu toggle and Search */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Menu size={20} className="text-gray-600" />
        </button>
        
        <div className="hidden sm:flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-2.5 w-80">
          <Search size={18} className="text-gray-400" />
          <input 
            type="text" 
            placeholder="Search products, orders, users..." 
            className="bg-transparent border-none outline-none text-sm text-gray-700 placeholder:text-gray-400 w-full"
          />
        </div>
      </div>

      {/* Right Side - Notifications and Profile */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative p-2.5 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
          <Bell size={20} className="text-gray-600" />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-orange-500 rounded-full border-2 border-white"></span>
        </button>

        {/* Profile */}
        <button className="flex items-center gap-3 pl-3 pr-2 py-1.5 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-gray-900">Admin User</p>
            <p className="text-xs text-gray-500">Administrator</p>
          </div>
          <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
            A
          </div>
          <ChevronDown size={16} className="text-gray-400 hidden sm:block" />
        </button>
      </div>
    </header>
  )
}

export default AdminHeader
