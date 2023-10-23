import { useEffect,useState,useContext } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";
export const UseGetDoccumentoConsejoDirectivo=(API,setRefrescarDocument,estadoGlobal)=>{
    const { auth } = useContext(AuthContext);
    const [isLoadingDoc, SetLoading] = useState(true);
    const [documento, setDirectivos] = useState([]);
    console.log(estadoGlobal)
    const doSomething = async() =>{

        const config = {
        
            headers: {
                Authorization: `Bearer ${estadoGlobal.accessToken}`,
            },
        };
        console.log(API);
        const response = await axios(`${API}?Codigo_Asociacion=${estadoGlobal.des_codigo_asociacion}`,config);
        console.log(API);
        console.log(response);
        setRefrescarDocument(response);
        setDirectivos(response);
        SetLoading(false);
     
        }
        
    useEffect( () => {

        doSomething();
      
      }, []);
      return { documento, isLoadingDoc };
}


export default UseGetDoccumentoConsejoDirectivo;