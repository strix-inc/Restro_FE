import React, { useState } from 'react'
import { Navigate } from 'react-router';

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('access');
    const [jwt, setJwt] = useState(token);

    return jwt ? children : <Navigate to={'/login'} />
}

export default PrivateRoute
