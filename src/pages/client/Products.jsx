import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, SlidersHorizontal, X, ChevronDown, ChevronUp, RotateCcw, Check } from 'lucide-react'
import Cards from '../../common/Cards'
import ProductsData from '../../assets/dummy'
import { Button } from '../../components/ui/button'
import BannerImg from '../../assets/products-banner.jpeg'

const FilterSection = ({ title, isOpen, toggle, children }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div
        className="flex justify-between items-center cursor-pointer mb-2"
        onClick={toggle}
      >
        <h3 className="font-semibold text-lg text-gray-800">{title}</h3>
        {isOpen ? <ChevronUp size={20} className="text-gray-500" /> : <ChevronDown size={20} className="text-gray-500" />}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-2">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const Products = () => {
  // const [filteredProducts, setFilteredProducts] = useState(ProductsData)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedSubCategories, setSelectedSubCategories] = useState([])
  const [priceRange, setPriceRange] = useState([0, 50000])
  const [selectedBrands, setSelectedBrands] = useState([])
  const [sortBy, setSortBy] = useState('default')
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  // Accordion state for "Elegant" mobile menu
  const [expandedCategory, setExpandedCategory] = useState(null)
  const [isBrandsOpen, setIsBrandsOpen] = useState(false)
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false)

  const [openSections, setOpenSections] = useState({ category: true, price: true, brand: true })

  // Extract unique categories and brands
  // Extract unique categories
  const categories = [...new Set(ProductsData.map(p => p.category))]
  
  // Extract brands based on selected categories
  const brands = [...new Set(
    ProductsData
      .filter(p => selectedCategories.length === 0 || selectedCategories.includes(p.category))
      .map(p => p.brand)
  )]

  // When categories change, clean up selected brands that are no longer valid
  useEffect(() => {
    setSelectedBrands(prev => prev.filter(b => brands.includes(b)))
  }, [selectedCategories])

  // Build Hierarchy: { "Category": ["Sub1", "Sub2"] }
  const categoryHierarchy = categories.reduce((acc, cat) => {
    const subs = [...new Set(ProductsData.filter(p => p.category === cat).map(p => p.subCategory).filter(Boolean))]
    acc[cat] = subs
    return acc
  }, {})

  const getBrandCount = (brand) => ProductsData.filter(p => p.brand === brand).length

  const filteredProducts = useMemo(() => {
    let result = [...ProductsData]

    // Filter by Search
    if (searchQuery) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filter by Category & SubCategory
    // Logic: If sub-categories are selected, they override the parent category selection for specificity.
    // If only parent is selected, show all in parent.
    if (selectedCategories.length > 0 || selectedSubCategories.length > 0) {
      result = result.filter(p => {
        const matchesCat = selectedCategories.length === 0 || selectedCategories.includes(p.category)
        const matchesSub = selectedSubCategories.length === 0 || selectedSubCategories.includes(p.subCategory)

        // If specific sub-categories are chosen, they must match.
        // If not, we fall back to just matching the category.
        if (selectedSubCategories.length > 0) return matchesSub
        return matchesCat
      })
    }

    // Filter by Brand
    if (selectedBrands.length > 0) {
      result = result.filter(p => selectedBrands.includes(p.brand))
    }

    // Filter by Price
    result = result.filter(p => p.offerPrice >= priceRange[0] && p.offerPrice <= priceRange[1])

    // Sort
    if (sortBy === 'low-high') {
      result.sort((a, b) => a.offerPrice - b.offerPrice)
    } else if (sortBy === 'high-low') {
      result.sort((a, b) => b.offerPrice - a.offerPrice)
    }

    return result
  }, [searchQuery, selectedCategories, selectedSubCategories, selectedBrands, priceRange, sortBy])

  const toggleCategory = (cat) => {
    // If clicking a main category in mobile "elegant" mode, we might just expand it
    // But for logic, let's keep it simple: Select the category
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    )
  }

  const toggleSubCategory = (sub) => {
    setSelectedSubCategories(prev =>
      prev.includes(sub) ? prev.filter(s => s !== sub) : [...prev, sub]
    )
  }

  const toggleBrand = (brand) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    )
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategories([])
    setSelectedSubCategories([])
    setSelectedBrands([])
    setPriceRange([0, 50000])
    setSortBy('default')
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
        {/* Banner Section */}
        {/* Hero Banner Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative w-full h-[50vh] min-h-96 overflow-hidden shadow-xl"
        >
          {/* Background Image with Parallax-like effect */}
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src={BannerImg} 
            alt="Products Banner" 
            className="w-full h-full object-cover" 
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent flex flex-col items-center justify-center text-center px-4">
             <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
             >
                <h2 className="text-5xl md:text-7xl font-serif font-bold text-white mb-4 drop-shadow-lg tracking-wide">
                    Our <span className="text-orange-400">Collection</span>
                </h2>
                <p className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto font-light tracking-wide">
                    Explore premium mobile accessories designed for performance and style.
                </p>
             </motion.div>
          </div>
        </motion.div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Page Title - Not Sticky */}
        
        {/* Search & Mobile Filter - Sticky */}

        {/* Search & Mobile Filter - Sticky */}
        <div className="sticky top-16.25 z-30 bg-white/80 backdrop-blur-md py-1 -mx-4 px-4 md:-mx-8 md:px-8 mb-8 border-y border-gray-100 shadow-sm transition-all duration-300">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
             {/* Desktop Context / Stats */}
             <div className="hidden md:block">
                <p className="text-gray-500 font-medium">
                    Showing <span className="text-gray-900 font-bold">{filteredProducts.length}</span> premium products
                </p>
             </div>

             <div className="flex w-full md:w-auto gap-3 items-center">
               <div className="relative flex-1 md:w-96 group">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors duration-300" size={20} />
                 <input
                   type="text"
                   placeholder="Search for products, brands..."
                   className="w-full pl-11 pr-10 py-3 rounded-full border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 shadow-sm group-hover:shadow-md"
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                 />
                 {searchQuery && (
                    <button 
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        <X size={16} />
                    </button>
                 )}
               </div>
               
               <Button
                 className={`md:hidden h-12 px-5 rounded-full border font-medium transition-all duration-300 ${showMobileFilters ? 'bg-orange-50 border-orange-200 text-orange-600' : 'bg-white border-gray-200 text-gray-700 hover:border-orange-300 hover:text-orange-600'}`}
                 onClick={() => setShowMobileFilters(!showMobileFilters)}
               >
                 {showMobileFilters ? <X size={20} /> : <SlidersHorizontal size={20} />}
                 <span className="ml-2">Filter</span>
               </Button>
             </div>
           </div>
        </div>

        <div className="flex gap-8 items-start">
          {/* Sidebar Filters - Desktop */}
          <div className="hidden md:block w-72 shrink-0 space-y-6 sticky top-40 h-[calc(100vh-10rem)] overflow-y-auto custom-scrollbar pr-2 pt-2">

            <div className="flex justify-between items-center mb-2">
              <h2 className="font-bold text-gray-700">Filters</h2>
              <button onClick={clearFilters} className="text-sm text-orange-500 flex items-center hover:text-orange-700 transition-colors">
                <RotateCcw size={14} className="mr-1" /> Reset
              </button>
            </div>

            <FilterSection
              title="Categories"
              isOpen={openSections.category}
              toggle={() => setOpenSections(prev => ({ ...prev, category: !prev.category }))}
            >
              <div className="space-y-1">
                 <div 
                    className={`py-1.5 text-sm cursor-pointer hover:text-orange-600 transition-colors ${selectedCategories.length === 0 && selectedSubCategories.length === 0 ? 'text-orange-600 font-medium' : 'text-gray-600'}`}
                    onClick={() => { setSelectedCategories([]); setSelectedSubCategories([]); }}
                 >
                    All Products
                 </div>
                {categories.map(cat => (
                  <div key={cat} className="flex flex-col">
                    <div 
                        className={`flex justify-between items-center py-1.5 cursor-pointer group ${selectedCategories.includes(cat) || expandedCategory === cat ? 'text-orange-900' : 'text-gray-600'}`}
                        onClick={() => setExpandedCategory(expandedCategory === cat ? null : cat)}
                    >
                        <span className={`text-sm group-hover:text-orange-600 transition-colors ${selectedCategories.includes(cat) ? 'font-medium' : ''}`}>{cat}</span>
                         {categoryHierarchy[cat] && categoryHierarchy[cat].length > 0 && (
                            <ChevronDown size={14} className={`text-gray-400 transform transition-transform ${expandedCategory === cat ? 'rotate-180' : ''}`}/>
                        )}
                    </div>
                    
                    <AnimatePresence>
                        {expandedCategory === cat && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="pl-3 border-l border-gray-100 ml-1 space-y-1 my-1">
                                    <div 
                                        className={`py-1 text-xs cursor-pointer ${selectedCategories.includes(cat) && selectedSubCategories.length === 0 ? 'text-orange-600 font-medium' : 'text-gray-500 hover:text-gray-800'}`}
                                        onClick={() => {
                                            toggleCategory(cat)
                                            setSelectedSubCategories(prev => prev.filter(s => !categoryHierarchy[cat].includes(s)))
                                        }}
                                    >
                                        All {cat}
                                    </div>
                                    {categoryHierarchy[cat].map(sub => (
                                        <div 
                                            key={sub}
                                            className={`py-1 text-xs cursor-pointer ${selectedSubCategories.includes(sub) ? 'text-orange-600 font-medium' : 'text-gray-500 hover:text-gray-800'}`}
                                            onClick={() => toggleSubCategory(sub)}
                                        >
                                            {sub}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </FilterSection>

            <FilterSection
              title="Price Range"
              isOpen={openSections.price}
              toggle={() => setOpenSections(prev => ({ ...prev, price: !prev.price }))}
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">₹</span>
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                      className="w-full pl-6 pr-2 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <span className="text-gray-400">-</span>
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">₹</span>
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="w-full pl-6 pr-2 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100000"
                  step="1000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
              </div>
            </FilterSection>

            <FilterSection
              title="Brands"
              isOpen={openSections.brand}
              toggle={() => setOpenSections(prev => ({ ...prev, brand: !prev.brand }))}
            >
              <div className="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                {brands.map(brand => (
                  <label key={brand} className="flex items-center justify-between cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedBrands.includes(brand) ? 'bg-orange-500 border-orange-500' : 'border-gray-300 bg-white group-hover:border-orange-400'}`}>
                        {selectedBrands.includes(brand) && <Check size={14} className="text-white" />}
                      </div>
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleBrand(brand)}
                      />
                      <span className={`text-gray-600 group-hover:text-orange-600 transition-colors ${selectedBrands.includes(brand) ? 'font-medium text-gray-900' : ''}`}>{brand}</span>
                    </div>
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{getBrandCount(brand)}</span>
                  </label>
                ))}
              </div>
            </FilterSection>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Sorting */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-500">{filteredProducts.length} Products Found</p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
              >
                <option value="default">Sort by: Default</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
              </select>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <Cards products={filteredProducts} />
            ) : (
              <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-200">
                <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                <Button
                  variant="link"
                  className="text-orange-500 mt-2"
                  onClick={clearFilters}
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>


        {/* Mobile Filter Drawer - Elegant Style */}
        <AnimatePresence>
          {showMobileFilters && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-50 md:hidden"
                onClick={() => setShowMobileFilters(false)}
              />
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed inset-y-0 left-0 w-[85vw] max-w-sm bg-white z-50 overflow-y-auto shadow-2xl md:hidden flex flex-col"
              >
                {/* Header */}
                <div className="flex justify-between items-center p-6 pb-2">
                  <h2 className="text-3xl font-serif font-bold text-gray-900">Filters</h2>
                  <button onClick={() => setShowMobileFilters(false)} className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
                    <X size={24} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                  
                  {/* Sort By Section (Moved Inside) */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-serif font-bold text-gray-900">Sort By</h3>
                    <div className="relative">
                      <select 
                        value={sortBy} 
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full appearance-none bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500"
                      >
                        <option value="default">Default Sorting</option>
                        <option value="low-high">Price: Low to High</option>
                        <option value="high-low">Price: High to Low</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <ChevronDown size={16} />
                      </div>
                    </div>
                  </div>

                  {/* Categories Section - Elegant Vertical List */}
                  <div className="space-y-3">
                     <div 
                        className="flex justify-between items-center cursor-pointer"
                        onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                     >
                        <h3 className="text-xl font-serif font-bold text-gray-900">Categories</h3>
                        <div className="flex items-center gap-3">
                            {(selectedCategories.length > 0 || selectedSubCategories.length > 0) && (
                                <button 
                                    onClick={(e) => { 
                                        e.stopPropagation(); 
                                        setSelectedCategories([]); 
                                        setSelectedSubCategories([]); 
                                        setExpandedCategory(null); 
                                    }}
                                    className="text-xs text-gray-400 underline"
                                >
                                    Clear
                                </button>
                            )}
                            <ChevronDown size={20} className={`transform transition-transform ${isCategoriesOpen ? 'rotate-180' : ''}`}/>
                        </div>
                     </div>
                    
                    <AnimatePresence>
                        {isCategoriesOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="flex flex-col space-y-1 pt-2">
                                    {/* All Products Item */}
                                    <div 
                                        className={`py-2 text-lg cursor-pointer transition-colors ${selectedCategories.length === 0 && selectedSubCategories.length === 0 ? 'text-orange-900 font-medium' : 'text-gray-500'}`}
                                        onClick={() => { setSelectedCategories([]); setSelectedSubCategories([]); }}
                                    >
                                        All Products
                                    </div>

                                    {categories.map(cat => (
                                        <div key={cat} className="flex flex-col">
                                            <div 
                                                className={`flex justify-between items-center py-2 cursor-pointer ${selectedCategories.includes(cat) || expandedCategory === cat ? 'text-orange-900 font-medium' : 'text-gray-600'}`}
                                                onClick={() => {
                                                    // Toggle Expand
                                                    setExpandedCategory(expandedCategory === cat ? null : cat)
                                                }}
                                            >
                                                <span className="text-lg">{cat}</span>
                                                {categoryHierarchy[cat] && categoryHierarchy[cat].length > 0 && (
                                                    <ChevronDown size={16} className={`transform transition-transform ${expandedCategory === cat ? 'rotate-180' : ''}`}/>
                                                )}
                                            </div>
                                            
                                            {/* Sub Categories */}
                                            <AnimatePresence>
                                                {expandedCategory === cat && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="pl-4 border-l-2 border-gray-100 ml-1 space-y-2 mb-2">
                                                            <div 
                                                                className={`py-1 text-sm cursor-pointer ${selectedCategories.includes(cat) && selectedSubCategories.length === 0 ? 'text-orange-700 font-medium pl-2 border-l-2 border-orange-700 -ml-4.5' : 'text-gray-500 hover:text-gray-800'}`}
                                                                onClick={() => {
                                                                    toggleCategory(cat)
                                                                    setSelectedSubCategories(prev => prev.filter(s => !categoryHierarchy[cat].includes(s)))
                                                                }}
                                                            >
                                                                All {cat}
                                                            </div>
                                                            {categoryHierarchy[cat].map(sub => (
                                                                <div 
                                                                    key={sub}
                                                                    className={`py-1 text-sm cursor-pointer ${selectedSubCategories.includes(sub) ? 'text-orange-700 font-medium pl-2 border-l-2 border-orange-700 -ml-4.5' : 'text-gray-500 hover:text-gray-800'}`}
                                                                    onClick={() => toggleSubCategory(sub)}
                                                                >
                                                                    {sub}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                  </div>

                  {/* Price Range */}
                  {/* <div className="space-y-4">
                    <h3 className="text-xl font-serif font-bold text-gray-900">Price Range</h3>
                    <div className="pt-4 px-2">
                         <input 
                          type="range" 
                          min="0" 
                          max="100000" 
                          step="1000"
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                          className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-900"
                        />
                         <div className="flex gap-2 items-center mt-4">
                            <div className="border border-gray-300 px-3 py-2 rounded text-gray-600">
                                <span className="text-xs text-gray-400 block">Min</span>
                                ₹{priceRange[0]}
                            </div>
                            <span className="text-gray-300">-</span>
                            <div className="border border-gray-300 px-3 py-2 rounded text-gray-600">
                                <span className="text-xs text-gray-400 block">Max</span>
                                ₹{priceRange[1]}
                            </div>
                         </div>
                         <div className="mt-2 flex items-center gap-2">
                            <input type="checkbox" id="under1000" className="accent-gray-900 w-5 h-5" 
                                checked={priceRange[1] === 1000}
                                onChange={(e) => e.target.checked ? setPriceRange([0, 1000]) : setPriceRange([0, 50000])} 
                            />
                            <label htmlFor="under1000" className="text-gray-700 text-lg">Under ₹1000</label>
                         </div>
                    </div>
                  </div> */}

                   {/* Brands Section - Dropdown Accordion Style */}
                   <div className="space-y-3 pb-20 border-t border-gray-100 pt-6">
                    <div 
                        className="flex justify-between items-center cursor-pointer"
                        onClick={() => setIsBrandsOpen(!isBrandsOpen)}
                    >
                        <h3 className="text-xl font-serif font-bold text-gray-900">Brands</h3>
                        <ChevronDown size={20} className={`transform transition-transform ${isBrandsOpen ? 'rotate-180' : ''}`}/>
                    </div>
                    
                    <AnimatePresence>
                        {isBrandsOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="flex flex-col space-y-2 pt-2">
                                  {brands.map(brand => (
                                    <div 
                                        key={brand} 
                                        className={`flex justify-between items-center py-1 cursor-pointer ${selectedBrands.includes(brand) ? 'text-orange-900 font-medium' : 'text-gray-500'}`}
                                        onClick={() => toggleBrand(brand)}
                                    >
                                        <span className="text-lg">{brand}</span>
                                        {selectedBrands.includes(brand) && <Check size={18} />}
                                    </div>
                                  ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Sticky Apply Button */}
                <div className="p-6 border-t border-gray-100 bg-white">
                  <Button
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white rounded-none py-6 text-lg uppercase tracking-wide"
                    onClick={() => setShowMobileFilters(false)}
                  >
                    Show {filteredProducts.length} Results
                  </Button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

      </div>
    </div>
  )
}

export default Products

