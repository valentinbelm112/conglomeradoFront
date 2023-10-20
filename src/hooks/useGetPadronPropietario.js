import { useEffect, useState, useContext } from "react";
import axios from "axios";

export const UseGetPadronPropietario = (API, setRefrescar, auth) => {

    const [isLoading, SetLoading] = useState(true);
    const [dataPropietario, SetDataPropietario] = useState(null);
    const [codigoPropietario, SetCodigoPropietario] = useState(null)
    console.log("hola")
    console.log(auth)
    const doSomething = async () => {

        const config = {
            headers: {
                Authorization: `Bearer ${auth.accessToken}`,
            },
        };
    
      
        console.log(config)
       await axios.get( `${API}?Codigo_Asociacion=${auth.des_codigo_asociacion}`,   config) .then(response => {
            const codigoPropietario = response.data
            .filter((e) => e.des_estado !== "Inactivo")
            .map((e) => ({
                value: e.codigoPropietario,
                label: e.codigoPropietario,
            }));

                console.log(codigoPropietario);
                SetCodigoPropietario(codigoPropietario);
                SetDataPropietario(response);
                SetLoading(false);
                setRefrescar(response.data)
          })
          .catch(error => {
            console.error('Error en la solicitud:', error);
          });
 
        
      

    }

    useEffect(() => {

        doSomething();

    }, []);


    return { dataPropietario, isLoading, codigoPropietario };
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
        console.log(response)
        SetDataPropietario(response);
        SetLoading(false);
        setRefrescar(response.data)

    }

    useEffect(() => {

        doSomething();

    }, []);


    return { dataPropietario, isLoading };
}



export const UseGetPadronSocio= (API, setRefrescar, auth) => {

    const [isLoading, SetLoading] = useState(true);
    const [dataPropietario, SetDataPropietario] = useState(null);
    const [dataSocioPabPuesto, SetDataSocioPabPuesto] = useState(null);
    const [codigoPropietario, SetCodigoPropietario] = useState(null)
  




    const doSomething = async () => {

        console.log(auth)
       
        const config = {
        
            headers: {
                'Authorization': `Bearer ${auth.accessToken}`,
            },
        };

    
       const response = null;

        axios({
            method: "get",
            url: `${API}?Codigo_Asociacion=${auth.des_codigo_asociacion}`,
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${auth.accessToken}`,
            },
          }).then((response) => {
           
        

        // Array para almacenar los valores extraídos
        const listPabellonPuesto = [];
        const codigoPropietario = response.data
            .filter((e) => e.des_estado !== "Inactivo")
            .map((e) => ({
                value: e.codSocio,
                label: e.codSocio,
            }));

            // Recorremos el objeto 'data' y extraemos los valores necesarios
            response.data.forEach(obj => {
                const codSocio = obj.codSocio;
                obj.inmuebleSocioEntities.forEach(inmueble => {
                const numPuesto = inmueble.numPuesto;
                const numPabellon = inmueble.numPabellon;
                listPabellonPuesto.push({ codSocio, numPuesto, numPabellon });
                });
            });
  

        console.log(listPabellonPuesto);
        SetDataSocioPabPuesto(listPabellonPuesto);
        SetCodigoPropietario(codigoPropietario);
        SetDataPropietario(response);
        SetLoading(false);
        setRefrescar(response.data)
    });
    }

    useEffect(() => {

        doSomething();

    }, []);


    return { dataPropietario, isLoading, codigoPropietario,dataSocioPabPuesto };
}


export const useGetPadronPropietarioComponenteRender = async (API, auth) => {
    const codigo_asociacion = "E00241";
    const response = await axios(`${API}?Codigo_Asociacion=${auth.des_codigo_asociacion}`);


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
