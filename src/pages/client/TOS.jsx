import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Smartphone, DollarSign, Scale, RefreshCw } from 'lucide-react';

const TOS = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gray-900 text-white py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-[128px] opacity-20 -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600 rounded-full blur-[96px] opacity-20 -ml-10 -mb-10"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-400 border border-white/10"
          >
              <FileText size={32} />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Terms of Service
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Please read these terms carefully before using our services.
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
          <div className="prose prose-blue max-w-none text-gray-600">
             <p className="lead text-lg mb-8 font-medium text-gray-700">
              Welcome to Sun Mobiles. By accessing or using our website, you agree to be bound by these Terms of Service and all applicable laws and regulations.
            </p>

            <div className="space-y-12">
                <section>
                    <div className="flex items-center gap-3 mb-4">
                        <span className="p-2 bg-gray-100 rounded-lg text-gray-600"><Smartphone size={20} /></span>
                        <h3 className="text-xl font-bold text-gray-900 m-0">1. Use License</h3>
                    </div>
                    <p className="pl-12">
                    Permission is granted to temporarily download one copy of the materials (information or software) on Sun Mobiles' website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
                    </p>
                </section>

                <section>
                     <div className="flex items-center gap-3 mb-4">
                        <span className="p-2 bg-gray-100 rounded-lg text-gray-600"><FileText size={20} /></span>
                        <h3 className="text-xl font-bold text-gray-900 m-0">2. Product Descriptions</h3>
                    </div>
                    <p className="pl-12">
                    We attempt to be as accurate as possible. However, we do not warrant that product descriptions or other content of this site is accurate, complete, reliable, current, or error-free. If a product offered by us is not as described, your sole remedy is to return it in unused condition.
                    </p>
                </section>

                <section>
                    <div className="flex items-center gap-3 mb-4">
                        <span className="p-2 bg-gray-100 rounded-lg text-gray-600"><DollarSign size={20} /></span>
                        <h3 className="text-xl font-bold text-gray-900 m-0">3. Pricing</h3>
                    </div>
                    <p className="pl-12">
                    Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time.
                    </p>
                </section>

                <section>
                    <div className="flex items-center gap-3 mb-4">
                        <span className="p-2 bg-gray-100 rounded-lg text-gray-600"><Scale size={20} /></span>
                        <h3 className="text-xl font-bold text-gray-900 m-0">4. Governing Law</h3>
                    </div>
                    <p className="pl-12">
                    These terms and conditions are governed by and construed in accordance with the laws of India and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
                    </p>
                </section>
                
                <section>
                    <div className="flex items-center gap-3 mb-4">
                        <span className="p-2 bg-gray-100 rounded-lg text-gray-600"><RefreshCw size={20} /></span>
                        <h3 className="text-xl font-bold text-gray-900 m-0">5. Changes to Terms</h3>
                    </div>
                    <p className="pl-12">
                    We reserve the right, at our sole discretion, to update, change or replace any part of these Terms of Service by posting updates and changes to our website. It is your responsibility to check our website periodically for changes.
                    </p>
                </section>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default TOS
