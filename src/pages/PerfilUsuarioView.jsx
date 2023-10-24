import React , { useEffect,  useContext }from "react";
import PerfilSociosConglomerados from "./PerfilSociosConglomerados";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const PerfilUsuarioView=()=>{
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const { auth } =useContext(AuthContext);

   ;

    useEffect(() => {
         login();
      }, []);
    return (
        <>
        {
            auth?<PerfilSociosConglomerados  estadoGlobal={auth}/>:navigate(`/login`)
        
        }
         </>

    );
}

export default PerfilUsuarioView;