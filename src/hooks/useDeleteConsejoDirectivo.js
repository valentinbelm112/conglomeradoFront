import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const UseDeleteConsejoDirectivo = async (API,EstadoGlobal) => {
     console.log(EstadoGlobal);
    
    const config = {
        
        headers: {
            Authorization: `Bearer ${EstadoGlobal.accessToken}`,
        },
    };


   console.log(EstadoGlobal)
    const response = await axios.delete(
        
        API,config
    ).then((e)=>{
        console.log("Delete consejo")
        toast.success("Registro Eliminado con éxito");
        
    })

    .catch (error => {
        console.error( 'función enRechazo invocada: ', error );
        toast.error("Intente Nuevamente .");
      });
  
    
  };
  
   