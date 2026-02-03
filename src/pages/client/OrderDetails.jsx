import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
    ChevronLeft, Package, Truck, CheckCircle, MapPin, CreditCard, 
    Download, Clock, ShieldCheck, Mail, Phone, User
} from 'lucide-react'

const OrderDetails = () => {
    const { id } = useParams()

    // Mock Data - In a real app, fetch based on 'id'
    const order = {
        id: id || "SUN-88294",
        date: "Jan 25, 2026",
        status: "Processing",
        timeline: [
            { status: "Order Placed", date: "Jan 25, 10:30 AM", completed: true },
            { status: "Processing", date: "Jan 25, 2:00 PM", completed: true },
            { status: "Shipped", date: "Expected Jan 26", completed: false },
            { status: "Delivered", date: "Expected Jan 28", completed: false },
        ],
        items: [
            {
                id: 1,
                name: "Sun X Pro 5G",
                variant: "Midnight Black, 256GB",
                price: 29999,
                quantity: 1,
                image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=200&auto=format&fit=crop"
            },
            {
                id: 2,
                name: "Redmi Note 13",
                variant: "Ocean Blue, 128GB",
                price: 9999,
                quantity: 2,
                image: "https://images.unsplash.com/photo-1598327105666-5b89351aff23?q=80&w=200&auto=format&fit=crop"
            }
        ],
        shippingAddress: {
            name: "Alex Morgan",
            street: "123, Tech Park Avenue, Silicon Valley",
            city: "Bangalore",
            state: "Karnataka",
            zip: "560001",
            phone: "+91 98765 43210"
        },
        payment: {
            method: "Credit Card",
            last4: "4242",
            status: "Paid"
        },
        summary: {
            subtotal: 49997,
            shipping: 0,
            tax: 8999, // Included in total usually, but showing breakdown
            total: 49997
        }
    }

    return (
        <div className="min-h-screen bg-gray-50/50 py-12">
            <div className="container mx-auto px-4 max-w-5xl">
                {/* Header Navigation */}
                <div className="mb-6 md:mb-8">
                    <Link to="/orders" className="inline-flex items-center text-sm md:text-base text-gray-500 hover:text-orange-600 font-medium transition-colors mb-4">
                        <ChevronLeft size={16} className="mr-1 md:w-5 md:h-5" /> Back to Orders
                    </Link>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex flex-wrap items-center gap-2 md:gap-3">
                                Order Details
                                <span className={`px-2.5 py-1 rounded-full text-xs md:text-base font-bold uppercase tracking-wider border ${
                                    order.status === 'Delivered' ? 'bg-green-50 text-green-700 border-green-100' : 
                                    order.status === 'Processing' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                    'bg-gray-100 text-gray-600 border-gray-200'
                                }`}>
                                    {order.status}
                                </span>
                            </h1>
                            <p className="text-xs md:text-base text-gray-500 mt-1">Order ID: <span className="font-mono font-medium text-gray-700">#{order.id}</span> • Placed on {order.date}</p>
                        </div>
                        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm md:text-base font-medium rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
                            <Download size={16} className="md:w-[18px] md:h-[18px]" /> Download Invoice
                        </button>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
                    {/* Left Column - Main Details */}
                    <div className="lg:col-span-2 space-y-6">
                        
                        {/* Order Timeline */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 md:p-8">
                            <h3 className="font-bold text-base md:text-lg text-gray-900 mb-6 md:mb-8 border-b border-gray-50 pb-4">Order Status</h3>
                            <div className="relative">
                                {/* Connector Line */}
                                <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-gray-100 md:hidden"></div>
                                <div className="absolute top-4 left-4 right-4 h-0.5 bg-gray-100 hidden md:block"></div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4 relative z-10">
                                    {order.timeline.map((step, idx) => (
                                        <div key={idx} className="flex md:flex-col items-center md:text-center gap-4 md:gap-2">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border-2 transition-colors duration-300 ${
                                                step.completed 
                                                    ? 'bg-green-600 border-green-600 text-white' 
                                                    : idx === 1 && order.status === 'Processing' ? 'bg-blue-600 border-blue-600 text-white animate-pulse' // Current active step (simplified logic)
                                                    : 'bg-white border-gray-200 text-gray-300'
                                            }`}>
                                                {step.completed ? <CheckCircle size={14} className="md:w-4 md:h-4" /> : <div className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-current" />}
                                            </div>
                                            <div className="flex-1 md:flex-none">
                                                <p className={`text-sm font-bold ${step.completed ? 'text-gray-900' : 'text-gray-500'}`}>{step.status}</p>
                                                <p className="text-xs text-gray-400">{step.date}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Order Items */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <h3 className="font-bold text-base md:text-lg text-gray-900 p-5 md:p-6 border-b border-gray-50">Items in Your Order</h3>
                            <div className="divide-y divide-gray-50">
                                {order.items.map((item) => (
                                    <div key={item.id} className="p-5 md:p-6 flex flex-col md:flex-row gap-4 md:gap-6 items-center">
                                        <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 text-center md:text-left">
                                            <h4 className="font-bold text-sm md:text-base text-gray-900 mb-1">{item.name}</h4>
                                            <p className="text-xs md:text-sm text-gray-500 mb-2">{item.variant}</p>
                                            <div className="inline-flex items-center px-2 py-0.5 bg-gray-50 text-gray-600 text-[10px] md:text-xs font-semibold rounded-md border border-gray-100">
                                                Qty: {item.quantity}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-base md:text-lg text-gray-900">₹{item.price.toLocaleString()}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Payment & Shipping Grids for Mobile/Desktop */}
                         <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 md:p-6">
                                <h3 className="font-bold text-sm md:text-base text-gray-900 mb-3 md:mb-4 flex items-center gap-2">
                                    <MapPin size={18} className="text-orange-500 md:w-5 md:h-5" /> Shipping Address
                                </h3>
                                <div className="space-y-1 text-xs md:text-sm text-gray-600">
                                    <p className="font-bold text-gray-900 text-sm md:text-base mb-1">{order.shippingAddress.name}</p>
                                    <p>{order.shippingAddress.street}</p>
                                    <p>{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.zip}</p>
                                    <p className="pt-2 flex items-center gap-2"><Phone size={12} className="md:w-[14px] md:h-[14px]" /> {order.shippingAddress.phone}</p>
                                </div>
                            </div>
                            
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 md:p-6">
                                <h3 className="font-bold text-sm md:text-base text-gray-900 mb-3 md:mb-4 flex items-center gap-2">
                                    <CreditCard size={18} className="text-orange-500 md:w-5 md:h-5" /> Payment Info
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-5 md:w-10 md:h-6 bg-blue-900 rounded-md"></div> {/* Mock Visa/Mastercard Icon */}
                                        <p className="font-medium text-sm md:text-base text-gray-900">Ending in {order.payment.last4}</p>
                                    </div>
                                    <p className="text-xs md:text-sm text-gray-500">Payment Method: {order.payment.method}</p>
                                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-green-50 text-green-700 text-[10px] md:text-xs font-bold border border-green-100">
                                        <CheckCircle size={10} className="md:w-3 md:h-3" /> Payment Verified
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Right Column - Summary & Help */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 md:p-6 sticky top-24">
                            <h3 className="font-bold text-base md:text-lg text-gray-900 mb-4 md:mb-6">Order Summary</h3>
                            <div className="space-y-3 md:space-y-4 mb-4 md:mb-6 pb-4 md:pb-6 border-b border-gray-50">
                                <div className="flex justify-between text-xs md:text-sm text-gray-600">
                                    <span>Subtotal</span>
                                    <span className="font-medium text-gray-900">₹{order.summary.subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-xs md:text-sm text-gray-600">
                                    <span>Shipping</span>
                                    <span className="text-green-600 font-medium">Free</span>
                                </div>
                                <div className="flex justify-between text-xs md:text-sm text-gray-600">
                                    <span>Tax estimate</span>
                                    <span className="font-medium text-gray-900">₹{order.summary.tax.toLocaleString()}</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center mb-4 md:mb-6">
                                <span className="font-bold text-gray-900 text-base md:text-lg">Order Total</span>
                                <span className="font-bold text-orange-600 text-lg md:text-xl">₹{order.summary.total.toLocaleString()}</span>
                            </div>
                            <div className="bg-blue-50 rounded-xl p-3 md:p-4 flex items-start gap-3">
                                <ShieldCheck className="text-blue-600 flex-shrink-0 w-4 h-4 md:w-5 md:h-5" />
                                <div>
                                    <p className="text-xs md:text-sm font-bold text-blue-800 mb-0.5">Secure Transaction</p>
                                    <p className="text-[10px] md:text-xs text-blue-600 leading-relaxed">Your payment information is encrypted and secure.</p>
                                </div>
                            </div>
                        </div>

                         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 md:p-6">
                            <h3 className="font-bold text-sm md:text-base text-gray-900 mb-4">Need Help with this Order?</h3>
                            <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 text-sm md:text-base font-medium rounded-xl hover:bg-gray-50 transition-colors mb-3">
                                <Mail size={16} className="md:w-[18px] md:h-[18px]" /> Contact Support
                            </button>
                             <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 text-sm md:text-base font-medium rounded-xl hover:bg-gray-50 transition-colors">
                                <Package size={16} className="md:w-[18px] md:h-[18px]" /> Return Items
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderDetails
