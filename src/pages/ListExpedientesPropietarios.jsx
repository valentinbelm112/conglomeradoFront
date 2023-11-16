import React , { useEffect,  useContext }from "react";
import { useParams } from "react-router-dom";
import NavbarConglomerado from "../components/NavbarConglomerados";
import SidebarMenu from "../components/SidebarMenu";
import ExpedientePropietario from "../components/ExpedientePropietario";
import Container_Nav_Sidb_Load from "../components/Container_Nav_Sidb_Load";
import {useGetExpedientePropietario} from "../hooks/useGetExpedientePropietario";
import { serverURL } from "../utils/Configuration";
import { useState } from "react";
import AuthContext from "../context/AuthContext";
const ListExpedientesPropietarios=(props)=>{
      const { login } = useContext(AuthContext);
      const { auth } =useContext(AuthContext);
    const { id,id2} = useParams();
    const [Estado,SetEstado]=useState(false);
    const [togle, setTogle] = useState(true);
    const [open, setOpen] = useState(false);
    const [openElement, setOpenElement] = useState(false);
    const {dataExpediente,isLoading,dataDetallePropietario,propietariosPartida,expedienteConyugue,coPropietario,partidasRegistrales,situacionAsiento}=useGetExpedientePropietario(`${serverURL}/cliente/consultar-reniec`,props.id1,props.id2,props.estadoGlobal);
   
    console.log(dataExpediente)
    
    useEffect(() => {
      login();
      
      console.log("Listen to Action");
    
}, [Estado]); // The second argument is an optional dependency array
  
useEffect(() => {
      // Función para verificar el tamaño de la pantalla y actualizar el estado
      const checkScreenSize = () => {
          setOpen(window.innerWidth > 767); // Cambiar a true si el ancho de la pantalla es menor a 768px
          setOpenElement(window.innerWidth > 767);
      };

      // Verificar el tamaño de la pantalla al cargar el componente y cada vez que cambie el tamaño de la ventana
      checkScreenSize();
      window.addEventListener("resize", checkScreenSize);

      // Limpiar el event listener al desmontar el componente
      return () => {
          window.removeEventListener("resize", checkScreenSize);
      };
  }, []);

const EstadoNavbar = () => {
      setOpen(!open);
  };
  
    const cambiarEstadoPadre = () => {
    
      SetEstado(!Estado); // Cambiar el valor booleano
    
      };

    if(isLoading && auth){
  
        return (
                <Container_Nav_Sidb_Load/>
          );
    }
    
    return (
      
        <div className="navbar-sidebar-directivos">
        <NavbarConglomerado  Estado={EstadoNavbar} />
          <div className="container-Sidebar-view-directivo">
          {open ? null : (
            <div className={open === false && "sidebar-transition"}>
              <SidebarMenu setTogle={setTogle} />
            </div>
          )}
                <ExpedientePropietario expediente={dataExpediente} expedienteCony={expedienteConyugue} padron={dataDetallePropietario} propietario={propietariosPartida} cambiarEstado={cambiarEstadoPadre}  nombreExpedienteProp={coPropietario} partidasRegistrales={partidasRegistrales} situacionAsiento={situacionAsiento}/>
          </div>
          
          
          </div>

    );
}

export default ListExpedientesPropietarios;