import { useEffect, useState } from "react";
import FormRegistrosDirectivos from "../components/FormRegistrosDirectivos";
import "./styles/ConsejoDirectivo.scss";
import VerticalAlignBottomIcon from "@mui/icons-material/VerticalAlignBottom";
import PostAddIcon from "@mui/icons-material/PostAdd";
import "reactjs-popup/dist/index.css";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import ShowRegistroDirectivo from "../components/ShowRegistroDirectivo";
import PreviewIcon from "@mui/icons-material/Preview";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { serverURL } from "../utils/Configuration";
import { useGetConsejoDirectivo } from "../hooks/useGetConsejoDirectivo";
import { useGetConsejoDirectivoListarRefre } from "../hooks/useGetConsejoDirectivo";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import useGetExportConsejoDirectivo from "../hooks/useGetExportExcelConsejoDirectivo";
import { UseDeleteConsejoDirectivo } from "../hooks/useDeleteConsejoDirectivo";
import Container_Nav_Sidb_Load from "../components/Container_Nav_Sidb_Load";
import NavbarConglomerado from "../components/NavbarConglomerados";
import SidebarMenu from "../components/SidebarMenu";
import UseGetDoccumentoConsejoDirectivo from "../hooks/useGetDocumentoConsejoDirectivo";
import FormEditarDirectivos from "../components/FormEditarDirectivos";
import { useGetConsejoDirectivoDocument } from "../hooks/useGetConsejoDirectivo";
import ModalImagesConglomerado from "../components/ModalImagesConglomerado";
import ImageUploader from "../components/ImageUploader";
import { format } from "date-fns";
import ModalUploadPdfAsiento from "../components/ModalUploadPdfAsiento";
import PdfUploader from "../components/PdfUploader";
import SearchBar from "../components/ButtonConglomerado";
const ConsejoDirectivo = ({ EstadoGlobal }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpenPdf, setModalIsOpenPdf] = useState(false);
  const [open, setOpen] = useState(false);
  const [refrescar, setRefrescar] = useState([]);
  const [refrescarDocument, setRefrescarDocument] = useState([]);
  const [click, setClick] = useState(false);
  const [showDcoument, SetShowDcoument] = useState(false);
  const [extraerDatos, SetExtraerDatos] = useState([]);
  const [togle, setTogle] = useState(true);
  const [search, setSearch] = useState([]);
  const { directivos, isLoading } = useGetConsejoDirectivo(
    `${serverURL}/CGM/Obtener?Codigo_Asociacion=${EstadoGlobal.des_codigo_asociacion}`,
    setRefrescar,
    EstadoGlobal
  );

  const [clickR, setClickR] = useState(false);
  const { documento, isLoadingDoc } = UseGetDoccumentoConsejoDirectivo(
    `${serverURL}/CGM/Documento-detalle-directivo`,
    setRefrescarDocument,
    EstadoGlobal
  );

  const handleSearch = (e) => {
    const searchText = e.value;
    

    if (typeof searchText === "string") {
        // Si searchText es una cadena (texto), aplicamos toUpperCase
        const searchTextUpper = searchText.toUpperCase();
    
        setSearch(
            refrescar.filter(
                (item) =>
                    item.dni?.includes(searchText) ||
                    item.des_cargo?.toUpperCase().includes(searchTextUpper) ||
                    item.des_nombres?.toUpperCase().includes(searchTextUpper) ||
                    item.des_cargo?.toUpperCase().includes(searchTextUpper) ||
                    item.desAsiento?.toUpperCase().includes(searchTextUpper)||
                    item.des_partida?.toUpperCase().includes(searchTextUpper)||
                    item.des_nombre_asociacion?.toUpperCase().includes(searchTextUpper)
            )
        );
    } else if (typeof searchText === "number") {
    
        // Si searchText es un número, no aplicamos toUpperCase
        setSearch(
            refrescar.filter(
                (item) =>
                    item.desDni?.includes(searchText.toString()) ||
                    item.desApellidos?.includes(searchText.toString()) ||
                    item.des_nombres?.includes(searchText.toString())
            )
        );
    } else {
        // Manejar otros tipos de datos si es necesario
        console.log("Tipo de búsqueda no admitido");
    }
};
 
  const handleClickOpenFrom = () => {
    setClickR(!clickR);
  };

  const handleClickOpenEditFrom = (data) => {
    setClick(!click);
    SetExtraerDatos(data);
  };

  const changeStateButon = () => {
    SetShowDcoument(!showDcoument);
  };

  const RefrescarInformacion = async () => {
    console.log(refrescar.length);
    console.log(refrescar);
    const { response } = await useGetConsejoDirectivoListarRefre(
      `${serverURL}/CGM/listar`,
      EstadoGlobal
    );
    setRefrescar(response.data);

    const { resporesponseDocument } = await useGetConsejoDirectivoDocument(
      `${serverURL}/CGM/Documento-detalle-directivo`,
      EstadoGlobal
    );
    setRefrescarDocument(resporesponseDocument);

    console.log(refrescar);
  };

  const RefrescarInformacionEdit = async () => {
    console.log(refrescar.length);
    console.log(refrescar);
    const { response } = await useGetConsejoDirectivoListarRefre(
      `${serverURL}/CGM/listar`,
      EstadoGlobal
    );
    setRefrescar(response.data);

    setClick(!click);
    console.log(refrescar);
  };

  const closeModal = () => {
    setModalIsOpen(false);
};
const closeModalPdf = () => {
  setModalIsOpenPdf(false);
};
  const HandleDownloadExcel = () => {
    useGetExportConsejoDirectivo(`${serverURL}/CGM/export-directivos`);
  };

  const DeleteRegisterConsejo = async (id) => {
    toast.dismiss();
    console.log(id + "identificador");
    await UseDeleteConsejoDirectivo(
      `${serverURL}/CGM/delete/${id}`,
      EstadoGlobal
    );
    const { response } = await useGetConsejoDirectivoListarRefre(
      `${serverURL}/CGM/listar`,
      EstadoGlobal
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

  const handleDeleteDirectivoR = (id) => {
    toast.info(
      <div>
        <p>¿Está seguro de que desea eliminar este registro?</p>
        <div>
          <button
            className="btn btn-success mx-2" // Botón verde con espacio horizontal
            onClick={() => DeleteRegisterConsejo(id)}
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

  //Documentos consejo directivo
  const ModeloProps1 = {
    titulo: "Estatuto o Reglamento Interno",
    tipDoc: "DocInscripcion2",
    request: `${serverURL}/Documento/consejo/dicrectivo/tipdoc/codAS`,
  };

  const ModeloPropsPdf = {
    titulo: "Documentos del consejo por asientos",
    tipo_usuario:"Directivo"
    
  };

  const tipoView = {
    opcion: 1,
  };

  const ModeloProps2 = {
    titulo: "Agrega aquí otros documentos",
    tipDoc: "OthersDoc",
    request: `${serverURL}/Documento/consejo/dicrectivo/tipdoc/codAS`,
  };
  const openModal = () => {
    //console.log("holi");
    setModalIsOpen(true);
  };

  const openModalPdf = () => {
    //console.log("holi");
    setModalIsOpenPdf(true);
  };


 

  const handleCancelDelete = () => {
    toast.dismiss();
  };

  if (isLoading || isLoadingDoc) {
    return (
      <>
        <Container_Nav_Sidb_Load />
      </>
    );
  }
  const Estado = () => {
    //console.log("HHHH")
    setOpen(!open);
  };

  return (
    <>
      <div className="navbar-sidebar-directivos">
        <NavbarConglomerado Estado={Estado} />
        <div className="container-Sidebar-view-directivo">
          {open ? null : (
            <div className={open === false && "sidebar-transition"}>
              <SidebarMenu setTogle={setTogle} />
            </div>
          )}
          
          <div
            className="container-table-register-list-directivo"
            style={{ width: `100%` }}
          >
             <div className="title-consejo-directivo">
                Consejo Directivo Vigente
              </div>
              <div className="col-md-12 col-sm-12">
              <div className=" container-table-register-list-directivo-direct-upload" >
              <div className="col-md-3 search-register-propietarios">
                            <div className="col-md-4 search-register-socios">
                                <div className="container-input-search-list-socios">
                                    <SearchBar onSearch={handleSearch} />
                                </div>
                            </div>
                        </div>
             
              <div className="container-options-documento-consejo-add-register-upload-documento">
                <div className="container-title-show-iamgen-ins ">
                  {
                    //<button type="button" className="btn btn-outline-success">
                    //Inscripcion de asociaciones
                    //</button>
                  }
                 
                  <input
                    id="mostrar-modal-documento"
                    name="modal"
                    type="radio"
                  />

                  <label
                    htmlFor="mostrar-modal-documento"
                    onClick={changeStateButon}
                  >
                    {" "}
                    <PreviewIcon style={{ color: "#0077b6" }} />{" "}
                    <span>Ver documento</span>
                  </label>
                  {showDcoument && (
                    <div id="modal1-sombra-form-Prop">
                      <ShowRegistroDirectivo
                        Detalledocumento={refrescarDocument}
                        onClickEstado={SetShowDcoument}
                        HandleDownloadExcel={HandleDownloadExcel}
                      />
                    </div>
                  )}
                </div>
                <div className=" container-title-show-iamgen-ins">
                
                  <input id="mostrar-modal" name="modal" type="radio" />

                  <label onClick={handleClickOpenFrom} htmlFor="mostrar-modal">
                    {" "}
                    <PostAddIcon style={{ color: "#4CAF50" }} />{" "}
                    <span>Registrar</span>
                  </label>

                  {clickR && (
                    <FormRegistrosDirectivos
                      RefrescarInformacion={RefrescarInformacion}
                      EstadoGlobal={EstadoGlobal}
                      onClickEstado={setClickR}
                    />
                  )}
                </div>
                {refrescarDocument?.data.length > 0 && (
                  <div className=" container-title-show-iamgen-ins">
                  
                    <input id="mostrar-modal" name="modal" type="radio" />

                    <label htmlFor="mostrar-modal" onClick={openModal}>
                      {" "}
                      <ContentPasteSearchIcon
                        style={{ color: "#4CAF50" }}
                      /><span>Subir imagenes </span>
                    </label>

                    <ModalImagesConglomerado
                      isOpen={modalIsOpen}
                      onClose={closeModal}
                      components={[
                        <ImageUploader
                          info={ModeloProps1}
                          documentoPropietario={refrescarDocument.data.find(
                            (item) => item.destipdoc === "DocInscripcion2"
                          )}
                          dataPropietario={refrescarDocument}
                          api={`${serverURL}/CGM/Upload-info-consejo-doc`}
                          request={ModeloProps1.request}
                          tipoDoc={ModeloProps1.tipDoc}
                          tipView={tipoView}
                          refrescarDocumento={setRefrescarDocument}
                        />,
                        <ImageUploader
                          info={ModeloProps2}
                          documentoPropietario={refrescarDocument.data.find(
                            (item) => item.destipdoc === "OthersDoc"
                          )}
                          api={`${serverURL}/CGM/Upload-info-consejo-doc`}
                          dataPropietario={refrescarDocument}
                          tipoDoc={ModeloProps2.tipDoc}
                          request={ModeloProps1.request}
                          tipView={tipoView}
                          refrescarDocumento={setRefrescarDocument}
                        />,
                      ]}
                    />
                  </div>
                )}

{refrescarDocument?.data.length > 0 && (
                  <div className=" container-title-show-iamgen-ins">
                   
                    <input id="mostrar-modal" name="modal" type="radio"  />

                    <label htmlFor="mostrar-modal" onClick={openModalPdf}>
                      {" "}
                      <ContentPasteSearchIcon
                        style={{ color: "#4CAF50" }}
                      />{" "}
                      <span>Subir  pdf </span>
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
                )}
              </div>
            </div>
            <div className=" container-table-register-list-directivo-table-direct">
             
              <div className="row ">
                <div className="col-md-9 ">
                  <div className="title-consejo-directivo-periodo-vigente">
                    {refrescarDocument?.data.map(
                      (item) =>
                        item.destipdoc === "DocInscripcion" && (
                          <div
                            className="title-consejo-directivo-periodo-vigente"
                            key={`${item.id}`}
                          >
                            <span style={{ fontWeight: "bold" }}>
                              Periodo vigente :
                            </span>
                            {` ${format(
                              new Date(item?.fec_inicio_vigencia),
                              "dd-MM-yyyy"
                            )} hasta ${format(
                              new Date(item?.fec_fin_vigencia),
                              "dd-MM-yyyy"
                            )}`}
                          </div>
                        )
                    )}
                  </div>
                </div>
                <div className="col-md-3" style={{display:'flex',justifyContent:'flex-end'}}>
                  <div
                    onClick={HandleDownloadExcel}
                    className="container-consejo-directivo-title-and-icon"
                  >
                    <div className="title-consejo-directivo-exportar-formato-excel">
                      Exportar en formato excel
                    </div>
                    <div className="icon-download-consejo-directivo">
                      <VerticalAlignBottomIcon />
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-body">
                <div className="outer-table-registro-propietario">
                  <div
                    className="table-responsive container-list-table-registro-propietarios"
                    style={{ overflowX: "auto" }}
                  >
                    <table className="table table-bordered table-condensed table-hover table-striped">
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            style={{
                              backgroundColor: "rgb(141 176 216)",
                              padding: "8px",
                              borderTop: "2px solid white",
                              borderLeft: "2px solid white",
                              borderBottom: "2px solid white",
                              whiteSpace: "nowrap",
                              color: "rgb(86, 104, 138)",
                            }}
                          >
                            Nombres{" "}
                          </th>

                          <th
                            scope="col"
                            style={{
                              backgroundColor: "rgb(141 176 216)",
                              padding: "8px",
                              borderTop: "2px solid white",
                              borderLeft: "2px solid white",
                              borderBottom: "2px solid white",
                              whiteSpace: "nowrap",
                              color: "rgb(86, 104, 138)",
                            }}
                          >
                            DNI
                          </th>
                          <th
                            scope="col"
                            style={{
                              backgroundColor: "rgb(141 176 216)",
                              padding: "8px",
                              borderTop: "2px solid white",
                              borderLeft: "2px solid white",
                              borderBottom: "2px solid white",
                              whiteSpace: "nowrap",
                              color: "rgb(86, 104, 138)",
                            }}
                          >
                            Cargo
                          </th>
                          <th
                            scope="col"
                            style={{
                              backgroundColor: "rgb(141 176 216)",
                              padding: "8px",
                              borderTop: "2px solid white",
                              borderLeft: "2px solid white",
                              borderBottom: "2px solid white",
                              whiteSpace: "nowrap",
                              color: "rgb(86, 104, 138)",
                            }}
                          >
                            Nombre Asociación
                          </th>
                          <th
                            scope="col"
                            style={{
                              backgroundColor: "rgb(141 176 216)",
                              padding: "8px",
                              borderTop: "2px solid white",
                              borderLeft: "2px solid white",
                              borderBottom: "2px solid white",
                              whiteSpace: "nowrap",
                              color: "rgb(86, 104, 138)",
                            }}
                          >
                            Partida
                          </th>

                          <th
                            scope="col"
                            style={{
                              backgroundColor: "rgb(141 176 216)",
                              padding: "8px",
                              borderTop: "2px solid white",
                              borderLeft: "2px solid white",
                              borderBottom: "2px solid white",
                              whiteSpace: "nowrap",
                              color: "rgb(86, 104, 138)",
                            }}
                          >
                            Asiento
                          </th>
                          <th
                            scope="col"
                            style={{
                              backgroundColor: "rgb(141 176 216)",
                              padding: "8px",
                              borderTop: "2px solid white",
                              borderLeft: "2px solid white",
                              borderBottom: "2px solid white",
                              whiteSpace: "nowrap",
                              color: "rgb(86, 104, 138)",
                            }}
                          >
                            Acción
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {refrescar.length === 0 ? (
                          <tr>
                            <td colSpan="8" style={{ textAlign: "center" }}>
                              No hay datos disponibles
                            </td>
                          </tr>
                        ) : (
                          (search.length === 0 ? refrescar : search).map((directivo) => (
                            <tr key={`${directivo.id}`}>
                              <td style={{ whiteSpace: "nowrap" }}>
                                {directivo.des_nombres}
                              </td>
                              <td>{directivo.dni}</td>
                              <td >{directivo.des_cargo}</td>
                              <td style={{ whiteSpace: "nowrap" }}>
                                {directivo.des_nombre_asociacion}
                              </td>
                              <td>{directivo.des_partida}</td>
                              <td>{directivo.desAsiento}</td>
                              <td>
                                <div className="table-column-gestion-info-directivo">
                                  <button
                                    className="btn-gestion-delete-info-directivo "
                                    onClick={() =>
                                      handleDeleteDirectivoR(directivo.id)
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
                                        handleClickOpenEditFrom(directivo)
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
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              {click && (
                <FormEditarDirectivos
                  enviarDatos={extraerDatos}
                  refrescarInformacion={RefrescarInformacionEdit}
                  onClickEstado={setClick}
                  EstadoGlobal={EstadoGlobal}
                />
              )}
            </div>
            </div>
           
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default ConsejoDirectivo;
