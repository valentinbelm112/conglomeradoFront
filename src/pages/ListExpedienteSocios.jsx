import React from "react";
import { useParams } from "react-router-dom";
import NavbarConglomerado from "../components/NavbarConglomerados";
import SidebarMenu from "../components/SidebarMenu";
import ExpedientePropietarioSocio from "../components/ExpedientePropietarioSocio";
import { useGetExpediente } from "../hooks/useGetExpediente";
const ListExpedientesSocios=()=>{
    const { id } = useParams();
    const hola = useGetExpediente(id);
    return (
        <div className="navbar-sidebar-directivos">
        <NavbarConglomerado />
        <div className="container-Sidebar-view-directivo">
          <SidebarMenu />
          <ExpedientePropietarioSocio/>
          </div>
          </div>
    );
}

export default ListExpedientesSocios;