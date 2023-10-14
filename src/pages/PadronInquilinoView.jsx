import React , { useEffect,  useContext }from "react";
import ListProdronInquilino from "../container/PadronInquilino";
import AuthContext from "../context/AuthContext";
const PadronInquilinoView=()=>{

    const { login } = useContext(AuthContext);
    const { auth } =useContext(AuthContext);

    useEffect(() => {
        login();
     }, []);


    return(
        <>
         {
            auth && <ListProdronInquilino EstadoGlobal={auth} />
          } 
        
        </>
       
        
    );
}

export default PadronInquilinoView;