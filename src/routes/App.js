import React from "react";
import { BrowserRouter, Route, Routes  } from "react-router-dom";
import Auth from "../pages/Auth.jsx";
import PerfilSociosConglomerados from "../pages/PerfilSociosConglomerados.jsx";
import HomeConglomerado from "../pages/HomeConglomerado.jsx";
import SidebarMenu from "../components/SidebarMenu.jsx";
import ListPropietarios from "../pages/PadronPropietarios.jsx"
import ListExpedientesPropietarios from "../pages/ListExpedientesPropietarios.jsx";
import ConsejoDirectivoView from "../container/ConsejoDirectivo.jsx"
import PadronSociosView from "../pages/PadronSociosView.jsx";
import ListExpedientesSocios from "../pages/ListExpedienteSocios.jsx";
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
          <Route path="/expediente/:id/:id2" element={<ListExpedientesPropietarios/>} />
          <Route path="/register-padron-socios" element={<PadronSociosView/>} />
          <Route path="expediente-socio/:id" element={<ListExpedientesSocios/>} />
          </Routes >
        </BrowserRouter>
    );
}



export default App;