import React, { useState, useContext } from 'react'
import { appContext } from '../context/Context'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ShoppingCart, Check, Sparkles } from 'lucide-react'
import { Button } from '../components/ui/button'

const AddToCartButton = ({ product }) => {
    const { addToCart } = useContext(appContext)
    const [isAdded, setIsAdded] = useState(false)
    const [particles, setParticles] = useState([])

    const handleAddToCart = (e) => {
        e.preventDefault()
        e.stopPropagation()
        
        addToCart(product, 1)
        
        // Create burst particles
        const newParticles = Array.from({ length: 8 }, (_, i) => ({
            id: Date.now() + i,
            angle: (i * 45) * (Math.PI / 180),
        }))
        setParticles(newParticles)
        
        setIsAdded(true)
        setTimeout(() => {
            setIsAdded(false)
            setParticles([])
        }, 1800)
    }

    return (
        <div className="relative w-full">
            {/* Particle Burst Effect */}
            <AnimatePresence>
                {particles.map((particle) => (
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
                            scale: 1,
                            x: Math.cos(particle.angle) * 60,
                            y: Math.sin(particle.angle) * 40
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10"
                    >
                        <Sparkles size={12} className="text-orange-400" />
                    </motion.div>
                ))}
            </AnimatePresence>

            <motion.div
                whileTap={{ scale: 0.92 }}
                animate={isAdded ? { 
                    scale: [1, 1.08, 1],
                } : {}}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full"
            >
                <Button
                    variant="secondary"
                    size="lg"
                    onClick={handleAddToCart}
                    className={`w-full overflow-hidden relative transition-all duration-500 ${
                        isAdded 
                            ? 'bg-linear-to-r from-green-500 to-emerald-500 text-white border-green-500 hover:from-green-500 hover:to-emerald-500 shadow-lg shadow-green-500/30' 
                            : 'hover:bg-linear-to-r hover:from-orange-500 hover:to-orange-600 hover:text-white border-orange-200 text-orange-500 hover:shadow-lg hover:shadow-orange-500/20'
                    }`}
                >
                    {/* Ripple effect background */}
                    <AnimatePresence>
                        {isAdded && (
                            <motion.div
                                initial={{ scale: 0, opacity: 0.5 }}
                                animate={{ scale: 4, opacity: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.6 }}
                                className="absolute inset-0 bg-white rounded-full"
                                style={{ transformOrigin: 'center' }}
                            />
                        )}
                    </AnimatePresence>

                    <AnimatePresence mode="wait">
                        {isAdded ? (
                            <motion.span
                                key="added"
                                initial={{ opacity: 0, y: 20, rotateX: -90 }}
                                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                                exit={{ opacity: 0, y: -20, rotateX: 90 }}
                                transition={{ duration: 0.3, ease: "backOut" }}
                                className="flex items-center gap-1.5 relative z-10"
                            >
                                <motion.div
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                                >
                                    <Check size={18} strokeWidth={3} />
                                </motion.div>
                                Added!
                            </motion.span>
                        ) : (
                            <motion.span
                                key="add"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="flex items-center gap-1.5 relative z-10"
                            >
                                <ShoppingCart size={18} /> Add to Cart
                            </motion.span>
                        )}
                    </AnimatePresence>
                </Button>
            </motion.div>
        </div>
    )
}

const Cards = ({ products }) => {
    const { CSB } = useContext(appContext)
    const { categories = [] } = CSB || {}

    const getCategoryName = (id) => {
        const category = categories.find(c => c._id === id)
        return category ? category.name : id
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-8">
            {products.map((product, index) => (
                <motion.div
                    key={product._id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.01, duration: 0.3 }}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100"
                >
                    <Link to={`/products/${product._id}`} className="block relative overflow-hidden aspect-square bg-gray-100">
                        <img
                            src={product.images[0].url}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold text-gray-600">
                                {getCategoryName(product.category)}
                            </div>
                    </Link>

                    <div className="p-3">
                        <Link to={`/products/${product._id}`}>
                            <h3 className="font-semibold md:text-lg text-gray-800 mb-2 truncate hover:text-orange-600 transition-colors">{product.name}</h3>
                        </Link>
                        <p className='text-gray-400 text-xs'>Avl Stock: <span className="font-semibold">{product.stock}</span></p>
                        <div className="flex flex-col justify-between items-center mt-2">
                            <div className='flex gap-2'>
                                <span className="text-xl font-bold text-gray-600 line-through">₹{product.price}</span>
                                <span className="text-xl font-bold text-orange-600">₹{product.offerPrice}</span>
                            </div>
                            <p className='flex text-xs font-medium text-gray-600 text-center items-center'><Check size={13} />Free Delivery</p>
                            <AddToCartButton product={product} />
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    )
}

export default Cards
