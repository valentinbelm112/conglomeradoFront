import { useEffect,useState } from "react";
import axios from "axios";

export const useGetObtenerNumPropietarios=(API,API2,API3,API4,API5,API6,API7,auth)=>{

    const [isLoading, SetLoading] = useState(true);
    const [numPropietarios, setNumPropietarios] = useState([]);
    const [numSocios, setNumSocios] = useState([]);
    const [numInquilino, setNumInquilino] = useState([]);
    const [activoProp, setActivoProp] = useState([]);
    const [inactivoProp, setInactivoProp] = useState([]);
    const[activoPropietarios,setActivoPropietarios] = useState([]); //
    const[inactivoPropietarios,setInactivoPropietarios] = useState([]);
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
            `${API4}/${auth.des_codigo_asociacion}`,
            config
    );


     //console.log(responseSocio);        
     const responseInactivo = await axios(
        `${API5}/${auth.des_codigo_asociacion}`,
        config
);

const responsePropietarioActivo = await axios(
    `${API6}/${auth.des_codigo_asociacion}`,
    config
);

const responsePropietarioInactivo = await axios(
    `${API7}/${auth.des_codigo_asociacion}`,
    config
);

  
        console.log(responsePropietarioActivo);
        console.log(responsePropietarioInactivo);
        setActivoProp(responseActivo);
        setNumPropietarios(responsePropietario);
        setNumSocios(responseSocio);
        setNumInquilino(responseInquilino);
        setInactivoProp(responseInactivo);
        setActivoPropietarios(responsePropietarioActivo);
        setInactivoPropietarios(responsePropietarioInactivo);
        SetLoading(false);
        }
      
    useEffect( () => {

        doSomething();
      
      }, []);
      return { numPropietarios,numSocios,numInquilino,activoProp,inactivoProp,activoPropietarios,inactivoPropietarios ,isLoading };
}
