import React , { useEffect,  useContext }from "react";

import HomeConglomerado from "./HomeConglomerado";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
 
    const { login } = useContext(AuthContext);
    const { auth } =useContext(AuthContext);
    
    useEffect(() => {
         login();
      }, []);


    return (
        <>
          {
             auth?<HomeConglomerado EstadoGlobal={auth} />:navigate(`/login`)
          } 

        </>
       
    );
}

export default Home;