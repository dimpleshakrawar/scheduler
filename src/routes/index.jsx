import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/context";

export function PrivateRoute({ children }) {
  const { currentUser } = useAuth()
  return currentUser ? children : <Navigate to="/auth" />;
}

export function PublicRoute({ children }) {
  const { currentUser } = useAuth()
  return !currentUser ? children : <Navigate to="/" />;
}
