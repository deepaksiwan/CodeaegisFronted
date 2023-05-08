import { UserContext } from "../Context/UserContext";
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

export default function AuthGuard({ children } ) {

  const [{userData} ]= useContext(UserContext);
  console.log(userData)
  if (!userData) {
    return <Navigate to='/'/>;
  }

  return children;
}