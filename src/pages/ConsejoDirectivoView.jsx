import React , { useEffect,  useContext }from "react";
import ConsejoDirectivo from "../container/ConsejoDirectivo";
import AuthContext from "../context/AuthContext";

const ConsejoDirectivoView =()=>{
    const { auth } =useContext(AuthContext);

    const { login } = useContext(AuthContext);
    useEffect(() => {
        console.log("Hola")
        login();
      }, []);

    return(
        <div className="consejo-directivo-page">
           <ConsejoDirectivo EstadoGlobal={auth}/>
        </div>
    );
}

export default ConsejoDirectivoView;