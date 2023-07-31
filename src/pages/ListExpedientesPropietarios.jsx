import React from "react";
import { useParams } from "react-router-dom";
import NavbarConglomerado from "../components/NavbarConglomerados";
import SidebarMenu from "../components/SidebarMenu";
import ExpedientePropietario from "../components/ExpedientePropietario";
import { useGetExpediente } from "../hooks/useGetExpediente";
const ListExpedientesPropietarios=()=>{
    const { id } = useParams();
    const hola = useGetExpediente(id);
    return (
        <div className="navbar-sidebar-directivos">
        <NavbarConglomerado />
        <div className="container-Sidebar-view-directivo">
          <SidebarMenu />
          <ExpedientePropietario/>
          </div>
          </div>
    );
}

export default ListExpedientesPropietarios;