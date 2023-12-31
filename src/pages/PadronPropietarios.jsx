
import React , { useEffect,  useContext }from "react";

import PadronPropietario from "../container/PadronPropietario";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ListPropietarios = () => {
    const navigate = useNavigate();

    const { login } = useContext(AuthContext);
    const { auth } =useContext(AuthContext);
    
    useEffect(() => {
         login();
      }, []);


    return (
        <>
          {
            auth &&<PadronPropietario EstadoGlobal={auth} />
          } 

        </>
       
    );
}

export default ListPropietarios;