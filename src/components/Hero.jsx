import React from 'react'
import { motion } from 'framer-motion'
import heroBanner from '../assets/hero-banner.jpg'

const Hero = () => {
  return (
    <div className='relative w-full h-[65vh] md:h-[85vh] overflow-hidden'>
      <motion.img 
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        src={heroBanner} 
        alt="Hero Banner" 
        className='w-full h-full object-cover select-none'
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent flex items-center justify-center">
        <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-center text-white px-4 max-w-5xl"
        >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight drop-shadow-2xl">
                Your One-Stop Shop for <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-red-500">Premium Gadgets</span>
            </h1>
            <p className="text-lg md:text-2xl font-medium mb-10 text-gray-200 drop-shadow-lg max-w-3xl mx-auto tracking-wide">
                Mobiles • Accessories • Gadgets • Toys • Home Needs
            </p>
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px -10px rgba(249, 115, 22, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-linear-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-4 px-10 rounded-full text-lg shadow-xl transition-all duration-300"
            >
              Shop Now
            </motion.button>
        </motion.div>
      </div>
    </div>
  )
}

export default Hero
