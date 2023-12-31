import React from "react";
import { useState,useEffect } from "react";
import "./styles/ExpedienteSocio.scss";
import PreviewIcon from "@mui/icons-material/Preview";
import ModalImagesConglomerado from "./ModalImagesConglomerado";
import ImageUploader from "./ImageUploader"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';
import { serverURL } from "../utils/Configuration";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Download from "yet-another-react-lightbox/plugins/download";
import Captions from "yet-another-react-lightbox/plugins/captions";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
const ExpedientePropietarioSocio = (props) => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [expedienteSelect, setExpedienteSelect] = useState(null);
  const [inmuebleSelect, setInmuebleSelect] = useState(null);
  const [coPropietarios,setCoPropietarios] = useState(null);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState('opcion1'); 
  const [selectedPabellon, setSelectedPabellon] = useState("");
  const [selectedPuesto, setSelectedPuesto] = useState("");
  const navigate = useNavigate();


  const handleOptionSelectConyugue = (event) => {
    setOpcionSeleccionada(event.target.value);
    setExpedienteSelect(props.expedienteCony.data);
  };


  const handleOptionSelectTitular = (event) => {
    setOpcionSeleccionada(event.target.value);
    setExpedienteSelect(props.expediente.data);
  };

  useEffect(() => {

    if (props.padron.data.inmuebleSocioEntities.length > 0) {
      setInmuebleSelect(props.padron.data.inmuebleSocioEntities[0]);
    }
    setExpedienteSelect(props.expediente.data);


    if (props.propietario.length > 0) {
      const foundCopropietario = props.propietario[0].propietario.filter(
        (element) =>element.des_nombres !== props.nombreExpedienteProp
      );
      setCoPropietarios(foundCopropietario);
      console.log(foundCopropietario)
    }
    
   
   
    console.log(props);
  }, []);


  const tipoView = {
    opcion: 2,
  };

  const ModeloProps1={
     titulo:"Registro padron socios",
     tipDoc: "RegistroSocios",
     request: `${serverURL}/Documento/socio/propByDni/tipdoc/codAS`,
  }

  const ModeloProps2={
    titulo:"Constancia socio titular posicionario",
    tipDoc: "ConstanciaSocio",
     request: `${serverURL}/Documento/socio/propByDni/tipdoc/codAS`,
 }

 const ModeloProps3={
  titulo:"Hoja de liquidacion de arbitrios",
  tipDoc: "Liquidacion",
     request: `${serverURL}/Documento/socio/propByDni/tipdoc/codAS`,
}

const ModeloProps4={
 titulo:"Titulo registrado de propiedad urbana",
 tipDoc: "RegistroPropiedadUrbana",
 request: `${serverURL}/Documento/socio/propByDni/tipdoc/codAS`,
}


