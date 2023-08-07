import { useEffect,useState } from "react";
import axios from "axios";
export const UseGetPadronPropietario=(API,setRefrescar)=>{
    const codigo_asociacion="E00241";
    const[isLoading,SetLoading]=useState(true);
    const [dataPropietario,SetDataPropietario]=useState(null)
    const doSomething = async() =>{
        const response = await axios(`${API}?Codigo_Asociacion=${codigo_asociacion}`);
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
