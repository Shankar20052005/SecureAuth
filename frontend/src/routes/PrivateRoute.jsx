import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const response = await axios.get("http://localhost:8080/product", {
        headers: {
          Authorization: auth?.token,
        },
      });

      if (response.status === 200) {
        setOk(true);
        console.log(response.data);
      } else {
        setOk(false);
        console.log(response.data);
      }
      if(auth?.token){
        authCheck();
      }
    };
  }, [auth?.token]);

  return ok ? <Outlet /> : <h1>Not Authorized</h1>
}