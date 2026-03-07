import { Navigate, Outlet } from "react-router-dom";
import React from 'react'
import UserCheck from "../context/UserCheck";

const PrivateRoutes = () => {
    const { loading, isUser} =UserCheck()

    if (loading) return <h1>Loading...</h1>;

    return isUser ? <Outlet /> : <Navigate to="/login" />;

}

export default PrivateRoutes
