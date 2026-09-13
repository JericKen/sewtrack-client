import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    async function loginUser({ user, token }) {
        localStorage.setItem("token", token);
        setUser(user);
    }

    async function logoutUser() {
        localStorage.removeItem("token");
        setUser(null);
    }

    async function loadCurrentUser() {
        const token = localStorage.getItem("token");

        if (!token) {
            console.log(token);
            setLoading(false);
            return;
        }

        try {
            const currentUser = await getCurrentUser();
            console.log(currentUser);
            setUser(currentUser);
        } catch (e) {
            console.error(e.message);
            localStorage.removeItem("token");
            setUser(null);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadCurrentUser();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                loginUser,
                logoutUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}