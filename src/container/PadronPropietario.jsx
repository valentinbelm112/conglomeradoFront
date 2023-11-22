import React from "react";
import { useState, useEffect } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import PublishIcon from "@mui/icons-material/Publish";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { serverURL } from "../utils/Configuration";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { faArrowDownAZ } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../components/ButtonConglomerado";
import ModalUploadPdfAsiento from "../components/ModalUploadPdfAsiento";
import FormInportCoPropietario from "../components/FormInportarCopropietario";
import "./styles/PadronPropietrio.scss";
import NavbarConglomerado from "../components/NavbarConglomerados";
import SidebarMenu from "../components/SidebarMenu";
import RegistrarNuevoPropietario from "../components/RegistrarNuevoPropietario";
import Container_Nav_Sidb_Load from "../components/Container_Nav_Sidb_Load";
import { useGetPadronPropietarioComponenteRender } from "../hooks/useGetPadronPropietario";
import { UseGetPadronPropietario } from "../hooks/useGetPadronPropietario";
import FormDarBajaPropietario from "../components/FormDarBajaPropietario";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import FormInportPropietario from "../components/FormImportarPropietarios";
import UseGetExportPropietario from "../hooks/useGetExportExcelPropietario";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import EditarPropietario from "../components/FormEditarPropietarios";
import { UseDeletePadronPropietario } from "../hooks/useDeletePadronPropietario";
import ReactPaginate from "react-paginate";
import PdfUploader from "../components/PdfUploader";
const PadronPropietario = ({ EstadoGlobal }) => {
    const [extraerDatosPerso, SetExtraerDatosPerso] = useState([]);
    const [extraerDatosInmueble, SetExtraerDatosInmueble] = useState([]);
    const [open, setOpen] = useState(false);
    const [openElement, setOpenElement] = useState(false);
    const [modalIsOpenPdf, setModalIsOpenPdf] = useState(false);
    const [refrescar, setRefrescar] = useState([]);
    const [search, setSearch] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [sortOrder, setSortOrder] = useState("asc");
    const [togle, setTogle] = useState(true);
    const [clickR, setClickR] = useState(true);
    const [click, setClick] = useState(false);
    const [clickBajaForm, setClickBajaForm] = useState(false);
    const [clickImportProp, setClickImportProp] = useState(false);
    const [clickImportCoProp, setClickImportCoProp] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(7);

    const { isLoading, codigoPropietario ,estadoActivoP,estadoInactivoP,numPage} =
        UseGetPadronPropietario(
            `${serverURL}/Propietarios/Obtener`,
            setRefrescar,
            EstadoGlobal,
            currentPage * itemsPerPage,
            currentPage * itemsPerPage+ itemsPerPage
        );

    const HandlePageChange =async ({ selected }) => {
        setCurrentPage(selected);
        const { response } = await useGetPadronPropietarioComponenteRender(
            `${serverURL}/Propietarios/Obtener`,
            EstadoGlobal,
             currentPage * itemsPerPage,
            currentPage * itemsPerPage+ itemsPerPage
        );
        console.log(response)
        setRefrescar(response.data.content);
    };


    const handleItemsPerPageChange = (e) => {
        const newItemsPerPage = parseInt(e.target.value, 10);
        console.log(e.target.value);
        setItemsPerPage(newItemsPerPage);
    };


    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const handleClickOpenEditFrom = (data, datainmueble) => {
        setClick(!click);
        SetExtraerDatosPerso(data);
        SetExtraerDatosInmueble(datainmueble);
    };

    const openModal = () => {
        setModalIsOpen(true);
    };

    const ModeloPropsPdf = {
        titulo: "Documentos de Inscripción de Registro de Predios",
        tipo_usuario:"Propietario"
        
      };

    const closeModalPdf = () => {
        setModalIsOpenPdf(false);
      };

    const DeletePropietarioRegistro = async (id1, id2) => {
        toast.dismiss();

        await UseDeletePadronPropietario(
            `${serverURL}/Propietarios/delete/${id1}/${id2}`
        );
        const { response } = await useGetPadronPropietarioComponenteRender(
            `${serverURL}/Propietarios/Obtener`,
            EstadoGlobal,
             currentPage * itemsPerPage,
            currentPage * itemsPerPage+ itemsPerPage
        );
        setRefrescar(response.data);
    };

    useEffect(() => {
        // Función para verificar el tamaño de la pantalla y actualizar el estado
        const checkScreenSize = () => {
            setOpen(window.innerWidth < 767); // Cambiar a true si el ancho de la pantalla es menor a 768px
        };

        // Verificar el tamaño de la pantalla al cargar el componente y cada vez que cambie el tamaño de la ventana
        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);

        // Limpiar el event listener al desmontar el componente
        return () => {
            window.removeEventListener("resize", checkScreenSize);
        };
    }, []);


    const checkTokenExpiry = () => {
        /*
                if (validateToken()) {
                    // El token ha caducado, muestra una notificación
                    showNotification();
                }
        
                // Configura la próxima verificación después de 2 minutos
                setTimeout(checkTokenExpiry, 4000);
                */
    };
    const closeModal = () => {
        setModalIsOpen(false);
    };


    useEffect(() => {
        // Inicia la verificación al cargar el componente
        checkTokenExpiry();

        return () => {
            // Limpia el temporizador al desmontar el componente
            clearTimeout(checkTokenExpiry);
        };
    }, []);

    const handleDeletePropietarioR = (id1, id2) => {
        toast.info(
            <div>
                <p>¿Está seguro de que desea eliminar este registro?</p>
                <div>
                    <button
                        className="btn btn-success mx-2" // Botón verde con espacio horizontal
                        onClick={() => DeletePropietarioRegistro(id1, id2)}
                    >
                        Eliminar
                    </button>
                    <button
                        className="btn btn-danger mx-2" // Botón rojo con espacio horizontal
                        onClick={handleCancelDelete}
                    >
                        Cancelar
                    </button>
                </div>
            </div>,
            {
                position: toast.POSITION.TOP_CENTER,
                autoClose: false, // No se cerrará automáticamente
                closeButton: false, // Sin botón de cierre
                draggable: false, // No se puede arrastrar
                closeOnClick: false, // No se cierra al hacer clic
            }
        );
    };

    const handleCancelDelete = () => {
        toast.dismiss(); // Cierra la notificación de confirmación
        // Otras acciones después de cancelar
    };



    const Estado = () => {
        setOpen(!open);
    };

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

    const ExportarPropietario = () => {
        UseGetExportPropietario(`${serverURL}/Propietarios/export-propietarios`);
    };

    const RefrescarInformacionEdit = async () => {
        console.log(refrescar.length);
        console.log(refrescar);
        const { response } = await useGetPadronPropietarioComponenteRender(
            `${serverURL}/Propietarios/Obtener`,
            EstadoGlobal
        );
        setRefrescar(response.data);
        setRefrescar(response.data);
        setClick(!click);
        setItemsPerPage(7);
        console.log(refrescar);
    };

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

    const handleSort = () => {
        const newOrder = sortOrder === "asc" ? "desc" : "asc";
        //console.log(refrescar);
        setSortOrder(newOrder);


        const sortedPadronPropietario = [...refrescar].sort((a, b) => {
            // Manejar los valores null
            const desDniA = a.desDni || ""; // Si desDni es null, asigna una cadena vacía
            const desDniB = b.desDni || ""; // Si desDni es null, asigna una cadena vacía

            return newOrder === "asc"
                ? desDniA.localeCompare(desDniB)
                : desDniB.localeCompare(desDniA);
        });

        setRefrescar(sortedPadronPropietario);
    };

    const handleSortCodigoPropietario = () => {
        const newOrder = sortOrder === "asc" ? "desc" : "asc";
        //console.log(refrescar);
        setSortOrder(newOrder);

        const sortedPadronPropietario = [...refrescar].sort((a, b) => {
            // Manejar los valores null
            const desCodigoA = a.codigoPropietario || ""; // Si desDni es null, asigna una cadena vacía
            const desCodigoB = b.codigoPropietario || ""; // Si desDni es null, asigna una cadena vacía

            return newOrder === "asc"
                ? desCodigoA.localeCompare(desCodigoB)
                : desCodigoB.localeCompare(desCodigoA);
        });

        setRefrescar(sortedPadronPropietario);
    };

    const handleSortApellidos = () => {
        const newOrder = sortOrder === "asc" ? "desc" : "asc";
        setSortOrder(newOrder);
        const sortedPadronPropietario = [...refrescar].sort((a, b) =>
            newOrder === "asc"
                ? a.des_nombres.localeCompare(b.des_nombres)
                : b.des_nombres.localeCompare(a.des_nombres)
        );
        setRefrescar(sortedPadronPropietario);
    };

    const RefrescarInformacion = async () => {
        const { response } = await useGetPadronPropietarioComponenteRender(
            `${serverURL}/Propietarios/Obtener`,
            EstadoGlobal
        );
        setRefrescar(response.data);
    };

    const handleClickOpenForm = () => {
        const parrafo = document.querySelector(
            "#modal-mostrar-form-documento-socios-person-add-import"
        );
        parrafo.style.top = "95px";
        console.log(clickR);
        setClickR(!clickR);
    };

    const handleClickDarBajaOpenForm = () => {
        setClickBajaForm(!clickBajaForm);
    };

    const handleClickImportarPropietario = () => {
        setClickImportProp(!clickImportProp);
    };

    const handleClickImportarCoPropietario = () => {
        setClickImportCoProp(!clickImportCoProp);
    };

    const openModalPdf = () => {
        //console.log("holi");
        setModalIsOpenPdf(true);
      };

    if (isLoading) {
        return (
            <>
                <Container_Nav_Sidb_Load />
            </>
        );
    }

    return (
        <>
            <div className="navbar-sidebar-directivos">
                <NavbarConglomerado Estado={Estado} />
                <div className="container-Sidebar-view-directivo">
                    {
                        <div
                            className={`${openElement ? null : `sidebar-menu-CGM  ${open ? "active" : ""}`
                                }`}
                        >
                            <SidebarMenu setTogle={setTogle} />
                        </div>
                    }

                    <div
                        className={`${togle
                            ? "conatiner-registro-padron-propietarios"
                            : "conatiner-registro-padron-propietarios-select-togle-false"
                            }`}
                    >
                        <div className="title-Inquilinos-registrados">
                            Propietarios Registrados
                        </div>

                        <div
                            className="row container-busqueda-upload-documentos"
                            style={{ marginTop: `10px` }}
                        >
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
                                            <input
                                                id="mostrar-form-documento-propietarios-person-add"
                                                name="modal"
                                                type="radio"
                                            />
                                            <label
                                                htmlFor="mostrar-form-documento-propietarios-person-add"
                                                onClick={handleClickOpenForm}
                                            >
                                                {" "}
                                                <PersonAddIcon />{" "}
                                                <span className="button-text">Registrar</span>{" "}
                                            </label>
                                            <div id="modal-mostrar-form-documento-socios-person-add-import">
                                                <RegistrarNuevoPropietario
                                                    RefrescarInformacion={RefrescarInformacion}
                                                    clickR={clickR}
                                                    setClickR={setClickR}
                                                    EstadoGlobal={EstadoGlobal}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-auto registrar-nuevo-propietarios-add-delete-export-import">
                                        <div>
                                            <input
                                                id="mostrar-form-documento-propietarios-person-add-delete"
                                                name="modal"
                                                type="radio"
                                            />
                                            <label
                                                htmlFor="mostrar-form-documento-propietarios-person-add-delete"
                                                onClick={handleClickDarBajaOpenForm}
                                            >
                                                {" "}
                                                <PersonRemoveIcon />
                                                <span className="button-text">Dar de Baja</span>{" "}
                                            </label>
                                        </div>
                                    </div>

                                    <div className="col-auto registrar-nuevo-propietarios-add-delete-export-import">
                                        <div>
                                            <input
                                                id="mostrar-form-documento-propietarios-person-add-export"
                                                name="modal"
                                                type="radio"
                                            />
                                            <label htmlFor="mostrar-form-documento-propietarios-person-add-export"
                                                onClick={handleClickImportarPropietario}>
                                                {" "}
                                                <PublishIcon />{" "}
                                                <span className="button-text">Importar</span>{" "}
                                            </label>

                                        </div>
                                    </div>
                                    <div className="col-auto registrar-nuevo-propietarios-add-delete-export-import">
                                        <div>
                                            <input
                                                id="mostrar-form-documento-co-propietarios-person-add-export"
                                                name="modal"
                                                type="radio"
                                            />
                                            <label htmlFor="mostrar-form-documento-co-propietarios-person-add-export"
                                                onClick={handleClickImportarCoPropietario}>
                                                {" "}
                                                <PublishIcon />{" "}
                                                <span className="button-text">Importar Copropietarios</span>{" "}
                                            </label>

                                        </div>
                                    </div>

                                    <div className="col-auto registrar-nuevo-propietarios-add-delete-export-import">
                                        <div>
                                            <input
                                                id="mostrar-form-documento-propietarios-person-add-import"
                                                name="modal"
                                                type="radio"
                                            />
                                            <label htmlFor="mostrar-form-documento-propietarios-person-add-import">
                                                {" "}
                                                <FileDownloadIcon />{" "}
                                                <span
                                                    onClick={ExportarPropietario}
                                                    className="button-text"
                                                >
                                                    Exportar
                                                </span>{" "}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className=" col-md-2 container-title-show-iamgen-ins"
                                style={{ alignItems: "end" }}
                            >
                                <div>
                                    <input
                                        id="mostrar-modal-documento-propietario"
                                        onClick={openModal}
                                        name="modal"
                                        type="radio"
                                    />
                                    <label htmlFor="mostrar-modal-documento-propietario" onClick={openModalPdf}>
                                        {" "}
                                        <FontAwesomeIcon icon={faFolderOpen} />
                                        {""}
                                    </label>
                                    <ModalUploadPdfAsiento
                                        isOpen={modalIsOpenPdf}
                                        onClose={closeModalPdf}
                                        components={[
                                          <PdfUploader 
                                          info={ModeloPropsPdf}
                                          codigo={EstadoGlobal.des_codigo_asociacion}
                                       />
                                      ]}
                                    />
                                   
                                </div>
                            </div>
                        </div>
                        <div className="card-body" style={{ marginTop: `0px` }}>
                            <div className="outer-table-registro-propietario ">
                                <div className="table-responsive container-list-table-registro-propietarios">
                                    <table className="table table-bordered table-condensed table-hover table-striped">
                                        <thead>
                                            <tr>
                                                <th
                                                    scope="col"
                                                    style={{
                                                        backgroundColor: "#a2c8f2",
                                                        padding: "7px",
                                                        borderTop: "2px solid white",
                                                        borderLeft: "2px solid white",
                                                        borderBottom: "2px solid white",
                                                        whiteSpace: "nowrap",
                                                        fontSize: "16px",
                                                        color: "#56688a",
                                                    }}
                                                >
                                                    <div className="container-order-a-z-propietario">
                                                        <div>Codigo Propietario</div>
                                                        <button className="title-codigo-propietario" onClick={handleSortCodigoPropietario}>
                                                            <FontAwesomeIcon
                                                                icon={faArrowDownAZ}
                                                                style={{ color: `red` }}
                                                            />
                                                        </button>
                                                    </div>
                                                </th>

                                                <th
                                                    scope="col"
                                                    style={{
                                                        backgroundColor: "#a2c8f2",
                                                        padding: "8px",
                                                        borderTop: "2px solid white",
                                                        borderLeft: "2px solid white",
                                                        borderBottom: "2px solid white",
                                                        whiteSpace: "nowrap",
                                                        fontSize: "16px",
                                                        color: "#56688a",
                                                    }}
                                                >
                                                    <div className="container-order-a-z-propietario">
                                                        <div>Nombres Completos</div>
                                                        <button
                                                            className="title-codigo-propietario"
                                                            onClick={handleSortApellidos}
                                                        >
                                                            <FontAwesomeIcon
                                                                icon={faArrowDownAZ}
                                                                style={{ color: `red` }}
                                                            />
                                                        </button>
                                                    </div>
                                                </th>

                                                <th
                                                    scope="col"
                                                    style={{
                                                        backgroundColor: "#a2c8f2",
                                                        padding: "8px",
                                                        borderTop: "2px solid white",
                                                        borderLeft: "2px solid white",
                                                        borderBottom: "2px solid white",
                                                        whiteSpace: "nowrap",
                                                        fontSize: "16px",
                                                        color: "#56688a",
                                                    }}
                                                >
                                                    <div className="container-order-a-z-propietario">
                                                        <div>DNI</div>
                                                        <button
                                                            className="title-codigo-propietario"
                                                            onClick={handleSort}
                                                        >
                                                            <FontAwesomeIcon
                                                                icon={faArrowDownAZ}
                                                                style={{ color: `red` }}
                                                            />
                                                        </button>
                                                    </div>
                                                </th>
                                                <th
                                                    scope="col"
                                                    style={{
                                                        backgroundColor: "#a2c8f2",
                                                        padding: "8px",
                                                        borderTop: "2px solid white",
                                                        borderLeft: "2px solid white",
                                                        borderBottom: "2px solid white",
                                                        whiteSpace: "nowrap",
                                                        fontSize: "16px",
                                                        color: "#56688a",
                                                    }}
                                                >
                                                    Nª Partida
                                                </th>
                                                <th
                                                    scope="col"
                                                    style={{
                                                        backgroundColor: "#a2c8f2",
                                                        padding: "8px",
                                                        borderTop: "2px solid white",
                                                        borderLeft: "2px solid white",
                                                        borderBottom: "2px solid white",
                                                        whiteSpace: "nowrap",
                                                        fontSize: "16px",
                                                        color: "#56688a",
                                                    }}
                                                >
                                                    Oficina Principal
                                                </th>
                                                <th
                                                    scope="col"
                                                    style={{
                                                        backgroundColor: "#a2c8f2",
                                                        padding: "8px",
                                                        borderTop: "2px solid white",
                                                        borderLeft: "2px solid white",
                                                        borderBottom: "2px solid white",
                                                        whiteSpace: "nowrap",
                                                        fontSize: "16px",
                                                        color: "#56688a",
                                                    }}
                                                >
                                                    Tipo Dominio
                                                </th>
                                                <th
                                                    scope="col"
                                                    style={{
                                                        backgroundColor: "#a2c8f2",
                                                        padding: "8px",
                                                        borderTop: "2px solid white",
                                                        borderLeft: "2px solid white",
                                                        borderBottom: "2px solid white",
                                                        whiteSpace: "nowrap",
                                                        fontSize: "16px",
                                                        color: "#56688a",
                                                    }}
                                                >
                                                    Dirección
                                                </th>
                                                <th
                                                    scope="col"
                                                    style={{
                                                        backgroundColor: "#a2c8f2",
                                                        padding: "8px",
                                                        borderTop: "2px solid white",
                                                        borderLeft: "2px solid white",
                                                        borderBottom: "2px solid white",
                                                        whiteSpace: "nowrap",
                                                        fontSize: "16px",
                                                        color: "#56688a",
                                                    }}
                                                >
                                                    Nª de Asiento
                                                </th>

                                                <th
                                                    scope="col"
                                                    style={{
                                                        backgroundColor: "#a2c8f2",
                                                        padding: "8px",
                                                        borderTop: "2px solid white",
                                                        borderLeft: "2px solid white",
                                                        borderBottom: "2px solid white",
                                                        whiteSpace: "nowrap",
                                                        fontSize: "16px",
                                                        color: "#56688a",
                                                    }}
                                                >
                                                    Estado
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="sticky-column-propietario"
                                                    style={{
                                                        backgroundColor: "#a2c8f2",
                                                        padding: "8px",
                                                        borderTop: "2px solid white",
                                                        borderLeft: "2px solid white",
                                                        borderBottom: "2px solid white",
                                                        whiteSpace: "nowrap",
                                                        fontSize: "16px",
                                                        color: "#56688a",
                                                        zIndex: "3",
                                                    }}
                                                >
                                                    Acción
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {refrescar.length === 0 ? (
                                                <tr>
                                                    <td colSpan="10" style={{ textAlign: "center" }}>
                                                        No hay datos disponibles
                                                    </td>
                                                </tr>
                                            ) : (
                                                (search.length === 0 ? refrescar : search)
                                                    .slice(startIndex, endIndex)
                                                    .map((propietario) =>
                                                        propietario.inmuebleEntities.map((indexInmueble) => (
                                                            <tr key={`${propietario.id}-${indexInmueble.id}`}>
                                                                {console.log(propietario.id)}
                                                                <td
                                                                    style={{
                                                                        overflow: "hidden",
                                                                        whiteSpace: "nowrap",
                                                                        textOverflow: "ellipsis",
                                                                    }}
                                                                >
                                                                    {propietario.codigoPropietario}
                                                                </td>

                                                                <td
                                                                    style={{
                                                                        overflow: "hidden",
                                                                        whiteSpace: "nowrap",
                                                                        textOverflow: "ellipsis",
                                                                    }}
                                                                >
                                                                    {propietario.des_nombres}
                                                                </td>
                                                                <td
                                                                    style={{
                                                                        overflow: "hidden",
                                                                        whiteSpace: "nowrap",
                                                                        textOverflow: "ellipsis",
                                                                    }}
                                                                >
                                                                    <Link
                                                                        to={`/expediente/${indexInmueble.numAsiento}/${propietario.codigoPropietario}`}
                                                                        style={{
                                                                            textDecoration: "none",
                                                                            color: "inherit",
                                                                        }}
                                                                    >
                                                                        {propietario.desDni}
                                                                    </Link>
                                                                </td>
                                                                <td
                                                                    style={{
                                                                        overflow: "hidden",
                                                                        whiteSpace: "nowrap",
                                                                        textOverflow: "ellipsis",
                                                                    }}
                                                                >
                                                                    {indexInmueble.numPartida}
                                                                </td>
                                                                <td
                                                                    style={{
                                                                        overflow: "hidden",
                                                                        whiteSpace: "nowrap",
                                                                        textOverflow: "ellipsis",
                                                                    }}
                                                                >
                                                                    {indexInmueble.des_oficina_registral}
                                                                </td>
                                                                <td
                                                                    style={{
                                                                        overflow: "hidden",
                                                                        whiteSpace: "nowrap",
                                                                        textOverflow: "ellipsis",
                                                                    }}
                                                                >
                                                                    {indexInmueble.des_tipo_dominio}
                                                                </td>
                                                                <td
                                                                    style={{
                                                                        overflow: "hidden",
                                                                        whiteSpace: "nowrap",
                                                                        textOverflow: "ellipsis",
                                                                    }}
                                                                >
                                                                    {indexInmueble.des_direccion}
                                                                </td>
                                                                <td
                                                                    style={{
                                                                        overflow: "hidden",
                                                                        whiteSpace: "nowrap",
                                                                        textOverflow: "ellipsis",
                                                                    }}
                                                                >
                                                                    {indexInmueble.numAsiento}
                                                                </td>


                                                                <td
                                                                    style={{
                                                                        overflow: "hidden",
                                                                        whiteSpace: "nowrap",
                                                                        textOverflow: "ellipsis",
                                                                    }}
                                                                >
                                                                    {propietario.des_estado}
                                                                </td>
                                                                <td
                                                                    className="sticky-column-propietario"
                                                                    style={{
                                                                        overflow: "hidden",
                                                                        whiteSpace: "nowrap",
                                                                        textOverflow: "ellipsis",
                                                                    }}
                                                                >
                                                                    <div className="table-column-gestion-info-propietario">
                                                                        <button
                                                                            className="btn-gestion-delete-info-propietario "
                                                                            onClick={() =>
                                                                                handleDeletePropietarioR(
                                                                                    propietario.id,
                                                                                    indexInmueble.id
                                                                                )
                                                                            }
                                                                        >
                                                                            <DeleteForeverIcon
                                                                                style={{ color: `red` }}
                                                                            />
                                                                        </button>

                                                                        <button className="btn-gestion-edit-info-directivo">
                                                                            <input
                                                                                id="mostrar-modal-editar"
                                                                                name="modal"
                                                                                type="radio"
                                                                            />

                                                                            <label
                                                                                onClick={(e) =>
                                                                                    handleClickOpenEditFrom(
                                                                                        propietario,
                                                                                        indexInmueble
                                                                                    )
                                                                                }
                                                                                htmlFor="mostrar-modal-editar"
                                                                            >
                                                                                {" "}
                                                                                <EditIcon color="primary" />{" "}
                                                                            </label>
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    ))}
                                        </tbody>
                                    </table>

                                    {click && (
                                        <EditarPropietario
                                            onClickEstado={setClick}
                                            enviarDatos={extraerDatosPerso}
                                            enviarDatos2={extraerDatosInmueble}
                                            refrescarInformacion={RefrescarInformacionEdit}
                                        />
                                    )}
                                    {clickBajaForm && (
                                        <FormDarBajaPropietario
                                            onClickEstado={setClickBajaForm}
                                            RefrescarInformacion={RefrescarInformacion}
                                            CodigoPropietario={codigoPropietario}
                                        />
                                    )}
                                    {clickImportProp
                                        && (
                                            <FormInportPropietario
                                                onClickEstado={setClickImportProp}
                                                RefrescarInformacion={RefrescarInformacion}
                                            />)
                                    }

                      {clickImportCoProp
                                        && (
                                            <FormInportCoPropietario
                                                onClickEstado={setClickImportCoProp}
                                                RefrescarInformacion={RefrescarInformacion}
                                            />)
                                    }
                                </div>
                            </div>
                        </div>
                        <div
                            style={{ display: "flex", justifyContent: "space-between" }}
                            className="container-pagination-propietarios"
                        >
                            <div className="row-per-page-container">
                                <span className="row-per-page-label">Filas por página:</span>
                                <select
                                    className="row-per-page-select"
                                    value={itemsPerPage}
                                    onChange={handleItemsPerPageChange}
                                >
                                    <option value="5">5</option>
                                    <option value="7">7</option>
                                    <option value="10">10</option>
                                </select>
                            </div>
                            <div>
                                Nº propietarios Activos: {estadoActivoP}
                            </div>

                            <div>
                                Nº propietarios Inactivos: {estadoInactivoP}
                            </div>
                            <ReactPaginate
                                previousLabel={
                                    <div className="custom-pagination-icon"  >
                                        <ArrowBackIosIcon
                                            style={{ height: "13px", width: "10px" }}
                                        />
                                    </div>
                                } // Usa FontAwesomeIcon para el icono de "Anterior"
                                nextLabel={
                                    <div className="custom-pagination-icon">
                                        <ArrowForwardIosIcon
                                            style={{ height: "13px", width: "10px" }}
                                        />
                                    </div>
                                }
                                breakLabel={<div className="custom-pagination-icon">...</div>}
                                pageCount={numPage}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={HandlePageChange}
                                containerClassName={"pagination justify-content-center"}
                                pageClassName={"page-item"}
                                pageLinkClassName={"page-link"}
                                previousClassName={"page-item"}
                                previousLinkClassName={"page-link"}
                                nextClassName={"page-item"}
                                nextLinkClassName={"page-link"}
                                breakClassName={"page-item"}
                                breakLinkClassName={"page-link"}
                                activeClassName={"active"}
                            />
                        </div>


                    </div>

                    <ToastContainer />
                </div>
            </div>
        </>
    );
};

export default PadronPropietario;
