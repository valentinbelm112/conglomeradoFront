import React , { useEffect,  useContext }from "react";
import ListProdronSocios from "../container/PadronSocios";
import AuthContext from "../context/AuthContext";
const PadronSociosView=()=>{
    
    const { login } = useContext(AuthContext);
    const { auth } =useContext(AuthContext);

    useEffect(() => {
        login();
     }, []);



    return(
        <>
         {
            auth &&<ListProdronSocios EstadoGlobal={auth} />
          } 
        </>
           
        
    );
}

export default PadronSociosView;