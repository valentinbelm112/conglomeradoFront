import React from "react";
import { useParams } from "react-router-dom";
import NavbarConglomerado from "../components/NavbarConglomerados";
import SidebarMenu from "../components/SidebarMenu";
import ExpedientePropietario from "../components/ExpedientePropietario";
import Container_Nav_Sidb_Load from "../components/Container_Nav_Sidb_Load";
import {useGetExpedientePropietario} from "../hooks/useGetExpedientePropietario";
import { dataReniec } from "../utils/Configuration";
import { serverURL } from "../utils/Configuration";
const ListExpedientesPropietarios=()=>{

    const { id,id2} = useParams();

    const {dataExpediente,isLoading,dataDetallePropietario}=useGetExpedientePropietario(`${serverURL}/cliente/consultar-reniec`,id,id2);
   
   
   console.log(isLoading )
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
                <ExpedientePropietario expediente={dataExpediente} padron={dataDetallePropietario}/>
          </div>
          
          
          </div>

    );
}

export default ListExpedientesPropietarios;