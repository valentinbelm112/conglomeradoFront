import React, { useState } from "react";
import axios from "axios";
import { loadFromLocalStorage } from "./useLocalStorage";
const useInitialAuth = () => {

  const [auth, setAuth] = useState(null);

  console.log("Agregando al load localstorage")
  const login = async (props) => {
    const payload = loadFromLocalStorage();

    if (payload) {
     
      setAuth(payload);
      return payload;
    } else {
      setAuth(null);
    }
    return false;
  };

  return {
    auth,
    login,
    setAuth
  };
};

export default useInitialAuth;