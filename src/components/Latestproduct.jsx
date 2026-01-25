import React from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart } from 'lucide-react'
import { Button } from './ui/button'
import Cards from '../common/Cards'
import Products from "../assets/dummy"
import { Link } from 'react-router-dom'



const Latestproduct = () => {
  const latestProducts = Products.slice(-8);
  
  return (
    <section className="py-20 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-16 text-blue-950"
        >
          Latest <span className="text-orange-500">Products</span>
        </motion.h2>
        <Cards products={latestProducts} />
        <div className="text-center mt-16">
          <Link to="/Products"><Button className="bg-blue-900 hover:bg-blue-800 text-white rounded-full px-10 py-6 text-lg shadow-xl hover:shadow-2xl transition-all duration-300">
            View All Products
          </Button></Link>
        </div>
      </div>
    </section>
  )
}

export default Latestproduct
