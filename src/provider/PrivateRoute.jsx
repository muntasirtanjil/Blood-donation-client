import { use } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "./AuthProvider";

const PrivateRoute = ({ children }) => {
    const { user, loading } = use(AuthContext);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!user) {
        return <Navigate to="/auth/login" replace />;
    }

    return children;
};

export default PrivateRoute;