import React , { useEffect,  useContext }from "react";
import ListExpedientesInquilino from "./ListExpedienteInquilino";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const ExpedienteInquilinoView=()=>{
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
            auth?<ListExpedientesInquilino id1={id}  id2={id2} estadoGlobal={auth}/>:navigate(`/login`)
        
        }
         </>

    );
}

export default ExpedienteInquilinoView;