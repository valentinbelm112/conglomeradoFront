import { useEffect, useState } from "react";
import FormRegistrosDirectivos from "../components/FormRegistrosDirectivos";
import "./styles/ConsejoDirectivo.scss"
import VerticalAlignBottomIcon from '@mui/icons-material/VerticalAlignBottom';
import PostAddIcon from '@mui/icons-material/PostAdd';
import 'reactjs-popup/dist/index.css';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import ShowRegistroDirectivo from "../components/ShowRegistroDirectivo";
import PreviewIcon from '@mui/icons-material/Preview';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { serverURL } from "../utils/Configuration";
import { useGetConsejoDirectivo } from "../hooks/useGetConsejoDirectivo";
import { useGetConsejoDirectivoListarRefre } from "../hooks/useGetConsejoDirectivo";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
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
const ConsejoDirectivo = ({ EstadoGlobal }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [refrescar, setRefrescar] = useState([])
  const [refrescarDocument, setRefrescarDocument] = useState([])
  const [click, setClick] = useState(false)
  const [showDcoument, SetShowDcoument] = useState(false)
  const [extraerDatos, SetExtraerDatos] = useState([])
  const { directivos, isLoading } = useGetConsejoDirectivo(`${serverURL}/CGM/Obtener?Codigo_Asociacion=${EstadoGlobal.des_codigo_asociacion}`, setRefrescar);
  const [clickR, setClickR] = useState(false);
  const { documento, isLoadingDoc } = UseGetDoccumentoConsejoDirectivo(`${serverURL}/CGM/Documento-detalle-directivo`, setRefrescarDocument)
  //setRefrescar(directivos.data);


  const handleClickOpenFrom = () => {
  
    setClickR(!clickR);
  };

  const handleClickOpenEditFrom = (data) => {
    setClick(!click)
    SetExtraerDatos(data);

  };


  const changeStateButon = () => {
  
    SetShowDcoument(!showDcoument)
  }
  
  const RefrescarInformacion = async() => {
   console.log( refrescar.length)
   console.log(refrescar)
    const { response} = await useGetConsejoDirectivoListarRefre(`${serverURL}/CGM/listar`,EstadoGlobal);
   setRefrescar(response.data)
   console.log(refrescar)
  }

  const RefrescarInformacionEdit = async () => {
    console.log(refrescar.length)
    console.log(refrescar)
     const { response} = await useGetConsejoDirectivoListarRefre(`${serverURL}/CGM/listar`,EstadoGlobal);
    setRefrescar(response.data)
    setClick(!click)
    console.log(refrescar)
  }


  const HandleDownloadExcel = () => {

    useGetExportConsejoDirectivo(`${serverURL}/CGM/export-directivos`);

  }

  const DeleteRegisterConsejo = async (id) => {
    toast.dismiss();
    console.log(id + "identificador")
    await UseDeleteConsejoDirectivo(`${serverURL}/CGM/delete/${id}`);
    const { response } = await useGetConsejoDirectivoListarRefre(`${serverURL}/CGM/listar`);
    setRefrescar(response.data)
  }




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
    titulo: "Documento De #####",
    tipDoc: "DocInscripcion2",
    request: `${serverURL}/Documento/inquilino/propByDni/tipdoc/codAS`
  }

  const tipoView={
     opcion:1
  }

  const ModeloProps2 = {
    titulo: "Agrega aquí otros documentos",
    tipDoc: "OthersDoc"
  }
  const openModal = () => {
    console.log("holi")
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };


  const handleCancelDelete = () => {
    toast.dismiss(); // Cierra la notificación de confirmación
    // Otras acciones después de cancelar
  };


  if (isLoading || isLoadingDoc) {

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
          <div className="row" style={{ width: `100%` }}>
            <div className="col-md-8" >
              <div className="title-consejo-directivo">
                Consejo Directivo Vigente
              </div>
              <div className="row" >
                <div className="col-md-7">


                  <div className="title-consejo-directivo-periodo-vigente">
                    Periodo vigente :16/07/2023 al 16/11/2023
                  </div>
                </div>
                <div className="col-md-5">

                  <div onClick={HandleDownloadExcel} className="container-consejo-directivo-title-and-icon">
                    <div className="title-consejo-directivo-exportar-formato-excel">
                      Exportar en formato excel
                    </div>
                    <div className="icon-download-consejo-directivo">
                      <VerticalAlignBottomIcon />
                    </div>
                  </div>
                </div>
              </div>

              <div class="card-body">
                <div class="outer-table-registro-directivo">
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col" style={{ backgroundColor: 'lightblue', padding: '8px', borderTop: '2px solid white', borderLeft: '2px solid white', borderBottom: '2px solid white', whiteSpace: 'nowrap' }}>Nombres </th>
                        <th scope="col" style={{ backgroundColor: 'lightblue', padding: '8px', borderTop: '2px solid white', borderLeft: '2px solid white', borderBottom: '2px solid white', whiteSpace: 'nowrap' }}>Apellidos</th>
                        <th scope="col" style={{ backgroundColor: 'lightblue', padding: '8px', borderTop: '2px solid white', borderLeft: '2px solid white', borderBottom: '2px solid white', whiteSpace: 'nowrap' }}>DNI</th>
                        <th scope="col" style={{ backgroundColor: 'lightblue', padding: '8px', borderTop: '2px solid white', borderLeft: '2px solid white', borderBottom: '2px solid white', whiteSpace: 'nowrap' }}>Cargo</th>
                        <th scope="col" style={{ backgroundColor: 'lightblue', padding: '8px', borderTop: '2px solid white', borderLeft: '2px solid white', borderBottom: '2px solid white', whiteSpace: 'nowrap' }}>Teléfono</th>
                        <th scope="col" style={{ backgroundColor: 'lightblue', padding: '8px', borderTop: '2px solid white', borderLeft: '2px solid white', borderBottom: '2px solid white', whiteSpace: 'nowrap' }}>Dirección</th>
                        <th scope="col" style={{ backgroundColor: 'lightblue', padding: '8px', borderTop: '2px solid white', borderLeft: '2px solid white', borderBottom: '2px solid white', whiteSpace: 'nowrap' }}>Acción</th>
                      </tr>
                    </thead>

                    <tbody>
                      {

                        refrescar.map((directivo) =>
                        (

                          <tr>
                            <td>{directivo.des_nombres}</td>
                            <td>{directivo.des_apellidos}</td>
                            <td>{directivo.dni}</td>
                            <td>{directivo.des_cargo}</td>
                            <td>{directivo.num_telefono}</td>
                            <td>{directivo.des_direccion}</td>
                            <td>
                              <div className="table-column-gestion-info-directivo">

                                <button className="btn-gestion-delete-info-directivo " onClick={() => handleDeleteDirectivoR(directivo.id)}>
                                  <DeleteForeverIcon style={{ color: `red` }}
                                  />
                                </button>

                                <button className="btn-gestion-edit-info-directivo">
                                  <input id="mostrar-modal-editar" name="modal" type="radio" />

                                  <label onClick={(e) => handleClickOpenEditFrom(directivo)} for="mostrar-modal-editar" >  <EditIcon color="primary" /> </label>
                                </button>

                              </div>
                            </td>
                          </tr>

                        )
                        )}

                    </tbody>
                  </table>
                </div>
              </div>
              {click && <FormEditarDirectivos enviarDatos={extraerDatos} refrescarInformacion={RefrescarInformacionEdit} onClickEstado={setClick} />}
            </div>

            <div className="col-md-4">
              <div className="title-consejo-directivo">
                Documento de la asociacion
              </div>

              <br />
              <div className="row">
                <div className="col-md-4 container-title-show-iamgen-ins">
                  {//<button type="button" className="btn btn-outline-success">
                    //Inscripcion de asociaciones
                    //</button>
                  }
                  <div className="container-title-show-iamgen-ins-label">Ver Documento</div>
                  <input id="mostrar-modal-documento" name="modal" type="radio" />

                  <label for="mostrar-modal-documento" onClick={changeStateButon}> <PreviewIcon /> </label>
                  {showDcoument && (
                    <div id='modal1-sombra-form-Prop'>
                      <ShowRegistroDirectivo Detalledocumento={refrescarDocument} onClickEstado={SetShowDcoument} HandleDownloadExcel={HandleDownloadExcel} />


                    </div>
                  )}


                </div>
                <div className="col-md-4 container-title-show-iamgen-ins">
                  <div className="container-title-show-iamgen-ins-label">Añadir Registro</div>
                  <input id="mostrar-modal" name="modal" type="radio" />

                  <label onClick={handleClickOpenFrom} for="mostrar-modal"> <PostAddIcon /> </label>

                  {
                    clickR && (
                      <FormRegistrosDirectivos RefrescarInformacion={RefrescarInformacion} EstadoGlobal={EstadoGlobal} onClickEstado={setClickR} />
                    )
                  }



                </div>
                <div className="col-md-4 container-title-show-iamgen-ins">
                  <div className="container-title-show-iamgen-ins-label">(+) Documento</div>
                  <input id="mostrar-modal"  name="modal" type="radio" />

                  <label for="mostrar-modal" onClick={openModal}> <ContentPasteSearchIcon /> </label>

                  <ModalImagesConglomerado
                  isOpen={modalIsOpen}
                  onClose={closeModal}
                  components={[
                    <ImageUploader info={ModeloProps1}
                      documentoPropietario={
                        refrescarDocument.data.find(item => item.destipdoc  === 'DocInscripcion2')
                      }
                      dataPropietario={refrescarDocument}
                      api={`${serverURL}/CGM/Upload-info-consejo-doc`}
                      request={ModeloProps1.request}
                      tipoDoc={ModeloProps1.tipDoc}
                      tipView={tipoView} />,
                    <ImageUploader info={ModeloProps2}
                      documentoPropietario={
                        " refrescarDocument.data.find(item => item.desTipoDoc === 'ConatratoAlquiler')"
                      }
                      api={`${serverURL}/CGM/Upload-info-consejo-doc`}
                      dataPropietario={refrescarDocument}
                      tipoDoc={ModeloProps2.tipDoc}
                      request={ModeloProps1.request}
                      tipView={tipoView}
                    />,

                  ]}
                />


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

export default ConsejoDirectivo;