import { Navigate, Outlet  } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function PublicRoute({ children }) {
    const { user, loading } = useAuth();

    if (loading) {
        return <p>Checking authentication...</p>;
    }

    if (user) {
        return <Navigate to="/Products" replace />;
    }

    return children;
}

export default PublicRoute;