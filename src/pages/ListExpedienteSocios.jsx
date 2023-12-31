import React ,{useState,useEffect,useContext}from "react";
import { useParams } from "react-router-dom";
import NavbarConglomerado from "../components/NavbarConglomerados";
import SidebarMenu from "../components/SidebarMenu";
import ExpedientePropietarioSocio from "../components/ExpedientePropietarioSocio";
import { useGetExpedienteSocio } from "../hooks/useGetExpedienteSocio";
import { serverURL } from "../utils/Configuration";
import AuthContext from "../context/AuthContext";
import ContainerNavSidbLoad from "../components/Container_Nav_Sidb_Load";
const ListExpedientesSocios=(props)=>{
    const[open,setOpen]=useState(false);
    const { login } = useContext(AuthContext);
    const [Estado,SetEstado]=useState(false);
  
    const {dataExpediente,isLoading,dataDetallePropietario,sociosPabellon,expedienteConyugue,coPropietario,pabellones}=useGetExpedienteSocio(`${serverURL}/cliente/consultar-reniec`,props.id1,
    props.id2,
    props.estadoGlobal);
    const Estado1=()=>{

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

      useEffect(() => {
        login();
        console.log("Listen to Action");
      
  }, [Estado]); // The second argument is an optional dependency array
    
    
      const cambiarEstadoPadre = () => {
      
        SetEstado(!Estado); // Cambiar el valor booleano
      
        };
   if(isLoading ){
  
          return (
                  <ContainerNavSidbLoad/>
            );
      }
    return (
        <div className="navbar-sidebar-directivos" style={{height:`100%`}}>
        <NavbarConglomerado  Estado={Estado1}/>
        <div className="container-Sidebar-view-directivo">
        {
            open?
           null
            : <div className={open===false&&"sidebar-transition"}>
            <SidebarMenu />
            </div>
           } 
           <ExpedientePropietarioSocio expediente={dataExpediente} expedienteCony={expedienteConyugue} padron={dataDetallePropietario} propietario={sociosPabellon} cambiarEstado={cambiarEstadoPadre}  nombreExpedienteProp={coPropietario} pabellones={pabellones}/>
          </div>
          </div>
    );
}

export default ListExpedientesSocios;