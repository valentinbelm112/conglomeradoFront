import React , { useEffect,  useContext }from "react";
import ListProdronInquilino from "../container/PadronInquilino";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const PadronInquilinoView=()=>{

    const { login } = useContext(AuthContext);
    const { auth } =useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        login();
     }, []);


    return(
        <>
         {
            auth ? <ListProdronInquilino EstadoGlobal={auth} /> :navigate(`/login`)
          } 
        
        </>
       
        
    );
}

export default PadronInquilinoView;