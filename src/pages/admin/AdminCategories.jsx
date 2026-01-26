import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, 
  Trash2, 
  X,
  FolderTree,
  Tag,
  Layers,
  ChevronRight,
  ChevronDown,
  AlertTriangle
} from 'lucide-react'

// Sample data with relationships
const categoriesData = [
  { 
    id: 1, 
    name: 'Mobile', 
    subCategories: [
      { id: 1, name: 'Smartphone' },
      { id: 2, name: 'Tablet' },
      { id: 3, name: 'Button Phone' },
      { id: 4, name: 'Feature Phone' },
    ],
    brands: [
      { id: 1, name: 'Apple', logo: '🍎' },
      { id: 2, name: 'Samsung', logo: '📱' },
      { id: 3, name: 'OnePlus', logo: '🔴' },
      { id: 4, name: 'Vivo', logo: '💙' },
      { id: 5, name: 'Xiaomi', logo: '🟠' },
      { id: 6, name: 'Realme', logo: '💛' },
    ]
  },
  { 
    id: 2, 
    name: 'Accessories', 
    subCategories: [
      { id: 5, name: 'Chargers' },
      { id: 6, name: 'Cases' },
      { id: 7, name: 'Screen Guards' },
      { id: 8, name: 'Earphones' },
    ],
    brands: [
      { id: 7, name: 'Boat', logo: '🎧' },
      { id: 8, name: 'JBL', logo: '🔊' },
      { id: 9, name: 'Anker', logo: '🔌' },
    ]
  },
  { 
    id: 3, 
    name: 'Wearables', 
    subCategories: [
      { id: 9, name: 'Smartwatch' },
      { id: 10, name: 'Fitness Band' },
    ],
    brands: [
      { id: 1, name: 'Apple', logo: '🍎' },
      { id: 2, name: 'Samsung', logo: '📱' },
      { id: 10, name: 'Noise', logo: '⌚' },
      { id: 11, name: 'Fire-Boltt', logo: '🔥' },
    ]
  },
]

const AdminCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState(categoriesData[0])
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState('')
  const [expandedCategories, setExpandedCategories] = useState([1])
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteItem, setDeleteItem] = useState(null)
  const [deleteType, setDeleteType] = useState('')

  const handleAdd = (type) => {
    setModalType(type)
    setShowModal(true)
  }

  const handleDeleteClick = (type, item) => {
    setDeleteType(type)
    setDeleteItem(item)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    // Add your delete logic here
    console.log(`Deleting ${deleteType}:`, deleteItem)
    setShowDeleteModal(false)
    setDeleteItem(null)
    setDeleteType('')
  }

  const toggleCategory = (categoryId) => {
    if (expandedCategories.includes(categoryId)) {
      setExpandedCategories(expandedCategories.filter(id => id !== categoryId))
    } else {
      setExpandedCategories([...expandedCategories, categoryId])
    }
    setSelectedCategory(categoriesData.find(c => c.id === categoryId))
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories Management</h1>
          <p className="text-gray-500 mt-1">Manage categories with their related sub categories and brands</p>
        </div>
        <button 
          onClick={() => handleAdd('category')}
          className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl font-medium transition-all shadow-lg shadow-orange-500/25"
        >
          <Plus size={18} />
          Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Categories List - Left Side */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-gray-50">
              <h2 className="font-bold text-gray-900 flex items-center gap-2">
                <FolderTree size={18} className="text-orange-500" />
                Categories
              </h2>
            </div>
            <div className="divide-y divide-gray-100">
              {categoriesData.map((category) => (
                <div key={category.id}>
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className={`w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${
                      selectedCategory?.id === category.id ? 'bg-orange-50 border-l-4 border-orange-500' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {expandedCategories.includes(category.id) ? (
                        <ChevronDown size={18} className="text-gray-400" />
                      ) : (
                        <ChevronRight size={18} className="text-gray-400" />
                      )}
                      <div className="text-left">
                        <span className={`font-medium ${selectedCategory?.id === category.id ? 'text-orange-600' : 'text-gray-900'}`}>
                          {category.name}
                        </span>
                        <p className="text-xs text-gray-500">{category.subCategories.length} sub, {category.brands.length} brands</p>
                      </div>
                    </div>
                    <button 
                        type="button"
                        onClick={(e) => { e.stopPropagation(); e.preventDefault(); handleDeleteClick('category', category); }}
                        className="p-2.5 sm:p-1.5 hover:bg-red-100 rounded-lg transition-colors text-gray-400 hover:text-red-600"
                      >
                        <Trash2 size={16} className="sm:w-3.5 sm:h-3.5" />
                      </button>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sub Categories & Brands - Right Side */}
        <div className="lg:col-span-2 space-y-6">
          {selectedCategory && (
            <>
              {/* Selected Category Header */}
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-5 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 text-sm">Selected Category</p>
                    <h2 className="text-2xl font-bold">{selectedCategory.name}</h2>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">{selectedCategory.subCategories.length + selectedCategory.brands.length}</div>
                    <p className="text-orange-100 text-sm">Total Items</p>
                  </div>
                </div>
              </div>

              {/* Sub Categories */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <Layers size={18} className="text-purple-500" />
                    Sub Categories
                    <span className="ml-2 px-2 py-0.5 bg-purple-100 text-purple-600 rounded-full text-xs font-semibold">
                      {selectedCategory.subCategories.length}
                    </span>
                  </h3>
                  <button 
                    onClick={() => handleAdd('subcategory')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-500 hover:bg-purple-600 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    <Plus size={14} />
                    Add
                  </button>
                </div>
                <div className="p-4">
                  <div className="flex flex-wrap gap-2">
                    {selectedCategory.subCategories.map((sub, index) => (
                      <motion.div
                        key={sub.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="group flex items-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-purple-50 rounded-xl transition-colors"
                      >
                        <span className="font-medium text-gray-700 group-hover:text-purple-700">{sub.name}</span>
                        <button 
                          onClick={() => handleDeleteClick('subcategory', sub)}
                          className="p-1.5 hover:bg-red-100 rounded-lg transition-colors text-gray-400 hover:text-red-600"
                        >
                          <Trash2 size={14} />
                        </button>
                      </motion.div>
                    ))}
                    <button 
                      onClick={() => handleAdd('subcategory')}
                      className="flex items-center gap-1 px-4 py-2.5 border-2 border-dashed border-gray-300 hover:border-purple-400 rounded-xl text-gray-500 hover:text-purple-600 transition-colors"
                    >
                      <Plus size={16} />
                      Add Sub Category
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Brands */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <Tag size={18} className="text-blue-500" />
                    Brands
                    <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-600 rounded-full text-xs font-semibold">
                      {selectedCategory.brands.length}
                    </span>
                  </h3>
                  <button 
                    onClick={() => handleAdd('brand')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    <Plus size={14} />
                    Add
                  </button>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {selectedCategory.brands.map((brand, index) => (
                      <motion.div
                        key={brand.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="group relative bg-gray-50 hover:bg-blue-50 rounded-xl p-4 text-center transition-colors"
                      >
                        <button 
                          onClick={() => handleDeleteClick('brand', brand)}
                          className="absolute top-2 right-2 p-1.5 hover:bg-red-100 rounded-lg transition-colors text-gray-400 hover:text-red-600"
                        >
                          <Trash2 size={14} />
                        </button>
                        <div className="w-12 h-12 bg-white group-hover:bg-blue-100 rounded-xl flex items-center justify-center text-2xl mx-auto mb-2 shadow-sm transition-colors">
                          {brand.logo}
                        </div>
                        <span className="font-medium text-gray-700 group-hover:text-blue-700 text-sm">{brand.name}</span>
                      </motion.div>
                    ))}
                    <button 
                      onClick={() => handleAdd('brand')}
                      className="flex flex-col items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 hover:border-blue-400 rounded-xl text-gray-500 hover:text-blue-600 transition-colors min-h-[100px]"
                    >
                      <Plus size={20} />
                      <span className="text-sm font-medium">Add Brand</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-md bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-gray-50 to-white">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Add New {modalType === 'category' ? 'Category' : modalType === 'brand' ? 'Brand' : 'Sub Category'}
                  </h2>
                  {modalType !== 'category' && (
                    <p className="text-sm text-gray-500 mt-0.5">For: {selectedCategory?.name}</p>
                  )}
                </div>
                <button 
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 space-y-5">
                {/* Category Form */}
                {modalType === 'category' && (
                  <div>
                    <label className="text-sm font-semibold text-gray-900 block mb-2">Category Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                      placeholder="e.g., Mobile"
                    />
                  </div>
                )}

                {/* Brand Form */}
                {modalType === 'brand' && (
                  <>
                    <div>
                      <label className="text-sm font-semibold text-gray-900 block mb-2">Brand Name</label>
                      <input 
                        type="text" 
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                        placeholder="e.g., Apple"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-900 block mb-2">Brand Logo</label>
                      <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-blue-300 transition-colors cursor-pointer bg-gray-50 hover:bg-blue-50 group">
                        <div className="w-14 h-14 bg-gray-200 group-hover:bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-2 transition-colors">
                          <Plus size={24} className="text-gray-400 group-hover:text-blue-500" />
                        </div>
                        <p className="text-sm text-gray-500 group-hover:text-blue-600">Click to upload logo</p>
                      </div>
                    </div>
                  </>
                )}

                {/* Sub Category Form */}
                {modalType === 'subcategory' && (
                  <div>
                    <label className="text-sm font-semibold text-gray-900 block mb-2">Sub Category Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                      placeholder="e.g., Smartphone"
                    />
                  </div>
                )}
              </div>

              <div className="p-6 border-t border-gray-100 flex gap-3 bg-gray-50">
                <button 
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-3 bg-white hover:bg-gray-100 text-gray-700 rounded-xl font-medium transition-colors border border-gray-200"
                >
                  Cancel
                </button>
                <button className={`flex-1 px-4 py-3 text-white rounded-xl font-medium transition-all shadow-lg ${
                  modalType === 'brand' 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-blue-500/20'
                    : modalType === 'subcategory'
                    ? 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 shadow-purple-500/20'
                    : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-orange-500/20'
                }`}>
                  Create
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDeleteModal(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-sm bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
            >
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle size={32} className="text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Delete {deleteType}?</h3>
                <p className="text-gray-500 mb-6">
                  Are you sure you want to delete <span className="font-semibold text-gray-700">"{deleteItem?.name}"</span>? This action cannot be undone.
                </p>
                <div className="flex gap-3">
                  <button 
                    onClick={() => setShowDeleteModal(false)}
                    className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={confirmDelete}
                    className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-colors shadow-lg shadow-red-500/20"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AdminCategories
