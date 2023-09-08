import React,{useEffect} from "react";
import { useParams } from "react-router-dom";
import NavbarConglomerado from "../components/NavbarConglomerados";
import SidebarMenu from "../components/SidebarMenu";
import ExpedientePropietario from "../components/ExpedientePropietario";
import Container_Nav_Sidb_Load from "../components/Container_Nav_Sidb_Load";
import {useGetExpedientePropietario} from "../hooks/useGetExpedientePropietario";
import { dataReniec } from "../utils/Configuration";
import { serverURL } from "../utils/Configuration";
import { useState } from "react";
const ListExpedientesPropietarios=()=>{

    const { id,id2} = useParams();
    const [Estado,SetEstado]=useState(false);

    const {dataExpediente,isLoading,dataDetallePropietario,propietariosPartida}=useGetExpedientePropietario(`${serverURL}/cliente/consultar-reniec`,id,id2);
   
    useEffect(() => {
      console.log("Listen to Action");
    
}, [Estado]); // The second argument is an optional dependency array
  
  
    const cambiarEstadoPadre = () => {
    
      SetEstado(!Estado); // Cambiar el valor booleano
    
      };

    if(isLoading ){
  
        return (
                <Container_Nav_Sidb_Load/>
          );
    }
    
    return (
        <div className="navbar-sidebar-directivos">
        <NavbarConglomerado />
          <div className="container-Sidebar-view-directivo">
                <SidebarMenu />
                <ExpedientePropietario expediente={dataExpediente} padron={dataDetallePropietario} propietario={propietariosPartida} cambiarEstado={cambiarEstadoPadre}/>
          </div>
          
          
          </div>

    );
}

export default ListExpedientesPropietarios;