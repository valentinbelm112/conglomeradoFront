import React , { useEffect,  useContext }from "react";
import ConsejoDirectivo from "../container/ConsejoDirectivo";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const ConsejoDirectivoView =()=>{
    const navigate = useNavigate();
  //console.log("Ingreso consejo")
    const { login } = useContext(AuthContext);
    const { auth } =useContext(AuthContext);
    useEffect(() => {
        //console.log("Hola")
        login();
      }, [login]);

    return(
        <div className="consejo-directivo-page">{
            auth ?<ConsejoDirectivo EstadoGlobal={auth} />:navigate(`/login`)
        }
           
        </div>
    );
}

export default ConsejoDirectivoView;