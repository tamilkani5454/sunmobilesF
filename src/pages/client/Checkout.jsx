import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle, CreditCard, Truck, AlertCircle, ArrowLeft, ShieldCheck } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { appContext } from '../../context/Context'
import toast from 'react-hot-toast'


const Checkout = () => {
    const { cart, URL, setCart } = useContext(appContext)
    const [paymentMethod, setPaymentMethod] = useState(null)
    // Calculate totals
    const subtotal = cart.reduce((acc, item) => acc + (item.offerPrice * item.quantity), 0)
    const shipping = subtotal > 500 ? 0 : 50
    const total = subtotal + shipping
    const [step, setStep] = useState(1) // 1: Shipping, 2: Payment, 3: Success
    const [loading, setLoading] = useState(false)
    const [orderId, setOrderId] = useState("")
    const [address, setAddress] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        address: "",
        city: "",
        state: "",
        pincode: "",

    })
    // Razorpay popup open function
    const payment = async (amount, order_id, key) => {
        try {
            setLoading(true)
            const res = await fetch(`${URL}/payment/create-payment`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: amount }),
            });
            const order = await res.json();
            const options = {
                key: key, // Razorpay key_id
                amount: order.order.amount, // paisa
                currency: "INR",
                order_id: order.order.id, // 🔥 important
                handler: async function (response) {
                    // payment success -> verify pannuvom
                    const verifyRes = await fetch(
                        `${URL}/payment/verify-payment`,
                        {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ response, order_id }),
                        }
                    );

                    const verifyData = await verifyRes.json();
                    console.log(verifyData)
                    if (verifyData.success) {
                        toast.success(verifyData.message)
                        setStep(3)
                        localStorage.removeItem("cart")
                        setCart([])
                        return
                    }
                },
                prefill: {
                    name: "Sun Mobiless",
                    email: "sunmobiles@gmail.com",
                    contact: "6382953195",
                },
            };

            const rzp1 = new window.Razorpay(options);
            rzp1.open();
        } finally {
            setLoading(false)
        }

    };

    // Place order + create razorpay order
    const handlePlaceOrder = async () => {
        try {
            setLoading(true);
            const url = URL + "/uploads/add-orders";
            const res = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    shippingAddress: address,
                    cart: cart,
                    paymentMethod: paymentMethod,
                }),
            });
            const data = await res.json();
            if (data.success) {
                setOrderId(data.order_id)
                if (paymentMethod === "PAS") {
                    setStep(3)
                    localStorage.clear("cart")
                    setCart([])
                    return

                }
            }
            // 🔥 direct values pass 
            payment(data.amount, data.order_id, data.key);
        } finally {
            setLoading(false);
        }
    };


    if (step === 3) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center max-w-lg w-full"
                >
                    <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle size={40} strokeWidth={3} />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
                    <p className="text-gray-500 mb-8">Thank you for your purchase. Your order has been successfully placed.</p>

                    <div className="bg-gray-50 rounded-xl p-4 mb-8 text-left">
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-500">Order ID:</span>
                            <span className="font-mono font-medium text-gray-900">{orderId}</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <Link to="/products">
                            <Button className="w-full bg-gray-900 hover:bg-black rounded-xl py-6">Continue Shopping</Button>
                        </Link>
                        <Link to="/">
                            <Button variant="outline" className="w-full rounded-xl py-6">Back to Home</Button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        )
    }
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-24 md:pb-20 pt-8 md:pt-10">
            <div className="container mx-auto px-4 max-w-6xl">
                <Link to="/cart" className="inline-flex items-center text-gray-500 hover:text-orange-600 mb-6 md:mb-8 transition-colors text-sm font-medium">
                    <ArrowLeft size={16} className="mr-2" /> Back to Cart
                </Link>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column: Forms */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Steps Indicator */}
                        <div className="flex items-center gap-4 mb-6 md:mb-8 overflow-x-auto pb-2">
                            <div className={`flex items-center gap-2 whitespace-nowrap ${step >= 1 ? 'text-orange-600' : 'text-gray-400'}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 font-bold shrink-0 ${step >= 1 ? 'border-orange-600 bg-orange-50' : 'border-gray-200'}`}>1</div>
                                <span className="font-medium text-sm md:text-base">Shipping</span>
                            </div>
                            <div className="w-8 md:w-12 h-0.5 bg-gray-200 shrink-0"></div>
                            <div className={`flex items-center gap-2 whitespace-nowrap ${step >= 2 ? 'text-orange-600' : 'text-gray-400'}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 font-bold shrink-0 ${step >= 2 ? 'border-orange-600 bg-orange-50' : 'border-gray-200'}`}>2</div>
                                <span className="font-medium text-sm md:text-base">Payment</span>
                            </div>
                        </div>

                        {step === 1 ? (
                            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 md:p-8">
                                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2"><Truck size={22} className="text-orange-500" /> Shipping Address</h2>
                                    <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">First Name</label>
                                            <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors" placeholder="John" onChange={(e) => setAddress({ ...address, firstName: e.target.value })} />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">Last Name</label>
                                            <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors" placeholder="Doe" onChange={(e) => setAddress({ ...address, lastName: e.target.value })} />
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <label className="text-sm font-medium text-gray-700">Phone Number</label>
                                            <input type="number" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors" placeholder="9876543210" onChange={(e) => setAddress({ ...address, phoneNumber: e.target.value })} />
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <label className="text-sm font-medium text-gray-700">Email Address</label>
                                            <input type="email" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors" placeholder="john@example.com" onChange={(e) => setAddress({ ...address, email: e.target.value })} />
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <label className="text-sm font-medium text-gray-700">Street Address</label>
                                            <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors" placeholder="1/13,midddle street,sendurai" onChange={(e) => setAddress({ ...address, address: e.target.value })} />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">City</label>
                                            <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors" placeholder="sendurai" onChange={(e) => setAddress({ ...address, city: e.target.value })} />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">State</label>
                                            <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors" placeholder="TamilNadu" onChange={(e) => setAddress({ ...address, state: e.target.value })} />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">Postal Code</label>
                                            <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors" placeholder="621714" onChange={(e) => setAddress({ ...address, pincode: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className="mt-8 justify-end hidden md:flex">
                                        <Button onClick={() => {

                                            if (!address.address || !address.city || !address.email || !address.firstName || !address.lastName || !address.phoneNumber || !address.pincode || !address.state) {
                                                toast.error("Please fill all the fields");
                                                return;
                                            }
                                            setStep(2);

                                        }}
                                            size="lg" className="bg-orange-600 hover:bg-orange-700 text-white rounded-xl px-8">
                                            Continue to Payment
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 md:p-8">
                                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2"><CreditCard size={22} className="text-blue-600" /> Payment Method</h2>

                                    <div className="space-y-4">
                                        <label className="flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all hover:bg-gray-50 border-orange-200 bg-orange-50/30">
                                            <input type="radio" name="payment" defaultChecked className="w-5 h-5 text-orange-600 accent-orange-600" onClick={() => setPaymentMethod("Online")} />
                                            <div className="flex-1">
                                                <span className="font-bold text-gray-900 block text-sm md:text-base">Online Payment</span>
                                                <span className="text-xs md:text-sm text-gray-500">Pay using Credit/Debit Card/UPI </span>
                                            </div>
                                            <div className="flex gap-1 md:gap-2">
                                                <div className="w-6 md:w-8 h-4 md:h-5 bg-gray-200 rounded"></div>
                                                <div className="w-6 md:w-8 h-4 md:h-5 bg-gray-200 rounded"></div>
                                            </div>
                                        </label>
                                        <label className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl cursor-pointer transition-all hover:bg-gray-50">
                                            <input type="radio" name="payment" className="w-5 h-5 text-orange-600 accent-orange-600" onClick={() => setPaymentMethod("PAS")} />
                                            <div className="flex-1">
                                                <span className="font-bold text-gray-900 block text-sm md:text-base">Store Pickup</span>
                                                <span className="text-xs md:text-sm text-gray-500">Collect from store & Pay at Store</span>
                                            </div>
                                        </label>
                                    </div>

                                    <div className="mt-8 flex justify-between md:flex">
                                        <Button variant="ghost" onClick={() => setStep(1)}>
                                            Back
                                        </Button>
                                        <Button onClick={handlePlaceOrder} size="lg" className="bg-gray-900 hover:bg-black text-white rounded-xl px-12 py-6 relative overflow-hidden" disabled={loading}>
                                            {loading ? <span className="animate-pulse">Processing...</span> : "Place Order"}
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Right Column: Order Summary (Sticky) */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
                            <div className="space-y-4 mb-6 text-sm">
                                {cart.map((item, index) =>
                                    <div key={index} className="flex justify-between text-gray-600">
                                        <span>{item.name} {`(x${item.quantity})`}</span>
                                        <span>₹{(item.offerPrice * item.quantity).toLocaleString()}</span>
                                    </div>
                                )}
                                <div className="border-t border-dashed border-gray-200 pt-4 mt-4">
                                    <div className="flex justify-between text-sm mb-2 text-gray-600">
                                        <span>Subtotal</span>
                                        <span>₹{subtotal.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm mb-2 text-gray-600">
                                        <span>Shipping</span>
                                        <span className={shipping === 0 ? "text-green-600" : ""}>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
                                    </div>
                                    <div className="flex justify-between items-center mt-4">
                                        <span className="text-lg font-bold text-gray-900">Total</span>
                                        <span className="text-2xl font-bold text-orange-600">₹{total.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-blue-50 p-4 rounded-xl flex gap-3 text-blue-800 text-sm">
                                <ShieldCheck className="shrink-0" size={20} />
                                <p>Your payment information is encrypted and secure.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Sticky Bottom Action Bar */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 md:hidden z-40 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                {step === 1 ? (
                    <Button onClick={() => {
                        if (!address.address || !address.city || !address.email || !address.firstName || !address.lastName || !address.phoneNumber || !address.pincode || !address.state) {
                            toast.error("Please fill all the fields");
                            return;
                        }
                        setStep(2)
                    }} className="w-full bg-orange-600 hover:bg-orange-700 text-white rounded-xl h-12 shadow-lg shadow-orange-600/20 text-lg">
                        Continue to Payment
                    </Button>
                ) : (
                    <Button onClick={handlePlaceOrder} className="w-full bg-gray-900 hover:bg-black text-white rounded-xl h-12 shadow-lg shadow-gray-900/20 text-lg" disabled={loading}>
                        {loading ? "Processing..." : `Place Order • ₹${total.toLocaleString()}`}
                    </Button>
                )}
            </div>
        </div>
    )
}

export default Checkout
