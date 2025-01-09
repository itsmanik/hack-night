import AuthContext from "./auth-context";
import { useState, useEffect } from "react";
import axiosInstance from "../axios";

const AuthProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [who, setWho] = useState("");
  useEffect(() => {
    try {
      axiosInstance.get("/api/get_role").then((response) => {
        setWho(response.data);
      });
    } catch (error) {
      setWho("student");
    }
  });

  useEffect(() => {
    const items = localStorage.getItem("access_token");
    if (items) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={who}>{props.children}</AuthContext.Provider>
  );
};

export default AuthProvider;
