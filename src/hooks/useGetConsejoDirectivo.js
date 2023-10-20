
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
    

        const response = await axios(API,
            config
            );
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

