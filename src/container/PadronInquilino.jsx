import React, { useState, useEffect } from "react";
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
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import FormRegistroInquilinos from "../components/FormRegistroInquilinos";
import { useGetPadronPropietarioComponenteRender } from "../hooks/useGetPadronPropietario";
import FormImportInquilino from "../components/FormImportInquilino";
import { serverURL } from "../utils/Configuration";
import { UseGetFindPabellonPuesto } from "../hooks/useGetFindPabellonPuesto";
import Container_Nav_Sidb_Load from "../components/Container_Nav_Sidb_Load";
import { UseGetPadronInquilino } from "../hooks/useGetPadronPropietario";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import EditarInquilino from "../components/FormEditarInquilinos";
const ListProdronInquilino = (props) => {
    const [togle, setTogle] = useState(true);
    const [open, setOpen] = useState(false);
    const [refrescar, setRefrescar] = useState([]);
    const [clickR, setClickR] = useState(true);
    const [clickImport, setClickImport] = useState(true);
    const [isloadingDataPuesPab, setIsloadingDataPuesPab] = useState(false);
    const [search, setSearch] = useState([]);
    const [extraerDatosPerso, SetExtraerDatosPerso] = useState([]);
    const [extraerDatosInmueble, SetExtraerDatosInmueble] = useState([]);
    const [click, setClick] = useState(false);
    const handleClickOpenForm = () => {
        const parrafo = document.querySelector('#modal-mostrar-form-documento-socios-person-add-import');
        parrafo.style.top = '95px'
        setClickR(!clickR)

    };

    
    const { isLoading, dataPropietario } = UseGetPadronInquilino(`${serverURL}/Inquilino/Obtener`, setRefrescar, props.EstadoGlobal)
    const { dataPuestos, isLoadingPuestos, dataPabellonPuesto } = UseGetFindPabellonPuesto(`${serverURL}/Inquilino/Obtener-pabellon-puesto`, props.EstadoGlobal)


    const isTokenExpired = () => {
       

    };


    const showNotification = () => {
  
        console.log('El token ha caducado. Muestra una notificación.');
    };

    const checkTokenExpiry = () => {
        if (isTokenExpired()) {
            showNotification();
        }

        // Configura la próxima verificación después de 2 minutos
        setTimeout(checkTokenExpiry, 4000);
    };


    useEffect(() => {
        // Inicia la verificación al cargar el componente
        checkTokenExpiry();

        return () => {
            // Limpia el temporizador al desmontar el componente
            clearTimeout(checkTokenExpiry);
        };
    }, []);


    const RefrescarInformacionEdit = async () => {
        console.log(refrescar.length);
        console.log(refrescar);
        const { response } = await useGetPadronPropietarioComponenteRender(
          `${serverURL}/Inquilino/Obtener`,
          props.EstadoGlobal
        );
        setRefrescar(response.data);
        setRefrescar(response.data);
        setClick(!click);
        console.log(refrescar);
      };

      const handleClickOpenEditFrom = (data, datainmueble) => {
        setClick(!click);
        SetExtraerDatosPerso(data);
        SetExtraerDatosInmueble(datainmueble);
      };
      
    const DeleteRegisterConsejo=async(id)=>{


       }

       const handleSearch = (e) => {
        const searchText = e.value;

        if (typeof searchText === "string") {
            // Si searchText es una cadena (texto), aplicamos toUpperCase
            const searchTextUpper = searchText.toUpperCase();

            setSearch(
                refrescar.filter(
                    (item) =>
                        item.desDni?.includes(searchText) ||
                        item.des_Apellidos?.toUpperCase().includes(searchTextUpper) ||
                        item.des_nombres?.toUpperCase().includes(searchTextUpper)
                )
            );
        } else if (typeof searchText === "number") {
            // Si searchText es un número, no aplicamos toUpperCase
            setSearch(
                refrescar.filter(
                    (item) =>
                        item.desDni?.includes(searchText.toString()) ||
                        item.des_Apellidos?.includes(searchText.toString()) ||
                        item.des_nombres?.includes(searchText.toString())
                )
            );
        } else {
            // Manejar otros tipos de datos si es necesario
            console.log("Tipo de búsqueda no admitido");
        }
    };
    
    const handleClickOpenImportForm = () => {
        const parrafo = document.querySelector('#modal-mostrar-form-documento-inquilino-person-importar-excel');
        parrafo.style.top = '95px'
        //console.log(clickImport)
        setClickImport(!clickImport)
    };


    const Estado = () => {

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

    const RefrescarInformacion = async () => {

        const { response } = await useGetPadronPropietarioComponenteRender(`${serverURL}/Inquilino/Obtener`, props.EstadoGlobal)
        console.log(response)
        setRefrescar(response.data)

    }

    if (isLoadingPuestos && isLoading) {

        return (
            <>
                <Container_Nav_Sidb_Load />
            </>
        )
    }

    return (

        <div className="navbar-sidebar-directivos" style={{ height: `100%` }}>
            <NavbarConglomerado Estado={Estado} />

            <div className="container-Sidebar-view-directivo">

            {open ? null : (
          <div className={open === false && "sidebar-transition"}>
            <SidebarMenu setTogle={setTogle} />
          </div>
        )}
        <div
          className={`${
            togle
              ? "conatiner-registro-padron-inquilino"
              : "conatiner-registro-padron-inquilino-select-togle-false"
          }`}
        >

                    <div className="title-Inquilinos-registrados">
                        Inquilinos Registrados
                    </div>
                    <div className="row container-busqueda-upload-documentos"   style={{ marginTop: `10px` }}>
                    <div className="col-md-3 search-register-propietarios">
                                <div className="col-md-4 search-register-socios">
                                    <div className="container-input-search-list-socios">
                                        <SearchBar onSearch={handleSearch} />
                                    </div>
                                </div>
                            </div>
                        <div className="col-md-7 upload-documents-inquilino">

                            <div className="row">
                                <div className="col-auto registrar-nuevo-inquilino-add-delete-export-import">
                                    <div>
                                        <input id="mostrar-form-documento-inquilino-person-add" name="modal" type="radio" />
                                        <label htmlFor="mostrar-form-documento-inquilino-person-add" onClick={handleClickOpenForm}> <PersonAddIcon /> <span className="button-text">Registrar</span> </label>

                                        <div id="modal-mostrar-form-documento-socios-person-add-import">
                                            <FormRegistroInquilinos RefrescarInformacion={RefrescarInformacion} clickR={clickR} setClickR={setClickR} EstadoGlobal={props.EstadoGlobal} dataPuestos={dataPuestos} dataPabellonPuesto={dataPabellonPuesto} />
                                        </div>
                                    </div>

                                </div>
                                <div className="col-auto registrar-nuevo-inquilino-add-delete-export-import">
                                    <div>
                                        <input id="mostrar-form-documento-inquilino-person-add-delete" name="modal" type="radio" />
                                        <label htmlFor="mostrar-form-documento-inquilino-person-add-delete"> <PersonRemoveIcon /> <span className="button-text">Dar de Baja</span> </label>
                                    </div>
                                </div>

                                <div className="col-auto registrar-nuevo-inquilino-add-delete-export-import">
                                    <div>
                                        <input id="mostrar-form-documento-inquilino-person-add-export" name="modal" type="radio" />
                                        <label htmlFor="mostrar-form-documento-inquilino-person-add-export" onClick={handleClickOpenImportForm}> <PublishIcon /> <span className="button-text">Importar</span>  </label>
                                        <div id="modal-mostrar-form-documento-inquilino-person-importar-excel">
                                            <FormImportInquilino RefrescarInformacion={RefrescarInformacion} clickR={clickImport} setClickR={setClickImport} EstadoGlobal={props.EstadoGlobal} />
                                        </div>

                                    </div>


                                </div>

                                <div className="col-auto registrar-nuevo-inquilino-add-delete-export-import">
                                    <div>
                                        <input id="mostrar-form-documento-inquilino-person-add-import" name="modal" type="radio" />
                                        <label htmlFor="mostrar-form-documento-inquilino-person-add-import"> <FileDownloadIcon /> <span className="button-text">Exportar</span></label>
                                    </div>


                                </div>
                            </div>


                        </div>
                        <div className=" col-md-2 container-title-show-iamgen-ins"   style={{ alignItems: "end" }}>
                            <div>
                                <input

                                    id="mostrar-modal-documento-propietario"
                                    name="modal"
                                    type="radio"
                                  
                                />

                                <label htmlFor="mostrar-modal-documento-propietario">
                                    {" "}
                                    <FontAwesomeIcon icon={faFolderOpen} />{" "}
                                </label>

                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="outer-table-registro-inquilino ">
                            <div className="table-responsive container-list-table-registro-inquilino">
                                <table class="table table-bordered table-condensed table-hover table-striped">
                                    <thead>
                                        <tr >
                                            <th scope="col" style={{ backgroundColor: '#a2c8f2', padding: '8px', borderTop: '2px solid white', borderLeft: '2px solid white', borderBottom: '2px solid white', whiteSpace: 'nowrap', fontSize: '16px', color: '#56688a' }}>
                                                <div className="container-order-a-z-inquilino">
                                                    <div>
                                                        Codigo de Inquilino
                                                    </div>
                                                    <button className="title-codigo-inquilino">
                                                        <FontAwesomeIcon icon={faArrowDownAZ} style={{ color: `red` }} />
                                                    </button>
                                                </div>

                                            </th>
                                            <th scope="col" style={{ backgroundColor: '#a2c8f2', padding: '8px', borderTop: '2px solid white', borderLeft: '2px solid white', borderBottom: '2px solid white', whiteSpace: 'nowrap', fontSize: '16px', color: '#56688a' }}>
                                                <div className="container-order-a-z-inquilino">
                                                    <div >
                                                        Apellidos Completos
                                                    </div>
                                                    <button className="title-codigo-inquilino">
                                                        <FontAwesomeIcon icon={faArrowDownAZ} style={{ color: `red` }} />
                                                    </button>
                                                </div></th>
                                            <th scope="col" style={{ backgroundColor: '#a2c8f2', padding: '8px', borderTop: '2px solid white', borderLeft: '2px solid white', borderBottom: '2px solid white', whiteSpace: 'nowrap', fontSize: '16px', color: '#56688a' }}>Nombres Completos</th>
                                            <th  scope="col" style={{ backgroundColor: '#a2c8f2', padding: '8px', borderTop: '2px solid white', borderLeft: '2px solid white', borderBottom: '2px solid white', whiteSpace: 'nowrap', fontSize: '16px', color: '#56688a' }}>
                                                <div className="container-order-a-z-inquilino">
                                                    <div>
                                                        DNI
                                                    </div>
                                                    <button className="title-codigo-inquilino">
                                                        <FontAwesomeIcon icon={faArrowDownAZ} style={{ color: `red` }} />
                                                    </button>
                                                </div>
                                            </th>
                                            <th scope="col" style={{ backgroundColor: '#a2c8f2', padding: '8px', borderTop: '2px solid white', borderLeft: '2px solid white', borderBottom: '2px solid white', whiteSpace: 'nowrap', fontSize: '16px', color: '#56688a' }}>Pasaje</th>
                                            <th scope="col" style={{ backgroundColor: '#a2c8f2', padding: '8px', borderTop: '2px solid white', borderLeft: '2px solid white', borderBottom: '2px solid white', whiteSpace: 'nowrap', fontSize: '16px', color: '#56688a' }}>Puesto</th>
                                            <th scope="col" style={{ backgroundColor: '#a2c8f2', padding: '8px', borderTop: '2px solid white', borderLeft: '2px solid white', borderBottom: '2px solid white', whiteSpace: 'nowrap', fontSize: '16px', color: '#56688a' }} >Dirección</th>
                                            <th scope="col" style={{ backgroundColor: '#a2c8f2', padding: '8px', borderTop: '2px solid white', borderLeft: '2px solid white', borderBottom: '2px solid white', whiteSpace: 'nowrap', fontSize: '16px', color: '#56688a' }}>Giro</th>
                                            <th scope="col" style={{ backgroundColor: '#a2c8f2', padding: '8px', borderTop: '2px solid white', borderLeft: '2px solid white', borderBottom: '2px solid white', whiteSpace: 'nowrap', fontSize: '16px', color: '#56688a' }}>Estado</th>
                                            <th scope="col" style={{ backgroundColor: '#a2c8f2', padding: '8px', borderTop: '2px solid white', borderLeft: '2px solid white', borderBottom: '2px solid white', whiteSpace: 'nowrap', fontSize: '12px', fontSize: '16px',color:'#56688a' }}>Acción</th>
                                             
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            (search.length === 0 ? refrescar : search).map((inquilino) => (
                                                inquilino.inmuebleEntities.map((indexInmueble) => (
                                                    <tr>
                                                    <td style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{inquilino.codInquilino}</td>
                                                    <td style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{inquilino.desApellidos}</td>
                                                    <td style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{inquilino.des_nombres}</td>
                                                    <td style={{overflow:'hidden',whiteSpace:'nowrap',textOverflow: 'ellipsis'} }>
                                                            <Link to={`/expediente-inquilino/${inquilino.desDni}/${inquilino.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                                                {inquilino.desDni}
                                                            </Link>
                                                        </td>
                                                    <td style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{indexInmueble.numPabellon}</td>
                                                    <td style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{indexInmueble.numPuesto}</td>
                                                    <td style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{indexInmueble.des_direccion}</td>
                                                    <td style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{indexInmueble.des_giro}</td>
                                                    <td style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}></td>
                                                    <td style={{overflow:'hidden',whiteSpace:'nowrap',textOverflow: 'ellipsis'} }>
                                                            <div className="table-column-gestion-info-propietario">

                                                                <button className="btn-gestion-delete-info-propietario " onClick={() =>DeleteRegisterConsejo()}>
                                                                    <DeleteForeverIcon style={{ color: `red` }}
                                                                    />
                                                                </button>

                                                                <button className="btn-gestion-edit-info-directivo">
                                                                    <input id="mostrar-modal-editar" name="modal" type="radio" />

                                                                    <label htmlFor="mostrar-modal-editar"  onClick={(e) =>
                                      handleClickOpenEditFrom(
                                        inquilino,
                                        indexInmueble
                                      )
                                    }>  <EditIcon color="primary" /> </label>
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

                                {click && (
                  <EditarInquilino
                    onClickEstado={setClick}
                    enviarDatos={extraerDatosPerso}
                    enviarDatos2={extraerDatosInmueble}
                    refrescarInformacion={RefrescarInformacionEdit}
                  />
                )}
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </div>



    );
}

export default ListProdronInquilino;