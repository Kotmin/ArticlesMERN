import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../utils/AuthContext";

const RequireAuth = ({ allowedRoles }) => {
    const { authenticatedUser } = useAuthContext();

    console.log(allowedRoles);
    console.log(authenticatedUser.user.rank) // assumig that rank is the only role of the user
    const userHasRequiredRole = allowedRoles.includes(authenticatedUser.user.rank);
    return (
        userHasRequiredRole
            ? <Outlet />
            : authenticatedUser.user
                ? <Navigate to="/unauthorized" replace />
                : <Navigate to="/login" replace />
    );
}

export default RequireAuth;