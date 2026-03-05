import { useContext, useEffect, useState } from 'react'
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
import Products from '../../assets/dummy'
import { form, pre } from 'framer-motion/client'
import { appContext } from '../../context/Context'
import Lottie from 'lottie-react'
import trail from "../../assets/Trailloading.json"


const AdminProducts = () => {
  const { CSB, refreshCSB, products, loading: contextLoading, URL, refreshProducts } = useContext(appContext);
  const maxImages = 4;
  const [searchQuery, setSearchQuery] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [showModalEdit, setShowModalEdit] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteProduct, setDeleteProduct] = useState(null)
  const [imageFiles, setImageFiles] = useState(Array(maxImages).fill(null))
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);
  const [filteredBrands, setFilteredBrands] = useState([]);
  const categories = CSB?.categories || [];
  const subCategories = CSB?.subCategories || [];
  const brands = CSB?.brands || [];
  const [loading, setLoading] = useState(false)
  const [productDetails, setProductDetails] = useState({
    name: "",
    category: "",
    subCategory: "",
    brand: "",
    price: "",
    offerPrice: "",
    stock: "",
    description: "",
    status: "active",
    specifications: ["", "", "", "", "", ""],
  })
  const [editProductDetails, setEditProductDetails] = useState({
    _id: "",
    name: "",
    category: "",
    subCategory: "",
    brand: "",
    price: "",
    offerPrice: "",
    stock: "",
    status: "",
    description: "",
    specifications: ["", "", "", "", "", ""],
  })
  useEffect(() => {

    filterSubCat()
  }, [selectedCategory])
  useEffect(() => {
    filterBrand()
  }, [selectedSubCategory])
  useEffect(() => {
  }, [editProductDetails])
  const filterSubCat = () => {

    const filteredSubCategories = subCategories.filter(sub => sub.Category === selectedCategory)

    setFilteredSubCategories(filteredSubCategories)
  }
  const filterBrand = () => {
    const filteredBrand = brands.filter(brand => brand.SubCategory === selectedSubCategory)
    setFilteredBrands(filteredBrand)
  }

  const specs = [
    {
      subDiv: ["SPEC 1", "SPEC 2", "SPEC 3", "SPEC 4", "SPEC 5", "SPEC 6"]
    }
  ]
  const handleEditProducts = (product) => {

    setShowModalEdit(true)
    setEditProductDetails({
      _id: product._id || "",
      name: product.name || "",
      category: product.category || "",
      subCategory: product.subCategory || "",
      brand: product.brand || "",
      price: product.price || "",
      offerPrice: product.offerPrice || "",
      stock: product.stock || "",
      status: product.status || "",
      description: product.description || "",
      specifications: product.specifications || ["", "", "", ""]
    })

  }

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  )
  const showCat = Object.fromEntries(
    categories.map((cat) => [cat._id, cat.name])
  )
  const sendProduct = async () => {
    if (!productDetails.name || !productDetails.category || !productDetails.description || !productDetails.specifications[0] || !productDetails.specifications[1] || !productDetails.specifications[2] || !productDetails.subCategory || !productDetails.brand || !productDetails.price || !productDetails.stock || !productDetails.status || imageFiles[0] === null) {
      alert("Please fill in all required fields.");
      return;
    }
    const formdata = new FormData();

    // product details
    formdata.append(
      "productData",
      JSON.stringify(productDetails)
    );

    // images (FILE objects only)
    imageFiles.forEach((img) => {
      if (img?.file) {
        formdata.append("images", img.file);
      }
    });
    setLoading(true)

    const res = await fetch(URL + "/uploads/add-product", {
      method: "POST",
      body: formdata
    });
    const data = await res.json()
    if (data.success) {
      refreshProducts()
      setLoading(false)
    }
  };
  const sendEditProducts = async () => {
    try {
      setLoading(true)
      const res = await fetch(URL + "/update/edit-products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editProductDetails)
      })
      const data = await res.json()
      if (data.success) {
        refreshProducts()
        alert(data.message)
        setShowModalEdit(false)
      }
    } finally { setLoading(false) }


  }

  const handleAddProduct = () => {
    setEditingProduct(null)
    // setProductImages(Array(4).fill(null))
    setShowModal(true)
  }
  const addProductSpecs = ({ subIndex, e }) => {
    const updatedSpecs = [...productDetails.specifications];
    updatedSpecs[subIndex] = e.target.value;

    setProductDetails({
      ...productDetails,
      specifications: updatedSpecs,
    });

  }

  const handleDeleteClick = (product) => {
    setDeleteProduct(product)
    setShowDeleteModal(true)
  }

  const confirmDelete = async () => {
    const res = await fetch(URL + "/update/delete-products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: deleteProduct })
    })
  }

  const handleImageUpload = (index, e) => {
    const file = e.target.files[0];
    if (!file) return;
    const updatedFiles = [...imageFiles];
    updatedFiles[index] = {
      file: file,
      previewUrl: window.URL.createObjectURL(file)
    }
    setImageFiles(updatedFiles)
  };

  const removeImage = (index, e) => {
    const updatedFiles = [...imageFiles];
    if (updatedFiles[index]?.previewUrl) {
      window.URL.revokeObjectURL(updatedFiles[index].previewUrl);
    }
    updatedFiles[index] = null;
    setImageFiles(updatedFiles)
  }
  if (loading || contextLoading)
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <Lottie animationData={trail} className='w-100 h-100' />
      </div>
    )
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
                <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {/* <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
                        {product.image}
                      </div> */}
                      <span className="font-medium text-gray-900 capitalize">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 hidden md:table-cell capitalize">{showCat[product.category]}</td>
                  <td className="px-6 py-4 font-semibold text-gray-900">₹{product.price.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`font-medium ${product.stock < 10 ? 'text-red-600' : 'text-gray-900'}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4 hidden sm:table-cell">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${product.status === 'active'
                      ? 'bg-green-50 text-green-600'
                      : 'bg-yellow-50 text-yellow-600'
                      }`}>
                      {product.status === 'active' ? 'In Stock' : 'Low Stock'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          handleEditProducts(product)
                          setSelectedCategory(product.category)
                          setSelectedSubCategory(product.subCategory)
                          setSelectedBrand(product.brand)

                        }}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500 hover:text-gray-700"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(product._id)}
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

      {/* Add Product Modal */}
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
                {/* Product Images - Up to 4 */}
                <div>
                  <label className="text-sm font-semibold text-gray-900 block mb-2">Product Images (Up to 4)</label>
                  <div className="grid grid-cols-4 gap-3">
                    {imageFiles.map((img, index) => (
                      <div
                        key={index}
                        className="relative aspect-square border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center hover:border-orange-300 transition-colors cursor-pointer bg-gray-50 hover:bg-orange-50 group overflow-hidden"
                      >
                        <input
                          type="file"
                          accept="image/*"
                          className="absolute inset-0 opacity-0 cursor-pointer z-10"
                          onChange={(e) => handleImageUpload(index, e)}
                        />

                        {img ? (
                          <>
                            <img
                              src={img.previewUrl}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                            <button
                              onClick={(e) => removeImage(index, e)}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 z-20 hover:bg-red-600 shadow-sm"
                            >
                              <X size={12} />
                            </button>
                          </>
                        ) : (
                          <>
                            <ImagePlus size={24} className="text-gray-400 group-hover:text-orange-500 transition-colors" />
                            <span className="text-xs text-gray-400 mt-1 group-hover:text-orange-500">Image {index + 1}</span>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Click to upload images. First image will be the main product image.</p>
                </div>

                {/* Product Name */}
                <div>
                  <label className="text-sm font-semibold text-gray-900 block mb-2">Product Name</label>
                  <input

                    value={productDetails.name}
                    onChange={(e) => setProductDetails({ ...productDetails, name: e.target.value })}
                    type="text"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                    placeholder="Enter product name"
                  />
                </div>


                {/* Category & Sub Category */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-900 block mb-2">Category</label>
                    <select
                      value={productDetails.category}
                      onChange={(e) => {
                        setProductDetails({ ...productDetails, category: e.target.value });
                        setSelectedCategory(e.target.value)
                      }}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                    >
                      <option value="null">Select category</option>
                      {categories.map((cat) => (
                        <option key={cat._id} value={cat._id} >
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-900 block mb-2">Sub Category</label>
                    <select
                      value={productDetails.subCategory}
                      disabled={!productDetails.category}
                      onChange={(e) => {
                        setProductDetails({ ...productDetails, subCategory: e.target.value })
                        setSelectedSubCategory(e.target.value)
                      }}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                    >
                      <option value="">Select sub category</option>
                      {filteredSubCategories.map((subCat) => (

                        <option key={subCat._id} value={subCat._id}>
                          {subCat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Brand */}
                <div>
                  <label className="text-sm font-semibold text-gray-900 block mb-2">Brand</label>
                  <select
                    value={productDetails.brand}
                    onChange={(e) => {
                      setProductDetails({ ...productDetails, brand: e.target.value })
                      setSelectedBrand(e.target.value)
                    }}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                  >
                    <option value="">Select brand</option>
                    {filteredBrands.map((brand) => (
                      <option key={brand._id} value={brand._id}>
                        {brand.name}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Price, Offer Price & Stock */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-900 block mb-2">Price (₹)</label>
                    <input
                      type="number"
                      value={productDetails.price.trim()}
                      onChange={(e) => setProductDetails({ ...productDetails, price: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-900 block mb-2">Offer Price (₹)</label>
                    <input
                      type="number"
                      value={productDetails.offerPrice}
                      onChange={(e) => setProductDetails({ ...productDetails, offerPrice: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-900 block mb-2">Stock</label>
                    <input
                      type="number"
                      value={productDetails.stock}
                      onChange={(e) => setProductDetails({ ...productDetails, stock: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                      placeholder="0"
                    />
                  </div>
                </div>

                {/* Specifications Section */}
                <div className="space-y-4">
                  <label className="text-sm font-semibold text-gray-900 block">Specifications</label>
                  {specs.map((spec, index) => (
                    <div key={index} className="grid grid-cols-2 gap-4">
                      {spec.subDiv.map((subSpec, subIndex) => (
                        <div key={subIndex}>
                          <label className="text-xs text-gray-500 block mb-1">{subSpec}</label>
                          <input
                            type="text"
                            placeholder={subIndex < 3 ? 'Enter specification' : 'optional'}
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                            //value={productDetails[`specifications${subIndex + 1}`]}
                            value={productDetails.specifications[subIndex]}
                            onChange={(e) => addProductSpecs({ subIndex, e })}
                          />
                        </div>
                      ))}


                    </div>
                  ))}
                </div>

                {/* Description */}
                <div>
                  <label className="text-sm font-semibold text-gray-900 block mb-2">Description</label>
                  <textarea
                    rows={4}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all resize-none"
                    placeholder="Enter product description..."
                    value={productDetails.description}
                    onChange={(e) => setProductDetails({ ...productDetails, description: e.target.value })}
                  />
                </div>
                {/* Status */}
                <div>
                  <label className="text-sm font-semibold text-gray-900 block mb-2">Status (Active)</label>
                  <select
                    value={productDetails.status}
                    onChange={(e) => setProductDetails({ ...productDetails, status: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                  >
                    <option value="">Select Status</option>
                    <option value="active">Yes (Active)</option>
                    <option value="inactive">No (Inactive)</option>
                  </select>
                </div>
              </div>

              <div className="p-6 border-t border-gray-100 flex gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors"
                >
                  Cancel
                </button>
                <button onClick={sendProduct}
                  className="flex-1 px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-medium transition-colors shadow-lg shadow-orange-500/20">
                  Add Product
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Edit Product Modal */}
      <AnimatePresence>
        {showModalEdit && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModalEdit(false)}
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
                  onClick={() => setShowModalEdit(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 space-y-5 overflow-y-auto flex-1">


                {/* Product Name */}
                <div>
                  <label className="text-sm font-semibold text-gray-900 block mb-2">Product Name</label>
                  <input
                    type="text"
                    defaultValue={editProductDetails.name || ''}
                    onChange={(e) => setEditProductDetails({ ...editProductDetails, name: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                    placeholder="Enter product name"

                  />
                </div>

                {/* Category & Sub Category */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-900 block mb-2">Category</label>
                    <select
                      value={editProductDetails.category}
                      onChange={(e) => {
                        console.log(editProductDetails.subCategory)
                        setEditProductDetails({ ...editProductDetails, category: e.target.value });
                        setSelectedCategory(e.target.value)
                      }}

                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                    >
                      <option value="">Select category</option>
                      {
                        categories.map((cat) =>
                          <option key={cat._id} value={cat._id}>{cat.name}</option>
                        )
                      }

                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-900 block mb-2">Sub Category</label>
                    <select
                      value={editProductDetails.subCategory}
                      onChange={(e) => {
                        setEditProductDetails({ ...editProductDetails, subCategory: e.target.value })
                        setSelectedSubCategory(e.target.value)
                      }}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                    >
                      <option value="">Select sub category</option>
                      {filteredSubCategories.map((subCat) =>

                        <option key={subCat._id} value={subCat._id}>{subCat.name}</option>)}
                    </select>
                  </div>
                </div>

                {/* Brand */}
                <div>
                  <label className="text-sm font-semibold text-gray-900 block mb-2">Brand</label>
                  <select
                    value={editProductDetails.brand || ''}
                    onChange={(e) => setEditProductDetails({ ...editProductDetails, brand: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                  >
                    <option value="">Select brand</option>
                    {filteredBrands.map((brand) =>

                      <option key={brand._id} value={brand._id}>{brand.name}</option>)}
                  </select>
                </div>

                {/* Price, Offer Price & Stock */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-900 block mb-2">Price (₹)</label>
                    <input
                      type="number"
                      value={editProductDetails.price || ''}
                      onChange={(e) => setEditProductDetails({ ...editProductDetails, price: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-900 block mb-2">Offer Price (₹)</label>
                    <input
                      type="number"
                      value={editProductDetails.offerPrice || ''}
                      onChange={(e) => setEditProductDetails({ ...editProductDetails, offerPrice: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-900 block mb-2">Stock</label>
                    <input
                      type="number"
                      value={editProductDetails.stock || ''}
                      onChange={(e) => setEditProductDetails({ ...editProductDetails, stock: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                      placeholder="0"
                    />
                  </div>
                </div>

                {/* Specifications Section */}
                <div className="space-y-4">
                  <label className="text-sm font-semibold text-gray-900 block">Specifications</label>
                  {specs.map((spec, index) => (
                    <div key={index} className="grid grid-cols-2 gap-4">
                      {spec.subDiv.map((subSpec, subIndex) => (

                        <div key={subIndex}>
                          <label className="text-xs text-gray-500 block mb-1">{subSpec}</label>
                          <input
                            type="text"
                            placeholder={subIndex < 3 ? 'Enter specification' : 'optional'}
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                            value={editProductDetails.specifications[subIndex]}
                            onChange={(e) => {

                              const updateEditingSpec = [...editProductDetails.specifications]
                              updateEditingSpec[subIndex] = e.target.value;
                              setEditProductDetails({ ...editProductDetails, specifications: updateEditingSpec })

                            }}
                          />
                        </div>
                      ))}


                    </div>
                  ))}
                </div>

                {/* Description */}
                <div>
                  <label className="text-sm font-semibold text-gray-900 block mb-2">Description</label>
                  <textarea
                    rows={4}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all resize-none"
                    placeholder="Enter product description..."
                    value={editProductDetails.description}
                    onChange={(e) =>

                      setEditProductDetails({ ...editProductDetails, description: e.target.value })
                    }
                  />
                </div>
                {/* Status */}
                <div>
                  <label className="text-sm font-semibold text-gray-900 block mb-2">Status (Active)</label>
                  <select
                    value={editProductDetails.status}
                    onChange={(e) => setEditProductDetails({ ...editProductDetails, status: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                  >
                    <option value="active">Yes (Active)</option>
                    <option value="inactive">No (Inactive)</option>
                  </select>
                </div>
              </div>

              <div className="p-6 border-t border-gray-100 flex gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors"
                >
                  Cancel
                </button>
                <button

                  onClick={sendEditProducts}
                  className="flex-1 px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-medium transition-colors shadow-lg shadow-orange-500/20">
                  Save changes
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
