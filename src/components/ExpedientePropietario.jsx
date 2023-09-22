import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./styles/ExpedientePropietario.scss";
import ModalImagesConglomerado from "./ModalImagesConglomerado";
import ImageUploader from "./ImageUploader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { South } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
const ExpedientePropietario = (props) => {
  const [selectedValue, setSelectedValue] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [expedienteSelect, setExpedienteSelect] = useState(null);
  const [inmuebleSelect, setInmuebleSelect] = useState(null);
  const [coPropietarios,setCoPropietarios] = useState(null);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState('opcion1'); 

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

    if (props.padron.data.inmuebleEntities.length > 0) {
      setInmuebleSelect(props.padron.data.inmuebleEntities[0]);
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

  const ModeloProps1 = {
    titulo: "Documento de compra-venta",
  };

  const openModal = () => {
    setModalIsOpen(true);
  };


  const closeModal = () => {
    setModalIsOpen(false);
  };

  const ChangeRouter = (dni,id) => {
    console.log(dni + "Clic")
    // Actualizar los valores del DNI y el ID aquí
  
    // Actualizar la URL
    navigate(`/expediente/${dni}/${id}`);
    window.location.reload();
    //history.push(`/expediente/${dni}/${id}`);
  };


  function capitalizeFirstLetter(str) {
    return str?.charAt(0).toUpperCase() + str?.slice(1).toLowerCase();
  }

  const handleChange = (event) => {
    console.log(event.target.value);

    const inmuebleEncontrado = props.padron.data.inmuebleEntities.find(
      (inmueble) => inmueble.numPartida === event.target.value
    );
    console.log(inmuebleEncontrado);
    setSelectedValue(event.target.value);
    setInmuebleSelect(inmuebleEncontrado);
    
    const foundCopropietario = props.propietario.filter(
      (element) =>element.numPartida===event.target.value
    )
    
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
    <div className="container-expediente-propietario">
      <div className="title-container-expediente-propietario">
        Expediente del Propietario
      </div>
      <div className="row">
        <div className="col-md-4">
          <div className="Partida-registral-propietario-title">
            Partidas Registral del propietario:
          </div>
          {props.partidasRegistrales.map((item)=>(
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
              checked={opcionSeleccionada === 'opcion1'}
              onChange={handleOptionSelectTitular}
            />
            <label
              htmlFor="contactChoice1"
              className="container-expediente-contactChoice1-propietario"
            >
              Propietarios
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
              Conyugue
            </label>
          </div>

          <div className="container--expediente-propietario">
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
          <div className="title-info-personal-expediente">
            Información del contacto
          </div>
          <div className="container-info-contacto-expediente-filter">
            <div className="container-info-personal">
              <div className="title-datos-personales-expediente-filter">
                Numero de telefono
              </div>
              <div>######</div>
            </div>
            <div className="container-info-personal">
              <div className="title-datos-personales-expediente-filter">
                Correo electronico :
              </div>
              <div>{props.padron.data.des_correo}</div>
            </div>
          </div>
        </div>
        <div className="col-md-8 ">
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
              >

                {props.padron.data.inmuebleEntities.map((inmueble) => (
                  <option key={inmueble.id} value={inmueble.numPartida}>
                    {inmueble.numPartida}
                  </option>
                ))}
              </select>
            </div>
            <p>Seleccionaste: {selectedValue}</p>
          </div>
          <div className="row container-infor-personal-inmuebles">
            <div className="col-7">
              <div className="row">
                <div className="col-md-3 container-title-numero-partida">
                  <div className="title-numero-partida">Numero Partida</div>
                  <div className="title-numero-partida-p">
                    {" "}
                    {inmuebleSelect?.numPartida}
                  </div>
                </div>
                <div className="col-md-3 container-title-oficina-registral">
                  <div className="title-oficina-registral">
                    Oficina Registral
                  </div>
                  <div className="title-oficina-registral-p">
                    {inmuebleSelect?.des_oficina_registral}
                  </div>
                </div>
                <div className="col-md-3 container-title-area">
                  <div className="title-area">Area</div>
                  <div className="title-area-p">{inmuebleSelect?.num_area}</div>
                </div>
                <div className="col-md-3 container-title-estado">
                  <div className="title-estado">Estado</div>
                  <div className="title-estado-p">Estado</div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-3">
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
              </div>
              <div className="title-acciones-drechos">Direccion</div>
              <div className="title-direccion-propietarios-p">
                {inmuebleSelect?.des_direccion}
              </div>
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
              <div className="title-fecha-baja">Fecha baja</div>
              <div className="title-fecha-baja">Mótivo de la baja</div>
              <div className="title-fecha-baja">Observaciones Adicionales</div>
            </div>
            <div className="Documentos-asociado-padron-propietario">
              Documentos del asociado
            </div>
            <p>Adjuntar documentacion del asociado</p>
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
                      documentoPropietario={
                        props.padron.data.documentoPropietarioEntities
                      }
                      dataPropietario={ props.padron.data}
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
    </div>
  );
};

export default ExpedientePropietario;
