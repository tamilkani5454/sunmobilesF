import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Plus, 
  Filter, 
  MoreVertical, 
  Pencil, 
  Trash2, 
  X,
  Package,
  Upload,
  ImagePlus,
  AlertTriangle
} from 'lucide-react'
import { Button } from '../../components/ui/button'

const productsData = [
  { id: 1, name: 'iPhone 15 Pro Max', category: 'iPhone', price: 159900, stock: 45, image: '📱', status: 'active' },
  { id: 2, name: 'Samsung Galaxy S24 Ultra', category: 'Samsung', price: 129999, stock: 32, image: '📱', status: 'active' },
  { id: 3, name: 'OnePlus 12', category: 'OnePlus', price: 64999, stock: 78, image: '📱', status: 'active' },
  { id: 4, name: 'Google Pixel 8 Pro', category: 'Google', price: 106999, stock: 23, image: '📱', status: 'active' },
  { id: 5, name: 'Nothing Phone 2', category: 'Nothing', price: 44999, stock: 56, image: '📱', status: 'active' },
  { id: 6, name: 'iPhone 15', category: 'iPhone', price: 79900, stock: 89, image: '📱', status: 'active' },
  { id: 7, name: 'Samsung Galaxy A54', category: 'Samsung', price: 38999, stock: 120, image: '📱', status: 'low-stock' },
  { id: 8, name: 'Vivo V30 Pro', category: 'Vivo', price: 46999, stock: 5, image: '📱', status: 'low-stock' },
]

