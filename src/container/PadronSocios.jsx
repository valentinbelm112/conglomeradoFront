import React, { useState, useEffect } from "react";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PublishIcon from '@mui/icons-material/Publish';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import "./styles/PadronSocios.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDownAZ } from '@fortawesome/free-solid-svg-icons'
import NavbarConglomerado from "../components/NavbarConglomerados";
import SidebarMenu from "../components/SidebarMenu";
import SearchBar from "../components/ButtonConglomerado";
import FormRegistroSocios from "../components/FormRegistroSocios";
import { serverURL } from "../utils/Configuration";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { useGetPadronPropietarioComponenteRender } from "../hooks/useGetPadronPropietario";
import Container_Nav_Sidb_Load from "../components/Container_Nav_Sidb_Load";
import { UseGetPadronPropietario } from "../hooks/useGetPadronPropietario";
import { Link } from 'react-router-dom';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { ToastContainer, toast } from 'react-toastify';
import FormInportSocios from "../components/FormImportarSocios";
import UseGetExportPropietario from "../hooks/useGetExportExcelPropietario";
const ListProdronSocios = (props) => {

    const [open, setOpen] = useState(false);
    const [togle, setTogle] = useState(true);
    const [clickR, setClickR] = useState(true);
    const [refrescar, setRefrescar] = useState([]);
    const [search, setSearch] = useState([]);
    const { isLoading, dataPropietario } = UseGetPadronPropietario(`${serverURL}/Socio/Obtener`, setRefrescar,props.EstadoGlobal)
    
    
    const ExportarPropietario = () => {

        UseGetExportPropietario(`${serverURL}/Socio/export-socios`);


    }


    const handleSearch = (e) => {
        const searchText = e.value.toUpperCase(); // Convert search input to uppercase
        console.log('Valor del input:', searchText);
        setSearch(refrescar.filter(item => item.desDni.includes(e.value) || item.des_Apellidos.toUpperCase().includes(searchText) || item.des_nombres.toUpperCase().includes(searchText)));
        console.log("hola")
    };

    const DeleteRegisterConsejo=async(id)=>{
        console.log(id + "identificador")
        //await UseDeleteConsejoDirectivo(`${serverURL}/CGM/delete/${id}`);
       // const { response} = await useGetConsejoDirectivoListarRefre(`${serverURL}/CGM/listar`);
       //setRefrescar(response.data)
      }
    

   
    const handleClickOpenForm = () => {
        const parrafo = document.querySelector('#modal-mostrar-form-documento-socios-person-add-import');
        parrafo.style.top = '95px'
        //console.log(clickR)
        setClickR(!clickR)
    };

    const RefrescarInformacion = async () => {

        const { response } = await useGetPadronPropietarioComponenteRender(`${serverURL}/Socio/Obtener`)
        setRefrescar(response.data)

    }
    const Estado = () => {
        //console.log("HHHH")
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


    const handleClickOpenImportForm = () => {
        const parrafo = document.querySelector('#modal-mostrar-form-documento-socios-person-importar-excel');
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

        <div className="navbar-sidebar-directivos" style={{ height: `100%` }}>
            <NavbarConglomerado Estado={Estado} />

            <div className="container-Sidebar-view-directivo">

                {
                    open ?
                        null
                        : <div className={open === false && "sidebar-transition"}>
                            <SidebarMenu setTogle={setTogle} />
                        </div>
                }

                <div className="conatiner-registro-padron-socios">
                    <div className="title-socios-registrados">
                        Socios Registrados
                    </div>
                    <div className="row container-busqueda-upload-documentos">
                        <div className="col-md-3 search-register-socios">

                            <div className="container-input-search-list-socios">
                                <SearchBar />
                            </div>
                        </div>
                        <div className="col-md-7 upload-documents-socios">

                            <div className="row">
                                <div className="col-auto registrar-nuevo-socios-add-delete-export-import">
                                    <div>
                                        <input id="mostrar-form-documento-socios-person-add" name="modal" type="radio" />
                                        <label for="mostrar-form-documento-socios-person-add"  onClick={handleClickOpenForm}> <PersonAddIcon /> <span className="button-text">Registrar</span>
                                      
                                        </label>
                                        <div id="modal-mostrar-form-documento-socios-person-add-import">
                                                <FormRegistroSocios RefrescarInformacion={RefrescarInformacion} clickR={clickR} setClickR={setClickR}  EstadoGlobal={props.EstadoGlobal}/>
                                            </div>
                                    </div>


                                </div>
                                <div className="col-auto registrar-nuevo-socios-add-delete-export-import">
                                    <div>
                                        <input id="mostrar-form-documento-socios-person-add-delete" name="modal" type="radio" />
                                        <label for="mostrar-form-documento-socios-person-add-delete"> <PersonRemoveIcon /> <span className="button-text">Dar de Baja</span> </label>
                                    </div>


                                </div>

                                <div className="col-auto registrar-nuevo-socios-add-delete-export-import">
                                    <div>
                                        <input id="mostrar-form-documento-socios-person-add-export" name="modal" type="radio" />
                                        <label for="mostrar-form-documento-socios-person-add-export"  onClick={handleClickOpenImportForm}> <PublishIcon /> <span className="button-text">Importar</span>  </label>
                                        <div id="modal-mostrar-form-documento-socios-person-importar-excel" >
                                                <FormInportSocios RefrescarInformacion={RefrescarInformacion} clickR={clickR} setClickR={setClickR}  EstadoGlobal={props.EstadoGlobal} />
                                        </div>
                                    </div>


                                </div>

                                <div className="col-auto registrar-nuevo-socios-add-delete-export-import">
                                    <div>
                                        <input id="mostrar-form-documento-socios-person-add-import" name="modal" type="radio" />
                                        <label for="mostrar-form-documento-socios-person-add-import" > <FileDownloadIcon /> <span className="button-text" onClick={ExportarPropietario}>Exportar</span></label>
                                       

                                    </div>


                                </div>




                            </div>

                        </div>

                        <div className=" col-md-2 container-title-show-iamgen-ins">
                            <div>
                                <input

                                    id="mostrar-modal-documento-propietario"
                                    name="modal"
                                    type="radio"
                                />

                                <label for="mostrar-modal-documento-propietario">
                                    {" "}
                                    <FontAwesomeIcon icon={faFolderOpen} />{" "}
                                </label>

                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="outer-table-registro-socios">
                            <div className="table-responsive container-list-table-registro-socios">
                                <table class="table table-bordered table-condensed table-hover table-striped">
                                    <thead>
                                        <tr >
                                            <th scope="col" style={{ backgroundColor: '#a2c8f2', padding: '8px', borderTop: '2px solid white', borderLeft: '2px solid white', borderBottom: '2px solid white', whiteSpace: 'nowrap', fontSize: '16px', color: '#56688a' }}>
                                                <div className="container-order-a-z-socio">
                                                    <div>
                                                        Codigo de socio
                                                    </div>
                                                    <button className="title-codigo-socio">
                                                        <FontAwesomeIcon icon={faArrowDownAZ} style={{ color: `red` }} />
                                                    </button>
                                                </div>

                                            </th>
                                            <th scope="col" style={{ backgroundColor: '#a2c8f2', padding: '8px', borderTop: '2px solid white', borderLeft: '2px solid white', borderBottom: '2px solid white', whiteSpace: 'nowrap', fontSize: '16px', color: '#56688a' }}>
                                                <div className="container-order-a-z-socio">
                                                    <div >
                                                        Apellidos Completos
                                                    </div>
                                                    <button className="title-codigo-socio">
                                                        <FontAwesomeIcon icon={faArrowDownAZ} style={{ color: `red` }} />
                                                    </button>
                                                </div></th>
                                            <th scope="col" style={{ backgroundColor: '#a2c8f2', padding: '8px', borderTop: '2px solid white', borderLeft: '2px solid white', borderBottom: '2px solid white', whiteSpace: 'nowrap', fontSize: '16px', color: '#56688a' }}>Nombres Completos</th>
                                            <th scope="col" style={{ backgroundColor: '#a2c8f2', padding: '8px', borderTop: '2px solid white', borderLeft: '2px solid white', borderBottom: '2px solid white', whiteSpace: 'nowrap', fontSize: '16px', color: '#56688a' }}>
                                                <div className="container-order-a-z-socio">
                                                    <div>
                                                        DNI
                                                    </div>
                                                    <button className="title-codigo-socio">
                                                        <FontAwesomeIcon icon={faArrowDownAZ} style={{ color: `red` }} />
                                                    </button>
                                                </div>
                                            </th>
                                            <th scope="col" style={{ backgroundColor: '#a2c8f2', padding: '8px', borderTop: '2px solid white', borderLeft: '2px solid white', borderBottom: '2px solid white', whiteSpace: 'nowrap', fontSize: '16px', color: '#56688a' }}>Pabellón</th>
                                            <th scope="col" style={{ backgroundColor: '#a2c8f2', padding: '8px', borderTop: '2px solid white', borderLeft: '2px solid white', borderBottom: '2px solid white', whiteSpace: 'nowrap', fontSize: '16px', color: '#56688a' }}>Puesto</th>
                                            <th scope="col" style={{ backgroundColor: '#a2c8f2', padding: '8px', borderTop: '2px solid white', borderLeft: '2px solid white', borderBottom: '2px solid white', whiteSpace: 'nowrap', fontSize: '16px', color: '#56688a' }} >Dirección</th>
                                            <th scope="col" style={{ backgroundColor: '#a2c8f2', padding: '8px', borderTop: '2px solid white', borderLeft: '2px solid white', borderBottom: '2px solid white', whiteSpace: 'nowrap', fontSize: '16px', color: '#56688a' }}>Giro</th>
                                            <th scope="col" style={{ backgroundColor: '#a2c8f2', padding: '8px', borderTop: '2px solid white', borderLeft: '2px solid white', borderBottom: '2px solid white', whiteSpace: 'nowrap', fontSize: '16px', color: '#56688a' }}>Estado</th>
                                            <th scope="col" style={{ backgroundColor: '#a2c8f2', padding: '8px', borderTop: '2px solid white', borderLeft: '2px solid white', borderBottom: '2px solid white', whiteSpace: 'nowrap', fontSize: '12px', fontSize: '16px',color:'#56688a' }}>Acción</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                            {
                                                (search.length === 0 ? refrescar : search).map((socio) => (
                                                    socio.inmuebleSocioEntities.map((indexInmueble)=>(
                                                        <tr>
                                                        <td style={{overflow:'hidden',whiteSpace:'nowrap',textOverflow: 'ellipsis'} }>{socio.codSocio}</td>
                                                        <td style={{overflow:'hidden',whiteSpace:'nowrap',textOverflow: 'ellipsis'} }>{socio.desApellidos}</td>
                                                        <td style={{overflow:'hidden',whiteSpace:'nowrap',textOverflow: 'ellipsis'} }>{socio.des_nombres}</td>
                                                        <td style={{overflow:'hidden',whiteSpace:'nowrap',textOverflow: 'ellipsis'} }>
                                                            <Link to={`/expediente/${socio.desDni}/${socio.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                                                {socio.desDni}
                                                            </Link>
                                                        </td>
                                                        <td style={{overflow:'hidden',whiteSpace:'nowrap',textOverflow: 'ellipsis'} }>{indexInmueble.numPabellon}</td>
                                                        <td style={{overflow:'hidden',whiteSpace:'nowrap',textOverflow: 'ellipsis'} }>{indexInmueble.numPuesto}</td>
                                                        <td style={{overflow:'hidden',whiteSpace:'nowrap',textOverflow: 'ellipsis'} }>{indexInmueble.des_direccion}</td>
                                                        <td style={{overflow:'hidden',whiteSpace:'nowrap',textOverflow: 'ellipsis'} }>{indexInmueble.des_giro}</td>
                                                        <td style={{overflow:'hidden',whiteSpace:'nowrap',textOverflow: 'ellipsis'} }>{socio.num_area}</td>
                                                        <td style={{overflow:'hidden',whiteSpace:'nowrap',textOverflow: 'ellipsis'} }>
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
                <ToastContainer />
            </div>
        </div>



    );
}

export default ListProdronSocios;