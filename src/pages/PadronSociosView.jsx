import React , { useEffect,  useContext }from "react";
import ListPadronSocios from "../container/PadronSocios";
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
            auth &&<ListPadronSocios EstadoGlobal={auth} />
          } 
        </>
           
        
    );
}

export default PadronSociosView;