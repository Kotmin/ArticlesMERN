import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from '../hooks/useAuth';

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { auth, persist } = useAuth();

    useEffect(() => {
        let isMounted = true;

        const verifyToken = () => {
            try {
                if (!auth?.accessToken && persist) {
                    console.log("Persist: true, but no accessToken");
                }
            } catch (err) {
                console.error(err);
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        verifyToken();

        return () => {
            isMounted = false;
        };
    }, [auth, persist]);

    useEffect(() => {
        console.log(`isLoading: ${isLoading}`);
        console.log(`aT: ${JSON.stringify(auth?.accessToken)}`);
    }, [isLoading]);

    return (
        <>
            {!persist
                ? <Outlet />
                : isLoading
                    ? <p>Loading...</p>
                    : <Outlet />
            }
        </>
    );
};

export default PersistLogin;
