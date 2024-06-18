import React from "react";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
    const { isLoggedIn, contextLoaded } = useAuth();

    if (!contextLoaded) {
        return <div>Loading...</div>;
    }

    if (!isLoggedIn) {
        window.location.href =
            process.env.NODE_ENV === "development"
                ? "http://localhost:5000/auth/google"
                : "/auth/google";
        return null;
    }

    return children;
};

export default ProtectedRoute;
