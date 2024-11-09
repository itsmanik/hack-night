import AuthContext from "./auth-context";
import { useState, useEffect } from "react";

const AuthProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [who, setWho] = useState("");

  useEffect(() => {
    const items = localStorage.getItem("access_token");
    if (items) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={isLoggedIn}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
