import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export function AuthProvider({ children }) {
    const [authenticatedUser, setAuthenticatedUser] = useState({ user: null, token: null});
    const [loading, setLoading] = useState(true);

    const setAuthToken = (token) => {
        setAuthenticatedUser({ ...authenticatedUser, token })
    }

    useEffect(() => {
        console.log("Fetching profile")
        let token;
        if(authenticatedUser.token) {
            token = authenticatedUser.token;
            console.log("Token set from context", token);
        } else {
            token = localStorage.getItem("accessToken");
            if(token == null){
                setAuthenticatedUser({ user: null, token: null });
                setLoading(false);
                return;
            }
            console.log("Token set from local storage", token);
        }
        fetch("http://localhost:5000/api/users/profile", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            if(response.status === 401) 
                throw new Error("Unauthorized")
            return response.json();
        })
        .then((data) => {
            setAuthenticatedUser({ user: data, token: token });
            localStorage.setItem("accessToken", token);
            setLoading(false);
        })
        .catch((e) => {
            setAuthenticatedUser({ user: null, token: null });
            localStorage.removeItem("accessToken");
            console.log(e);
            setLoading(false);
        })
    },[authenticatedUser.token]);
    
    return (
        <AuthContext.Provider value={{ authenticatedUser, setAuthToken, loading }}>
            {children}
        </AuthContext.Provider>
    );
}