import React from "react";
import { useAuth } from "../context/AuthContext";
import { NavLink } from "react-router-dom";

const Homepage = () => {
  const [auth, setAuth] = useAuth();

  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
  };

  return (
    <div>
      {JSON.stringify(auth, null, 4)}
      <NavLink to='/login' onClick={handleLogout}>Logout</NavLink>
    </div>
  );
};

export default Homepage;