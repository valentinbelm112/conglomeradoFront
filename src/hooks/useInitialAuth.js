import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const useInitialAuth = () => {

  const [auth, setAuth] = useState(null);
  const [usercoldstart, setUserColdStart] = useState(null);
  const history = useHistory();

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