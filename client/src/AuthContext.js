import axios from "axios";
import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [contextLoaded, setContextLoaded] = useState(false);
    const [userData, setUserData] = useState({ username: "", email: "" });
    const [token, setToken] = useState("");

    useEffect(() => {
        const tok = localStorage.getItem("token");
        if (!isLoggedIn && tok) {
            setToken(tok);
            axios.get('/api/user', {
                headers: {
                    Authorization: `Bearer ${tok}`,
                },
            }).then(response => {
                setIsLoggedIn(true);
                setUserData(response.data);
            }).catch(error => {
                console.error('Error fetching user data:', error);
                localStorage.removeItem('token');
            });
        }
        setContextLoaded(true);
    }, []);

    const login = (data) => {
        setIsLoggedIn(true);
        setUserData(data);
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUserData({});
        localStorage.removeItem('token');
    };

    const updateUserData = (data) => {
        axios.put('/api/user/update', data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(response => {
            setUserData({...userData, ...data});
        }).catch(error => {
            console.error('Error updating user data:', error);
        });
    };

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                contextLoaded,
                userData,
                login,
                logout,
                updateUserData,
                token,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
