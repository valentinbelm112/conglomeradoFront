import React from "react";
import { useState } from "react";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PublishIcon from '@mui/icons-material/Publish';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { serverURL } from "../utils/Configuration";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDownAZ } from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import "./styles/PadronPropietrio.scss"
import NavbarConglomerado from "../components/NavbarConglomerados";
import SidebarMenu from "../components/SidebarMenu";
import RegistrarNuevoPropietario from "../components/RegistrarNuevoPropietario";
import Container_Nav_Sidb_Load from "../components/Container_Nav_Sidb_Load";
import { useGetPadronPropietarioComponenteRender } from "../hooks/useGetPadronPropietario";
import { UseGetPadronPropietario } from "../hooks/useGetPadronPropietario";
import { Link } from 'react-router-dom';
const PadronPropietario = () => {
    const [refrescar ,setRefrescar]=useState([]);
    const [sortOrder, setSortOrder] = useState('asc');

  // Función para cambiar el orden de clasificación

  const handleSort = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newOrder);
    const sortedPadronPropietario = [...refrescar].sort((a, b) =>
      newOrder === 'asc' ? a.des_codigo_Dni.localeCompare(b.des_codigo_Dni) : b.des_codigo_Dni.localeCompare(a.des_codigo_Dni)
    );
    setRefrescar(sortedPadronPropietario);
  };

  const handleSortApellidos = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newOrder);
    const sortedPadronPropietario = [...refrescar].sort((a, b) =>
      newOrder === 'asc' ? a.des_Apellidos.localeCompare(b.des_Apellidos) : b.des_Apellidos.localeCompare(a.des_Apellidos)
    );
    setRefrescar(sortedPadronPropietario);
  };



    const RefrescarInformacion = async() => {
       
         const {response} =await useGetPadronPropietarioComponenteRender(`${serverURL}/Propietarios/Obtener`)
        setRefrescar(response.data)
        
       }


    const {isLoading,dataPropietario} =UseGetPadronPropietario(`${serverURL}/Propietarios/Obtener`,setRefrescar)
    
    const handleClickOpenForm = () => {
        const parrafo = document.querySelector('#modal-mostrar-form-documento-propietarios-person-add-import');
        parrafo.style.top = '95px'
      };
    
    
    if (isLoading) {

        return (
        <>
          <Container_Nav_Sidb_Load/>
        </>
        )
      }
    
    
    return (
        <>
            <div className="navbar-sidebar-directivos">
                <NavbarConglomerado />
                <div className="container-Sidebar-view-directivo">
                    <SidebarMenu />
                    <div className="conatiner-registro-padron-propietarios">
                        <div className="row container-busqueda-upload-documentos">
                            <div className="col-md-4 search-register-propietarios">
                                <div>
                                    Buscar
                                </div>
                                <div className="container-input-search-list-propietarios">
                                    <input type="text" >

                                    </input>
                                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                                </div>
                            </div>
                            <div className="col-md-8 upload-documents-propietarios">
                                <div>
                                    <input id="mostrar-form-documento-propietarios-upload" name="modal" type="radio" />
                                    <label for="mostrar-form-documento-propietarios-upload"> Documento del Padron de Propietarios </label>
                                </div>
                                <div className="row">
                                    <div className="col-md-3 registrar-nuevo-propietarios-add-delete-export-import">
                                        <div>
                                            <input id="mostrar-form-documento-propietarios-person-add" name="modal" type="radio" />
                                            <label for="mostrar-form-documento-propietarios-person-add" onClick={handleClickOpenForm}> <PersonAddIcon /> Registrar </label>
                                            <div id="modal-mostrar-form-documento-propietarios-person-add-import">
                                            <RegistrarNuevoPropietario RefrescarInformacion={RefrescarInformacion}  />
                                        </div>
                                        </div>


                                    </div>
                                    <div className="col-md-3 registrar-nuevo-propietarios-add-delete-export-import">
                                        <div>
                                            <input id="mostrar-form-documento-propietarios-person-add-delete" name="modal" type="radio" />
                                            <label for="mostrar-form-documento-propietarios-person-add-delete"> <PersonRemoveIcon /> Dar de Baja </label>
                                        </div>


                                    </div>

                                    <div className="col-md-3 registrar-nuevo-propietarios-add-delete-export-import">
                                        <div>
                                            <input id="mostrar-form-documento-propietarios-person-add-export" name="modal" type="radio" />
                                            <label for="mostrar-form-documento-propietarios-person-add-export"> <PublishIcon /> Importar </label>
                                        </div>


                                    </div>

                                    <div className="col-md-3 registrar-nuevo-propietarios-add-delete-export-import">
                                        <div>
                                            <input id="mostrar-form-documento-propietarios-person-add-import" name="modal" type="radio" />
                                            <label for="mostrar-form-documento-propietarios-person-add-import"> <FileDownloadIcon /> Exportar</label>
                                        </div>


                                    </div>
                                </div>


                            </div>
                        </div>
                        <div className="container-list-table-registro-propietarios">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">
                                            <div className="container-order-a-z-propietario">
                                                <div>
                                                    Codigo Propietario
                                                </div>
                                                <button className="title-codigo-propietario">
                                                    <FontAwesomeIcon icon={faArrowDownAZ} />
                                                </button>
                                            </div>

                                        </th>
                                        <th scope="col">
                                            <div className="container-order-a-z-propietario">
                                                <div>
                                                    Apellidos Completos
                                                </div>
                                                <button className="title-codigo-propietario" onClick={handleSortApellidos}>
                                                    <FontAwesomeIcon icon={faArrowDownAZ} />
                                                </button>
                                            </div></th>
                                        <th scope="col">Nombres Completos</th>
                                        <th scope="col">
                                            <div className="container-order-a-z-propietario">
                                                <div>
                                                    DNI
                                                </div>
                                                <button className="title-codigo-propietario" onClick={handleSort}>
                                                    <FontAwesomeIcon icon={faArrowDownAZ} />
                                                </button>
                                            </div>
                                        </th>
                                        <th scope="col">Nª Partida</th>
                                        <th scope="col">Oficina Principal</th>
                                        <th scope="col">Tipo Dominio</th>
                                        <th scope="col">Dirección</th>
                                        <th scope="col">Estado</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        refrescar.map((propietario)=>(
                                     <tr>
                                        <td>{propietario.des_codigo_propietario}</td>
                                        <td>{propietario.des_Apellidos}</td>
                                        <td>{propietario.des_nombres}</td>
                                        <td>
                                        <Link  to={`/expediente/${propietario.des_codigo_Dni}`} style={{ textDecoration: 'none',  color: 'inherit'}}>
                                        {propietario.des_codigo_Dni} 
                                        </Link> 
                                        </td>                                            
                                        <td>{propietario.inmuebleEntities[0].num_partida_registral}</td>
                                        <td>{propietario.inmuebleEntities[0].des_oficina_registral}</td>
                                        <td>{propietario.inmuebleEntities[0].des_tipo_dominio}</td>
                                        <td>{propietario.inmuebleEntities[0].des_direccion}</td>
                                        <td>@activo</td>                                                                                   
                                    </tr>

                                    ))
                                    }
                                    
                                 
                                </tbody>
                            </table>


                        </div>

                    </div>
                </div>
            </div>

        </>

    );
}

export default PadronPropietario;