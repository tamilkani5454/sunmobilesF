import { useContext, useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '../../components/ui/button'
import { Lock, ArrowLeft, ShieldCheck, BarChart3, Users } from 'lucide-react'
import { appContext } from '../../context/Context'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import AdminCheck from '../../context/AdminCheck'

const AdminLogin = () => {

    const { isAdmin } = AdminCheck()
    const navigate = useNavigate()
    const { URL } = useContext(appContext)
    useEffect(() => {
        if (isAdmin) {
            navigate("/admin/dashboard");
        }
    }, [isAdmin]);
    const [admin, setAdmin] = useState({
        email: "",
        password: ""
    })
    const handleSubmit = async () => {
        const res = await fetch(URL + "/register/admin-login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(admin)
        })
        const data = await res.json()
        console.log(data)
        if (data.success) {
            localStorage.setItem("adminToken", data.token)
            toast.success(data.message)
            navigate("/admin/dashboard")

        }
        if (!data.success) {
            toast.error(data.message)
        }
    }
    return (
        <div className="min-h-screen bg-white flex">
            {/* Left Column: Artistic/Branding - Hidden on Mobile */}
            <div className="hidden lg:flex w-1/2 bg-gray-900 relative overflow-hidden flex-col justify-between p-16">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-orange-900/40 via-gray-900 to-gray-900"></div>
                <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"></div>
                <div className="absolute top-20 right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>

                {/* Floating elements animation */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        animate={{ y: [0, -20, 0], opacity: [0.5, 0.8, 0.5] }}
                        transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
                        className="absolute top-1/3 right-1/4 bg-white/5 backdrop-blur-lg border border-white/10 p-4 rounded-2xl shadow-2xl"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center text-orange-500">
                                <BarChart3 size={20} />
                            </div>
                            <div>
                                <div className="h-2 w-20 bg-white/20 rounded mb-1.5"></div>
                                <div className="h-2 w-12 bg-white/10 rounded"></div>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div
                        animate={{ y: [0, 20, 0], opacity: [0.5, 0.8, 0.5] }}
                        transition={{ duration: 7, delay: 1, repeat: Infinity, repeatType: "reverse" }}
                        className="absolute bottom-1/3 left-1/4 bg-white/5 backdrop-blur-lg border border-white/10 p-4 rounded-2xl shadow-2xl"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-500">
                                <Users size={20} />
                            </div>
                            <div>
                                <div className="h-2 w-24 bg-white/20 rounded mb-1.5"></div>
                                <div className="h-2 w-16 bg-white/10 rounded"></div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="relative z-10">
                    <Link to="/" className="inline-flex items-center text-gray-400 hover:text-white transition-colors text-sm font-medium">
                        <ArrowLeft size={16} className="mr-2" /> Back to Store
                    </Link>
                </div>

                <div className="relative z-10">
                    <h1 className="text-5xl font-bold text-white mb-6 leading-tight">Manage your store <br /> with <span className="text-orange-500">Confidence.</span></h1>
                    <p className="text-gray-400 text-lg max-w-md leading-relaxed">Secure, powerful, and intuitive. Access your store's performance metrics and manage orders efficiently.</p>
                </div>

                <div className="relative z-10 text-gray-500 text-sm">
                    &copy; 2026 Sun Mobiles Inc. All rights reserved.
                </div>
            </div>

            {/* Right Column: Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50 lg:bg-white">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-full max-w-md space-y-8"
                >
                    <div className="lg:hidden mb-8">
                        <Link to="/" className="inline-flex items-center text-gray-500 hover:text-orange-600 transition-colors text-sm font-medium">
                            <ArrowLeft size={16} className="mr-2" /> Back to Store
                        </Link>
                    </div>

                    <div className="text-center lg:text-left">
                        <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-6 lg:mx-0 mx-auto transform rotate-3 hover:rotate-6 transition-transform">
                            <ShieldCheck className="text-orange-600" size={32} />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">Admin Portal</h2>
                        <p className="mt-2 text-gray-600">Please enter your credentials to access the dashboard.</p>
                    </div>

                    <div className="mt-8 space-y-6" >
                        <div className="space-y-5">
                            <div>
                                <label className="text-sm font-semibold text-gray-900 block mb-2">Email Address</label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        onChange={(e) => setAdmin({ ...admin, email: e.target.value })}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 pl-11 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all placeholder:text-gray-400 font-medium"
                                        placeholder="admin@sunmobiles.com"
                                    />
                                    <div className="absolute left-0 top-0 h-full w-12 flex items-center justify-center text-gray-400 pointer-events-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-sm font-semibold text-gray-900">Password</label>
                                    <a href="#" className="text-sm font-medium text-orange-600 hover:text-orange-700">Forgot password?</a>
                                </div>
                                <div className="relative">
                                    <input
                                        type="password"
                                        onChange={(e) => setAdmin({ ...admin, password: e.target.value })}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 pl-11 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all placeholder:text-gray-400 font-medium"
                                        placeholder="••••••••"
                                    />
                                    <div className="absolute left-0 top-0 h-full w-12 flex items-center justify-center text-gray-400 pointer-events-none">
                                        <Lock size={18} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Button onClick={handleSubmit} className="w-full bg-gray-900 hover:bg-black text-white rounded-xl py-4 text-lg font-bold shadow-xl shadow-gray-900/10 hover:shadow-gray-900/20 hover:scale-[1.01] active:scale-[0.99] transition-all">
                            Sign In to Dashboard
                        </Button>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Secure AES-256 Encrypted Connection</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default AdminLogin
