import React , { useEffect,  useContext }from "react";
import ListExpedientesSocios from "./ListExpedienteSocios";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const ExpedienteSociosView=()=>{
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const { auth } =useContext(AuthContext);
    const { id,id2} = useParams();

    useEffect(() => {
         login();
      }, []);
    return (
        <>
        {
            auth?<ListExpedientesSocios id1={id}  id2={id2} estadoGlobal={auth}/>:navigate(`/login`)
        
        }
         </>

    );
}

export default ExpedienteSociosView;