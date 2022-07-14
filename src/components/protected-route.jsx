import { isExpired } from "react-jwt";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const currentUser = useSelector((state) => state.user.current);

    if (isExpired(currentUser.token)) {
        return <Navigate to="/forbidden" replace />;
    }

    return children;
};

export default ProtectedRoute;
