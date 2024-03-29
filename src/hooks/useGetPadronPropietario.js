import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { serverURL } from "../utils/Configuration";

export const UseGetPadronPropietario = (API, setRefrescar, auth,startIndex,endIndex) => {

    const [isLoading, SetLoading] = useState(true);
    const [dataPropietario, SetDataPropietario] = useState(null);
    const [codigoPropietario, SetCodigoPropietario] = useState(null);
    const [estadoActivoP,setEstadoActivoP]=useState(null);
     const [estadoInactivoP,setEstadoInactivoP]=useState(null);
     const [numPage,setNumPage]=useState(null);
    //console.log("hola")
    //console.log(auth)
    const doSomething = async () => {

        const config = {
            headers: {
                Authorization: `Bearer ${auth.accessToken}`,
            },
        };
        
        const estadoActivoP = await axios.get(
            `${serverURL}/Estadistica/obtener/estado/propietarios/activo/${auth.des_codigo_asociacion}`,
            config
          );
          
         
          
          const estadoInactivoP = await axios.get(
            `${serverURL}/Estadistica/obtener/estado/propietarios/inactivo/${auth.des_codigo_asociacion}`,
            config
          );
         
      

       //console.log(config)
       await axios.get( `${API}?Codigo_Asociacion=${auth.des_codigo_asociacion}&startIndex=${startIndex}&endIndex=${endIndex}`, config).then(response => {
            const codigoPropietario = response.data.content
            .map((e) => ({
                value: e.codigoPropietario,
                label: e.codigoPropietario,
            }));
             // console.log(response.data)
              setNumPage(response.data.totalPages
                );
               setEstadoActivoP(estadoActivoP.data);
               setEstadoInactivoP(estadoInactivoP.data);
 
                console.log(response.data.content);
                SetCodigoPropietario(codigoPropietario);
                SetDataPropietario(response);
                SetLoading(false);
                setRefrescar(response.data.content)
          })
          .catch(error => {
            console.error('Error en la solicitud:', error);
          });
 
        
      

    }

    useEffect(() => {

        doSomething();

    }, []);


    return { dataPropietario, isLoading, codigoPropietario,estadoActivoP ,estadoInactivoP,numPage};
}

export const UseGetPadronInquilino = (API, setRefrescar, auth) => {

    const [isLoading, SetLoading] = useState(true);
    const [dataPropietario, SetDataPropietario] = useState(null);
    //console.log(auth)

    const doSomething = async () => {
        const config = {
        
            headers: {
                Authorization: `Bearer ${auth.accessToken}`,
            },
        };
    
       const response = await axios(
            `${API}?Codigo_Asociacion=${auth.des_codigo_asociacion}`,                           
            config
        );
 
       // console.log(API);
       // console.log(response)
        SetDataPropietario(response);
        SetLoading(false);
        setRefrescar(response.data)

    }

    useEffect(() => {

        doSomething();

    }, []);


    return { dataPropietario, isLoading };
}



export const UseGetPadronSocio= (API, setRefrescar, auth,startIndex,endIndex) => {

    const [isLoading, SetLoading] = useState(true);
    const [dataPropietario, SetDataPropietario] = useState(null);
    const [dataSocioPabPuesto, SetDataSocioPabPuesto] = useState(null);
    const [codigoPropietario, SetCodigoPropietario] = useState(null)
    const [numPage,setNumPage]=useState(null);




    const doSomething = async () => {

        //console.log(auth)
       
        const config = {
        
            headers: {
                'Authorization': `Bearer ${auth.accessToken}`,
            },
        };

    
       const response = null;

        axios({
            method: "get",
            url: `${API}?Codigo_Asociacion=${auth.des_codigo_asociacion}&startIndex=${startIndex}&endIndex=${endIndex}`,
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${auth.accessToken}`,
            },
          }).then((response) => {
           
        
        //console.log(response)
        // Array para almacenar los valores extraídos
        const listPabellonPuesto = [];
        console.log(response.data)
        const codigoPropietario = response.data.content
            .map((e) => ({
                value: e.codSocio,
                label: e.codSocio,
            }));
            setNumPage(response.data.totalPages
                );
            // Recorremos el objeto 'data' y extraemos los valores necesarios
            response.data.content.forEach(obj => {
                const codSocio = obj.codSocio;
                obj.inmuebleSocioEntities.forEach(inmueble => {
                const numPuesto = inmueble.numPuesto;
                const numPabellon = inmueble.numPabellon;
                listPabellonPuesto.push({ codSocio, numPuesto, numPabellon });
                });
            });
  

       // console.log(listPabellonPuesto);
        SetDataSocioPabPuesto(listPabellonPuesto);
        SetCodigoPropietario(codigoPropietario);
        SetDataPropietario(response);
        SetLoading(false);
        setRefrescar(response.data.content)
    });
    }

    useEffect(() => {

        doSomething();

    }, []);


    return { dataPropietario, isLoading, codigoPropietario,dataSocioPabPuesto ,numPage};
}


export const useGetPadronPropietarioComponenteRender = async (API, auth,startIndex,endIndex) => {
   
  
    const response = await axios(`${API}?Codigo_Asociacion=${auth.des_codigo_asociacion}&startIndex=${startIndex}&endIndex=${endIndex}`);

   // console.log(response)

    return { response };
};


export const useGetSociosComponenteRender = async (API, auth) => {
    const codigo_asociacion = "E00241";
    const response = await axios(`${API}?Codigo_Asociacion=${auth.des_codigo_asociacion}`);


    return { response };
};

export const useGetInqulinoComponenteRender = async (API, auth) => {
    const codigo_asociacion = "E00241";
    const response = await axios(`${API}?Codigo_Asociacion=${auth.des_codigo_asociacion}`);


    return { response };
};
