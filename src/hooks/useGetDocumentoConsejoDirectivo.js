
import { useEffect,useState } from "react";
import axios from "axios";
export const UseGetDoccumentoConsejoDirectivo=(API)=>{
    const codigo_asociacion="E00241";
    const [isLoadingDoc, SetLoading] = useState(true);
    const [documento, setDirectivos] = useState([]);
    const doSomething = async() =>{
        const response = await axios(`${API}?Codigo_Asociacion=${codigo_asociacion}`);
        console.log(API);
        console.log(response)
        setDirectivos(response);
        SetLoading(false);
     
        }
        
    useEffect( () => {

        doSomething();
      
      }, []);
      return { documento, isLoadingDoc };
}


export default UseGetDoccumentoConsejoDirectivo;