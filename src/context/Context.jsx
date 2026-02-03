import React, { useEffect, useState } from 'react'
import { createContext } from 'react'

export const appContext = createContext()

export const AppContextProvider = ({ children }) => {
    const [CSB, setCSB ] = useState([])

    const fetchCategories = async () => {
       
        const res = await fetch("http://localhost:3000/api/gets/get-csb", {})
        const data = await res.json()
        
        setCSB(data)
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    const value = {
        CSB,
        refreshCSB: fetchCategories
    }

    return (
        <appContext.Provider value={value}>{children}
        </appContext.Provider>
    )
}
