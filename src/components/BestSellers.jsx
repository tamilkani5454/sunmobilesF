import React from 'react'
import { motion } from 'framer-motion'
import Cards from '../common/Cards'
import Products from "../assets/dummy"
import { appContext } from '../context/Context'
import { useContext } from 'react'

const BestSellers = () => {
    // Filter active items and take top 4
    const { products, CSB } = useContext(appContext)
    const bestSellers = products.filter(Item => Item.status ==="active").slice(0,4);

    return (
        <section className="py-20 px-4 md:px-8 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-bold text-center mb-16 text-blue-950"
                >
                    Best <span className="text-orange-500">Sellers</span>
                </motion.h2>
                <Cards products={bestSellers} />   
            </div>
        </section>
    )
}

export default BestSellers
