import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gray-900 text-white py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500 rounded-full blur-[128px] opacity-20 -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600 rounded-full blur-[96px] opacity-20 -ml-10 -mb-10"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-6 text-orange-400 border border-white/10"
          >
              <Lock size={32} />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Privacy Policy
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            We value your trust and are committed to protecting your personal data.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-8 text-sm text-gray-500 bg-gray-800/50 inline-block px-4 py-1.5 rounded-full border border-gray-700"
          >
            Last updated: {new Date().toLocaleDateString()}
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl -mt-10 relative z-20 pb-20">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12"
        >
          
          <div className="prose prose-orange max-w-none text-gray-600">
            <p className="lead text-lg mb-8 font-medium text-gray-700">
              At Sun Mobiles, we value your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you visit our website.
            </p>

            <div className="flex items-start gap-4 mt-8 mb-4">
                <div className="p-2 bg-orange-100 rounded-lg text-orange-600 mt-1"><Eye size={20} /></div>
                <div>
                    <h3 className="text-xl font-bold text-gray-900 m-0">1. Information We Collect</h3>
                </div>
            </div>
            <p>
              We collect information that you strictly provide to us, such as when you create an account, make a purchase, or sign up for our newsletter. This includes:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 marker:text-orange-500">
              <li>Personal identification information (Name, email address, phone number, etc.)</li>
              <li>Shipping and billing addresses</li>
              <li>Payment details (processed securely by third-party payment gateways)</li>
            </ul>

            <div className="flex items-start gap-4 mt-8 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg text-blue-600 mt-1"><FileText size={20} /></div>
                <div>
                    <h3 className="text-xl font-bold text-gray-900 m-0">2. How We Use Your Information</h3>
                </div>
            </div>
            <p>
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 marker:text-blue-500">
              <li>Process and fulfill your orders</li>
              <li>Communicate with you regarding your order status</li>
              <li>Send you promotional offers and newsletters (if subscribed)</li>
              <li>Improve our website and customer service</li>
            </ul>

            <div className="flex items-start gap-4 mt-8 mb-4">
                <div className="p-2 bg-green-100 rounded-lg text-green-600 mt-1"><Shield size={20} /></div>
                <div>
                     <h3 className="text-xl font-bold text-gray-900 m-0">3. Data Security</h3>
                </div>
            </div>
            <p>
              We implement appropriate technical and organizational security measures to protect your data from unauthorized access, loss, or misuse. We use SSL encryption to ensure secure data transmission.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4 pl-12">4. Sharing Your Information</h3>
            <p className="pl-12">
              We do not sell or rent your personal information to third parties. We may share your data with trusted service providers who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep this information confidential.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4 pl-12">5. Contact Us</h3>
            <p className="pl-12">
              If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@sunmobiles.com" className="text-orange-600 hover:text-orange-700 font-semibold no-underline border-b border-orange-200 hover:border-orange-600 transition-colors">privacy@sunmobiles.com</a>.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default PrivacyPolicy
