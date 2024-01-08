import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element: Element }) => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    if (isAuthenticated) return <Element />;

    return <Navigate to="/login" />;
};

export default PrivateRoute;

