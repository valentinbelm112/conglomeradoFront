import React from "react";
import { useState } from "react";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PublishIcon from '@mui/icons-material/Publish';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { serverURL } from "../utils/Configuration";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDownAZ } from '@fortawesome/free-solid-svg-icons'
import SearchBar from "../components/ButtonConglomerado";
import "./styles/PadronPropietrio.scss"
import NavbarConglomerado from "../components/NavbarConglomerados";
import SidebarMenu from "../components/SidebarMenu";
import RegistrarNuevoPropietario from "../components/RegistrarNuevoPropietario";
import Container_Nav_Sidb_Load from "../components/Container_Nav_Sidb_Load";
import { useGetPadronPropietarioComponenteRender } from "../hooks/useGetPadronPropietario";
import { UseGetPadronPropietario } from "../hooks/useGetPadronPropietario";
import FormDarBajaPropietario from "../components/FormDarBajaPropietario";
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import FormInportPropietario from "../components/FormImportarPropietarios";
import UseGetExportPropietario from "../hooks/useGetExportExcelPropietario";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";

const PadronPropietario = () => {
    const [refrescar, setRefrescar] = useState([]);
    const [search, setSearch] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc');
    const [pdfFile, setPdfFile] = useState(null);

    const { isLoading, dataPropietario } = UseGetPadronPropietario(`${serverURL}/Propietarios/Obtener`, setRefrescar)
    console.log(dataPropietario);

    const DeleteRegisterConsejo=async(id)=>{
        console.log(id + "identificador")
        //await UseDeleteConsejoDirectivo(`${serverURL}/CGM/delete/${id}`);
       // const { response} = await useGetConsejoDirectivoListarRefre(`${serverURL}/CGM/listar`);
       //setRefrescar(response.data)
      }
    
    


    const ExportarPropietario = () => {

        UseGetExportPropietario(`${serverURL}/Propietarios/export-propietarios`);


    }

    const handleSearch = (e) => {
        const searchText = e.value.toUpperCase(); // Convert search input to uppercase
        console.log('Valor del input:', searchText);
        setSearch(refrescar.filter(item => item.desDni.includes(e.value) || item.des_Apellidos.toUpperCase().includes(searchText) || item.des_nombres.toUpperCase().includes(searchText)));
        console.log("hola")
    };


    const handleSort = () => {
        const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newOrder);
        const sortedPadronPropietario = [...refrescar].sort((a, b) =>
            newOrder === 'asc' ? a.desDni.localeCompare(b.desDni) : b.desDni.localeCompare(a.desDni)
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



    const RefrescarInformacion = async () => {

        const { response } = await useGetPadronPropietarioComponenteRender(`${serverURL}/Propietarios/Obtener`)
        setRefrescar(response.data)

    }


    

    const handleClickOpenForm = () => {
        const parrafo = document.querySelector('#modal-mostrar-form-documento-propietarios-person-add-import');
        parrafo.style.top = '95px'
    };

    const handleClickDarBajaOpenForm = () => {
        const parrafo = document.querySelector('#modal-mostrar-form-documento-propietarios-person-dar-baja');
        parrafo.style.top = '95px'
    };



    if (isLoading) {

        return (
            <>
                <Container_Nav_Sidb_Load />
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
                        <div className="title-Inquilinos-registrados">
                            Propietarios Registrados
                        </div>

                        <div className="row container-busqueda-upload-documentos" style={{ marginTop: `10px` }}>
                            <div className="col-md-3 search-register-propietarios">

                                <div className="col-md-4 search-register-socios">

                                    <div className="container-input-search-list-socios">
                                        <SearchBar onSearch={handleSearch} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-7 upload-documents-propietarios">
                                
                                <div className="row">
                                    <div className="col-auto registrar-nuevo-propietarios-add-delete-export-import">
                                        <div>
                                            <input id="mostrar-form-documento-propietarios-person-add" name="modal" type="radio" />
                                            <label for="mostrar-form-documento-propietarios-person-add" onClick={handleClickOpenForm}> <PersonAddIcon /> <span className="button-text">Registrar</span> </label>
                                            <div id="modal-mostrar-form-documento-propietarios-person-add-import">
                                                <RegistrarNuevoPropietario RefrescarInformacion={RefrescarInformacion} />
                                            </div>
                                        </div>


                                    </div>
                                    <div className="col-auto registrar-nuevo-propietarios-add-delete-export-import">
                                        <div>
                                            <input id="mostrar-form-documento-propietarios-person-add-delete" name="modal" type="radio" />
                                            <label for="mostrar-form-documento-propietarios-person-add-delete" onClick={handleClickDarBajaOpenForm}> <PersonRemoveIcon /><span className="button-text">Dar de Baja</span> </label>
                                            <div id="modal-mostrar-form-documento-propietarios-person-dar-baja">
                                                <FormDarBajaPropietario RefrescarInformacion={RefrescarInformacion} />
                                            </div>
                                        </div>


                                    </div>

                                    <div className="col-auto registrar-nuevo-propietarios-add-delete-export-import">
                                        <div>
                                            <input id="mostrar-form-documento-propietarios-person-add-export" name="modal" type="radio" />
                                            <label for="mostrar-form-documento-propietarios-person-add-export"> <PublishIcon /> <span className="button-text">Importar</span> </label>
                                            <div id="modal-mostrar-form-documento-propietarios-person-importar-excel">
                                                <FormInportPropietario RefrescarInformacion={RefrescarInformacion} />
                                            </div>
                                        </div>


                                    </div>

                                    <div className="col-auto registrar-nuevo-propietarios-add-delete-export-import">
                                        <div>
                                            <input id="mostrar-form-documento-propietarios-person-add-import" name="modal" type="radio" />
                                            <label for="mostrar-form-documento-propietarios-person-add-import"> <FileDownloadIcon /> <span onClick={ExportarPropietario} className="button-text">Exportar</span> </label>
                                        </div>


                                    </div>
                                </div>


                            </div>
                            <div className=" col-md-2 container-title-show-iamgen-ins">
                            <input
                 
                                id="mostrar-modal-documento-socio"
                                name="modal"
                                type="radio"
                                />

                                <label for="mostrar-modal-documento-socio">
                                {" "}
                                <FontAwesomeIcon icon={faFolderOpen} />{" "}
                                </label>

                
                  </div>
                </div>
                        <div class="card-body">
                            <div class="outer-table-registro-propietario ">
                                <div className="table-responsive container-list-table-registro-propietarios" style={{ marginTop: `13px` }}>
                                    <table class="table table-bordered table-condensed table-hover table-striped">
                                        <thead>
                                            <tr>
                                                <th scope="col" style={{ backgroundColor: 'lightblue', padding: '8px', borderTop: '2px solid white', borderLeft: '2px solid white', borderBottom: '2px solid white', whiteSpace: 'nowrap', fontSize: '16px' }}>
                                                    <div className="container-order-a-z-propietario">
                                                        <div>
                                                            Codigo Propietario
                                                        </div>
                                                        <button className="title-codigo-propietario">
                                                            <FontAwesomeIcon icon={faArrowDownAZ} style={{ color: `red` }} />
                                                        </button>
                                                    </div>

                                                </th>
                                                <th scope="col" style={{ backgroundColor: 'lightblue', padding: '8px', borderTop: '2px solid white', borderLeft: '2px solid white', borderBottom: '2px solid white', whiteSpace: 'nowrap', fontSize: '16px' }}>
                                                    <div className="container-order-a-z-propietario">
                                                        <div>
                                                            Apellidos Completos
                                                        </div>
                                                        <button className="title-codigo-propietario" onClick={handleSortApellidos}>
                                                            <FontAwesomeIcon icon={faArrowDownAZ} style={{ color: `red` }} />
                                                        </button>
                                                    </div></th>
                                                <th scope="col" style={{ backgroundColor: 'lightblue', padding: '8px', borderTop: '2px solid white', borderLeft: '2px solid white', borderBottom: '2px solid white', whiteSpace: 'nowrap', fontSize: '16px' }}>Nombres Completos</th>
                                                <th scope="col" style={{ backgroundColor: 'lightblue', padding: '8px', borderTop: '2px solid white', borderLeft: '2px solid white', borderBottom: '2px solid white', whiteSpace: 'nowrap', fontSize: '16px' }}>
                                                    <div className="container-order-a-z-propietario">
                                                        <div>
                                                            DNI
                                                        </div>
                                                        <button className="title-codigo-propietario" onClick={handleSort}>
                                                            <FontAwesomeIcon icon={faArrowDownAZ} style={{ color: `red` }} />
                                                        </button>
                                                    </div>
                                                </th>
                                                <th scope="col" style={{ backgroundColor: 'lightblue', padding: '8px', borderTop: '2px solid white', borderLeft: '2px solid white', borderBottom: '2px solid white', whiteSpace: 'nowrap', fontSize: '12px', fontSize: '16px' }}>Nª Partida</th>
                                                <th scope="col" style={{ backgroundColor: 'lightblue', padding: '8px', borderTop: '2px solid white', borderLeft: '2px solid white', borderBottom: '2px solid white', whiteSpace: 'nowrap', fontSize: '12px', fontSize: '16px' }}>Oficina Principal</th>
                                                <th scope="col" style={{ backgroundColor: 'lightblue', padding: '8px', borderTop: '2px solid white', borderLeft: '2px solid white', borderBottom: '2px solid white', whiteSpace: 'nowrap', fontSize: '12px', fontSize: '16px' }}>Tipo Dominio</th>
                                                <th scope="col" style={{ backgroundColor: 'lightblue', padding: '8px', borderTop: '2px solid white', borderLeft: '2px solid white', borderBottom: '2px solid white', whiteSpace: 'nowrap', fontSize: '12px', fontSize: '16px' }}>Dirección</th>
                                                <th scope="col" style={{ backgroundColor: 'lightblue', padding: '8px', borderTop: '2px solid white', borderLeft: '2px solid white', borderBottom: '2px solid white', whiteSpace: 'nowrap', fontSize: '12px', fontSize: '16px' }}>Estado</th>
                                                <th scope="col" style={{ backgroundColor: 'lightblue', padding: '8px', borderTop: '2px solid white', borderLeft: '2px solid white', borderBottom: '2px solid white', whiteSpace: 'nowrap', fontSize: '12px', fontSize: '16px' }}>Acción</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                (search.length === 0 ? refrescar : search).map((propietario) => (
                                                    propietario.inmuebleEntities.map((indexInmueble)=>(
                                                        <tr>
                                                        <td>{propietario.codigoPropietario}</td>
                                                        <td>{propietario.des_Apellidos}</td>
                                                        <td>{propietario.des_nombres}</td>
                                                        <td>
                                                            <Link to={`/expediente/${propietario.desDni}/${propietario.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                                                {propietario.desDni}
                                                            </Link>
                                                        </td>
                                                        <td>{indexInmueble.numPartida}</td>
                                                        <td>{indexInmueble.des_oficina_registral}</td>
                                                        <td>{indexInmueble.des_tipo_dominio}</td>
                                                        <td>{indexInmueble.des_direccion}</td>
                                                        <td>{propietario.des_estado}</td>
                                                        <td>
                                                            <div className="table-column-gestion-info-propietario">

                                                                <button className="btn-gestion-delete-info-propietario " onClick={() =>DeleteRegisterConsejo()}>
                                                                    <DeleteForeverIcon style={{ color: `red` }}
                                                                    />
                                                                </button>

                                                                <button className="btn-gestion-edit-info-directivo">
                                                                    <input id="mostrar-modal-editar" name="modal" type="radio" />

                                                                    <label for="mostrar-modal-editar" >  <EditIcon color="primary" /> </label>
                                                                </button>

                                                            </div>
                                                        </td>
                                                    </tr>
                                                    )

                                                    )

                                                   

                                                ))
                                            }


                                        </tbody>
                                    </table>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>

        </>

    );
}

export default PadronPropietario;