
import { useState, useContext, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus,
  Trash2,
  X,
  FolderTree,
  Tag,
  Layers,
  ChevronRight,
  AlertTriangle,
  Pencil
} from 'lucide-react'
import { appContext } from '../../context/Context'

const AdminCategories = () => {
  const { CSB, refreshCSB } = useContext(appContext)

  // Local state for UI selection
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [activeTab, setActiveTab] = useState('category'); // 'category', 'subcategory', 'brand' (for mobile)

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(''); // 'category', 'subcategory', 'brand'
  const [newItemName, setNewItemName] = useState('');
  const [modalMode, setModalMode] = useState('create'); // 'create' or 'edit'
  const [editingItem, setEditingItem] = useState(null);
  const [filteredSubCategories, setFilteredSubCategories] = useState([])
  const [filteredBrands, setFilteredBrand] = useState([])

  // Delete Modal State
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleteType, setDeleteType] = useState(''); // 'category', 'subcategory', 'brand'

  // Derived Data
  const categories = CSB?.categories || [];
  const subCategories = CSB?.subCategories || [];
  const brands = CSB?.brands || [];

  // --- Filter Logic ---
  const filterSubCat = () => {
    console.log(selectedCategory)
    const filteredSubCategories = subCategories.filter(sub => sub.Category === selectedCategory)
    setFilteredSubCategories(filteredSubCategories)
  }
  const filterBrand = () => {
    const filteredBrand = brands.filter(brand => brand.SubCategory === selectedSubCategory)
    setFilteredBrand(filteredBrand)
  }
  useEffect(() => {
    filterSubCat()
  }, [selectedCategory])

  useEffect(() => {
    filterBrand()
  }, [selectedSubCategory])



  // --- Handling Selection ---
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedSubCategory(null);
    setActiveTab('subcategory');



  };

  const handleSubCategoryClick = (subCategory) => {
    setSelectedSubCategory(subCategory);
    setActiveTab('brand');
  };

  // --- Handling Modals ---
  const openAddModal = (type) => {
    setModalType(type);
    setNewItemName('');
    setModalMode('create');
    setEditingItem(null);
    setShowModal(true);
  };

  const handleEditRequest = (type, item) => {
    console.log("Edit Request:", type, item);
    setModalType(type);
    setNewItemName(item.name);
    setModalMode('edit');
    setEditingItem(item);
    setShowModal(true);
  };

  const handleDeleteRequest = (type, item) => {
    console.log("Delete Request:", type, item);
    setDeleteType(type);
    setItemToDelete(item);
    setShowDeleteModal(true);
  };

  // --- API Interactions ---
  // Using explicit API endpoints based on user's previous code pattern.
  // NOTE: Verify these endpoints and body payloads with your backend.
  const handleSaveItem = async () => {
    if (modalMode == "create") {

      const API_BASE = import.meta.env.VITE_API_BASE_URL + "/uploads";
      const body = { name: newItemName.trim() };
      let url;
      if (modalType === 'category') url = "/add-category";
      if (modalType === 'subcategory') body.categoryId = selectedCategory;
      if (modalType === 'subcategory') url = '/add-subcategory';
      if (modalType === 'brand') body.subCategoryID = selectedSubCategory;
      if (modalType === 'brand') url = '/add-brand';
      const response = await fetch(API_BASE + url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      })
    }
    else if (modalMode === "edit") {
      const API_BASE = import.meta.env.VITE_API_BASE_URL + "/update";
      const body = { name: newItemName.trim() };
      let url;
      if (modalType === 'category') url = "/edit-category";
      if (modalType === 'category') body.categoryId = selectedCategory;
      if (modalType === 'subcategory') url = '/edit-subcategory';
      if (modalType === 'subcategory') body.subCategoryID = selectedSubCategory;
      if (modalType === 'brand') url = '/edit-brand';
      if (modalType === 'brand') ; body.brandID = selectedBrand;
      const response = await fetch(API_BASE + url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      })
    }
  }

  const confirmDelete = async () => {
    if (!itemToDelete) return;

    const API_BASE = import.meta.env.VITE_API_BASE_URL;
    let url = '';

    // CONFIGURE DELETE ENDPOINTS
    if (deleteType === 'category') url = `${API_BASE}/uploads/delete-category/${itemToDelete._id}`;
    if (deleteType === 'subcategory') url = `${API_BASE}/uploads/delete-subcategory/${itemToDelete._id}`;
    if (deleteType === 'brand') url = `${API_BASE}/uploads/delete-brand/${itemToDelete._id}`;

    try {
      console.log(`Deleting item at ${url}`);
      const response = await fetch(url, { method: 'DELETE' });

      if (response.ok) {
        await refreshCSB();

        // Cleanup selection if deleted
        if (deleteType === 'category' && selectedCategory?._id === itemToDelete._id) {
          setSelectedCategory(null);
          setSelectedSubCategory(null);
        }
        if (deleteType === 'subcategory' && selectedSubCategory?._id === itemToDelete._id) {
          setSelectedSubCategory(null);
        }
      } else {
        console.error("Failed to delete", await response.text());
        // alert("Failed to delete item"); 
      }
    } catch (error) {
      console.error("Delete error:", error);
    }

    // Fallback/Forced refresh
    if (refreshCSB) await refreshCSB();
    setShowDeleteModal(false);
    setItemToDelete(null);
  };


  return (
    <div className="space-y-6 h-[calc(100vh-100px)]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories & Data</h1>
          <p className="text-gray-500 mt-1">Manage Categories, Sub-categories, and Brands</p>
        </div>
      </div>

      {/* Mobile Tab Navigation */}
      <div className="flex lg:hidden bg-gray-100 p-1 rounded-xl mb-4">
        {['category', 'subcategory', 'brand'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === tab
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
              }`}
          >
            {tab === 'category' ? 'Categories' : tab === 'subcategory' ? 'Sub Categories' : 'Brands'}
          </button>
        ))}
      </div>

      {/* Main 3-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full pb-6">

        {/* Column 1: Categories */}
        <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full overflow-hidden ${activeTab === 'category' ? 'block' : 'hidden lg:flex'
          }`}>
          <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
            <h2 className="font-bold text-gray-900 flex items-center gap-2">
              <FolderTree size={18} className="text-orange-500" />
              Categories
            </h2>
            <button
              onClick={() => openAddModal('category')}
              className="p-1.5 bg-white border border-gray-200 hover:border-orange-500 hover:text-orange-500 rounded-lg transition-colors shadow-sm"
            >
              <Plus size={16} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {categories.map((cat) => (
              <div
                key={cat._id}
                onClick={() => handleCategoryClick(cat._id)}
                className={`p-3 rounded-xl cursor-pointer flex justify-between items-center group transition-colors ${selectedCategory === cat._id
                  ? 'bg-orange-50 border-orange-200 text-orange-900'
                  : 'hover:bg-gray-50 text-gray-700'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-8 rounded-full ${selectedCategory === cat._id ? 'bg-orange-500' : 'bg-gray-200 group-hover:bg-orange-200'}`}></div>
                  <span className="font-medium capitalize">{cat.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); handleEditRequest('category', cat); handleCategoryClick(cat._id) }}
                    className="p-1.5 text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded-lg opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDeleteRequest('category', cat); }}
                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all"
                  >
                    <Trash2 size={14} />
                  </button>
                  <ChevronRight size={16} className={`text-gray-400 ${selectedCategory === cat._id ? 'text-orange-500' : ''}`} />
                </div>
              </div>
            ))}
            {categories.length === 0 && (
              <div className="text-center py-10 text-gray-400 text-sm">No Categories</div>
            )}
          </div>
        </div>

        {/* Column 2: SubCategories */}
        <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full overflow-hidden transition-opacity duration-200 ${!selectedCategory ? 'opacity-50 pointer-events-none' : ''
          } ${activeTab === 'subcategory' ? 'block' : 'hidden lg:flex'}`}>
          <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
            <h2 className="font-bold text-gray-900 flex items-center gap-2">
              <Layers size={18} className="text-purple-500" />
              Sub Categories
            </h2>
            <button
              onClick={() => openAddModal('subcategory')}
              className="p-1.5 bg-white border border-gray-200 hover:border-purple-500 hover:text-purple-500 rounded-lg transition-colors shadow-sm"
            >
              <Plus size={16} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {!selectedCategory ? (
              <div className="text-center py-10 text-gray-400 text-sm">Select a category first</div>
            ) : filteredSubCategories.length === 0 ? (
              <div className="text-center py-10 text-gray-400 text-sm">No subcategories found</div>
            ) : (
              filteredSubCategories.map(sub => (
                <div
                  key={sub._id}
                  onClick={() => handleSubCategoryClick(sub._id)}
                  className={`p-3 rounded-xl cursor-pointer flex justify-between items-center group transition-colors ${selectedSubCategory === sub._id
                    ? 'bg-purple-50 border-purple-200 text-purple-900'
                    : 'hover:bg-gray-50 text-gray-700'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-medium capitalize">{sub.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleEditRequest('subcategory', sub); }}
                      className="p-1.5 text-gray-400 hover:text-purple-500 hover:bg-purple-50 rounded-lg opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDeleteRequest('subcategory', sub); handleSubCategoryClick(sub._id)}}
                      className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all"
                    >
                      <Trash2 size={14} />
                    </button>
                    <ChevronRight size={16} className={`text-gray-400 ${selectedSubCategory?._id === sub._id ? 'text-purple-500' : ''}`} />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Column 3: Brands */}
        <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full overflow-hidden transition-opacity duration-200 ${!selectedSubCategory ? 'opacity-50 pointer-events-none' : ''
          } ${activeTab === 'brand' ? 'block' : 'hidden lg:flex'}`}>
          <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
            <h2 className="font-bold text-gray-900 flex items-center gap-2">
              <Tag size={18} className="text-blue-500" />
              Brands
            </h2>
            <button
              onClick={() => openAddModal('brand')}
              className="p-1.5 bg-white border border-gray-200 hover:border-blue-500 hover:text-blue-500 rounded-lg transition-colors shadow-sm"
            >
              <Plus size={16} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {!selectedSubCategory ? (
              <div className="text-center py-10 text-gray-400 text-sm">Select a subcategory first</div>
            ) : filteredBrands.length === 0 ? (
              <div className="text-center py-10 text-gray-400 text-sm">No brands found</div>
            ) : (
              filteredBrands.map(brand => (
                <div
                onClick={()=>setSelectedBrand(brand._id)}
                  key={brand._id}
                  className="p-3 rounded-xl bg-white border border-gray-100 flex justify-between items-center group hover:border-blue-200 hover:shadow-sm transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 text-gray-500 flex items-center justify-center font-bold text-xs uppercase">
                      {brand.name ? brand.name.substring(0, 1) : 'B'}
                    </div>
                    <span className="font-medium text-gray-700 capitalize">{brand.name}</span>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => {handleEditRequest('brand', brand); setSelectedBrand(brand._id) }}
                      className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => handleDeleteRequest('brand', brand)}
                      className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* Add Modal */}
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
              className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-xs bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
            >
              <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900 capitalize">
                  {modalMode === 'edit' ? 'Edit ' : 'Add New '}
                  {modalType === 'subcategory' ? 'Sub Category' : modalType}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="p-5">
                {/* Context Info */}
                {modalType === 'subcategory' && (
                  <div className="mb-4 text-sm text-gray-500 bg-gray-50 p-3 rounded-xl">
                    Adding to Category:<span className="font-semibold text-gray-900">{categories.find(cat => cat._id === selectedCategory)?.name} </span>
                  </div>
                )}
                {modalType === 'brand' && (
                  <div className="mb-4 text-sm text-gray-500 bg-gray-50 p-3 rounded-xl">
                    Adding to: <span className="font-semibold text-gray-900">{categories.find(cat => cat._id === selectedCategory)?.name} &gt; {subCategories.find(sub => sub._id === selectedSubCategory)?.name}</span>
                  </div>
                )}

                <label className="block text-sm font-semibold text-gray-900 mb-2">Name</label>
                <input
                  type="text"
                  autoFocus
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  placeholder={`Enter ${modalType} name`}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                  onKeyDown={(e) => e.key === 'Enter' && handleSaveItem()}
                />
              </div>
              <div className="p-5 border-t border-gray-100 flex gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveItem}
                  disabled={!newItemName.trim()}
                  className="flex-1 px-4 py-2.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-colors shadow-lg shadow-orange-500/20"
                >
                  {modalMode === 'edit' ? 'Update' : 'Create'}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Delete Modal */}
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
              className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-xs bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
            >
              <div className="p-5 text-center">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle size={24} className="text-red-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Delete {deleteType}?</h3>
                <p className="text-gray-500 mb-6 text-sm">
                  Are you sure you want to delete <span className="font-semibold text-gray-900">"{itemToDelete?.name}"</span>?
                  {deleteType !== 'brand' && (
                    <span className="block mt-1 text-red-500 text-xs">This will typically delete all nested items inside it.</span>
                  )}
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="flex-1 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-colors shadow-lg shadow-red-500/20"
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
