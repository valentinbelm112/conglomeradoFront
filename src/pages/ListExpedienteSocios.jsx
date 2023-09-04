import React ,{useState,useEffect}from "react";
import { useParams } from "react-router-dom";
import NavbarConglomerado from "../components/NavbarConglomerados";
import SidebarMenu from "../components/SidebarMenu";
import ExpedientePropietarioSocio from "../components/ExpedientePropietarioSocio";
import { useGetExpediente } from "../hooks/useGetExpediente";
const ListExpedientesSocios=()=>{
    const[open,setOpen]=useState(false);
    const { id } = useParams();
    const hola = useGetExpediente(id);

    const Estado=()=>{
        console.log("HHHH")
        setOpen(!open)
       }
    
       useEffect(() => {
        // Función para verificar el tamaño de la pantalla y actualizar el estado
        const checkScreenSize = () => {
            setOpen(window.innerWidth < 767); // Cambiar a true si el ancho de la pantalla es menor a 768px
        };
    
        // Verificar el tamaño de la pantalla al cargar el componente y cada vez que cambie el tamaño de la ventana
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
    
        // Limpiar el event listener al desmontar el componente
        return () => {
          window.removeEventListener('resize', checkScreenSize);
        };
      }, []);
      
    return (
        <div className="navbar-sidebar-directivos" style={{height:`100%`}}>
        <NavbarConglomerado  Estado={Estado}/>
        <div className="container-Sidebar-view-directivo">
        {
            open?
           null
            : <div className={open===false&&"sidebar-transition"}>
            <SidebarMenu />
            </div>
           } 
          <ExpedientePropietarioSocio/>
          </div>
          </div>
    );
}

export default ListExpedientesSocios;