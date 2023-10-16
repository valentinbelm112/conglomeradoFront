import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const UseDeletePadronPropietario = async (API) => {
   
    const response = await axios.delete(      
        API
    )
    .then((e)=>{
        console.log("Eliminar Propietario")
        toast.success("Registro Eliminado con éxito");
       
    })
    .catch (error => {
        console.error( 'función en rechazo invocada: ', error );
        toast.error("Intente Nuevamente .");
      });
  
    
     // console.log(response);
    
  };

  export const UseDeletePadronSocio = async (API) => {
   
    const response = await axios.delete(      
        API
    )
    .then((e)=>{
        console.log("Eliminar Propietario")
        toast.success("Registro Eliminado con éxito");
       
    })
    .catch (error => {
        console.error( 'función en rechazo invocada: ', error );
        toast.error("Intente Nuevamente .");
      });
  
    
     // console.log(response);
    
  };
  
   