import { createAuthTokenHeader, deleteAuthTokenHeader } from "../API/axiosConfig";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("auth_token"));
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

    useEffect(() => {
        if (token) {
            createAuthTokenHeader(token);
            localStorage.setItem("auth_token", token)
        } else {
            deleteAuthTokenHeader();
            localStorage.removeItem("auth_token");
        }
    }, [token]);

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    const logOut = () => {
        setUser(null);
        setToken("");
    };

    return (
        <AuthContext.Provider value={{ token, setToken, user, setUser, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthProvider;