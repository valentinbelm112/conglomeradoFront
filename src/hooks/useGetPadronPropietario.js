import { useEffect,useState,useContext } from "react";
import axios from "axios";

export const UseGetPadronPropietario=(API,setRefrescar,auth)=>{
  
    const[isLoading,SetLoading]=useState(true);
    const [dataPropietario,SetDataPropietario]=useState(null)
    console.log(auth)
    const doSomething = async() =>{
        console.log(`${API}?Codigo_Asociacion=${auth.des_codigo_asociacion}`)
        const response = await axios(`${API}?Codigo_Asociacion=${auth.des_codigo_asociacion}`);
        console.log(API);
        console.log(response)
        SetDataPropietario(response);
        SetLoading(false);
        setRefrescar(response.data)
     
        }
        
    useEffect( () => {

        doSomething();
      
      }, []);
      return { dataPropietario, isLoading };
}


export const useGetPadronPropietarioComponenteRender = async (API) => {
    const codigo_asociacion="E00241";
    const response = await axios(`${API}?Codigo_Asociacion=${codigo_asociacion}`);
  

    return { response};
  };
