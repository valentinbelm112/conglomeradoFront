
import React , { useEffect,  useContext }from "react";

import PadronPropietario from "../container/PadronPropietario";
import AuthContext from "../context/AuthContext";
const ListPropietarios = () => {
    const { login } = useContext(AuthContext);
    useEffect(() => {
        login();
      }, []);
    return (
        <>
           <PadronPropietario/>

        </>
       
    );
}

export default ListPropietarios;