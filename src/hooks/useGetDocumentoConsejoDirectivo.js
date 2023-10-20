import { useEffect,useState,useContext } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";
export const UseGetDoccumentoConsejoDirectivo=(API,estadoGlobal)=>{
    const { auth } = useContext(AuthContext);
    const [isLoadingDoc, SetLoading] = useState(true);
    const [documento, setDirectivos] = useState([]);
    const doSomething = async() =>{

        const config = {
        
            headers: {
                Authorization: `Bearer ${estadoGlobal.accessToken}`,
            },
        };
    


        const response = await axios(`${API}?Codigo_Asociacion=${estadoGlobal.des_codigo_asociacion}`
        ,config);
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