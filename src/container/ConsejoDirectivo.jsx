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
import {useGetConsejoDirectivo} from "../hooks/useGetConsejoDirectivo";
import {useGetConsejoDirectivoListarRefre} from "../hooks/useGetConsejoDirectivo";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import useGetExportConsejoDirectivo  from "../hooks/useGetExportExcelConsejoDirectivo";
import { UseDeleteConsejoDirectivo } from "../hooks/useDeleteConsejoDirectivo";
import Container_Nav_Sidb_Load from "../components/Container_Nav_Sidb_Load";
import NavbarConglomerado from "../components/NavbarConglomerados";
import SidebarMenu from "../components/SidebarMenu";
import UseGetDoccumentoConsejoDirectivo from "../hooks/useGetDocumentoConsejoDirectivo";
import FormEditarDirectivos from "../components/FormEditarDirectivos";

const ConsejoDirectivo = () => {
 const [refrescar ,setRefrescar]=useState([])
 const [click,setClick]=useState(false)
 const [showDcoument,SetShowDcoument]=useState(false)
 const [extraerDatos ,SetExtraerDatos]=useState([])
  const { directivos, isLoading } = useGetConsejoDirectivo(`${serverURL}/CGM/listar`,setRefrescar);
 
  const {documento,isLoadingDoc} =UseGetDoccumentoConsejoDirectivo(`${serverURL}/CGM/Documento-detalle-directivo`)
  //setRefrescar(directivos.data);
  

  const handleClickOpenFrom = () => {
    const parrafo = document.querySelector('#modal');
      parrafo.style.top = '95px'
  };

  const handleClickOpenEditFrom = (data) => {
    setClick(!click)
    SetExtraerDatos(data);
   
  };


  const changeStateButon=()=>{
    SetShowDcoument(!showDcoument)
  }
  
  const RefrescarInformacion = async() => {
   console.log( refrescar.length)
   console.log(refrescar)
    const { response} = await useGetConsejoDirectivoListarRefre(`${serverURL}/CGM/listar`);
   setRefrescar(response.data)
   setClick(!click)
   console.log(refrescar)
  }

  const HandleDownloadExcel=()=>{
  console.log("EEE")
   useGetExportConsejoDirectivo(`${serverURL}/CGM/export-directivos`);
     
  }

  const DeleteRegisterConsejo=async(id)=>{
    console.log(id + "identificador")
    await UseDeleteConsejoDirectivo(`${serverURL}/CGM/delete/${id}`);
    const { response} = await useGetConsejoDirectivoListarRefre(`${serverURL}/CGM/listar`);
   setRefrescar(response.data)
  }


  if (isLoading || isLoadingDoc) {

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
          <div className="row" style={{width:`100%`}}>
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
                    <th scope="col" style={{backgroundColor: 'lightblue', padding: '8px',  borderTop: '2px solid white', borderLeft: '2px solid white', borderBottom: '2px solid white' ,whiteSpace: 'nowrap'}}>Nombres </th>
                    <th scope="col" style={{backgroundColor: 'lightblue', padding: '8px',  borderTop: '2px solid white', borderLeft: '2px solid white', borderBottom: '2px solid white' ,whiteSpace: 'nowrap'}}>Apellidos</th>
                    <th scope="col" style={{backgroundColor: 'lightblue', padding: '8px',  borderTop: '2px solid white', borderLeft: '2px solid white', borderBottom: '2px solid white' ,whiteSpace: 'nowrap'}}>DNI</th>
                    <th scope="col" style={{backgroundColor: 'lightblue', padding: '8px',  borderTop: '2px solid white', borderLeft: '2px solid white', borderBottom: '2px solid white' ,whiteSpace: 'nowrap'}}>Cargo</th>
                    <th scope="col" style={{backgroundColor: 'lightblue', padding: '8px',  borderTop: '2px solid white', borderLeft: '2px solid white', borderBottom: '2px solid white' ,whiteSpace: 'nowrap'}}>Acción</th>
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

                      <td>
                        <div className="table-column-gestion-info-directivo">
                         
                          <button className="btn-gestion-delete-info-directivo "onClick={() =>DeleteRegisterConsejo(directivo.id)}>
                            <DeleteForeverIcon style={{ color: `red` }} 
                            />
                          </button>

                          <button className="btn-gestion-edit-info-directivo">
                          <input id="mostrar-modal-editar" name="modal" type="radio" />

                            <label onClick={(e)=>handleClickOpenEditFrom(directivo)} for="mostrar-modal-editar" >  <EditIcon color="primary"  /> </label>
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
                {click&& <FormEditarDirectivos enviarDatos={extraerDatos} refrescarInformacion={RefrescarInformacion} onClickEstado={setClick} />}
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
                  
                  <label for="mostrar-modal-documento"> <PreviewIcon onClick={changeStateButon} /> </label>

                  <div id="modal-show-document">
                  <ShowRegistroDirectivo  Detalledocumento={documento} />
                    
                   
                  </div>

                </div>
                <div className="col-md-4 container-title-show-iamgen-ins">
                   <div className="container-title-show-iamgen-ins-label">Añadir Registro</div>
                  <input id="mostrar-modal" name="modal" type="radio" />

                  <label onClick={handleClickOpenFrom} for="mostrar-modal"> <PostAddIcon  /> </label>

                
                    <FormRegistrosDirectivos RefrescarInformacion={RefrescarInformacion}  />
                

                </div>
                <div className="col-md-4 container-title-show-iamgen-ins">
                   <div className="container-title-show-iamgen-ins-label">(+) Documento</div>
                  <input id="mostrar-modal" name="modal" type="radio" />

                  <label for="mostrar-modal"> <ContentPasteSearchIcon /> </label>

                  <div id="modal">
                    <FormRegistrosDirectivos />
                  </div>

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