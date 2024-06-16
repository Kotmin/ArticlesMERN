import { Link } from "react-router-dom";
import { useAuthContext } from "../utils/AuthContext";

export default function LoginButton() {
    const { authenticatedUser, setAuthToken } = useAuthContext();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setAuthToken(null);
        window.location.reload();
    }

    if(!authenticatedUser.user) 
        return <Link to='/login'>Login</Link>;
    return <a href="#"  onClick={handleLogout}>Logout</a>
}