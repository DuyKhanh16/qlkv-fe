import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const PrivateRoute = ({ element }) => {
    // Kiểm tra xem token có trong cookies không
    const isAuthenticated = Cookies.get("token");

    if (!isAuthenticated) {
        // Nếu không có token, điều hướng đến trang login
        return <Navigate to="/login" replace />;
    }

    // Nếu đã đăng nhập, cho phép truy cập vào route
    return element;
};

const AdminRoute = ({ element }) => {
    // Kiểm tra xem token có trong cookies không
    const isAuthenticated = Cookies.get("token");
    if (!isAuthenticated) {
        // Nếu không có token, điều hướng đến trang login
        return <Navigate to="/login" replace />;
      
    } 
    const currentUser = JSON.parse(Cookies.get("loginData"));

    if (currentUser.role !== "ROLE_ADMIN") {
        return <Navigate to="/" replace />;
    }

    // Nếu đã đăng nhập, cho phép truy cập vào route
    return element;
};


export { PrivateRoute, AdminRoute };
