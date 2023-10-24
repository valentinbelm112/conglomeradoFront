import React , { useEffect,  useContext }from "react";
import ListPadronSocios from "../container/PadronSocios";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const PadronSociosView=()=>{
    
    const { login } = useContext(AuthContext);
    const { auth } =useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        login();
     }, []);



    return(
        <>
         {
            auth ? <ListPadronSocios EstadoGlobal={auth} />:navigate(`/login`)
          } 
        </>
           
        
    );
}

export default PadronSociosView;