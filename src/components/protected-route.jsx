import { isExpired } from "react-jwt";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { tokenSelector } from "../store/auth/selectors";

const ProtectedRoute = ({ children }) => {
    const token = useSelector(tokenSelector);

    if (isExpired(token)) {
        return <Navigate to="/forbidden" replace />;
    }

    return children;
};

export default ProtectedRoute;
