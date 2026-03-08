import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { User, MapPin, Package, LogOut, Edit2 } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { useNavigate } from 'react-router-dom'
import { appContext } from '../../context/Context'
import toast from 'react-hot-toast'


const Profile = () => {
    const { URL } = useContext(appContext)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [addresses, setAddresses] = useState([]);
    const userId = JSON.parse(localStorage.getItem("user"))
    const [editingId, setEditingId] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [editForm, setEditForm] = useState({
        name: '',
        phoneNumber: '',
        email: '',
        street: '',
        city: '',
        state: '',
        pincode: '',
    });

    const [addressToDelete, setAddressToDelete] = useState(null);

    const getUserData = async () => {
        try {
            setLoading(true);
            const res = await fetch(URL + "/gets/user-data", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId })
            })
            const data = await res.json()
            if (data?.addresses && Array.isArray(data.addresses)) {
                setAddresses(data.addresses.slice(0, 2));
            }
        } catch (error) {
            console.error("Failed to fetch user data:", error);
        } finally {
            setLoading(false);
        }
    }
    const updateAddress = async () => {
        if (!editForm.name || !editForm.phoneNumber || !editForm.email || !editForm.street || !editForm.city || !editForm.state || !editForm.pincode) {
            toast.error("Please fill all the fields");
            return;
        }
        try {
            setLoading(true);
            const res = await fetch(URL + "/update/edit-user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...editForm, userId, editingId })
            })
            const data = await res.json()
            if (data.success) {
                toast.success(data.message)
            }
        } finally {
            setLoading(false);
        }

    }
    const newaddress = async () => {
        if (!editForm.name || !editForm.phoneNumber || !editForm.email || !editForm.street || !editForm.city || !editForm.state || !editForm.pincode) {
            toast.error("Please fill all the fields");
            return;
        }
        try {
            setLoading(true);
            const res = await fetch(URL + "/uploads/add-address", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...editForm, userId })

            })
            const data = await res.json()
            if (data.success) {
                getUserData()
                toast.success(data.message)
                setIsAdding(false)
            }
        } finally {
            setLoading(false);
        }

    }
    useEffect(() => {
        getUserData()
    }, [])



    const handleEditClick = (address) => {
        setIsAdding(false);
        setEditingId(address._id);
        setEditForm({
            name: address.name || '',
            phoneNumber: address.phoneNumber || '',
            email: address.email || '',
            street: address.street || '',
            city: address.city || '',
            state: address.state || '',
            pincode: address.pincode || ''
        });
    };

    const handleSaveClick = (id) => {
        updateAddress()
        setEditingId(null);
    };

    const handleAddNewClick = () => {
        newaddress()
    };

    const handleCancelClick = () => {
        setEditingId(null);
        setIsAdding(false);
    };



    const confirmDelete = async () => {
        try {
            setLoading(true);
            const res = await fetch(URL + "/update/delete-address", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ addressId: addressToDelete, userId: userId })
            })
            const data = await res.json()
            if (data.success) {
                getUserData()
                toast.success(data.message)
                setAddressToDelete(null)
            }
        } finally {
            setLoading(false);
        }

    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4 max-w-5xl">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl font-bold text-gray-900 mb-8"
                >
                    My Account
                </motion.h1>

                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="lg:col-span-1"
                    >
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-24 hover:shadow-lg transition-shadow duration-300">
                            <div className="p-6 border-b border-gray-100 flex flex-col items-center text-center">
                                <div className="w-20 h-20 bg-linear-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-3xl mb-4 shadow-lg shadow-orange-500/30">
                                    AM
                                </div>
                                <h3 className="font-bold text-gray-900 text-lg">Alex Morgan</h3>
                                <p className="text-sm text-gray-500">alex@example.com</p>
                            </div>
                            <nav className="p-3">
                                <Link to="/profile" className="flex items-center gap-3 px-4 py-3 bg-orange-50 text-orange-700 rounded-xl font-medium transition-all duration-300 hover:bg-orange-100">
                                    <User size={18} /> Profile Info
                                </Link>
                                <Link to="/orders" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl font-medium transition-all duration-300">
                                    <Package size={18} /> My Orders
                                </Link>
                                <button onClick={() => {
                                    localStorage.removeItem("token");
                                    navigate("/login")
                                }} className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl font-medium transition-all duration-300 mt-2">
                                    <LogOut size={18} /> Log Out
                                </button>
                            </nav>
                        </div>
                    </motion.div>

                    {/* Content */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="lg:col-span-3 space-y-8"
                    >
                        {/* Personal Info Card */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-lg transition-all duration-300"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
                                <button className="text-orange-600 hover:text-orange-700 font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all duration-300">
                                    <Edit2 size={14} /> Edit
                                </button>
                            </div>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="group">
                                    <label className="text-sm text-gray-500 block mb-1">Full Name</label>
                                    <p className="font-medium text-gray-900 text-lg group-hover:text-orange-600 transition-colors">Alex Morgan</p>
                                </div>
                                <div className="group">
                                    <label className="text-sm text-gray-500 block mb-1">Email Address</label>
                                    <p className="font-medium text-gray-900 text-lg group-hover:text-orange-600 transition-colors">alex@example.com</p>
                                </div>
                                <div className="group">
                                    <label className="text-sm text-gray-500 block mb-1">Phone Number</label>
                                    <p className="font-medium text-gray-900 text-lg group-hover:text-orange-600 transition-colors">+91 98765 43210</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Addresses Card */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-lg transition-all duration-300"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <h2 className="text-xl font-bold text-gray-900">Saved Addresses <span className="text-sm font-normal text-gray-500 ml-2">({addresses.length}/2)</span></h2>
                                {addresses.length < 2 && !isAdding && (
                                    <Button
                                        onClick={() => {
                                            setEditingId(null);
                                            setEditForm({ name: '', phoneNumber: '', email: '', street: '', city: '', state: '', pincode: '' });
                                            setIsAdding(true);
                                        }}
                                        variant="outline"
                                        className="text-orange-600 border-orange-200 bg-orange-50 hover:bg-orange-100 transition-all duration-300"
                                    >
                                        + Add New
                                    </Button>
                                )}
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                {isAdding && (
                                    <div className="border border-orange-200 bg-orange-50/20 rounded-xl p-5 relative transition-all duration-300">
                                        <div className="space-y-4">
                                            <h3 className="font-bold text-gray-900 mb-2">New Address</h3>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 text-sm" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} placeholder="Alex Morgan" />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 text-sm" value={editForm.phoneNumber} onChange={(e) => setEditForm({ ...editForm, phoneNumber: e.target.value })} placeholder="+91 98765 43210" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                                    <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 text-sm" value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} placeholder="alex@example.com" />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                                                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 text-sm" value={editForm.street} onChange={(e) => setEditForm({ ...editForm, street: e.target.value })} placeholder="123, Green Valley Apartments" />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 text-sm" value={editForm.city} onChange={(e) => setEditForm({ ...editForm, city: e.target.value })} placeholder="Bangalore" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                                                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 text-sm" value={editForm.state} onChange={(e) => setEditForm({ ...editForm, state: e.target.value })} placeholder="Karnataka" />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                                                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 text-sm" value={editForm.pincode} onChange={(e) => setEditForm({ ...editForm, pincode: e.target.value })} placeholder="560001" />
                                            </div>
                                            <div className="flex gap-3 pt-2">
                                                <button onClick={handleAddNewClick} className="px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors">Add Address</button>
                                                <button onClick={handleCancelClick} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors">Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {addresses.map(addr => (
                                    <motion.div
                                        key={addr._id || Math.random()}
                                        whileHover={{ scale: 1.02 }}
                                        className={`border ${addr.isDefault ? 'border-orange-200 bg-orange-50/30' : 'border-gray-200 hover:border-orange-200 hover:bg-orange-50/20'} rounded-xl p-5 relative transition-all duration-300`}
                                    >
                                        {addr.isDefault && (
                                            <span className="absolute top-4 right-4 bg-orange-100 text-orange-700 text-xs font-bold px-2 py-1 rounded">DEFAULT</span>
                                        )}

                                        {editingId === addr._id ? (
                                            <div className="space-y-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 text-sm" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} />
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                                        <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 text-sm" value={editForm.phoneNumber} onChange={(e) => setEditForm({ ...editForm, phoneNumber: e.target.value })} />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                                        <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 text-sm" value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                                                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 text-sm" value={editForm.street} onChange={(e) => setEditForm({ ...editForm, street: e.target.value })} />
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                                        <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 text-sm" value={editForm.city} onChange={(e) => setEditForm({ ...editForm, city: e.target.value })} />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                                                        <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 text-sm" value={editForm.state} onChange={(e) => setEditForm({ ...editForm, state: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                                                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 text-sm" value={editForm.pincode} onChange={(e) => setEditForm({ ...editForm, pincode: e.target.value })} />
                                                </div>
                                                <div className="flex gap-3 pt-2">
                                                    <button onClick={() => handleSaveClick(addr._id)} className="px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors">Save</button>
                                                    <button onClick={handleCancelClick} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors">Cancel</button>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="flex items-center gap-2 mb-3">
                                                    <MapPin size={18} className={addr.isDefault ? "text-orange-600" : "text-gray-400"} />
                                                    <span className="font-bold text-gray-900">{addr.name}</span>
                                                </div>
                                                <div className="text-gray-600 text-sm leading-relaxed mb-4">
                                                    {addr.street}, <br />
                                                    {addr.city}, {addr.state} - {addr.pincode}<br />
                                                    <div className="mt-2 text-gray-500">
                                                        {addr.phoneNumber}<br />
                                                        {addr.email}
                                                    </div>
                                                </div>
                                                <div className="flex gap-4">
                                                    <button onClick={() => handleEditClick(addr)} className="text-sm font-medium text-gray-500 hover:text-orange-600 transition-colors">Edit</button>
                                                    <button onClick={() => setAddressToDelete(addr._id)} className="text-sm font-medium text-gray-500 hover:text-red-600 transition-colors">Delete</button>
                                                </div>
                                            </>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {addressToDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6"
                    >
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Address?</h3>
                        <p className="text-gray-600 mb-6">Are you sure you want to delete this address? This action cannot be undone.</p>
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => setAddressToDelete(null)}
                                className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    )
}

export default Profile
