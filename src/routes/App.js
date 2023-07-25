import React from "react";
import { BrowserRouter, Route, Routes  } from "react-router-dom";
import Auth from "../pages/Auth.jsx";
import PerfilSociosConglomerados from "../pages/PerfilSociosConglomerados.jsx";
import HomeConglomerado from "../pages/HomeConglomerado.jsx";
import SidebarMenu from "../components/SidebarMenu.jsx";
import ListPropietarios from "../pages/PadronPropietarios.jsx"
import ListExpedientesPropietarios from "../pages/ListExpedientesPropietarios.jsx";
import ConsejoDirectivoView from "../container/ConsejoDirectivo.jsx"
import RegistrarNuevoPropietario from "../components/RegistrarNuevoPropietario.jsx";
const App=()=>{
 

    return(
        <BrowserRouter>
        <Routes >
          
          <Route path="/login" element={<Auth/>} />
          <Route path="/home-conglomerado" element={<HomeConglomerado/>} />
          <Route path="/perfil-socios" element={<PerfilSociosConglomerados/>} />
          <Route path="/register-directivos" element={<ConsejoDirectivoView/>} />
          <Route path="/sidebar" element={<SidebarMenu/>} />
          <Route path="/register-padron-propietarios" element={<ListPropietarios/>} />
          <Route path="/expediente" element={<ListExpedientesPropietarios/>} />
          <Route path="/formpropietario" element={<RegistrarNuevoPropietario/>} />
          </Routes >
        </BrowserRouter>
    );
}

export default App;