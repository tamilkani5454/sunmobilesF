import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ArrowLeft } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { appContext } from '../../context/Context'

const Cart = () => {
    const { cart, addToCart, removeFromCart, CSB, loading } = useContext(appContext)
    const { brands = [], categories = [] } = CSB || {}

    const getBrandName = (id) => {
        const brand = brands.find(b => b._id === id)
        return brand ? brand.name : id
    }

    const getCategoryName = (id) => {
        const category = categories.find(c => c._id === id)
        return category ? category.name : id
    }

    const updateQuantity = (item, delta) => {
        if (item.quantity + delta < 1) return
        addToCart(item, delta)
    }

    const removeItem = (id) => {
        removeFromCart(id)
    }

    const subtotal = cart.reduce((acc, item) => acc + (item.offerPrice * item.quantity), 0)
    const shipping = subtotal > 500 ? 0 : 50
    const total = subtotal + shipping

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            </div>
        )
    }

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                >
                    <div className="w-24 h-24 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ShoppingBag size={48} />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
                    <p className="text-gray-500 mb-8 max-w-md mx-auto">Looks like you haven't added anything to your cart yet. Explore our products and find something you love!</p>
                    <Link to="/products">
                        <Button size="lg" className="bg-orange-500 hover:bg-orange-600 rounded-full px-8">
                            Start Shopping
                        </Button>
                    </Link>
                </motion.div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 md:py-12 pb-24 md:pb-12">
            <div className="container mx-auto px-4 max-w-6xl">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8 flex items-center gap-2 md:gap-3">
                    <ShoppingBag className="text-orange-500 w-6 h-6 md:w-8 md:h-8" /> Shopping Cart
                    <span className="text-sm md:text-base font-normal text-gray-500 ml-2">({cart.length} items)</span>
                </h1>

                <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
                    {/* Cart Items List */}
                    <div className="lg:col-span-2 space-y-4">
                        <AnimatePresence>
                            {cart.map((item) => (
                                <motion.div 
                                    key={item._id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex gap-4 transition-all hover:shadow-md relative overflow-hidden"
                                >
                                    {/* Image */}
                                    <div className="w-20 h-20 sm:w-28 sm:h-28 bg-gray-50 rounded-xl shrink-0 p-2 border border-gray-100 self-center">
                                        <img src={item.images && item.images[0] ? item.images[0].url : item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                                    </div>

                                    {/* details */}
                                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start gap-2">
                                                <Link to={`/products/${item._id}`} className="text-base sm:text-lg font-bold text-gray-900 hover:text-orange-600 transition-colors line-clamp-2 leading-snug">{item.name}</Link>
                                                <button 
                                                    onClick={() => removeItem(item._id)}
                                                    className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-red-50 shrink-0"
                                                    title="Remove item"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                            <p className="text-xs sm:text-sm text-gray-500 mt-1">{getBrandName(item.brand)} • {getCategoryName(item.category)}</p>
                                        </div>

                                        <div className="flex justify-between items-end mt-3">
                                            {/* Quantity Control */}
                                            <div className="flex items-center border border-gray-200 rounded-full bg-gray-50 h-8 sm:h-10">
                                                <button 
                                                    onClick={() => updateQuantity(item, -1)}
                                                    className="px-2 sm:px-3 h-full hover:text-orange-600 transition-colors flex items-center justify-center"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="w-6 sm:w-8 text-center font-medium text-sm">{item.quantity}</span>
                                                <button 
                                                    onClick={() => updateQuantity(item, 1)}
                                                    className="px-2 sm:px-3 h-full hover:text-orange-600 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                                                    disabled={item.quantity >= item.stock}
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>

                                            <span className="font-bold text-lg sm:text-xl text-gray-900">₹{(item.offerPrice * item.quantity).toLocaleString()}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        <div className="mt-6 hidden md:flex justify-between items-center">
                            <Link to="/products" className="flex items-center text-gray-600 hover:text-orange-600 font-medium transition-colors">
                                <ArrowLeft size={18} className="mr-2" /> Continue Shopping
                            </Link>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 md:p-6 sticky top-24">
                            <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6">Order Summary</h2>
                            
                            <div className="space-y-3 md:space-y-4 mb-6 text-sm md:text-base">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>₹{subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span className={shipping === 0 ? "text-green-600" : ""}>
                                        {shipping === 0 ? "Free" : `₹${shipping}`}
                                    </span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Tax</span>
                                    <span>Calculated later</span>
                                </div>
                                
                                <div className="border-t border-dashed border-gray-200 pt-4 mt-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-base md:text-lg font-bold text-gray-900">Total</span>
                                        <span className="text-xl md:text-2xl font-bold text-orange-600">₹{total.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>

                             {/* Promo Code Input */}
                            <div className="mb-6 hidden md:block">
                                <div className="flex gap-2">
                                    <input 
                                        type="text" 
                                        placeholder="Promo code" 
                                        className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-orange-500 transition-colors"
                                    />
                                    <Button variant="outline" className="text-gray-600 border-gray-200 hover:bg-gray-50">Apply</Button>
                                </div>
                            </div>

                            <Link to="/checkout" className="w-full hidden md:block">
                                <Button size="lg" className="w-full bg-gray-900 hover:bg-black text-white rounded-xl py-6 text-lg shadow-lg shadow-gray-900/20 group">
                                    Proceed to Checkout <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>

                             <p className="text-xs text-gray-400 mt-4 text-center items-center flex justify-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-green-500"></span> Secure Checkout
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Sticky Bottom Bar */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 md:hidden z-40 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                <div className="flex items-center gap-4 max-w-md mx-auto">
                    <div className="flex-1">
                        <p className="text-xs text-gray-500 uppercase font-semibold">Total</p>
                        <p className="text-xl font-bold text-gray-900">₹{total.toLocaleString()}</p>
                    </div>
                    <Link to="/checkout" className="flex-1">
                        <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white rounded-xl h-12 shadow-lg shadow-orange-600/20">
                            Checkout <ArrowRight size={18} className="ml-2" />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Cart
