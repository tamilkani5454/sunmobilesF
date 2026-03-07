import { refresh } from 'aos'
import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import Trailloading from "../assets/Trailloading.json"
export const appContext = createContext()

export const AppContextProvider = ({ children }) => {
    const environment = "production"
    const [CSB, setCSB] = useState([])
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])
    const [loading, setLoading] = useState(true)
    let URL;
    if (environment === "production") {
        URL = "https://sunmobiles-b.vercel.app/api"
    }
    else { URL = "http://localhost:3000/api" }
    useEffect(() => {
        const savedCart = localStorage.getItem('cart')
        if (savedCart) {
            setCart(JSON.parse(savedCart))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    const addToCart = (product, quantity = 1) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item._id === product._id)
            if (existingItem) {
                // Check stock limit
                if (existingItem.quantity + quantity > product.stock) {
                    return prevCart // Do not update if exceeds stock
                }
                return prevCart.map(item =>
                    item._id === product._id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                )
            } else {
                // Check stock limit for new item
                if (quantity > product.stock) {
                    return prevCart // Do not add if exceeds stock
                }
                return [...prevCart, { ...product, quantity }]
            }
        })
    }

    const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item._id !== productId))
    }

    const fetchData = async () => {
        try {
            setLoading(true)
            const [csbRes, productsRes] = await Promise.all([
                fetch(URL+"/gets/get-csb"),
                fetch(URL+"/gets/get-products")
            ])

            const csbData = await csbRes.json()
            const productsData = await productsRes.json()

            setCSB(csbData)
            setProducts(productsData)
        } catch (error) {
            console.error("Error fetching data:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const value = {
        CSB,
        refreshCSB: fetchData,
        products,
        refreshProducts: fetchData,
        cart,
        addToCart,
        removeFromCart,
        Trailloading,
        loading,
        URL,
        setCart,
    }

    return (
        <appContext.Provider value={value}>{children}
        </appContext.Provider>
    )
}
