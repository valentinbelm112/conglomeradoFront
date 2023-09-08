import React, { useState,useEffect } from "react";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PublishIcon from '@mui/icons-material/Publish';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import "./styles/PadronInquilino.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDownAZ } from '@fortawesome/free-solid-svg-icons'
import NavbarConglomerado from "../components/NavbarConglomerados";
import SidebarMenu from "../components/SidebarMenu";
import SearchBar from "../components/ButtonConglomerado";
import { Height } from "@mui/icons-material";
const ListProdronInquilino = () => {
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
  
<div className="navbar-sidebar-directivos" style={{height:`100%`}}>
        <NavbarConglomerado Estado={Estado}/>
      
        <div className="container-Sidebar-view-directivo">
           
        {
            open?
           null
            : <div className={open===false&&"sidebar-transition"}>
            <SidebarMenu />
            </div>
           } 
      
          <div className="conatiner-registro-padron-inquilino">
          <div className="title-Inquilinos-registrados">
             Inquilinos Registrados
              </div>
            <div className="row container-busqueda-upload-documentos">
                <div className="col-md-4 search-register-inquilino">
                
                    <div className="container-input-search-list-inquilino">
                        <SearchBar/>
                    </div>
                </div>
                <div className="col-md-8 upload-documents-inquilino">
                
                    <div className="row">
                        <div className="col-auto registrar-nuevo-inquilino-add-delete-export-import">
                            <div>
                                <input id="mostrar-form-documento-inquilino-person-add" name="modal" type="radio" />
                                <label for="mostrar-form-documento-inquilino-person-add"> <PersonAddIcon /> <span className="button-text">Registrar</span> </label>
                            </div>


                        </div>
                        <div className="col-auto registrar-nuevo-inquilino-add-delete-export-import">
                            <div>
                                <input id="mostrar-form-documento-inquilino-person-add-delete" name="modal" type="radio" />
                                <label for="mostrar-form-documento-inquilino-person-add-delete"> <PersonRemoveIcon /> <span className="button-text">Dar de Baja</span> </label>
                            </div>


                        </div>

                        <div className="col-auto registrar-nuevo-inquilino-add-delete-export-import">
                            <div>
                                <input id="mostrar-form-documento-inquilino-person-add-export" name="modal" type="radio" />
                                <label for="mostrar-form-documento-inquilino-person-add-export"> <PublishIcon /> <span className="button-text">Importar</span>  </label>
                            </div>


                        </div>

                        <div className="col-auto registrar-nuevo-inquilino-add-delete-export-import">
                            <div>
                                <input id="mostrar-form-documento-inquilino-person-add-import" name="modal" type="radio" />
                                <label for="mostrar-form-documento-inquilino-person-add-import"> <FileDownloadIcon /> <span className="button-text">Exportar</span></label>
                            </div>


                        </div>
                    </div>


                </div>
            </div>
            <div class="card-body">
                <div class="outer-table-registro-inquilino ">
            <div className="table-responsive container-list-table-registro-inquilino">
                <table class="table table-bordered table-condensed table-hover table-striped">
                    <thead>
                        <tr >
                            <th scope="col" style={{ backgroundColor: '#a2c8f2', padding: '8px',  borderTop: '2px solid white', borderLeft: '2px solid white', borderBottom: '2px solid white' ,whiteSpace: 'nowrap',fontSize:'12px' }}>
                                <div className="container-order-a-z-inquilino">
                                    <div>
                                        Codigo de Inquilino
                                    </div>
                                    <button className="title-codigo-inquilino">
                                        <FontAwesomeIcon icon={faArrowDownAZ} style={{color:`red`}} />
                                    </button>
                                </div>

                            </th>
                            <th scope="col" style={{ backgroundColor: '#a2c8f2', padding: '8px',  borderTop: '2px solid white', borderLeft: '2px solid white', borderBottom: '2px solid white' ,whiteSpace: 'nowrap',fontSize:'12px' }}>
                                <div className="container-order-a-z-inquilino">
                                    <div >
                                        Apellidos Completos
                                    </div>
                                    <button className="title-codigo-inquilino">
                                        <FontAwesomeIcon icon={faArrowDownAZ} style={{color:`red`}}/>
                                    </button>
                                </div></th>
                            <th scope="col" style={{ backgroundColor: '#a2c8f2', padding: '8px',  borderTop: '2px solid white', borderLeft: '2px solid white', borderBottom: '2px solid white' ,whiteSpace: 'nowrap',fontSize:'12px'}}>Nombres Completos</th>
                            <th scope="col" style={{ backgroundColor: '#a2c8f2', padding: '8px',  borderTop: '2px solid white', borderLeft: '2px solid white', borderBottom: '2px solid white' ,whiteSpace: 'nowrap',fontSize:'12px' }}>
                                <div className="container-order-a-z-inquilino">
                                    <div>
                                        DNI
                                    </div>
                                    <button className="title-codigo-inquilino">
                                        <FontAwesomeIcon icon={faArrowDownAZ}  style={{color:`red`}}/>
                                    </button>
                                </div>
                            </th>
                            <th scope="col" style={{ backgroundColor: '#a2c8f2', padding: '8px',  borderTop: '2px solid white', borderLeft: '2px solid white', borderBottom: '2px solid white' ,whiteSpace: 'nowrap',fontSize:'12px' }}>Pasaje</th>
                            <th scope="col" style={{ backgroundColor: '#a2c8f2', padding: '8px',  borderTop: '2px solid white', borderLeft: '2px solid white', borderBottom: '2px solid white' ,whiteSpace: 'nowrap',fontSize:'12px' }}>Puesto</th>
                            <th scope="col" style={{ backgroundColor: '#a2c8f2', padding: '8px',  borderTop: '2px solid white', borderLeft: '2px solid white', borderBottom: '2px solid white' ,whiteSpace: 'nowrap',fontSize:'12px' }} >Dirección</th>
                            <th scope="col" style={{ backgroundColor: '#a2c8f2', padding: '8px',  borderTop: '2px solid white', borderLeft: '2px solid white', borderBottom: '2px solid white' ,whiteSpace: 'nowrap',fontSize:'12px' }}>Giro</th>
                            <th scope="col" style={{ backgroundColor: '#a2c8f2', padding: '8px',  borderTop: '2px solid white', borderLeft: '2px solid white', borderBottom: '2px solid white' ,whiteSpace: 'nowrap',fontSize:'12px' }}>Estado</th>

                        </tr>
                    </thead>
                    <tbody>
                           <td style={{fontSize:'12px'}}>Mark</td>
                            <td style={{fontSize:'12px'}}>Mark</td>
                            <td style={{fontSize:'12px'}}>Otto</td>
                            <td style={{fontSize:'12px'}}>@mdo</td>
                            <td style={{fontSize:'12px'}}>@mdo</td>
                            <td style={{fontSize:'12px'}}>@mdo</td>
                            <td style={{fontSize:'12px'}} >@mdo</td>
                            <td style={{fontSize:'12px'}} >Otto</td>
                            <td style={{fontSize:'12px'}} >activo</td>
                    </tbody>
               
                </table>


            </div>
            </div>
            </div>
        </div>
          </div>
          </div>

   
       
    );
}

export default ListProdronInquilino;