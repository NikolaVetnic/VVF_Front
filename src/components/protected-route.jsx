import { Navigate } from "react-router-dom";
import { isTokenValid } from "../util/user-utils";

const ProtectedRoute = ({ children }) => {
    if (!isTokenValid()) {
        return <Navigate to="/forbidden" replace />;
    }

    return children;
};

export default ProtectedRoute;
