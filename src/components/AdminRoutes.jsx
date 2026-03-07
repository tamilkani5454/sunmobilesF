import { Navigate, Outlet } from "react-router-dom";
import useAdminCheck from "../context/AdminCheck";

const AdminRoutes = () => {

    const { loading, isAdmin } = useAdminCheck();

    if (loading) return <h1>Loading...</h1>;

    return isAdmin ? <Outlet /> : <Navigate to="/admin" />;
};

export default AdminRoutes;