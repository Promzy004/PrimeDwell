import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./context/authContext";
import ProgressBar from "./components/progressBar";

const ProtectedRoute = ({allowedRoles}) => {
  
    const { user, loading } = useContext(AuthContext)

  if (loading < 100) return <ProgressBar progress={loading} />;

  if (!user) {
    return <Navigate to="/login" />;
  }
  if (!allowedRoles.includes(user.role)) {
    if(user.role === 'buyer'){
      return <Navigate to="/" />
    } else if (user.role === 'agent'){
      return <Navigate to="/agent-dashboard" />
    } else {
      return <Navigate to="/admin-dashboard" />
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;
