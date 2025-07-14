import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./context/authContext";
import ProgressBar from "./components/progressBar";

const PublicRoute = () => {
  const {user, loading} = useContext(AuthContext)
  console.log(user)

  if (loading < 100) return <ProgressBar progress={loading} />;

  //navigate to home page when user is authenticated i.e it also navigate to home page when buyer logs in
  if (user && user.role === 'buyer') {
    return <Navigate to="/buyer-dashboard" />;
  }

  //navigate to home page when user is authenticated i.e it also navigate to agent dashboard
  // when agent logs in
  if (user && user.role === 'agent'){
    return <Navigate to="/agent-dashboard" />;
  } 

  //navigate to home page when user is authenticated i.e it also navigate to agent dashboard
  // when admin logs in
  if (user && user.role === 'admin') {
    return <Navigate to="/admin-dashboard" />;
  }

  return <Outlet context={{ user }} />;
};

export default PublicRoute;
