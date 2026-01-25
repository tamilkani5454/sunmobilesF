import React, { useState } from 'react'
import logo from '../assets/logo.png'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const isActiveLink = (path) => location.pathname === path;

    return (
        <div className="bg-white/90 backdrop-blur-xl sticky top-0 z-50 border-b border-gray-100 shadow-sm">
            <div className='container mx-auto px-3 py-3 flex justify-between items-center'>
                <div className='flex items-center gap-2'>
                    <img src={logo} alt="Sun Mobiles" className='w-10 h-10 md:w-12 md:h-12 object-contain hover:scale-105 transition-transform duration-300' />
                    <Link to="/" className='font-bold text-xl md:text-2xl lg:text-3xl tracking-tight'>
                        <span className='text-orange-500'>SUN</span>
                        <span className='text-blue-900 ml-1'>MOBILES</span>
                    </Link>
                </div>

                <div className='hidden md:flex space-x-1 lg:space-x-2 items-center bg-gray-50/50 p-1 rounded-full border border-gray-100'>
                    {['Home', 'Products', 'About', 'Contact'].map((item) => {
                        const path = item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`;
                        const active = isActiveLink(path);
                        return (
                            <Link
                                key={item}
                                to={path}
                                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 relative ${active ? 'text-orange-600 bg-white shadow-sm' : 'text-gray-600 hover:text-orange-600 hover:bg-white/50'}`}
                            >
                                {item === 'Contact' ? 'Contact Us' : item === 'About' ? 'About Us' : item}
                                {active && <motion.div layoutId="navbar-indicator" className="absolute inset-0 rounded-full border border-orange-100 pointer-events-none" transition={{ duration: 0.3 }} />}
                            </Link>
                        )
                    })}
                </div>

                <div className='hidden md:flex items-center gap-3'>
                    <Link to="/cart">
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className='relative p-2.5 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-full transition-colors'>
                            <ShoppingCart size={22} />
                            <span className="absolute top-1 right-1 h-2.5 w-2.5 bg-orange-500 rounded-full border-2 border-white"></span>
                        </motion.button>
                    </Link>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className='p-2.5 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-full transition-colors'>
                                <User size={22} />
                            </motion.button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56 mt-2">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <Link to="/profile"><DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem></Link>
                            <Link to="/orders"><DropdownMenuItem className="cursor-pointer">Orders</DropdownMenuItem></Link>
                            <DropdownMenuItem className="cursor-pointer text-red-500 focus:text-red-500">Log out</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className='md:hidden'>
                    <motion.button whileTap={{ scale: 0.9 }} onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-gray-700 hover:text-orange-600">
                        {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
                    </motion.button>
                </div>

                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                            className="absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-xl overflow-hidden md:hidden"
                        >
                            <div className="flex flex-col p-4 space-y-2">
                                {['Home', 'Products', 'About', 'Contact'].map((item) => {
                                    const path = item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`;
                                    return (
                                        <Link
                                            key={item}
                                            to={path}
                                            onClick={() => setIsMenuOpen(false)}
                                            className={`flex items-center justify-between p-3 rounded-lg transition-colors ${isActiveLink(path) ? 'bg-orange-50 text-orange-600' : 'text-gray-600 hover:bg-gray-50'}`}
                                        >
                                            <span className="font-medium">{item === 'Contact' ? 'Contact Us' : item === 'About' ? 'About Us' : item}</span>
                                            {isActiveLink(path) && <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />}
                                        </Link>
                                    )
                                })}
                                <div className="h-px bg-gray-100 my-2" />
                                <div className="grid grid-cols-2 gap-3">
                                    <Link to="/cart" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center gap-2 p-3 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg active:scale-95 transition-transform">
                                        <ShoppingCart size={18} /> Cart
                                    </Link>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <button className="flex items-center justify-center gap-2 p-3 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg active:scale-95 transition-transform">
                                                <User size={18} /> Profile
                                            </button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-56 mt-2">
                                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                            <Link to="/profile" onClick={() => setIsMenuOpen(false)}><DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem></Link>
                                            <Link to="/orders" onClick={() => setIsMenuOpen(false)}><DropdownMenuItem className="cursor-pointer">Orders</DropdownMenuItem></Link>
                                            <DropdownMenuItem className="cursor-pointer text-red-500 focus:text-red-500">Log out</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

export default Navbar
