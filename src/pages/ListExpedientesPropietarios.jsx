import React from "react";
import NavbarConglomerado from "../components/NavbarConglomerados";
import SidebarMenu from "../components/SidebarMenu";
import ExpedientePropietario from "../components/ExpedientePropietario";
const ListExpedientesPropietarios=()=>{
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