import React, { useState } from 'react'
import { Navigate } from 'react-router';

const ProtectRoute = ({ children }) => {
    const token = localStorage.getItem('access');
    const [jwt, setJwt] = useState(token);

    return !jwt ? children : <Navigate to={'/dashboard'} />
}

export default ProtectRoute