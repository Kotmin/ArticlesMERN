import { Navigate, Outlet } from "react-router";
import { useAuthContext } from "./AuthContext";

export default function ProtectRoute() {
    const { authenticatedUser, loading } = useAuthContext();
    if(loading) {
        console.log("Loading...")
        return <p>Loading...</p>
    }
    return (
       authenticatedUser.user ? <Outlet/> : <Navigate to="/login" />
    )
}