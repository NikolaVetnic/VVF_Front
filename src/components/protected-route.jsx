import { isExpired } from "react-jwt";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const authenticatedUser = useSelector((state) => state.auth.current);

    if (isExpired(authenticatedUser.token)) {
        return <Navigate to="/forbidden" replace />;
    }

    return children;
};

export default ProtectedRoute;