const AdminProducts = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteProduct, setDeleteProduct] = useState(null)

  const filteredProducts = productsData.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAddProduct = () => {
    setEditingProduct(null)
    setShowModal(true)
  }

  const handleEditProduct = (product) => {
    setEditingProduct(product)
    setShowModal(true)
  }

  const handleDeleteClick = (product) => {
    setDeleteProduct(product)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    // Add your delete logic here
    console.log('Deleting product:', deleteProduct)
    setShowDeleteModal(false)
    setDeleteProduct(null)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-500 mt-1">Manage your product inventory</p>
        </div>
        <Button 
          onClick={handleAddProduct}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-medium transition-colors shadow-lg shadow-orange-500/20"
        >
          <Plus size={18} />
          Add Product
        </Button>
      </div>

      {/* Filters Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-2.5">
          <Search size={18} className="text-gray-400" />
          <input 
            type="text" 
            placeholder="Search products..." 
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

      {/* Products Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Product</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4 hidden md:table-cell">Category</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Price</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Stock</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4 hidden sm:table-cell">Status</th>
                <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
                        {product.image}
                      </div>
                      <span className="font-medium text-gray-900">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 hidden md:table-cell">{product.category}</td>
                  <td className="px-6 py-4 font-semibold text-gray-900">₹{product.price.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`font-medium ${product.stock < 10 ? 'text-red-600' : 'text-gray-900'}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4 hidden sm:table-cell">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                      product.status === 'active' 
                        ? 'bg-green-50 text-green-600' 
                        : 'bg-yellow-50 text-yellow-600'
                    }`}>
                      {product.status === 'active' ? 'In Stock' : 'Low Stock'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleEditProduct(product)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500 hover:text-gray-700"
                      >
                        <Pencil size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteClick(product)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors text-gray-500 hover:text-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No products found</h3>
            <p className="text-gray-500 mt-1">Try adjusting your search query</p>
          </div>
        )}
      </motion.div>

      {/* Add/Edit Product Modal */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="fixed inset-0 bg-black/50 z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg bg-white rounded-2xl shadow-2xl z-50 overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h2>
                <button 
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 space-y-5 overflow-y-auto flex-1">
                {/* Product Images - Up to 4 (Only for new products) */}
                {!editingProduct && (
                  <div>
                    <label className="text-sm font-semibold text-gray-900 block mb-2">Product Images (Up to 4)</label>
                    <div className="grid grid-cols-4 gap-3">
                      {[0, 1, 2, 3].map((index) => (
                        <div 
                          key={index}
                          className="aspect-square border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center hover:border-orange-300 transition-colors cursor-pointer bg-gray-50 hover:bg-orange-50 group"
                        >
                          <ImagePlus size={24} className="text-gray-400 group-hover:text-orange-500 transition-colors" />
                          <span className="text-xs text-gray-400 mt-1 group-hover:text-orange-500">Image {index + 1}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Click to upload images. First image will be the main product image.</p>
                  </div>
                )}

                {/* Product Name */}
                <div>
                  <label className="text-sm font-semibold text-gray-900 block mb-2">Product Name</label>
                  <input 
                    type="text" 
                    defaultValue={editingProduct?.name || ''}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                    placeholder="Enter product name"
                  />
                </div>

                {/* Brand */}
                <div>
                  <label className="text-sm font-semibold text-gray-900 block mb-2">Brand</label>
                  <select 
                    defaultValue={editingProduct?.brand || ''}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                  >
                    <option value="">Select brand</option>
                    <option value="Apple">Apple</option>
                    <option value="Samsung">Samsung</option>
                    <option value="OnePlus">OnePlus</option>
                    <option value="Google">Google</option>
                    <option value="Vivo">Vivo</option>
                    <option value="Oppo">Oppo</option>
                    <option value="Xiaomi">Xiaomi</option>
                    <option value="Realme">Realme</option>
                    <option value="Nothing">Nothing</option>
                    <option value="Motorola">Motorola</option>
                    <option value="Nokia">Nokia</option>
                    <option value="Asus">Asus</option>
                  </select>
                </div>

                {/* Category & Sub Category */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-900 block mb-2">Category</label>
                    <select 
                      defaultValue={editingProduct?.category || ''}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                    >
                      <option value="">Select category</option>
                      <option value="iPhone">iPhone</option>
                      <option value="Samsung">Samsung</option>
                      <option value="OnePlus">OnePlus</option>
                      <option value="Google">Google</option>
                      <option value="Vivo">Vivo</option>
                      <option value="Nothing">Nothing</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-900 block mb-2">Sub Category</label>
                    <select 
                      defaultValue={editingProduct?.subCategory || ''}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                    >
                      <option value="">Select sub category</option>
                      <option value="Flagship">Flagship</option>
                      <option value="Mid-Range">Mid-Range</option>
                      <option value="Budget">Budget</option>
                      <option value="Pro Series">Pro Series</option>
                      <option value="Lite Series">Lite Series</option>
                      <option value="Gaming">Gaming</option>
                      <option value="Foldable">Foldable</option>
                    </select>
                  </div>
                </div>

                {/* Price, Offer Price & Stock */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-900 block mb-2">Price (₹)</label>
                    <input 
                      type="number" 
                      defaultValue={editingProduct?.price || ''}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-900 block mb-2">Offer Price (₹)</label>
                    <input 
                      type="number" 
                      defaultValue={editingProduct?.offerPrice || ''}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-900 block mb-2">Stock</label>
                    <input 
                      type="number" 
                      defaultValue={editingProduct?.stock || ''}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                      placeholder="0"
                    />
                  </div>
                </div>

                {/* Specifications Section */}
                <div className="space-y-4">
                  <label className="text-sm font-semibold text-gray-900 block">Specifications</label>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-gray-500 block mb-1">RAM</label>
                      <input 
                        type="text" 
                        defaultValue={editingProduct?.specs?.ram || ''}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                        placeholder="e.g., 8GB"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 block mb-1">Storage</label>
                      <input 
                        type="text" 
                        defaultValue={editingProduct?.specs?.storage || ''}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                        placeholder="e.g., 256GB"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-gray-500 block mb-1">Display</label>
                      <input 
                        type="text" 
                        defaultValue={editingProduct?.specs?.display || ''}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                        placeholder="e.g., 6.7 inch AMOLED"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 block mb-1">Camera</label>
                      <input 
                        type="text" 
                        defaultValue={editingProduct?.specs?.camera || ''}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                        placeholder="e.g., 200MP + 12MP + 10MP"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-gray-500 block mb-1">Battery</label>
                      <input 
                        type="text" 
                        defaultValue={editingProduct?.specs?.battery || ''}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                        placeholder="e.g., 5000mAh"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 block mb-1">Processor</label>
                      <input 
                        type="text" 
                        defaultValue={editingProduct?.specs?.processor || ''}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                        placeholder="e.g., Snapdragon 8 Gen 3"
                      />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="text-sm font-semibold text-gray-900 block mb-2">Description</label>
                  <textarea 
                    rows={4}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all resize-none"
                    placeholder="Enter product description..."
                  />
                </div>
              </div>

              <div className="p-6 border-t border-gray-100 flex gap-3">
                <button 
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-medium transition-colors shadow-lg shadow-orange-500/20">
                  {editingProduct ? 'Save Changes' : 'Add Product'}
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
                <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Product?</h3>
                <p className="text-gray-500 mb-6">
                  Are you sure you want to delete <span className="font-semibold text-gray-700">"{deleteProduct?.name}"</span>? This action cannot be undone.
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

export default AdminProducts
