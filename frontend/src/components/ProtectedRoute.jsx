import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const {authenticate} = useSelector(state=>state.auth);
    return authenticate ? children : <Navigate to="/login" />
}

export default ProtectedRoute
