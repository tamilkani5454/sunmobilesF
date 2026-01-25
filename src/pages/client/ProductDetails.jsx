import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingCart, Check, Star, Minus, Plus, ArrowLeft, Sparkles } from 'lucide-react'
import { Button } from '../../components/ui/button'
import ProductsData from '../../assets/dummy'
import Cards from '../../common/Cards'
import { AnimatePresence } from 'framer-motion'

const ProductDetails = () => {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const [activeTab, setActiveTab] = useState('description')
    const [relatedProducts, setRelatedProducts] = useState([])
    const [isHovered, setIsHovered] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null)
    const [isAddedToCart, setIsAddedToCart] = useState(false)
    const [cartParticles, setCartParticles] = useState([])

    const handleAddToCart = () => {
        // Create burst particles
        const newParticles = Array.from({ length: 12 }, (_, i) => ({
            id: Date.now() + i,
            angle: (i * 30) * (Math.PI / 180),
        }))
        setCartParticles(newParticles)
        
        setIsAddedToCart(true)
        setTimeout(() => {
            setIsAddedToCart(false)
            setCartParticles([])
        }, 1800)
    }

    useEffect(() => {
        const foundProduct = ProductsData.find(p => p.id === parseInt(id))
        setProduct(foundProduct)
        setQuantity(1)
        window.scrollTo(0, 0)

        if (foundProduct) {
            setSelectedImage(foundProduct.images ? foundProduct.images[0] : foundProduct.image)
            const related = ProductsData.filter(p => 
                p.category === foundProduct.category && p.id !== foundProduct.id
            ).slice(0, 4)
            setRelatedProducts(related)
        }
    }, [id])

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            </div>
        )
    }

    const discountPercentage = Math.round(((product.price - product.offerPrice) / product.price) * 100)

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Breadcrumb-style Back Button */}
            <div className="sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
                    <Link to="/products" className="inline-flex items-center text-gray-500 hover:text-orange-600 transition-colors font-medium">
                        <ArrowLeft size={18} className="mr-2" /> Back to Products
                    </Link>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8">
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="grid lg:grid-cols-2 gap-0">
                        
                        {/* Product Image Section */}
                        <div className="p-4 lg:p-8 flex flex-col items-center justify-center relative">
                            <motion.img 
                                key={selectedImage}
                                src={selectedImage || product.image} 
                                alt={product.name} 
                                className="w-full max-w-lg aspect-square object-contain cursor-zoom-in"
                                onHoverStart={() => setIsHovered(true)}
                                onHoverEnd={() => setIsHovered(false)}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: isHovered ? 1.05 : 1 }}
                                transition={{ duration: 0.4 }}
                            />

                            {/* Thumbnails */}
                            {product.images && product.images.length > 1 && (
                                <div className="flex gap-3 mt-6 overflow-x-auto pb-2">
                                    {product.images.map((img, idx) => (
                                        <button 
                                            key={idx}
                                            onClick={() => setSelectedImage(img)}
                                            className={`w-14 h-14 shrink-0 rounded-lg border-2 overflow-hidden transition-all p-1 ${selectedImage === img ? 'border-orange-500 scale-105' : 'border-gray-200 hover:border-orange-300'}`}
                                        >
                                            <img src={img} alt="" className="w-full h-full object-contain" />
                                        </button>
                                    ))}
                                </div>
                            )}
                            
                            {/* Badges */}
                            <div className="absolute top-4 left-4 flex flex-col gap-2">
                                <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                                    {discountPercentage}% OFF
                                </span>
                                <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                                    New Arrival
                                </span>
                            </div>
                        </div>

                        {/* Product Info Section - Sticky on larger screens if needed, but here simple layout */}
                        <div className="p-8 lg:p-12 lg:border-l border-gray-100 relative">
                            <div className="sticky top-24">
                                <div className="space-y-6">
                                    <div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="text-sm font-bold tracking-wider text-orange-600 uppercase bg-orange-50 px-3 py-1 rounded-full">{product.brand}</span>
                                            <div className="flex items-center text-yellow-400 gap-1 ml-auto bg-yellow-50 px-3 py-1 rounded-full">
                                                <Star size={14} fill="currentColor" />
                                                <span className="text-yellow-700 text-sm font-bold ml-1">4.8</span>
                                                <span className="text-gray-400 text-xs ml-1">(120+ Reviews)</span>
                                            </div>
                                        </div>
                                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">{product.name}</h1>
                                    </div>

                                    <div className="flex items-baseline gap-4 pb-6 border-b border-gray-100">
                                        <span className="text-5xl font-bold text-gray-900">₹{product.offerPrice.toLocaleString()}</span>
                                        <div className="flex flex-col">
                                            <span className="text-xl text-gray-400 line-through">₹{product.price.toLocaleString()}</span>
                                            <span className="text-green-600 text-xs font-bold uppercase tracking-wide">Inclusive of all taxes</span>
                                        </div>
                                    </div>

                                    <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed">
                                        <p>{product.description}</p>
                                    </div>

                                    {/* Stock Status */}
                                    <div className="flex items-center gap-3">
                                        <div className={`w-3 h-3 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
                                        <span className={`font-medium ${product.stock > 0 ? 'text-green-700' : 'text-red-700'}`}>
                                            {product.stock > 0 ? 'In Stock & Ready to Ship' : 'Currently Out of Stock'}
                                        </span>
                                    </div>

                                    {/* Actions */}
                                    <div className="pt-6 space-y-4">
                                        <div className="flex flex-col sm:flex-row gap-4">
                                            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-2xl w-max">
                                                <button 
                                                    className="p-4 hover:text-orange-600 hover:bg-white rounded-l-2xl transition-all"
                                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                    disabled={quantity <= 1}
                                                >
                                                    <Minus size={20} />
                                                </button>
                                                <span className="w-16 text-center font-bold text-xl text-gray-900">{quantity}</span>
                                                <button 
                                                    className="p-4 hover:text-green-600 hover:bg-white rounded-r-2xl transition-all"
                                                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                                    disabled={quantity >= product.stock}
                                                >
                                                    <Plus size={20} />
                                                </button>
                                            </div>
                                            
                                            <div className="flex-1 relative">
                                                {/* Particle Burst Effect */}
                                                <AnimatePresence>
                                                    {cartParticles.map((particle) => (
                                                        <motion.div
                                                            key={particle.id}
                                                            initial={{ 
                                                                opacity: 1, 
                                                                scale: 0,
                                                                x: 0,
                                                                y: 0
                                                            }}
                                                            animate={{ 
                                                                opacity: 0, 
                                                                scale: 1.5,
                                                                x: Math.cos(particle.angle) * 100,
                                                                y: Math.sin(particle.angle) * 60
                                                            }}
                                                            exit={{ opacity: 0 }}
                                                            transition={{ duration: 0.8, ease: "easeOut" }}
                                                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20"
                                                        >
                                                            <Sparkles size={16} className="text-yellow-400" />
                                                        </motion.div>
                                                    ))}
                                                </AnimatePresence>

                                                <motion.div 
                                                    whileTap={{ scale: 0.92 }}
                                                    animate={isAddedToCart ? { 
                                                        scale: [1, 1.05, 1],
                                                    } : {}}
                                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                                >
                                                    <Button 
                                                        size="lg" 
                                                        onClick={handleAddToCart}
                                                        className={`w-full rounded-2xl h-auto py-4 text-lg font-bold shadow-xl transition-all duration-500 flex items-center justify-center gap-3 overflow-hidden relative ${
                                                            isAddedToCart 
                                                                ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-500 hover:to-emerald-500 text-white shadow-green-500/30' 
                                                                : 'bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white shadow-gray-900/20'
                                                        }`}
                                                    >
                                                        {/* Ripple effect */}
                                                        <AnimatePresence>
                                                            {isAddedToCart && (
                                                                <motion.div
                                                                    initial={{ scale: 0, opacity: 0.6 }}
                                                                    animate={{ scale: 5, opacity: 0 }}
                                                                    exit={{ opacity: 0 }}
                                                                    transition={{ duration: 0.7 }}
                                                                    className="absolute inset-0 bg-white rounded-full"
                                                                    style={{ transformOrigin: 'center' }}
                                                                />
                                                            )}
                                                        </AnimatePresence>

                                                        <AnimatePresence mode="wait">
                                                            {isAddedToCart ? (
                                                                <motion.span
                                                                    key="added"
                                                                    initial={{ opacity: 0, y: 30, rotateX: -90 }}
                                                                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                                                                    exit={{ opacity: 0, y: -30, rotateX: 90 }}
                                                                    transition={{ duration: 0.35, ease: "backOut" }}
                                                                    className="flex items-center gap-2 relative z-10"
                                                                >
                                                                    <motion.div
                                                                        initial={{ scale: 0, rotate: -180 }}
                                                                        animate={{ scale: 1, rotate: 0 }}
                                                                        transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                                                                    >
                                                                        <Check size={24} strokeWidth={3} />
                                                                    </motion.div>
                                                                    Added to Cart!
                                                                </motion.span>
                                                            ) : (
                                                                <motion.span
                                                                    key="add"
                                                                    initial={{ opacity: 0, y: 30 }}
                                                                    animate={{ opacity: 1, y: 0 }}
                                                                    exit={{ opacity: 0, y: -30 }}
                                                                    transition={{ duration: 0.3 }}
                                                                    className="flex items-center gap-2 relative z-10"
                                                                >
                                                                    <ShoppingCart size={24} /> Add to Cart
                                                                </motion.span>
                                                            )}
                                                        </AnimatePresence>
                                                    </Button>
                                                </motion.div>
                                            </div>
                                        </div>
                                        
                                        {/* Trust Indicators */}
                                        <div className="grid grid-cols-2 gap-3 pt-4">
                                            <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 p-2 rounded-lg justify-center">
                                                <Check size={16} className="text-green-500" /> 100% Genuine Product
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 p-2 rounded-lg justify-center">
                                                <Check size={16} className="text-green-500" /> Secure Payments
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Tabs Section */}
                    <div className="border-t border-gray-200 bg-gray-50/50">
                        <div className="max-w-4xl mx-auto px-4 py-12">
                            <div className="flex justify-center mb-8 border-b border-gray-200">
                                {['description', 'specifications'].map((tab) => (
                                    <button 
                                        key={tab}
                                        className={`px-8 py-4 font-bold text-lg transition-all relative capitalize ${activeTab === tab ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
                                        onClick={() => setActiveTab(tab)}
                                    >
                                        {tab}
                                        {activeTab === tab && (
                                            <motion.div layoutId="tabIndicator" className="absolute bottom-0 left-0 right-0 h-1 bg-orange-500 rounded-t-full" />
                                        )}
                                    </button>
                                ))}
                            </div>
                            
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm"
                                >
                                    {activeTab === 'description' ? (
                                        <div className="prose max-w-none text-gray-600 leading-loose">
                                            <p className="text-xl text-gray-900 font-medium mb-4">Product Highlights</p>
                                            <p>{product.description}</p>
                                            <p className="mt-4">Experience the perfect blend of style and performance with the {product.name}. Designed for the modern user, it delivers exceptional reliability and premium aesthetics.</p>
                                        </div>
                                    ) : (
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-6">Technical Specifications</h3>
                                            <div className="grid md:grid-cols-2 gap-4">
                                                {product.specifications && product.specifications.length > 0 ? (
                                                    product.specifications.map((spec, index) => (
                                                        <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-orange-200 transition-colors">
                                                            <div className="w-2 h-2 rounded-full bg-orange-500 shadow-lg shadow-orange-500/50" />
                                                            <span className="font-medium text-gray-700">{spec}</span>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p className="text-gray-500 italic">No specifications available for this product.</p>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="mt-24 mb-12">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-3xl font-bold text-gray-900">Similar Products</h2>
                            <Link to="/products" className="text-orange-600 font-bold hover:underline">View All</Link>
                        </div>
                        <Cards products={relatedProducts} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProductDetails
