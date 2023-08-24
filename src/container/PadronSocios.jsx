
import React, { useState,useEffect } from "react";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PublishIcon from '@mui/icons-material/Publish';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import "./styles/PadronSocios.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDownAZ } from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import NavbarConglomerado from "../components/NavbarConglomerados";
import SidebarMenu from "../components/SidebarMenu";

const ListProdronSocios = () => {
   const[open,setOpen]=useState(false);

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
        <>
<div className="navbar-sidebar-directivos">
        <NavbarConglomerado Estado={Estado}/>
        <div className="container-Sidebar-view-directivo">
           {
            open?
           null
            : <div className={open===false&&"sidebar-transition"}>
            <SidebarMenu />
            </div>
           } 
          
          <div className="conatiner-registro-padron-socios">
            <div className="row container-busqueda-upload-documentos">
                <div className="col-md-4 search-register-socios">
                
                    <div className="container-input-search-list-socios">
                        <input type="text"  placeholder="Buscar">

                        </input>
                        <FontAwesomeIcon icon={faMagnifyingGlass} style={{color:`white`}}/>
                    </div>
                </div>
                <div className="col-md-8 upload-documents-socios">
                   
                    <div className="row">
                        <div className="col-md-3 registrar-nuevo-socios-add-delete-export-import">
                            <div>
                                <input id="mostrar-form-documento-socios-person-add" name="modal" type="radio" />
                                <label for="mostrar-form-documento-socios-person-add"> <PersonAddIcon /> Registrar </label>
                            </div>


                        </div>
                        <div className="col-md-3 registrar-nuevo-socios-add-delete-export-import">
                            <div>
                                <input id="mostrar-form-documento-socios-person-add-delete" name="modal" type="radio" />
                                <label for="mostrar-form-documento-socios-person-add-delete"> <PersonRemoveIcon /> Dar de Baja </label>
                            </div>


                        </div>

                        <div className="col-md-3 registrar-nuevo-socios-add-delete-export-import">
                            <div>
                                <input id="mostrar-form-documento-socios-person-add-export" name="modal" type="radio" />
                                <label for="mostrar-form-documento-socios-person-add-export"> <PublishIcon /> Importar </label>
                            </div>


                        </div>

                        <div className="col-md-3 registrar-nuevo-socios-add-delete-export-import">
                            <div>
                                <input id="mostrar-form-documento-socios-person-add-import" name="modal" type="radio" />
                                <label for="mostrar-form-documento-socios-person-add-import"> <FileDownloadIcon /> Exportar</label>
                            </div>


                        </div>
                    </div>


                </div>
            </div>
            <div className="table-responsive container-list-table-registro-socios">
                <table class="table">
                    <thead>
                        <tr >
                            <th scope="col" style={{ backgroundColor: 'lightblue', padding: '8px',  borderTop: '2px solid white', borderLeft: '2px solid white', borderBottom: '2px solid white' ,whiteSpace: 'nowrap' }}>
                                <div className="container-order-a-z-socio">
                                    <div>
                                        Codigo de socio
                                    </div>
                                    <button className="title-codigo-socio">
                                        <FontAwesomeIcon icon={faArrowDownAZ} style={{color:`red`}} />
                                    </button>
                                </div>

                            </th>
                            <th scope="col" style={{ backgroundColor: 'lightblue', padding: '8px',  borderTop: '2px solid white', borderLeft: '2px solid white', borderBottom: '2px solid white' ,whiteSpace: 'nowrap' }}>
                                <div className="container-order-a-z-socio">
                                    <div >
                                        Apellidos Completos
                                    </div>
                                    <button className="title-codigo-socio">
                                        <FontAwesomeIcon icon={faArrowDownAZ} style={{color:`red`}}/>
                                    </button>
                                </div></th>
                            <th scope="col" style={{ backgroundColor: 'lightblue', padding: '8px',  borderTop: '2px solid white', borderLeft: '2px solid white', borderBottom: '2px solid white' ,whiteSpace: 'nowrap'}}>Nombres Completos</th>
                            <th scope="col" style={{ backgroundColor: 'lightblue', padding: '8px',  borderTop: '2px solid white', borderLeft: '2px solid white', borderBottom: '2px solid white' ,whiteSpace: 'nowrap' }}>
                                <div className="container-order-a-z-socio">
                                    <div>
                                        DNI
                                    </div>
                                    <button className="title-codigo-socio">
                                        <FontAwesomeIcon icon={faArrowDownAZ}  style={{color:`red`}}/>
                                    </button>
                                </div>
                            </th>
                            <th scope="col" style={{ backgroundColor: 'lightblue', padding: '8px',  borderTop: '2px solid white', borderLeft: '2px solid white', borderBottom: '2px solid white' ,whiteSpace: 'nowrap' }}>Pabellón</th>
                            <th scope="col" style={{ backgroundColor: 'lightblue', padding: '8px',  borderTop: '2px solid white', borderLeft: '2px solid white', borderBottom: '2px solid white' ,whiteSpace: 'nowrap' }}>Puesto</th>
                            <th scope="col" style={{ backgroundColor: 'lightblue', padding: '8px',  borderTop: '2px solid white', borderLeft: '2px solid white', borderBottom: '2px solid white' ,whiteSpace: 'nowrap' }} >Dirección</th>
                            <th scope="col" style={{ backgroundColor: 'lightblue', padding: '8px',  borderTop: '2px solid white', borderLeft: '2px solid white', borderBottom: '2px solid white' ,whiteSpace: 'nowrap' }}>Giro</th>
                            <th scope="col" style={{ backgroundColor: 'lightblue', padding: '8px',  borderTop: '2px solid white', borderLeft: '2px solid white', borderBottom: '2px solid white' ,whiteSpace: 'nowrap' }}>Estado</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Mark</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td>Otto</td>
                            <td>activo</td>
                        </tr>
                        <tr>
                            <td>Mark</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td>Otto</td>
                            <td>activo</td>
                        </tr>
                        <tr>
                            <td>Mark</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td>Otto</td>
                            <td>activo</td>
                        </tr>
                    </tbody>
                </table>


            </div>

        </div>
          </div>
          </div>

        </>
       
    );
}

export default ListProdronSocios;