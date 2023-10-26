import { useEffect,useState } from "react";
import axios from "axios";

export const useGetObtenerNumPropietarios=(API,API2,API3,auth)=>{

    const [isLoading, SetLoading] = useState(true);
    const [numPropietarios, setNumPropietarios] = useState([]);
    const [numSocios, setNumSocios] = useState([]);
    const [numInquilino, setNumInquilino] = useState([]);
    const [activoProp, setActivoProp] = useState([]);
    const [inactivoProp, setInactivoProp] = useState([]);
    //console.log(auth);
    const doSomething = async() =>{
        const config = {
        
            headers: {
                Authorization: `Bearer ${auth.accessToken}`,
            },
        };

        const responsePropietario = await axios(
            `${API}/${auth.des_codigo_asociacion}`,
            config
            );

      
        const responseSocio = await axios(
                `${API2}/${auth.des_codigo_asociacion}`,
                config
            );
          
       //console.log(responseSocio);        
        const responseInquilino = await axios(
                    `${API3}/${auth.des_codigo_asociacion}`,
                    config
            );

         //console.log(responseSocio);        
         const responseActivo = await axios(
            `${API3}/${auth.des_codigo_asociacion}`,
            config
    );


     //console.log(responseSocio);        
     const responseInactivo = await axios(
        `${API3}/${auth.des_codigo_asociacion}`,
        config
);


  
        console.log(responsePropietario);
        console.log(responseSocio);
        console.log(responseInquilino);
        setActivoProp(responseActivo);
        setNumPropietarios(responsePropietario);
        setNumSocios(responseSocio);
        setNumInquilino(responseInquilino);
        setInactivoProp(responseInactivo);
        SetLoading(false);
        }
      
    useEffect( () => {

        doSomething();
      
      }, []);
      return { numPropietarios,numSocios,numInquilino,activoProp,inactivoProp, isLoading };
}
