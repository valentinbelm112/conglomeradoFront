import React , { useEffect,  useContext }from "react";
import ConsejoDirectivo from "../container/ConsejoDirectivo";
import AuthContext from "../context/AuthContext";

const ConsejoDirectivoView =()=>{
    const { login } = useContext(AuthContext);
    useEffect(() => {
        console.log("Hola")
        login();
      }, []);

    return(
        <div className="consejo-directivo-page">
           <ConsejoDirectivo/>
        </div>
    );
}

export default ConsejoDirectivoView;