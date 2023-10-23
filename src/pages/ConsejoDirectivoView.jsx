import React , { useEffect,  useContext }from "react";
import ConsejoDirectivo from "../container/ConsejoDirectivo";
import AuthContext from "../context/AuthContext";

const ConsejoDirectivoView =()=>{
 
    const { login } = useContext(AuthContext);
    const { auth } =useContext(AuthContext);
    useEffect(() => {
        console.log("Hola")
        login();
      }, []);

    return(
        <div className="consejo-directivo-page">{
            auth &&<ConsejoDirectivo EstadoGlobal={auth}/>
        }
           
        </div>
    );
}

export default ConsejoDirectivoView;