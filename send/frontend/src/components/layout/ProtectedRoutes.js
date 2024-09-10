import React from "react";
import Unauthorized from "./Unauthorized";

const ProtectedRoute = ({ children }) => {
    let user;

    try {
        user = JSON.parse(localStorage.getItem('user'));
    } catch (e) {
        user = null;
    }

    if (!user) {
        return <Unauthorized />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;