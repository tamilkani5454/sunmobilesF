import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, CreditCard, Wallet, ArrowUp, Send } from 'lucide-react';
import logo from '../assets/logo.png';
import { motion } from 'framer-motion';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <footer className="bg-gray-950 text-gray-300 font-sans border-t border-gray-800 relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-8 lg:px-16 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">

                {/* Brand Section */}
                <div className="flex flex-col space-y-6">
                    <div className='flex items-center space-x-3'>
                        <img src={logo} alt="Sun Mobiles" className="w-12 h-12 object-contain" />
                        <h2 className="text-2xl font-bold tracking-wide">
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-red-500">SUN</span>
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-500 ml-2">MOBILES</span>
                        </h2>
                    </div>
                    <p className="text-sm leading-relaxed text-gray-400">
                        Experience the future of technology with our premium selection of mobile devices and accessories. Quality meets innovation.
                    </p>
                    <div className="flex space-x-4">
                        {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                            <motion.a
                                key={index}
                                href="#"
                                whileHover={{ y: -3, backgroundColor: '#f97316', color: '#fff' }}
                                className="p-3 bg-gray-900 rounded-full text-gray-400 transition-colors duration-300 shadow-md border border-gray-800"
                            >
                                <Icon size={18} />
                            </motion.a>
                        ))}
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-bold text-white mb-6 relative inline-block">
                        Quick Links
                        <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-orange-500 rounded-full"></span>
                    </h3>
                    <ul className="space-y-3">
                        {['Home', 'Products', 'About', 'Contact'].map((item) => {
                            const path = item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`;
                            return (
                                <li key={item}>
                                    <Link to={path} className="group flex items-center space-x-2 text-gray-400 hover:text-orange-400 transition-colors duration-200">
                                        <span className="h-1.5 w-1.5 bg-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                        <span className="transform group-hover:translate-x-1 transition-transform">{item === 'About' ? 'About Us' : item === 'Contact' ? 'Contact Us' : item}</span>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>

                {/* Policies & Support */}
                <div>
                    <h3 className="text-lg font-bold text-white mb-6 relative inline-block">
                        Support
                        <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-orange-500 rounded-full"></span>
                    </h3>
                    <ul className="space-y-3">
                        {[
                            { name: 'FAQ', path: '/faq' },
                            { name: 'Privacy Policy', path: '/privacy-policy' },
                            { name: 'Terms of Service', path: '/terms' },
                            { name: 'Shipping & Returns', path: '/shipping' }
                        ].map((link) => (
                            <li key={link.name}>
                                <Link to={link.path} className="group flex items-center space-x-2 text-gray-400 hover:text-orange-400 transition-colors duration-200">
                                    <span className="h-1.5 w-1.5 bg-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    <span className="transform group-hover:translate-x-1 transition-transform">{link.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className="text-lg font-bold text-white mb-6 relative inline-block">
                        Contact Us
                        <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-orange-500 rounded-full"></span>
                    </h3>
                    <ul className="space-y-4 text-sm text-gray-400 ">
                        <li className="flex items-center space-x-3 group">
                            <div className="p-2 bg-gray-900 rounded-lg group-hover:bg-orange-500/20 transition-colors border border-gray-800">
                                <MapPin className="text-orange-500" size={20} />
                            </div>
                            <span>Sun Mobiles,<br />Sendurai TO Ariyalur (Road) <br />Near Masjid, Sendurai-621714 <br />Tamil Nadu, India</span>
                        </li>
                        <li className="flex items-center space-x-3 group">
                            <div className="p-2 bg-gray-900 rounded-lg group-hover:bg-orange-500/20 transition-colors border border-gray-800">
                                <Phone className="text-orange-500" size={20} />
                            </div>
                            <span>+91 98765 43210</span>
                        </li>
                        <li className="flex items-center space-x-3 group">
                            <div className="p-2 bg-gray-900 rounded-lg group-hover:bg-orange-500/20 transition-colors border border-gray-800">
                                <Mail className="text-orange-500" size={20} />
                            </div>
                            <span>support@sunmobiles.com</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800 bg-gray-950 relative z-10 ">
                <div className="container mx-auto px-4 py-6 flex flex-col justify-between items-center gap-2">
                    <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Sun Mobiles. All rights reserved.</p>
                    <hr />
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500 hidden sm:block">We accept:</span>
                        <div className="flex gap-2 text-gray-400">
                            <CreditCard size={24} className="hover:text-white transition-colors" />
                            <Wallet size={24} className="hover:text-white transition-colors" />
                        </div>
                    </div>


                    <p className="text-sm text-gray-500 flex items-center gap-1"> Designed with <span className="text-red-500">♥</span> by <a href="https://www.zentroinfotech.com" target='blank' className="text-orange-500 hover:text-orange-400 transition-colors">Zentro Infotech</a></p>

                </div>
            </div>

            
        </footer>
    );
};

export default Footer;



