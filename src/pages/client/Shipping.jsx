import React from 'react';
import { motion } from 'framer-motion';
import { Truck, RefreshCw, Box, AlertCircle } from 'lucide-react';

const Shipping = () => {
  return (
    <div className="min-h-screen bg-gray-50">
       {/* Hero Section */}
       <div className="bg-gray-900 text-white py-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-green-500 rounded-full blur-[128px] opacity-20 -ml-20 -mt-20"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-orange-600 rounded-full blur-[96px] opacity-20 -mr-10 -mb-10"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-6 text-green-400 border border-white/10"
          >
              <Truck size={32} />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Shipping & Returns
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Information on delivery timelines, charges, and our return policy.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl -mt-10 relative z-20 pb-20">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12 space-y-12"
        >
          <section>
             <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <Truck className="text-orange-500" size={28} />
                <h2 className="text-2xl font-bold text-gray-900 m-0">Shipping Policy</h2>
             </div>
            <p className="text-gray-600 mb-6 text-lg">
              At Sun Mobiles, we strive to deliver your products as quickly and safely as possible.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                     <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2"><MapPinIcon size={18} className="text-gray-400" /> Delivery Areas</h3>
                     <p className="text-gray-600">
                     We deliver to over 15,000 pin codes across India. You can check the availability of delivery to your area by entering your pin code on the product page.
                    </p>
                </div>
                 <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                     <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2"><ClockIcon size={18} className="text-gray-400" /> Delivery Timelines</h3>
                    <ul className="space-y-2 text-gray-600">
                        <li className="flex justify-between"><span>Metro Cities:</span> <span className="font-semibold text-gray-900">2-4 business days</span></li>
                        <li className="flex justify-between"><span>Rest of India:</span> <span className="font-semibold text-gray-900">4-7 business days</span></li>
                        <li className="flex justify-between"><span>Remote Areas:</span> <span className="font-semibold text-gray-900">7-10 business days</span></li>
                    </ul>
                </div>
            </div>

            <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-100 flex gap-4 text-green-800">
                <DollarSignIcon size={24} className="shrink-0 mt-1" />
                <p>
                    We offer <strong className="text-green-700">FREE Shipping</strong> on all prepaid orders above ₹500. For orders below ₹500 or COD orders, a nominal shipping fee of ₹50 will be applicable.
                </p>
            </div>
            
          </section>

          <section>
             <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <RefreshCw className="text-blue-600" size={28} />
                <h2 className="text-2xl font-bold text-gray-900 m-0">Return & Refund Policy</h2>
             </div>
             <p className="text-gray-600 mb-6 text-lg">
              We want you to be completely satisfied with your purchase. If you are not happy with your product, we are here to help.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-blue-50/50 rounded-2xl">
                    <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">7</div>
                    <h4 className="font-bold text-gray-900">7 Days Return</h4>
                    <p className="text-sm text-gray-500 mt-1">Hassle-free return window</p>
                </div>
                 <div className="text-center p-6 bg-blue-50/50 rounded-2xl">
                    <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3"><Box size={20} /></div>
                    <h4 className="font-bold text-gray-900">Original Condition</h4>
                    <p className="text-sm text-gray-500 mt-1">Unused with tags intact</p>
                </div>
                 <div className="text-center p-6 bg-blue-50/50 rounded-2xl">
                    <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3"><RefreshCw size={20} /></div>
                    <h4 className="font-bold text-gray-900">Fast Refund</h4>
                    <p className="text-sm text-gray-500 mt-1">Processed in 5-7 days</p>
                </div>
            </div>
            
            <div className="mt-8">
                 <h3 className="text-xl font-bold text-gray-900 mb-3">Refund Process</h3>
                <p className="text-gray-600 leading-relaxed">
                Once your return is received and inspected, we will notify you of the approval or rejection of your refund. If approved, your refund will be processed to your original payment method within 5-7 business days.
                </p>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  )
}

// Icons for internal use
const MapPinIcon = ({ className, size }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
)
const ClockIcon = ({ className, size }) => (
     <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
)
const DollarSignIcon = ({ className, size }) => (
     <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
)

export default Shipping
