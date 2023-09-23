import React from "react";
import { useState,useEffect,useContext } from "react";
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

const PadronPropietario = ({EstadoGlobal}) => {

    const[open,setOpen]=useState(false);
    const[openElement,setOpenElement]=useState(false);
    const [refrescar, setRefrescar] = useState([]);
    const [search, setSearch] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc');
    const [togle, setTogle] = useState(true);
    const [clickR, setClickR] = useState(true);

  
    const { isLoading, dataPropietario } = UseGetPadronPropietario(`${serverURL}/Propietarios/Obtener`, setRefrescar,EstadoGlobal)
  

    const DeleteRegisterConsejo=async(id)=>{
        console.log(id + "identificador")
        //await UseDeleteConsejoDirectivo(`${serverURL}/CGM/delete/${id}`);
       // const { response} = await useGetConsejoDirectivoListarRefre(`${serverURL}/CGM/listar`);
       //setRefrescar(response.data)
      }
    

      const Estado=()=>{
       
        setOpen(!open)
       }


      useEffect(() => {
        // Función para verificar el tamaño de la pantalla y actualizar el estado
        const checkScreenSize = () => {
            setOpen(window.innerWidth >767); // Cambiar a true si el ancho de la pantalla es menor a 768px
           setOpenElement(window.innerWidth >767)
       
        };
    
        // Verificar el tamaño de la pantalla al cargar el componente y cada vez que cambie el tamaño de la ventana
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
    
        // Limpiar el event listener al desmontar el componente
        return () => {
          window.removeEventListener('resize', checkScreenSize);
        };
      }, []);

    const ExportarPropietario = () => {

        UseGetExportPropietario(`${serverURL}/Propietarios/export-propietarios`);


    }


    const handleSearch = (e) => {
        const searchText = e.value;

    if (typeof searchText === 'string') {
        // Si searchText es una cadena (texto), aplicamos toUpperCase
        const searchTextUpper = searchText.toUpperCase();

        setSearch(refrescar.filter(item => 
            item.desDni?.includes(searchText) || 
            item.des_Apellidos?.toUpperCase().includes(searchTextUpper) || 
            item.des_nombres?.toUpperCase().includes(searchTextUpper)
        ));
    } else if (typeof searchText === 'number') {
        // Si searchText es un número, no aplicamos toUpperCase
        setSearch(refrescar.filter(item => 
            item.desDni?.includes(searchText.toString()) ||
            item.des_Apellidos?.includes(searchText.toString()) ||
            item.des_nombres?.includes(searchText.toString())
        ));
    } else {
        // Manejar otros tipos de datos si es necesario
        console.log('Tipo de búsqueda no admitido');
    }
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

        const { response } = await useGetPadronPropietarioComponenteRender(`${serverURL}/Propietarios/Obtener`,EstadoGlobal)
        setRefrescar(response.data)

    }


    
    const handleClickOpenForm = () => {
        const parrafo = document.querySelector('#modal-mostrar-form-documento-socios-person-add-import');
        parrafo.style.top = '95px'
        console.log(clickR)
        setClickR(!clickR)
    };

    const handleClickDarBajaOpenForm = () => {
        const parrafo = document.querySelector('#modal-mostrar-form-documento-propietarios-person-dar-baja');
        parrafo.style.top = '95px'
    };

    const handleClickOpenImportForm = () => {
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
                <NavbarConglomerado  Estado={Estado}/> 
                <div className="container-Sidebar-view-directivo">
                {
           <div className={`${openElement ?null   :`sidebar-menu-CGM  ${open ? 'active' : ''}`}`}>
            <SidebarMenu setTogle={setTogle} />
            </div>
           } 

         
           <div className={`${togle ?'conatiner-registro-padron-propietarios'   :'conatiner-registro-padron-propietarios-select-togle-false' }`}>
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
                                            <div id="modal-mostrar-form-documento-socios-person-add-import">
                                                <RegistrarNuevoPropietario RefrescarInformacion={RefrescarInformacion} clickR={clickR} setClickR={setClickR} EstadoGlobal={EstadoGlobal}/>
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
                                            <label for="mostrar-form-documento-propietarios-person-add-export" > <PublishIcon /> <span className="button-text">Importar</span> </label>
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
                            <div class="outer-table-registro-propietario ">
                                <div className="table-responsive container-list-table-registro-propietarios" style={{ marginTop: `13px` }}>
                                    <table class="table table-bordered table-condensed table-hover table-striped">
                                        <thead>
                                            <tr>
                                                <th scope="col" style={{ backgroundColor: '#a2c8f2', padding: '7px', borderTop: '2px solid white', borderLeft: '2px solid white', borderBottom: '2px solid white', whiteSpace: 'nowrap', fontSize: '16px' ,color:'#56688a'}}>
                                                    <div className="container-order-a-z-propietario">
                                                        <div>
                                                            Codigo Propietario
                                                        </div>
                                                        <button className="title-codigo-propietario">
                                                            <FontAwesomeIcon icon={faArrowDownAZ} style={{ color: `red` }} />
                                                        </button>
                                                    </div>

                                                </th>
                                                <th scope="col" style={{ backgroundColor: '#a2c8f2', padding: '8px', borderTop: '2px solid white', borderLeft: '2px solid white', borderBottom: '2px solid white', whiteSpace: 'nowrap', fontSize: '16px',color:'#56688a' }}>
                                                    <div className="container-order-a-z-propietario">
                                                        <div>
                                                            Apellidos Completos
                                                        </div>
                                                        <button className="title-codigo-propietario" onClick={handleSortApellidos}>
                                                            <FontAwesomeIcon icon={faArrowDownAZ} style={{ color: `red` }} />
                                                        </button>
                                                    </div></th>
                                                <th scope="col" style={{ backgroundColor: '#a2c8f2', padding: '8px', borderTop: '2px solid white', borderLeft: '2px solid white', borderBottom: '2px solid white', whiteSpace: 'nowrap', fontSize: '16px',color:'#56688a' }}>Nombres Completos</th>
                                                <th scope="col" style={{ backgroundColor: '#a2c8f2', padding: '8px', borderTop: '2px solid white', borderLeft: '2px solid white', borderBottom: '2px solid white', whiteSpace: 'nowrap', fontSize: '16px',color:'#56688a' }}>
                                                    <div className="container-order-a-z-propietario">
                                                        <div>
                                                            DNI
                                                        </div>
                                                        <button className="title-codigo-propietario" onClick={handleSort}>
                                                            <FontAwesomeIcon icon={faArrowDownAZ} style={{ color: `red` }} />
                                                        </button>
                                                    </div>
                                                </th>
                                                <th scope="col" style={{ backgroundColor: '#a2c8f2', padding: '8px', borderTop: '2px solid white', borderLeft: '2px solid white', borderBottom: '2px solid white', whiteSpace: 'nowrap', fontSize: '12px', fontSize: '16px',color:'#56688a' }}>Nª Partida</th>
                                                <th scope="col" style={{ backgroundColor: '#a2c8f2', padding: '8px', borderTop: '2px solid white', borderLeft: '2px solid white', borderBottom: '2px solid white', whiteSpace: 'nowrap', fontSize: '12px', fontSize: '16px',color:'#56688a' }}>Oficina Principal</th>
                                                <th scope="col" style={{ backgroundColor: '#a2c8f2', padding: '8px', borderTop: '2px solid white', borderLeft: '2px solid white', borderBottom: '2px solid white', whiteSpace: 'nowrap', fontSize: '12px', fontSize: '16px',color:'#56688a' }}>Tipo Dominio</th>
                                                <th scope="col" style={{ backgroundColor: '#a2c8f2', padding: '8px', borderTop: '2px solid white', borderLeft: '2px solid white', borderBottom: '2px solid white', whiteSpace: 'nowrap', fontSize: '12px', fontSize: '16px',color:'#56688a' }}>Dirección</th>
                                                <th scope="col" style={{ backgroundColor: '#a2c8f2', padding: '8px', borderTop: '2px solid white', borderLeft: '2px solid white', borderBottom: '2px solid white', whiteSpace: 'nowrap', fontSize: '12px', fontSize: '16px',color:'#56688a' }}>Estado</th>
                                                <th scope="col" style={{ backgroundColor: '#a2c8f2', padding: '8px', borderTop: '2px solid white', borderLeft: '2px solid white', borderBottom: '2px solid white', whiteSpace: 'nowrap', fontSize: '12px', fontSize: '16px',color:'#56688a' }}>Acción</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                (search.length === 0 ? refrescar : search).map((propietario) => (
                                                    propietario.inmuebleEntities.map((indexInmueble)=>(
                                                        <tr>
                                                        <td style={{overflow:'hidden',whiteSpace:'nowrap',textOverflow: 'ellipsis'} }>{propietario.codigoPropietario}</td>
                                                        <td style={{overflow:'hidden',whiteSpace:'nowrap',textOverflow: 'ellipsis'} }>{propietario.des_Apellidos}</td>
                                                        <td style={{overflow:'hidden',whiteSpace:'nowrap',textOverflow: 'ellipsis'} }>{propietario.des_nombres}</td>
                                                        <td style={{overflow:'hidden',whiteSpace:'nowrap',textOverflow: 'ellipsis'} }>
                                                            <Link to={`/expediente/${propietario.desDni}/${propietario.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                                                {propietario.desDni}
                                                            </Link>
                                                        </td>
                                                        <td style={{overflow:'hidden',whiteSpace:'nowrap',textOverflow: 'ellipsis'} }>{indexInmueble.numPartida}</td>
                                                        <td style={{overflow:'hidden',whiteSpace:'nowrap',textOverflow: 'ellipsis'} }>{indexInmueble.des_oficina_registral}</td>
                                                        <td style={{overflow:'hidden',whiteSpace:'nowrap',textOverflow: 'ellipsis'} }>{indexInmueble.des_tipo_dominio}</td>
                                                        <td style={{overflow:'hidden',whiteSpace:'nowrap',textOverflow: 'ellipsis'} }>{indexInmueble.des_direccion}</td>
                                                        <td style={{overflow:'hidden',whiteSpace:'nowrap',textOverflow: 'ellipsis'} }>{propietario.des_estado}</td>
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

        </>

    );
}

export default PadronPropietario;