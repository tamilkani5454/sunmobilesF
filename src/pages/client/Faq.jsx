import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, Search, ArrowRight } from 'lucide-react';

const FaqItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <motion.div 
      initial={false}
      className={`border rounded-2xl overflow-hidden mb-4 transition-all duration-300 ${isOpen ? 'border-orange-400/30 bg-white shadow-lg shadow-orange-500/5 ring-1 ring-orange-100' : 'border-gray-100 bg-white hover:border-orange-200 hover:shadow-md'}`}
    >
      <button
        onClick={onClick}
        className="flex items-center justify-between w-full p-6 text-left focus:outline-none"
      >
        <span className={`font-bold text-lg transition-colors ${isOpen ? 'text-orange-600' : 'text-gray-800'}`}>
          {question}
        </span>
        <span className={`p-2 rounded-full transition-all duration-300 ${isOpen ? 'bg-orange-500 text-white rotate-180' : 'bg-gray-50 text-gray-400 group-hover:bg-orange-50 group-hover:text-orange-500'}`}>
          <ChevronDown size={20} />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto", marginTop: 0 },
              collapsed: { opacity: 0, height: 0, marginTop: -10 }
            }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <div className="px-6 pb-6 pt-0 text-gray-600 leading-relaxed border-t border-dashed border-gray-100 mt-2">
              <div className="pt-4">{answer}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const faqs = [
    {
      category: "Warranty & Support",
      items: [
        {
          question: "Do you offer warranty on products?",
          answer: "Yes, all our products come with a standard 1-year manufacturer warranty. Some premium devices may have extended warranty options available at checkout."
        },
        {
          question: "Are your products 100% genuine?",
          answer: "Absolutely! We guarantee that all products sold on Sun Mobiles are 100% original and sourced directly from authorized brands and manufacturers."
        }
      ]
    },
    {
       category: "Shipping & Returns",
       items: [
        {
            question: "What is your return policy?",
            answer: "We offer a 7-day hassle-free return policy for all unused items in their original packaging. If you receive a defective product, we provide an immediate replacement or full refund."
        },
        {
            question: "How long does shipping take?",
            answer: "Standard shipping takes 3-5 business days depending on your location. We also offer Express Shipping (1-2 days) for select pin codes."
        },
        {
            question: "Can I track my order?",
            answer: "Yes, once your order is shipped, you will receive a tracking ID via SMS and email. You can also track your order status in the 'My Account' section."
        }
       ]
    },
    {
        category: "Payment & Finance",
        items: [
            {
                question: "Do you offer EMI options?",
                answer: "Yes, we support No Cost EMI on major credit cards and Bajaj Finserv EMI cards for orders above ₹5,000."
            }
        ]
    }
  ];

  const filteredFaqs = faqs.map(category => ({
    ...category,
    items: category.items.filter(item => 
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  return (
    <div className="min-h-screen bg-gray-50 py-20">
       {/* Hero Search */}
       <div className="bg-gray-900 text-white py-24 mb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
         <div className="container mx-auto px-4 text-center relative z-10">
           <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="text-4xl md:text-5xl font-bold mb-6"
           >
             How can we <span className="text-orange-500">help?</span>
           </motion.h1>
           
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="max-w-xl mx-auto relative"
           >
             <input 
               type="text" 
               placeholder="Search for answers..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full pl-12 pr-4 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-4 focus:ring-orange-500/30 shadow-2xl text-lg"
             />
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
           </motion.div>
         </div>
       </div>

      <div className="container mx-auto px-4 max-w-4xl">
        {filteredFaqs.length > 0 ? (
            filteredFaqs.map((category, catIndex) => (
                <div key={catIndex} className="mb-12">
                    <motion.h3 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2"
                    >
                        <span className="w-1 h-6 bg-orange-500 rounded-full"></span>
                        {category.category}
                    </motion.h3>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ staggerChildren: 0.1 }}
                    >
                        {category.items.map((faq, index) => {
                            const globalIndex = `${catIndex}-${index}`;
                            return (
                                <FaqItem
                                    key={globalIndex}
                                    question={faq.question}
                                    answer={faq.answer}
                                    isOpen={openIndex === globalIndex}
                                    onClick={() => setOpenIndex(openIndex === globalIndex ? null : globalIndex)}
                                />
                            );
                        })}
                    </motion.div>
                </div>
            ))
        ) : (
            <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No results found for "{searchTerm}"</p>
                <button 
                  onClick={() => setSearchTerm('')}
                  className="mt-4 text-orange-600 font-medium hover:underline"
                >
                  Clear search
                </button>
            </div>
        )}
        
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-10 text-white text-center relative overflow-hidden shadow-xl">
             <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -mr-20 -mt-20"></div>
             <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
                <p className="text-blue-100 mb-8 max-w-xl mx-auto text-lg">Can't find the answer you're looking for? Please chat to our friendly team.</p>
                <a href="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                    Contact Support <ArrowRight className="ml-2" size={20} />
                </a>
             </div>
        </div>
      </div>
    </div>
  )
}

export default Faq
