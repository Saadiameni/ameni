import React from "react";
import Unauthorized from "./Unauthorized";

const ProtectedRoute = ({ children }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log('User from localStorage:', user); // Debugging line

    if (!user) {
        console.log('User not found, rendering Unauthorized component'); // Debugging line
        return <Unauthorized />;
    }

    console.log('User found, rendering children'); // Debugging line
    return <>{children}</>;
};

export default ProtectedRoute;
