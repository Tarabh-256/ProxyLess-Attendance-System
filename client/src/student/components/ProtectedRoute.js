// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useAuth } from '../auth/AuthContext';

// const ProtectedRoute = ({ element: Component }) => {
//   const { isAuthenticated } = useAuth();
  
//   return isAuthenticated ? <Component /> : <Navigate to="/login" />;
// };

// export default ProtectedRoute;

import { useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
function ProtectedRoute(props){
  const {Component} = props;
  const navigate = useNavigate();
  useEffect(()=>{
    let login = localStorage.getItem('login');
    if(!login){
      navigate('/login')
    }
  })
  return(
    <div>
        <Component/>
    </div>
  )
}
export default ProtectedRoute;