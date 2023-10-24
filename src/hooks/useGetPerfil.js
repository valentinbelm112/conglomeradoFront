import { useEffect, useState, useContext } from "react";
import axios from "axios";

export const UseGetPerfilUsuario = (API, codigoAsociacion, codigoUsuario,auth) => {

    const [isLoading, SetLoading] = useState(true);
    const [dataPerfil, SetDataPerfil] = useState(null);
    //console.log(auth)

    const doSomething = async () => {
        const config = {
        
            headers: {
                Authorization: `Bearer ${auth.accessToken}`,
            },
        };
    
       const response = await axios(
            `${API}/${codigoAsociacion}/${codigoUsuario}`,                           
            config
        );
 

        console.log(response)
        SetDataPerfil(response);
        SetLoading(false);
    }

    useEffect(() => {

        doSomething();

    }, []);


    return { dataPerfil, isLoading };
}
