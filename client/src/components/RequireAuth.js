import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    console.log(`Req role: ${allowedRoles},u: ${ auth.username },p ${ auth.password }, r: ${ auth.roles },t: ${ auth.accessToken } `)

    
    console.log(allowedRoles);
    // const userHasRequiredRole = auth?.roles?.some(role => allowedRoles.includes(role));
    const userHasRequiredRole = allowedRoles.includes(auth.roles);
    console.log(userHasRequiredRole);
    console.log(auth.roles);
    return (
        userHasRequiredRole
            ? <Outlet />
            : auth?.user
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;