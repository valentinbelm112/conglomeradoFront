import { useEffect,useState,useContext } from "react";
import axios from "axios";


export const UseGetFindPabellonPuesto=(API)=>{

    const[isLoadingPuestos,SetLoadingPuestos]=useState(true);
    const [dataPuestos,SetDataPuestos]=useState(null)
    const [dataPabellonPuesto,SetDataPabellonPuesto]=useState(null)
    //console.log(auth)
    const doSomething = async() =>{
       // console.log(`${API}?Codigo_Asociacion=${auth.des_codigo_asociacion}`)
        const response = await axios(API);

        const datasetPabellonPuesto = response.data.map((e)=>({
            
                numPabellon: e.numPabellon,
                numPuesto: e.numPuesto,
                des_direccion:e.des_direccion,
                des_giro:e.des_giro,
                des_negocio:e.des_negocio,
                num_area:e.num_area
        }));



        SetDataPabellonPuesto(datasetPabellonPuesto);

        const datasetPabellon= response.data.map((e)=>({
             value:  e.numPabellon  ,   label: e.numPabellon
             
         
    }));

        console.log(datasetPabellon);
       
        SetDataPuestos(datasetPabellon);
        SetLoadingPuestos(false);
       // setRefrescar(response.data)
     
        }
        
    useEffect( () => {

        doSomething();
      
      }, []);
      return { dataPuestos, isLoadingPuestos,dataPabellonPuesto };
}

