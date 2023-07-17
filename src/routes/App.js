import React from "react";
import { BrowserRouter, Route, Routes  } from "react-router-dom";
import Auth from "../pages/Auth.jsx";
import PerfilSociosConglomerados from "../pages/PerfilSociosConglomerados.jsx";
import HomeConglomerado from "../pages/HomeConglomerado.jsx";
import ConsejoDirectivo from "../pages/ConsejoDirectivo.jsx";
import SidebarMenu from "../components/SidebarMenu.jsx";
import FormRegistrosDirectivos from "../components/FormRegistrosDirectivos.jsx";
const App=()=>{
 

    return(
        <BrowserRouter>
        <Routes >
          
          <Route path="/login" element={<Auth/>} />
          <Route path="/home-conglomerado" element={<HomeConglomerado/>} />
          <Route path="/perfil-socios" element={<PerfilSociosConglomerados/>} />
          <Route path="/register-directivos" element={<ConsejoDirectivo/>} />
          <Route path="/sidebar" element={<SidebarMenu/>} />
          <Route path="/form" element={<FormRegistrosDirectivos/>} />
          </Routes >
        </BrowserRouter>
    );
}

export default App;