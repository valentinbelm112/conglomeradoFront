import React from "react";
import { BrowserRouter, Route, Routes  } from "react-router-dom";
import Auth from "../pages/Auth.jsx";
import PerfilSociosConglomerados from "../pages/PerfilSociosConglomerados.jsx";
import HomeConglomerado from "../pages/HomeConglomerado.jsx";
import SidebarMenu from "../components/SidebarMenu.jsx";
import ListPropietarios from "../pages/PadronPropietarios.jsx"
import ListExpedientesPropietarios from "../pages/ListExpedientesPropietarios.jsx";
import ConsejoDirectivoView from "../pages/ConsejoDirectivoView.jsx";
import PadronSociosView from "../pages/PadronSociosView.jsx";
import PadronInquilinoView from "../pages/PadronInquilinoView.jsx";
import ListExpedientesSocios from "../pages/ListExpedienteSocios.jsx";
import useInitialAuth from "../hooks/useInitialAuth.js";
import AuthContext from "../context/AuthContext.jsx";
import App2 from "../pages/App.jsx";
import ListExpedientesInquilino from "../pages/ListExpedienteInquilino.jsx";
import FormDarBajaPropietario from "../components/FormDarBajaPropietario.jsx";
const App=()=>{
  
  const useinitialAuth = useInitialAuth();
    return(
      <AuthContext.Provider value={useinitialAuth}>
        <BrowserRouter>
        <Routes >         
          <Route path="/login" element={<Auth/>} />
          <Route path="/home-conglomerado" element={<HomeConglomerado/>} />
          <Route path="/register-directivos" element={<ConsejoDirectivoView/>} />
          <Route path="/sidebar" element={<SidebarMenu/>} />
          <Route path="/register-padron-propietarios" element={<ListPropietarios/>} />
          <Route path="/register-padron-inquilino" element={<PadronInquilinoView/>} />
          <Route path="/expediente/:id/:id2" element={<ListExpedientesPropietarios/>} />
          <Route path="/register-padron-socios" element={<PadronSociosView/>} />
          <Route path="/expediente-socio/:id/:id2" element={<ListExpedientesSocios/>} />
          <Route path="/cgm/perfil" element={<PerfilSociosConglomerados/>} />
          <Route path="/lista/registro/usuarios" element={<FormDarBajaPropietario/>} />
          <Route path="/expediente-inquilino/:id/:id2" element={<ListExpedientesInquilino/>} />
          </Routes >
        </BrowserRouter>
        </AuthContext.Provider>
    );
}



export default App;