import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const isAuthenticated = !!localStorage.getItem('authorization');
    return(
        isAuthenticated ? <Outlet /> : <Navigate to="/login" />
    );
};

export default PrivateRoute;