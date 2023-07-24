
import React from "react";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PublishIcon from '@mui/icons-material/Publish';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDownAZ } from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import "./styles/PadronPropietrio.scss"
import NavbarConglomerado from "../components/NavbarConglomerados";
import SidebarMenu from "../components/SidebarMenu";

const ListPropietarios = () => {
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
                                <label for="mostrar-form-documento-propietarios-person-add"> <PersonAddIcon /> Registrar </label>
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
                                    <button className="title-codigo-propietario">
                                        <FontAwesomeIcon icon={faArrowDownAZ} />
                                    </button>
                                </div></th>
                            <th scope="col">Nombres Completos</th>
                            <th scope="col">
                                <div className="container-order-a-z-propietario">
                                    <div>
                                        DNI
                                    </div>
                                    <button className="title-codigo-propietario">
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

export default ListPropietarios;