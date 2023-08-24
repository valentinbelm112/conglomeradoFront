import axios from 'axios';
import { useEffect,useState } from "react";
import { serverURL } from '../utils/Configuration';
/*
export const useGetExpedientePropietario = async(API,id)=>{
  const[isLoading,SetLoading]=useState(true);
  const [dataExpediente,SetDataExpediente]=useState(null);
  const objetoRequest=
        {
          codempresa:"0001",	
           option:"7",
           dni:id
       }

const config = {
  headers: {
    'Content-Type': 'application/json'
  }
};


  
    //consultar si existe el cliente 
    const existeCliente = await axios.get(`${serverURL}/Expediente?dni=${id}`);
    console.log(existeCliente.data);

   if(existeCliente.data){
    console.log("dentro validacion" +API)
   
    
   }
   else{
    console.log("Else")
    console.log(isLoading)
    const existeCliente = await axios.get(`${serverURL}/Expediente?dni=${id}`);
    console.log(existeCliente)
    SetLoading(false)
    SetDataExpediente(existeCliente.data);
   
   }
   return {dataExpediente,isLoading};
  }
*/

  export const useGetExpedientePropietario=(API,id,id2)=>{
   
    const[isLoading,SetLoading]=useState(true);
    const [dataExpediente,SetDataExpediente]=useState(null);
    const [dataDetallePropietario,SetDataDetallePropietario]=useState(null);

    const codigo_asociacion="E00241";
          const objetoRequest=
          {
            codempresa:"0001",	
            option:"7",
            dni:id
        }

      const config = {
      headers: {
      'Content-Type': 'application/json'
      }
      };
    
    
    const doSomething = async() =>{
      
        const existeCliente = await axios.get(`${serverURL}/Expediente?dni=${id}`);
        
        if(existeCliente.data){
          const responsepostExpediente = await axios.get(`${serverURL}/Expediente/get?dni=${id}`)
          const padronPropietariosDetalle = await axios.get(`${serverURL}/Propietarios/obtener/propietario/id?id_propietario=${id2}`)
          console.log(responsepostExpediente);
          console.log(responsepostExpediente)
          console.log(padronPropietariosDetalle);
          console.log(responsepostExpediente)
          SetDataExpediente(responsepostExpediente);
          SetDataDetallePropietario(padronPropietariosDetalle);
          SetLoading(false);
         
          
         }
         else{
          console.log("Else")
          console.log(isLoading)
           await axios.post(API,objetoRequest)
          .then(async(response) => {
         
            const bodyExpediente={
              "des_apellido_materno": response.data.data.apellido_materno,
              "des_apellido_paterno": response.data.data.apellido_paterno,
              "des_cargo":response.data.data.grado_instruccion,
              "des_correo_electronico": "cccc@gmail.com",
              "des_departamento_dom": response.data.data.departamento_domicilio,
              "des_departamento_nacimiento": response.data.data.departamento_nacimiento,
              "des_direccion_dom": response.data.data.direccion,
              "des_distrito_dom": response.data.data.distrito_domicilio,
              "des_edad": "30",
              "des_email": "cccc@gmail.com",
              "des_estado_civil": response.data.data.estado_civil,
              "des_genero": response.data.data.sexo,
              "des_grado_instruccion": response.data.data.grado_instruccion,
              "des_nombres": response.data.data.nombres,
              "des_provincia_dom": response.data.data.provincia_domicilio,
              "des_telefono": "3434343434",
              "des_url_foto":  response.data.data.urlFoto,
              "dni": response.data.data.dni,
              "fec_Fecha_nacimiento": "2023-08-07T21:47:30.828Z"
            }


            console.log(bodyExpediente)
            const responsepostExpediente = await axios.post(`${serverURL}/Expediente/save`,bodyExpediente)
            console.log(responsepostExpediente);
            console.log(response.data.data)
            console.log(API);
            console.log(response)
            SetDataExpediente(response);
            SetLoading(false);
          })
          .catch(error => {
            console.error('Error en la solicitud:', error);
          });
       
         
         }
       
      
     
        }
        
    useEffect( () => {

        doSomething();
      
      }, []);
      return { dataExpediente, isLoading,dataDetallePropietario };
}




