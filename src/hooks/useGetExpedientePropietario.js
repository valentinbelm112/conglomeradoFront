import axios from 'axios';
import { useState } from 'react';


export const useGetExpedientePropietario = async(API,id)=>{
      const objetoRequest=
        {
          "codempresa":"0001",	
           "option":"7",
           "dni":id
       }
      

    const[isLoading,SetLoading]=useState(true);
    const [dataExpediente,SetDataExpediente]=useState(null)
    const data = await axios.post(API,objetoRequest)
  
     console.log(data);

     if(data===null){
        
       //await useGetReniec();
       SetLoading(false)
       SetDataExpediente(data);
      
       return {dataExpediente,isLoading};
     }
     

     return {isLoading,dataExpediente};

}




