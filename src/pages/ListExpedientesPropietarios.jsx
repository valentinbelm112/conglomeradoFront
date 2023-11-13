import React , { useEffect,  useContext }from "react";
import { useParams } from "react-router-dom";
import NavbarConglomerado from "../components/NavbarConglomerados";
import SidebarMenu from "../components/SidebarMenu";
import ExpedientePropietario from "../components/ExpedientePropietario";
import Container_Nav_Sidb_Load from "../components/Container_Nav_Sidb_Load";
import {useGetExpedientePropietario} from "../hooks/useGetExpedientePropietario";
import { serverURL } from "../utils/Configuration";
import { useState } from "react";
import AuthContext from "../context/AuthContext";
const ListExpedientesPropietarios=(props)=>{
      const { login } = useContext(AuthContext);
      const { auth } =useContext(AuthContext);
    const { id,id2} = useParams();
    const [Estado,SetEstado]=useState(false);

    const {dataExpediente,isLoading,dataDetallePropietario,propietariosPartida,expedienteConyugue,coPropietario,partidasRegistrales,situacionAsiento}=useGetExpedientePropietario(`${serverURL}/cliente/consultar-reniec`,props.id1,props.id2,props.estadoGlobal);
   
    console.log(dataExpediente)
    
    useEffect(() => {
      login();
      
      console.log("Listen to Action");
    
}, [Estado]); // The second argument is an optional dependency array
  
  
    const cambiarEstadoPadre = () => {
    
      SetEstado(!Estado); // Cambiar el valor booleano
    
      };

    if(isLoading && auth){
  
        return (
                <Container_Nav_Sidb_Load/>
          );
    }
    
    return (
      
        <div className="navbar-sidebar-directivos">
        <NavbarConglomerado />
          <div className="container-Sidebar-view-directivo">
                <SidebarMenu />
                <ExpedientePropietario expediente={dataExpediente} expedienteCony={expedienteConyugue} padron={dataDetallePropietario} propietario={propietariosPartida} cambiarEstado={cambiarEstadoPadre}  nombreExpedienteProp={coPropietario} partidasRegistrales={partidasRegistrales} situacionAsiento={situacionAsiento}/>
          </div>
          
          
          </div>

    );
}

export default ListExpedientesPropietarios;