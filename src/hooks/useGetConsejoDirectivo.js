
import { useEffect,useState } from "react";
import axios from "axios";

export const useGetConsejoDirectivo=(API,setRefrescar,auth)=>{

    const [isLoading, SetLoading] = useState(true);
    const [directivos, setDirectivos] = useState([]);

    console.log(auth);
    const doSomething = async() =>{
        const config = {
        
            headers: {
                Authorization: `Bearer ${auth.accessToken}`,
            },
        };
    
        await axios(API,
            config
            )
            .then((response)=>{
                console.log(response)
                setDirectivos(response);
                SetLoading(false);
                setRefrescar(response.data)
            })
             
        }
        
    useEffect( () => {

        doSomething();
      
      }, []);
      return { directivos, isLoading };
}




export const useGetConsejoDirectivoListarRefre = async (API,EstadoGlobal) => {
   
    const config = {
        
        headers: {
            Authorization: `Bearer ${EstadoGlobal.accessToken}`,
        },
    };

    console.log(EstadoGlobal);

    const response = await axios.get(
        API,
        config
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

