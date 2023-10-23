
import { useEffect,useState } from "react";
import axios from "axios";

export const useGetConsejoDirectivo=(API,setRefrescar)=>{

    const [isLoading, SetLoading] = useState(true);
    const [directivos, setDirectivos] = useState([]);
    const doSomething = async() =>{
        const response = await axios(API);
        console.log(response)
        setDirectivos(response);
        SetLoading(false);
        setRefrescar(response.data)
        }
        
    useEffect( () => {

        doSomething();
      
      }, []);
      return { directivos, isLoading };
}




export const useGetConsejoDirectivoListarRefre = async (API) => {
   
    const response = await axios.get(
        API
    );

    return { response};
  };


  export const useGetConsejoDirectivoDocument = async (API,auth) => {
   console.log(auth);
    const resporesponseDocument = await axios.get(
        `${API}?Codigo_Asociacion=${auth.des_codigo_asociacion}`
    );
    console.log(resporesponseDocument);
    return { resporesponseDocument};
  };