const ModeloProps5={
  titulo:"Contrato de alquiler",
  titulo:"Titulo registrado de propiedad urbana",
  tipDoc: "ContratoAlquiler",
  request: `${serverURL}/Documento/socio/propByDni/tipdoc/codAS`,
}

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

 

  const openModalDocBaja = () => {
    setOpen(true);
  };


  const ChangeRouter = (dni,id) => {

    navigate(`/expediente-socio/${dni}/${id}`);
    window.location.reload();
    
   
  };


  function capitalizeFirstLetter(str) {
    return str?.charAt(0).toUpperCase() + str?.slice(1).toLowerCase();
  }

  const handleChange = (event) => {
    const [selectedPabellon, selectedPuesto] = event.target.value.split('-');
    console.log(selectedPabellon);
    console.log(selectedPuesto);
  console.log(props.padron.data.inmuebleSocioEntities)

    const inmuebleEncontrado = props.padron.data.inmuebleSocioEntities.find(
      (inmueble) => inmueble.numPabellon == selectedPabellon && inmueble.numPuesto == selectedPuesto
    );

   

    console.log(inmuebleEncontrado);
    setSelectedPabellon(selectedPabellon);
    setSelectedPuesto(selectedPuesto);
    setInmuebleSelect(inmuebleEncontrado);
    
    //console.log(props.propietario)

    const foundCopropietario = props.propietario.filter(
      (element) =>element.numPabellon == selectedPabellon && element.numPuesto == selectedPuesto
    )
    
    console.log(foundCopropietario)
    if(foundCopropietario.length>0){
      console.log(foundCopropietario[0].propietario)
      const coPropietarioDatos=foundCopropietario[0].propietario.filter(
        (element) =>element.des_nombres !== props?.nombreExpedienteProp 
      );
  
      console.log(coPropietarioDatos)
      setCoPropietarios(coPropietarioDatos);

    }
  

  };
  const changeStado = () => {
    props.cambiarEstado();
  };



  return (
    <div className="container-expediente-socio">
      <div className="title-container-expediente-socio">
        Expediente del Socio
      </div>
      <div className="row">
        <div className="col-md-4">
          <div className="Partida-registral-socio-title">
            Puestos del socio:
          </div>
          {props.pabellones.map((item)=>(
            <div className="Partida-registral-socio-title-p">
             {item}
             </div>
          ))}

          <div className="container-expediente-radio-button">
            <input
              type="radio"
              id="contactChoice1"
              name="contact"
              value="opcion1"
              checked={opcionSeleccionada === 'opcion1'}
              onChange={handleOptionSelectTitular}
            />
            <label
               htmlFor="contactChoice1"
               className="container-expediente-contactChoice1-propietario"
            >
              Socio
            </label>
            <input
             type="radio"
             id="contactChoice2"
             name="contact"
             value="opcion2"
             checked={opcionSeleccionada === 'opcion2'}
             onChange={handleOptionSelectConyugue}
            />
            <label
               htmlFor="contactChoice2"
               className="container-expediente-contactChoice1-propietario"
            >
              Conyugue del Socio
            </label>
          </div>

          <div className="container--expediente-socio">
            <img
             src={expedienteSelect?.des_url_foto}
             alt=""
             className="foto-expediente-propietario"
            />
          </div>
          <div className="container-info-personal-expediente-filter">
            <div className="title-info-personal-expediente">
              Información Personal
            </div>
            <div className="container-info-personal">
              <div className="title-datos-personales-expediente-filter">
                Nombres :
              </div>
              <div>
                {capitalizeFirstLetter(expedienteSelect?.des_nombres?.trim())}
              </div>
            </div>

            <div className="container-info-personal">
              <div className="title-datos-personales-expediente-filter">
                Apellidos :
              </div>
              <div>
              {`${capitalizeFirstLetter(
                  expedienteSelect?.des_apellido_paterno?.trim()
                )}  ${capitalizeFirstLetter(
                  expedienteSelect?.des_apellido_materno?.trim()
                )}`}

              </div>
            </div>

            <div className="container-info-personal">
              <div className="title-datos-personales-expediente-filter">
                Dni :
              </div>
              <div>{expedienteSelect?.dni?.trim()}</div>
            </div>
            <div className="container-info-personal">
              <div className="title-datos-personales-expediente-filter">
                Fecha de expedicion :
              </div>
              <div>2023-08-07</div>
            </div>

            <div className="container-info-personal">
              <div className="title-datos-personales-expediente-filter">
                Sexo :
              </div>
              <div>{expedienteSelect?.des_genero?.trim()}</div>
            </div>
            <div className="container-info-personal">
              <div className="title-datos-personales-expediente-filter">
                Fecha de Nacimiento :
              </div>
              <div>2023-08-07</div>
            </div>
            <div className="container-info-personal">
              <div className="title-datos-personales-expediente-filter">
                Deparatamento de nacimiento :
              </div>
              <div> {capitalizeFirstLetter(
                  expedienteSelect?.des_departamento_nacimiento?.trim()
                )}</div>
            </div>
            <div className="container-info-personal">
              <div className="title-datos-personales-expediente-filter">
                Grado de Instruccion :
              </div>
              <div> {capitalizeFirstLetter(
                  expedienteSelect?.des_grado_instruccion?.trim()
                )}</div>
            </div>

            <div className="container-info-personal">
              <div className="title-datos-personales-expediente-filter">
                Estado Civil :
              </div>
              <div> {capitalizeFirstLetter(
                  expedienteSelect?.des_estado_civil?.trim()
                )}</div>
            </div>

            <div className="container-info-personal">
              <div className="title-datos-personales-expediente-filter">
                Departamento de Domicilio :
              </div>

              <div> {capitalizeFirstLetter(
                  expedienteSelect?.des_departamento_dom?.trim()
                )}</div>
            </div>
            <div className="container-info-personal">
              <div className="title-datos-personales-expediente-filter">
                Provincia de Domicilio :
              </div>
              <div>{capitalizeFirstLetter(
                  expedienteSelect?.des_provincia_dom?.trim()
                )}</div>
            </div>
            <div className="container-info-personal">
              <div className="title-datos-personales-expediente-filter">
                Distrito de Domicilio :
              </div>
              <div> {capitalizeFirstLetter(
                  expedienteSelect?.des_distrito_dom?.trim()
                )}</div>
            </div>
            <div className="container-info-personal">
              <div className="title-datos-personales-expediente-filter">
                Dirección de Domicilio :
              </div>
              <div> {capitalizeFirstLetter(
                  expedienteSelect?.des_direccion_dom?.trim()
                )}</div>
            </div>
            <div className="container-info-personal"></div>
          </div>
          <div className="title-info-personal-expediente">
            Información del contacto
          </div>
          <div className="container-info-contacto-expediente-filter">
            <div className="container-info-personal">
              <div className="title-datos-personales-expediente-filter">
                Numero de telefono
              </div>
              <div>##############</div>
            </div>
            <div className="container-info-personal">
              <div className="title-datos-personales-expediente-filter">
                Correo electronico
              </div>
              <div>{props.padron.data.des_correo}</div>
            </div>
          </div>
        </div>
        <div className="col-md-8  container-right-info-inmebles-doc">
          <div className="title-info-personal-expediente">
            Información Comercial
          </div>
          <div className="container-partida-filter-expediente">
            <div className="container-partida-filter-expediente">
              Selecionar el puesto a Revisar
            </div>
            <div className="container-combo-socio">
              <select
                id="myCombobox-socio"
                value={`${selectedPabellon}-${selectedPuesto}`}
                onChange={handleChange}
              >
               {props.padron.data.inmuebleSocioEntities.map((inmueble) => (
                  <option key={inmueble.id}  value={`${inmueble.numPabellon}-${inmueble.numPuesto}`}>
                   {`Pabellón:${inmueble.numPabellon} Puesto:${inmueble.numPuesto}`}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="row container-infor-personal-inmuebles">
            <div className="col-7">
              <div className="row  container-puesto-negocio-estado">
                <div className="col-md-2 container-title-numero-partida">
                  <div className="title-numero-partida">Puesto</div>
                  <div className="title-numero-partida-p">{inmuebleSelect?.numPuesto}</div>
                </div>
                <div className="col-md-7 container-title-oficina-registral">
                  <div className="title-oficina-registral">
                    Nombre del Negocio
                  </div>
                  <div className="title-oficina-registral-p">
                  {inmuebleSelect?.des_negocio}
                  </div>
                </div>

                <div className="col-md-3 container-title-estado">
                  <div className="title-estado">Estado</div>
                  <div className="title-estado-p">Estado</div>
                </div>
              </div>
              <div className="row container-dominio-acciones">
                <div className="col-md-6">
                  <div className="title-tipo-dominio">Direccion</div>
                  <div className="title-tipo-dominio-p"> {inmuebleSelect?.des_direccion}</div>
                </div>
                <div className="col-md-6">
                  <div className="title-tipo-dominio">Giro</div>
                  <div className="title-tipo-dominio-p"> {inmuebleSelect?.des_giro}</div>
                </div>
              </div>
              <br />
            <br />
            <table className="tabla-co-propietario-datos">
                <tr>
                  <th className="title-co-propietarios-list">Co-Propietario</th>
                  <th className="title-co-propietarios-dni">DNI</th>
                  <th className="title-co-propietarios-dni-conyugue">Cónyuge del propietario</th>
                </tr>
                {coPropietarios?.length > 0 && (coPropietarios.map(
                  (elemento, index) =>
                   
                      <tr className="nombre-co-propietario">
                        <td  key={index}>{elemento.des_nombres} </td>
                       
                          <td className="dni-co-propietario" onClick={() => ChangeRouter(elemento.desDni,elemento.id)} key={index} >
                            {elemento.desDni}{" "}
                          </td>
                       
                        <td key={index}>{elemento.des_dni_conyugue} </td>
                      </tr>
                   
                ))}
              </table>
            </div>
            <div className="col-5">
            {
              props.padron.data.socioBajaDetEntities.length > 0 &&
              <div className="col-5">
                <div className="title-fecha-baja">Fecha baja:</div>
                <div>
                  {props.padron.data.socioBajaDetEntities[0].fec_baja}
                </div>
                <div className="title-motivo-baja">Mótivo de la baja: </div>
                <div>
                  {props.padron.data.socioBajaDetEntities[0].des_motivo}
                </div>
                <div className="title-observaciones-baja">Observaciones Adicionales:</div>
                <div>
                  {props.padron.data.socioBajaDetEntities[0].des_obserbaciones}
                </div>
                <div className="title-observaciones-baja">Revisar Documentos</div>
                <input onClick={openModalDocBaja} id="mostrar-modal-documento-baja-socio" name="modal" type="radio" />

                <label for="mostrar-modal-documento-baja-socio">
                  {" "}
                  <FontAwesomeIcon icon={faEye} />{" "}
                </label>

                <Lightbox
                       plugins={[Zoom,Download,Captions]}
                            open={open}
                            close={() => setOpen(false)}
                            slides={[
                            { src: props.padron.data.socioBajaDetEntities[0].des_link_documento ,
                            title: "Documento de la baja de un propietario"
                            }  ]}
                        />
              </div>
            }
            </div>
           
             


            <div className="title-co-conyugue-socio">Inquilinos del Puesto</div>
            <div className="title-co-conyugue-socio-p">Si</div>

            <div className="title-cotitular-conyugue-p">Blacker |</div>
            <div className="title-cotitular-conyugue-p"></div>
            <div className="title-cotitular-conyugue-p">Dni |</div>
            <div className="title-cotitular-conyugue-p">Ir a su expediente</div>
            <div className="Documentos-asociado-padron-socio">
              Documentos del asociado
            </div>
            <p>
            Adjuntar documentacion del asociado
            </p>
            <div className="row">
              <div className="col-md-3">
               
                <input onClick={openModal} id="mostrar-modal-documento-socio" name="modal" type="radio" />

                <label for="mostrar-modal-documento-socio">
                  {" "}
                  <FontAwesomeIcon icon={faFolderOpen} />{" "}
                </label>
                <ModalImagesConglomerado
                    isOpen={modalIsOpen}
                    onClose={closeModal}
                    
                    components={[
                        <ImageUploader info={ModeloProps1}
                        documentoPropietario={
                          props.padron.data.documentoInquilinoEntities
                        }
                        dataPropietario={ props.padron.data}
                        api={`${serverURL}/Socio/Upload-info-socio`}
                        tipView={tipoView}
                        
                        tipoDoc={ModeloProps1.tipDoc}
                        request={ModeloProps1.request}
                    
                    />,
                        <ImageUploader  info={ModeloProps2}
                        documentoPropietario={
                          props.padron.data.documentoInquilinoEntities
                        }
                        dataPropietario={ props.padron.data}
                        api={`${serverURL}/Socio/Upload-info-socio`}
                        tipView={tipoView}
                        
                        tipoDoc={ModeloProps2.tipDoc}
                        request={ModeloProps2.request}
                        />,
                        <ImageUploader info={ModeloProps3} 
                        documentoPropietario={
                          props.padron.data.documentoInquilinoEntities
                        }
                        dataPropietario={ props.padron.data}
                        api={`${serverURL}/Socio/Upload-info-socio`}
                        tipView={tipoView}
                        
                        tipoDoc={ModeloProps3.tipDoc}
                        request={ModeloProps3.request}
                        />,
                        <ImageUploader  info={ModeloProps4}
                        documentoPropietario={
                          props.padron.data.documentoInquilinoEntities
                        }
                        dataPropietario={ props.padron.data}
                        api={`${serverURL}/Socio/Upload-info-socio`}
                        tipView={tipoView}
                        
                        tipoDoc={ModeloProps4.tipDoc}
                        request={ModeloProps4.request}/>,
                        <ImageUploader info={ModeloProps5}
                         documentoPropietario={
                        props.padron.data.documentoInquilinoEntities
                      }
                      dataPropietario={ props.padron.data}
                      
                      api={`${serverURL}/Socio/Upload-info-socio`}
                      tipView={tipoView}
                      
                      tipoDoc={ModeloProps5.tipDoc}
                      request={ModeloProps5.request}/>
                    ]}
                    />
              </div>
              <div className="col-md-3"></div>
              <div className="col-md-3"></div>
              <div className="col-md-3"></div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ExpedientePropietarioSocio;
