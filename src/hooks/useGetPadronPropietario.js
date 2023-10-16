import { useEffect, useState, useContext } from "react";
import axios from "axios";

export const UseGetPadronPropietario = (API, setRefrescar, auth) => {

    const [isLoading, SetLoading] = useState(true);
    const [dataPropietario, SetDataPropietario] = useState(null);
    const [codigoPropietario, SetCodigoPropietario] = useState(null)
    console.log(auth)
    const doSomething = async () => {
        console.log(`${API}?Codigo_Asociacion=${auth.des_codigo_asociacion}`)
        const response = await axios(`${API}?Codigo_Asociacion=${auth.des_codigo_asociacion}`);
        console.log(API);
        console.log(response)


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

    }

    useEffect(() => {

        doSomething();

    }, []);


    return { dataPropietario, isLoading, codigoPropietario };
}


export const UseGetPadronSocio= (API, setRefrescar, auth) => {

    const [isLoading, SetLoading] = useState(true);
    const [dataPropietario, SetDataPropietario] = useState(null);
    const [dataSocioPabPuesto, SetDataSocioPabPuesto] = useState(null);
    const [codigoPropietario, SetCodigoPropietario] = useState(null)
    console.log(auth)
    const doSomething = async () => {
        console.log(`${API}?Codigo_Asociacion=${auth.des_codigo_asociacion}`)
        const response = await axios(`${API}?Codigo_Asociacion=${auth.des_codigo_asociacion}`);
        console.log(API);
        console.log(response)

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
