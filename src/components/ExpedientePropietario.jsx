import React, { useEffect } from "react";
import { useState } from "react";
import "./styles/ExpedientePropietario.scss";
import ModalImagesConglomerado from "./ModalImagesConglomerado";
import ImageUploader from "./ImageUploader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { serverURL } from "../utils/Configuration";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Download from "yet-another-react-lightbox/plugins/download";
import Captions from "yet-another-react-lightbox/plugins/captions";
import { ToastContainer } from "react-toastify";

const ExpedientePropietario = (props) => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [expedienteSelect, setExpedienteSelect] = useState(null);
  const [inmuebleSelect, setInmuebleSelect] = useState(null);
  const [coPropietarios, setCoPropietarios] = useState([]);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState("opcion1");
  const [situacionAsiento, setSituacionAsiento] = useState([]);
  const [selectedValueAsiento, setSelectedValueAsiento] = useState("");
  const [selectAsientoDisabled, setSelectAsientoDisabled] = useState(true);
  const navigate = useNavigate();
  console.log(props);

  //console.log(situacionAsiento);
  const handleOptionSelectConyugue = (event) => {
    setOpcionSeleccionada(event.target.value);
    setExpedienteSelect(props.expedienteCony.data);
  };

  const handleOptionSelectTitular = (event) => {
    setOpcionSeleccionada(event.target.value);
    setExpedienteSelect(props.expediente.data);
  };

  useEffect(() => {
    if (props.padron.data.inmuebleEntities.length > 0) {
      setSelectedValue(props.padron.data.inmuebleEntities[0].numPartida);
    }

    if (props.padron.data.inmuebleEntities.length > 0) {
      setInmuebleSelect(props.padron.data.inmuebleEntities[0]);
    }
    setExpedienteSelect(props.expediente.data);

    if (props.propietario.length > 0) {
      console.log("Found co propietario");
      const foundCopropietario = props.propietario.filter(
        (element) => element.desNombreCompleto !== props.nombreExpedienteProp
      );

      console.log(foundCopropietario);
      setCoPropietarios(foundCopropietario);
      console.log(foundCopropietario);
    }

    console.log(props);
  }, []);

  const ModeloProps1 = {
    titulo: "Documento de compra y venta",
    tipDoc: "ContratoCompraVenta",
    request: `${serverURL}/Documento/propByDni/tipdoc/codAS`,
  };

  const ModeloProps2 = {
    titulo: "Minuta",
    tipDoc: "Minuta",
    request: `${serverURL}/Documento/propByDni/tipdoc/codAS`,
  };

  const openModalDocBaja = () => {
    setOpen(true);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const ChangeRouter = (dni, id) => {
    navigate(`/expediente/${dni}/${id}`);
    window.location.reload();
  };

  const tipoView = {
    opcion: 2,
  };
  function capitalizeFirstLetter(str) {
    return str?.charAt(0).toUpperCase() + str?.slice(1).toLowerCase();
  }

  const handleChange = (event) => {
    console.log(event.target.value);

    const inmuebleEncontrado = props.padron.data.inmuebleEntities.find(
      (inmueble) => inmueble.numPartida === event.target.value
    );

    setSelectedValue(event.target.value);
    setInmuebleSelect(inmuebleEncontrado);
    setSelectAsientoDisabled(false);
  };

  const handleChangeAsiento = (event) => {
    /*
    console.log(event.target.value);
    const inmuebleEncontrado = props.propietario.find(
      (inmueble) => inmueble.partida=== selectedValue  && inmueble.asiento ===event.target.value
    );

    console.log(selectedValue);
    console.log(inmuebleEncontrado);
    setCoPropietarios(inmuebleEncontrado.situacion);
  */

    console.log(props);
    setSelectedValueAsiento(event.target.value);
    const situacionAsiento = props.situacionAsiento.filter(
      (element) => element.asiento === event.target.value
    );

    console.log(situacionAsiento);
    if (situacionAsiento.length > 0) {
      setSituacionAsiento(situacionAsiento);
    }
  };

  return (
    <div className="container-expediente-propietario" style={{marginLeft:'2%'}}>
      <div className="title-container-expediente-propietario">
        Expediente del Propietario
      </div>
      <div className="row">
        <div className="col-md-5">
          <div className="container-partidas-info-foto">
            <div className="Partida-registral-propietario-title">
              Partidas Registral del propietario:
            </div>
            {props.partidasRegistrales.map((item) => (
              <div className="Partida-registral-propietario-title-p">
                {item}
              </div>
            ))}
            <div className="container-expediente-radio-button">
              <input
                type="radio"
                id="contactChoice1"
                name="contact"
                value="opcion1"
                checked={opcionSeleccionada === "opcion1"}
                onChange={handleOptionSelectTitular}
              />
              <label
                htmlFor="contactChoice1"
                className="container-expediente-contactChoice1-propietario"
              >
                Titular
              </label>

              <label></label>
              {props.expedienteConyugue && (
                <>
                  <input
                    type="radio"
                    id="contactChoice2"
                    name="contact"
                    value="opcion2"
                    checked={opcionSeleccionada === "opcion2"}
                    onChange={handleOptionSelectConyugue}
                  />

                  <label
                    htmlFor="contactChoice2"
                    className="container-expediente-contactChoice1-propietario"
                  >
                    Conyugue
                  </label>
                </>
              )}
            </div>

            <div className="container--expediente-propietario">
              {expedienteSelect ? (
                <img
                  src={"expedienteSelect?.des_url_foto"}
                  alt=""
                  className="foto-expediente-propietario"
                />
              ) : (
                <div>No cuenta con foto de perfil</div>
              )}
            </div>
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
              <div>
                {capitalizeFirstLetter(
                  expedienteSelect?.des_departamento_nacimiento?.trim()
                )}
              </div>
            </div>
            <div className="container-info-personal">
              <div className="title-datos-personales-expediente-filter">
                Grado de Instruccion :
              </div>
              <div>
                {capitalizeFirstLetter(
                  expedienteSelect?.des_grado_instruccion?.trim()
                )}
              </div>
            </div>

            <div className="container-info-personal">
              <div className="title-datos-personales-expediente-filter">
                Estado Civil :
              </div>
              <div>
                {capitalizeFirstLetter(
                  expedienteSelect?.des_estado_civil?.trim()
                )}
              </div>
            </div>

            <div className="container-info-personal">
              <div className="title-datos-personales-expediente-filter">
                Deparatamento de Domicilio :
              </div>

              <div>
                {capitalizeFirstLetter(
                  expedienteSelect?.des_departamento_dom?.trim()
                )}
              </div>
            </div>
            <div className="container-info-personal">
              <div className="title-datos-personales-expediente-filter">
                Provincia de Domicilio :
              </div>
              <div>
                {capitalizeFirstLetter(
                  expedienteSelect?.des_provincia_dom?.trim()
                )}
              </div>
            </div>
            <div className="container-info-personal">
              <div className="title-datos-personales-expediente-filter">
                Distrito de Domicilio :
              </div>
              <div>
                {capitalizeFirstLetter(
                  expedienteSelect?.des_distrito_dom?.trim()
                )}
              </div>
            </div>
            <div className="container-info-personal">
              <div className="title-datos-personales-expediente-filter">
                Dirección de Domicilio :
              </div>
              <div>
                {capitalizeFirstLetter(
                  expedienteSelect?.des_direccion_dom?.trim()
                )}
              </div>
            </div>
            <div className="container-info-personal"></div>
          </div>
          <div className="container-info-contacto">
            <div className="title-info-personal-expediente">
              Información del contacto
            </div>
            <div className="container-info-contacto-expediente-filter">
              <div className="container-info-personal">
                <div className="title-datos-personales-expediente-filter">
                  Numero de telefono :
                </div>
                <div>{props.padron.data.num_telefono}</div>
              </div>
              <div className="container-info-personal">
                <div className="title-datos-personales-expediente-filter">
                  Correo electronico :
                </div>
                <div>{props.padron.data.des_correo}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-7 container-right-info-inmebles-doc">
          <div className="container-info-inmueble-detail">
            <div className="row container-infor-personal-inmuebles">
              <div className="title-info-personal-expediente">
                Información del inmueble
              </div>
              <div className="container-partida-filter-expediente">
                <div>Selecionar Partida a Revisar</div>
                <div className="container-combo-socio">
                  <select
                    id="myCombobox-socio"
                    value={selectedValue}
                    onChange={handleChange}
                    style={{ marginRight: "15px" }}
                  >
                    {props.padron.data.inmuebleEntities.map((inmueble) => (
                      <option key={inmueble.id} value={inmueble.numPartida}>
                        {inmueble.numPartida}
                      </option>
                    ))}
                  </select>

                  <select
                    id="myCombobox-socio"
                    value={selectedValueAsiento}
                    onChange={handleChangeAsiento}
                    disabled={selectAsientoDisabled}
                  >
                    {props.padron.data.inmuebleEntities.map((inmueble) => (
                      <option key={inmueble.id} value={inmueble.numAsiento}>
                        {inmuebleSelect?.numPartida === selectedValue &&
                          ` - Asiento: ${inmueble.numAsiento}`}
                      </option>
                    ))}
                  </select>
                </div>
                <p>Seleccionaste: {selectedValue}</p>
              </div>
              <div className="col-7">
                <div className="row">
                  <div className="col-md-4 container-title-numero-partida">
                    <div className="title-numero-partida">Numero Partida</div>
                    <div className="title-numero-partida-p">
                      {" "}
                      {inmuebleSelect?.numPartida}
                    </div>
                  </div>
                  <div className="col-md-4 container-title-oficina-registral">
                    <div className="title-oficina-registral">
                      Oficina Registral
                    </div>
                    <div className="title-oficina-registral-p">
                      {inmuebleSelect?.des_oficina_registral}
                    </div>
                  </div>

                  <div className="col-md-4 container-title-estado">
                    <div className="title-estado">Estado Propeitario</div>
                    <div className="title-estado-p">
                      {props.padron.data.des_estado}
                    </div>
                  </div>
                </div>
                
                <div className="row" style={{marginTop:'10px'}}>
                  <div className="col-md-4">
                    <div className="title-tipo-dominio">Tipo de dominio</div>
                    <div className="title-tipo-dominio-p">
                      {inmuebleSelect?.des_tipo_dominio}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="title-acciones-drechos">
                      % Acciones y Derechos
                    </div>

                    <div className="title-acciones-drechos-p">
                      {inmuebleSelect?.num_acciones_derechos}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="title-acciones-drechos">
                      Situación Propiedad
                    </div>

                    <div className="title-acciones-drechos-p">
                      {situacionAsiento.length > 0 &&
                        situacionAsiento[0].situacion}
                    </div>
                  </div>
                </div>

                <div className="title-acciones-drechos">Direccion</div>
                <div className="title-direccion-propietarios-p">
                  {inmuebleSelect?.des_direccion}
                </div>

                <div className="title-acciones-drechos">Detalle</div>
                <div className="title-direccion-propietarios-p">
                 
                  {situacionAsiento.length > 0?(situacionAsiento[0].comentario !=null?situacionAsiento[0].comentario:"Fundador del Inmueble"):"Fundador del Inmueble"}
                </div>
              </div>
              {props.padron.data.propietarioBajaDetEntities.length > 0 && (
                <div
                  className="col-5"
                  style={{ borderLeft: "1px solid #b3aeae" }}
                >
                  <div className="title-fecha-baja">Fecha baja:</div>
                  <div>
                    {props.padron.data.propietarioBajaDetEntities[0].fec_baja}
                  </div>
                  <div className="title-motivo-baja">Mótivo de la baja: </div>
                  <div>
                    {props.padron.data.propietarioBajaDetEntities[0].des_motivo}
                  </div>
                  <div className="title-observaciones-baja">
                    Observaciones Adicionales:
                  </div>
                  <div>
                    {
                      props.padron.data.propietarioBajaDetEntities[0].des_obserbaciones
                    }
                  </div>
                  <div className="title-observaciones-baja">
                    Revisar Documentos
                  </div>
                  <input
                    onClick={openModalDocBaja}
                    id="mostrar-modal-documento-baja-socio"
                    name="modal"
                    type="radio"
                  />

                  <label for="mostrar-modal-documento-baja-socio">
                    {" "}
                    <FontAwesomeIcon icon={faEye} />{" "}
                  </label>

                  <Lightbox
                    plugins={[Zoom, Download, Captions]}
                    open={open}
                    close={() => setOpen(false)}
                    slides={[
                      {
                        src: props.padron.data.propietarioBajaDetEntities[0]
                          .des_link_documento,
                        title: "Documento de la baja de un propietario",
                      },
                    ]}
                  />
                </div>
              )}
              <div className="outer-table-registro-directivo-copropietario" style={{marginTop:'3px'}}>
                <table className="tabla-co-propietario-datos">
                  <tr>
                    <th
                      className="title-co-propietarios-list"
                      scope="col"
                      style={{
                        backgroundColor: "#a2c8f2",
                        padding: "8px",
                        borderTop: "2px solid white",
                        borderLeft: "2px solid white",
                        borderBottom: "2px solid white",
                        whiteSpace: "nowrap",
                        fontSize: "12px",
                        fontSize: "16px",
                        color: "#56688a",
                      }}
                    >
                      Co-Propietario
                    </th>
                    <th
                      className="title-co-propietarios-dni"
                      scope="col"
                      style={{
                        backgroundColor: "#a2c8f2",
                        padding: "8px",
                        borderTop: "2px solid white",
                        borderLeft: "2px solid white",
                        borderBottom: "2px solid white",
                        whiteSpace: "nowrap",
                        fontSize: "12px",
                        fontSize: "16px",
                        color: "#56688a",
                      }}
                    >
                      DNI
                    </th>
                    <th
                      className="title-co-propietarios-dni-conyugue"
                      scope="col"
                      style={{
                        backgroundColor: "#a2c8f2",
                        padding: "8px",
                        borderTop: "2px solid white",
                        borderLeft: "2px solid white",
                        borderBottom: "2px solid white",
                        whiteSpace: "nowrap",
                        fontSize: "12px",
                        fontSize: "16px",
                        color: "#56688a",
                      }}
                    >
                      Cónyuge del propietario
                    </th>
                  </tr>

                  {coPropietarios?.length === 0 ? (
                    <tr>
                      <td colSpan="8" style={{ textAlign: "center" }}>
                        No hay datos disponibles
                      </td>
                    </tr>
                  ) : (
                    coPropietarios?.length > 0 &&
                    coPropietarios.map((elemento) => (
                      <tr key={elemento.id} className="nombre-co-propietario">
                        <td style={{ borderRight: "1px solid #b3aeae" }}>
                          {elemento.desNombreCompleto}{" "}
                        </td>

                        <td
                          className="dni-co-propietario"
                          style={{
                            cursor: "pointer",
                            borderRight: "1px solid #b3aeae",
                          }}
                          onClick={() =>
                            ChangeRouter(elemento.des_dni, elemento.id)
                          }
                        >
                          <span style={{ color: "#0077b6" }}>
                            {elemento.des_dni}
                          </span>
                        </td>

                        <td>{elemento.des_dni_conyugue} </td>
                      </tr>
                    ))
                  )}
                </table>
              </div>
            </div>
          </div>
          <div className="container-partidas-upload-foto">
            <div className="Documentos-asociado-padron-propietario">
              Documentos del Propietario
            </div>
            <p>Adjuntar documentacion del Propietario</p>
            <div className="row">
              <div className="col-md-3">
                <input
                  onClick={openModal}
                  id="mostrar-modal-documento-socio"
                  name="modal"
                  type="radio"
                />

                <label for="mostrar-modal-documento-socio">
                  {" "}
                  <FontAwesomeIcon icon={faFolderOpen} />{" "}
                </label>
                <ModalImagesConglomerado
                  isOpen={modalIsOpen}
                  onClose={closeModal}
                  components={[
                    <ImageUploader
                      info={ModeloProps1}
                      documentoPropietario={props.padron.data.documentoPropietarioEntities.find(
                        (item) => item.desTipoDoc === "ContratoCompraVenta"
                      )}
                      dataPropietario={props.padron.data}
                      api={`${serverURL}/Propietarios/Upload-info-propietario`}
                      tipoDoc={ModeloProps1.tipDoc}
                      request={ModeloProps1.request}
                      tipView={tipoView}
                    />,
                    <ImageUploader
                      info={ModeloProps2}
                      documentoPropietario={props.padron.data.documentoPropietarioEntities.find(
                        (item) => item.desTipoDoc === "Minuta"
                      )}
                      dataPropietario={props.padron.data}
                      api={`${serverURL}/Propietarios/Upload-info-propietario`}
                      tipoDoc={ModeloProps2.tipDoc}
                      request={ModeloProps2.request}
                      tipView={tipoView}
                    />,
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

export default ExpedientePropietario;
