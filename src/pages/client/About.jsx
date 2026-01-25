import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Shield, Truck, Clock, Award, Users, Target, Heart, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Link } from 'react-router-dom';
import productsBanner from '../../assets/products-banner.jpeg'; 

const About = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const statsRef = useRef(null);
  const isInView = useInView(statsRef, { once: true });

  const stats = [
    { label: "Happy Customers", value: "7k+", icon: Users },
    { label: "Products Sold", value: "50k+", icon: Target },
    { label: "Years Experience", value: "5+", icon: Clock },
    { label: "Awards Won", value: "15+", icon: Award },
  ];

  const features = [
    {
      icon: Shield,
      title: "100% Genuine Products",
      desc: "We guarantee authenticity for every product in our catalog, sourced directly from manufacturers."
    },
    {
      icon: Truck,
      title: "Fast & Secure Delivery",
      desc: "Priority shipping across the country with insurance coverage for your peace of mind."
    },
    {
      icon: Heart,
      title: "Dedicated Support",
      desc: "Our expert team is available 24/7 to assist you with any technical queries or guidance."
    },
    {
      icon: Award,
      title: "Best Price Guarantee",
      desc: "We offer the most competitive prices in the market without compromising on quality."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden" ref={containerRef}>
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
         <img 
            src={productsBanner} 
            alt="About Sun Mobiles" 
            className="w-full h-full object-cover scale-110"
          />
          <div className="absolute inset-0 bg-linear-to-t from-gray-950 via-gray-900/60 to-gray-900/30"></div>
        </motion.div>
        
        <div className="container mx-auto px-4 z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight drop-shadow-2xl">
              Driving <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-red-500">Innovation</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed font-light drop-shadow-md">
              We are defining the future of mobile technology retail with a commitment to quality, trust, and exceptional service.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-10 bg-white rounded-3xl shadow-xl border border-orange-100/50 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-orange-100 transition-colors"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 text-orange-600">
                <Target size={24} />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                To simplify the digital lifestyle by providing 100% genuine mobile technology at unbeatable prices. We aim to be the bridge between premium tech and the people who use it, ensuring quality and trust in every transaction.
              </p>
            </div>
          </motion.div>

          <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-10 bg-white rounded-3xl shadow-xl border border-blue-100/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-blue-100 transition-colors"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
                <Shield size={24} />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                To become the nation's preferred mobile retailer, recognized for our integrity, speed, and customer-first approach. We envision a future where upgrading your tech is a seamless, joyful experience.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Why Choose Sun Mobiles?</h2>
            <div className="h-1.5 w-24 bg-linear-to-r from-orange-400 to-red-500 mx-auto rounded-full mb-6"></div>
            <p className="text-gray-600 text-xl max-w-2xl mx-auto font-light">We don't just sell phones; we deliver experiences backed by our core values.</p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-[0_20px_40px_-15px_rgba(249,115,22,0.1)] hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-linear-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="w-16 h-16 bg-white shadow-sm rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 relative z-10 border border-gray-100">
                  <feature.icon className="text-orange-500" size={32} />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 relative z-10 group-hover:text-orange-600 transition-colors">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed relative z-10">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gray-950 text-white relative overflow-hidden" ref={statsRef}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#4b5563 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-orange-500 to-transparent opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group cursor-default">
                <div className="flex justify-center mb-6">
                  <div className="p-4 rounded-full bg-gray-900 border border-gray-800 group-hover:border-orange-500/50 transition-colors duration-300">
                    <stat.icon className="text-orange-500 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" size={32} />
                  </div>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="text-4xl md:text-6xl font-black mb-2 text-transparent bg-clip-text bg-linear-to-b from-white to-gray-500">{stat.value}</div>
                  <div className="text-sm md:text-base text-gray-400 uppercase tracking-widest font-medium">{stat.label}</div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-40 bg-linear-to-b from-gray-50 to-transparent"></div>
        <div className="absolute -right-40 -top-40 w-150 h-150 bg-blue-50 rounded-full blur-3xl opacity-40 mix-blend-multiply"></div>
        <div className="absolute -left-40 -bottom-40 w-150 h-150 bg-orange-50 rounded-full blur-3xl opacity-40 mix-blend-multiply"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 tracking-tight">Ready to <span className="text-orange-500">Upgrade?</span></h2>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto font-light">Explore our latest collection of premium devices and find the perfect match for you today.</p>
            <Link to="/products">
              <Button className="h-16 px-12 text-xl rounded-full shadow-2xl shadow-orange-500/30 bg-linear-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white border-0 transition-all duration-300 hover:scale-105 active:scale-95 group relative overflow-hidden">
                 <span className="relative z-10 flex items-center">
                    Browse Products <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={24}/>
                 </span>
                 <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default About
