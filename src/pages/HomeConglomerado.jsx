import NavbarConglomerado from "../components/NavbarConglomerados";
import SidebarMenu from "../components/SidebarMenu";
import { ToastContainer, toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import React, { useEffect } from 'react';
const HomeConglomerado=()=>{
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const successMessage = queryParams.get('successLogin');
    useEffect(() => {
        if (successMessage) {
          // Mostrar el mensaje de éxito usando un componente de notificación
          // Por ejemplo, usando la biblioteca "toast-library"
          toast.success("Inicio de sesión realizado con éxito");
        }
      }, [successMessage]);

    return(
        <div className="navbar-sidebar-directivos">
         <NavbarConglomerado/>
         <SidebarMenu/>
          <ToastContainer />
        </div>
    );
}

export default HomeConglomerado;