import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from 'lucide-react';
import { Button } from '../../components/ui/button';

const Contact = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: "Phone Support",
      details: "+91 98765 43210",
      sub: "Mon-Sat 9am to 6pm",
      color: "bg-blue-50 text-blue-600",
      cta: "Call Now"
    },
    {
      icon: Mail,
      title: "Email Us",
      details: "support@sunmobiles.com",
      sub: "We reply within 24 hours",
      color: "bg-orange-50 text-orange-600",
      cta: "Send Email"
    },
    {
      icon: MapPin,
      title: "Visit Store",
      details: "Sun Mobiles, Ariyalur Road",
      sub: "Sendurai, Tamil Nadu - 621714",
      color: "bg-green-50 text-green-600",
      cta: "Get Directions"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-12 overflow-hidden">
      {/* Header */}
      <div className="bg-gray-900 text-white py-16 mb-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20">
             <div className="absolute -top-[50%] -left-[20%] w-[80%] h-[200%] bg-gradient-to-tr from-orange-500/30 to-transparent rounded-full blur-3xl"></div>
             <div className="absolute top-[20%] right-[10%] w-[30%] h-[100%] bg-gradient-to-bl from-blue-500/30 to-transparent rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.5 }}
             className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-6 text-orange-500 border border-white/10"
          >
              <MessageSquare size={32} />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-6 tracking-tight"
          >
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Touch</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-300 text-lg max-w-2xl mx-auto font-light leading-relaxed"
          >
            Have a question about our products or services? We're here to help. Reach out to us through any of the channels below.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Contact Info Cards */}
          <div className="space-y-6 lg:col-span-1">
            {contactInfo.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100/80 hover:shadow-xl transition-all duration-300 group cursor-pointer"
              >
                <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-xl ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon size={24} />
                    </div>
                    <div>
                    <h3 className="font-bold text-gray-900 group-hover:text-orange-600 transition-colors">{item.title}</h3>
                    <p className="text-gray-600 font-medium mt-1">{item.details}</p>
                    <p className="text-sm text-gray-400 mt-1">{item.sub}</p>
                    <div className="mt-3 text-sm font-semibold text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                        {item.cta} <span className="text-xs">→</span>
                    </div>
                    </div>
                </div>
              </motion.div>
            ))}
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-900 p-8 rounded-2xl text-white shadow-xl overflow-hidden relative border border-gray-800"
            >
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4 text-orange-500">
                    <Clock size={20} />
                    <h3 className="text-lg font-bold">Business Hours</h3>
                </div>
                <div className="space-y-3 text-gray-300 text-sm">
                  <div className="flex justify-between items-center border-b border-gray-800 pb-2 border-dashed">
                    <span>Monday - Friday</span>
                    <span className="bg-white/10 px-2 py-1 rounded text-xs">9:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-800 pb-2 border-dashed">
                    <span>Saturday</span>
                    <span className="bg-white/10 px-2 py-1 rounded text-xs">10:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center text-orange-400 font-medium">
                    <span>Sunday</span>
                    <span className="bg-orange-500/20 px-2 py-1 rounded text-xs">Closed</span>
                  </div>
                </div>
              </div>
              <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-orange-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10 lg:col-span-2 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-50 to-transparent rounded-full blur-3xl -mr-20 -mt-20 opacity-60"></div>
            
            <div className="mb-8 relative z-10">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Send us a Message</h2>
                <p className="text-gray-500">Fill out the form below and we'll get back to you shortly.</p>
            </div>
            
            <form className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">First Name</label>
                  <input type="text" className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all duration-300" placeholder="John" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Last Name</label>
                  <input type="text" className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all duration-300" placeholder="Doe" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Email Address</label>
                  <input type="email" className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all duration-300" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Phone Number</label>
                  <input type="tel" className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all duration-300" placeholder="+91 98765 43210" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Message</label>
                <textarea rows="4" className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all duration-300 resize-none" placeholder="How can we help you?"></textarea>
              </div>

              <div className="pt-4">
                <Button className="w-full h-14 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white rounded-xl shadow-lg shadow-orange-500/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 text-lg font-bold tracking-wide">
                  Send Message <Send size={20} />
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Contact
