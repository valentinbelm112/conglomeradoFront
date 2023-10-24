import React , { useEffect,  useContext }from "react";
import ListExpedientesPropietarios from "./ListExpedientesPropietarios";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const ExpedientePropietariosView=()=>{
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
            auth?<ListExpedientesPropietarios id1={id}  id2={id2} estadoGlobal={auth}/>:navigate(`/login`)
        
        }
         </>

    );
}

export default ExpedientePropietariosView;