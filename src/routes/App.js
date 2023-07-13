import React from "react";
import { BrowserRouter, Route, Routes  } from "react-router-dom";
import Auth from "../pages/Auth.jsx";
import ListSociosCongloremerados from "../pages/ListSociosConglomerados.jsx"
import PerfilSociosConglomerados from "../pages/PerfilSociosConglomerados.jsx";


const App=()=>{
 

    return(
        <BrowserRouter>
        <Routes >
          
          <Route path="/home" element={<Auth/>} />
          <Route path="/listar-socios" element={<ListSociosCongloremerados/>} />
          <Route path="/perfil-socios" element={<PerfilSociosConglomerados/>} />
          
          </Routes >
        </BrowserRouter>
    );
}

export default App;