import React from "react";
import { useState, useEffect } from "react";
import "./styles/ExpedienteInquilino.scss";
import PreviewIcon from "@mui/icons-material/Preview";
import ModalImagesConglomerado from "./ModalImagesConglomerado";
import ImageUploader from "./ImageUploader"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';
import { serverURL } from "../utils/Configuration";
import DownloadIcon from '@mui/icons-material/Download';
import logo_proempresa from "./assets/Icono-Propietarios.png"
import 'jspdf-autotable';
import jsPDF from 'jspdf';
import oswaldBold from '../styles/Oswald-Bold.ttf';
import oswaldRegular from '../styles/Oswald-Regular.ttf';
const ExpedienteInquilino = (props) => {
  const [selectedValue, setSelectedValue] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [expedienteSelect, setExpedienteSelect] = useState(null);
  const [inmuebleSelect, setInmuebleSelect] = useState(null);
  const [coPropietarios, setCoPropietarios] = useState(null);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState('opcion1');
  const [selectedPabellon, setSelectedPabellon] = useState("");
  const [selectedPuesto, setSelectedPuesto] = useState("");
  const navigate = useNavigate();

  const handleDescargarClick = () => {
    // Configura las dimensiones del PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    // Define la función para el encabezado
    pdf.addFileToVFS('Oswald-Regular.ttf', oswaldRegular);
    pdf.addFileToVFS('Oswald-Bold.ttf', oswaldBold);
    pdf.addFont('Oswald-Regular.ttf', 'Oswald', 'normal');
    pdf.addFont('Oswald-Bold.ttf', 'Oswald', 'bold');
    const header = () => {
      // Agrega el encabezado aquí, por ejemplo:
      pdf.setFontSize(10);
      pdf.setTextColor(100);
      pdf.text('Encabezado Personalizado', pdf.internal.pageSize.getWidth() / 2, 10, { align: 'center' });
    };

    const oswaldFont = {
      fontFamily: 'Oswald',
      fontStyle: 'normal',
    };
    // Define la función para el pie de página
    const footer = () => {
      // Agrega el pie de página aquí, por ejemplo:
      pdf.setFontSize(10);
      pdf.setTextColor(100);
      pdf.text('Pie de Página Personalizado', pdf.internal.pageSize.getWidth() / 2, pdf.internal.pageSize.getHeight() - 10, { align: 'center' });
    };


    // Establece el encabezado y pie de página
    pdf.autoTable({
      head: [{}],
      body: [],
      didDrawPage: function (data) {
        // Llama a la función del encabezado y pie de página en cada página
        header();
        footer();
      },
    });

    // Función para calcular la posición vertical de las líneas de texto
    function calculateYPosition(lineNumber) {
      return startY + lineNumber * lineHeight;
    }

    // Agrega un icono en la esquina superior izquierda (por ejemplo, un emoji)
   // pdf.addImage(logo_proempresa, 'PNG', 5, 5, 10, 10); // Ajusta la posición y el tamaño del icono

    // Establece las coordenadas y márgenes para el contenido en el PDF
    const startX = 20;
    const startY = 20;
    const lineHeight = 10;
    const pageWidth = pdf.internal.pageSize.getWidth() - 2 * startX;

    // Aplica el estilo al título
    pdf.setFontSize(30); // Tamaño de fuente
    pdf.setFont('bold'); // Establece la fuente en negrita
    pdf.setTextColor('#076024'); // Color de texto
    pdf.setFont('Oswald'); // Usa la fuente Oswald
    pdf.text('Expediente del Inquilino', startX, startY,oswaldFont);

    // Agrega la sección de información personal
    pdf.setFontSize(25); // Tamaño de fuente
    pdf.setFont('bold'); // Establece la fuente en negrita
    pdf.setTextColor('#ea1f1f'); // Color de texto
    pdf.text('Información Personal:', startX, startY + lineHeight);
    pdf.setFontSize(12);
    pdf.setFont('bold');
    pdf.setTextColor('#000000'); // Color negro
    pdf.text(`Nombres: ${capitalizeFirstLetter(expedienteSelect?.des_nombres?.trim())}`, startX, calculateYPosition(2));
    pdf.text(`Apellidos: ${capitalizeFirstLetter(expedienteSelect?.des_apellido_paterno?.trim())} ${capitalizeFirstLetter(expedienteSelect?.des_apellido_materno?.trim())}`, startX, calculateYPosition(3));
    pdf.text(`Dni: ${expedienteSelect?.dni?.trim()}`, startX, calculateYPosition(4));
    pdf.text(`Sexo: ${expedienteSelect?.des_genero?.trim()}`, startX, calculateYPosition(5));
    pdf.text(`Fecha de Nacimiento: 2023-08-07`, startX, calculateYPosition(6));
    pdf.text(`Deparatamento de nacimiento: ${capitalizeFirstLetter(expedienteSelect?.des_departamento_nacimiento?.trim())}`, startX, calculateYPosition(7));
    pdf.text(`Grado de Instruccion: ${capitalizeFirstLetter(expedienteSelect?.des_grado_instruccion?.trim())}`, startX, calculateYPosition(8));
    pdf.text(`Estado Civil: ${capitalizeFirstLetter(expedienteSelect?.des_estado_civil?.trim())}`, startX, calculateYPosition(9));
    pdf.text(`Departamento de Domicilio: ${capitalizeFirstLetter(expedienteSelect?.des_departamento_dom?.trim())}`, startX, calculateYPosition(10));
    pdf.text(`Provincia de Domicilio: ${capitalizeFirstLetter(expedienteSelect?.des_provincia_dom?.trim())}`, startX, calculateYPosition(11));
    pdf.text(`Distrito de Domicilio: ${capitalizeFirstLetter(expedienteSelect?.des_distrito_dom?.trim())}`, startX, calculateYPosition(12));
    pdf.text(`Dirección de Domicilio: ${capitalizeFirstLetter(expedienteSelect?.des_direccion_dom?.trim())}`, startX, calculateYPosition(13));

    // Calcula la posición vertical de la foto centrada
    const photoY = calculateYPosition(2); // Puedes ajustar la línea de la foto para alinearla verticalmente
    const photoWidth = 70; // Ancho de la foto
    const photoHeight = 90; // Alto de la foto
    const photoX = startX + pageWidth - photoWidth; // Posición X de la foto

    // Agrega la foto
    pdf.addImage(expedienteSelect?.des_url_foto, 'JPEG', photoX, photoY, photoWidth, photoHeight);

    // Dibuja un marco alrededor de la foto
    pdf.setDrawColor('#076024'); // Color del borde del marco
    pdf.setLineWidth(1); // Ancho del borde del marco
    pdf.rect(photoX, photoY, photoWidth, photoHeight); // Dibuja el rectángulo alrededor de la foto
    // Agrega más información personal aquí...e

    // Agrega la sección de información de contacto


    pdf.setFontSize(25); // Tamaño de fuente
    pdf.setFont('bold'); // Establece la fuente en negrita
    pdf.setTextColor('#ea1f1f'); // Color de texto
    pdf.text('Información de Contacto:', startX, calculateYPosition(14));
    pdf.setFontSize(12);
    pdf.setFont('bold');
    pdf.setTextColor('#000000'); // Color negro
    pdf.text(`Número de Teléfono: ${props.padron.data.num_telefono}`, startX, calculateYPosition(15));
    pdf.text(`Correo Electrónico: ${props.padron.data.des_correo}`, startX, calculateYPosition(16));

    pdf.setFontSize(25); // Tamaño de fuente
    pdf.setFont('bold'); // Establece la fuente en negrita
    pdf.setTextColor('#ea1f1f'); // Color de texto
    pdf.text('Información Comercial:', startX, calculateYPosition(17));
    pdf.setFontSize(12);
    pdf.setFont('bold');
    pdf.setTextColor('#000000'); // Color negro
    pdf.text(`Puesto a Revisar: ${inmuebleSelect?.numPuesto}`, startX, calculateYPosition(18));
    pdf.text(`Nombre del Negocio: ${inmuebleSelect?.des_negocio}s`, startX, calculateYPosition(19));
    pdf.text(`Direccion: ${inmuebleSelect?.des_direccion}`, startX, calculateYPosition(20));
    pdf.text(`Giro: ${inmuebleSelect?.des_giro}`, startX, calculateYPosition(21));

    pdf.setFontSize(25); // Tamaño de fuente
    pdf.setFont('bold'); // Establece la fuente en negrita
    pdf.setTextColor('#ea1f1f'); // Color de texto
    pdf.text('Propietarios del Puesto:', startX, calculateYPosition(22));
    pdf.setFontSize(12);
    pdf.setFont('bold');
    pdf.setTextColor('#000000'); // Color negro
   // Define los datos de la tabla
const tableData = [];
coPropietarios.forEach((elemento) => {
  elemento.forEach((item) => {
    tableData.push([item.des_nombres, item.desDni, item.des_dni_conyugue]);
  });
});



pdf.autoTable({
  startY: calculateYPosition(23), // Establece la posición vertical de inicio de la tabla
  margin: { left: startX },
  head: [['Propietarios del Puesto', 'DNI', 'Cónyuge del propietario']],
  body: tableData,
});
    

    // Agrega más información de contacto aquí...

    // Guarda el PDF
    pdf.save('expediente-inquilino.pdf');
  }


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



    if (props.nombreExpedienteProp.length > 0) {
      const foundCopropietario = props.nombreExpedienteProp.filter(
        (element) => element.des_nombres !== props.nombreExpedienteProp
      );
      setCoPropietarios(props.nombreExpedienteProp);
      console.log(props.nombreExpedienteProp)
    }


    console.log(props);
  }, []);


  const ModeloProps1 = {
    titulo: "Constrato de alquiler",
    tipDoc: "ConatratoAlquiler",
    request: `${serverURL}/Documento/inquilino/propByDni/tipdoc/codAS`
  }

  const ModeloProps2 = {
    titulo: "Constrato ....",
    tipDoc: "OrtosAlquiler"
  }


  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };





  const ChangeRouter = (dni, id) => {
    console.log(dni + "Click")
    // Actualizar los valores del DNI y el ID aquí

    // Actualizar la URL
    navigate(`/expediente-socio/${dni}/${id}`);
    window.location.reload();
    //history.push(`/expediente/${dni}/${id}`);
  };


  function capitalizeFirstLetter(str) {
    if (str) {
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    } else {
      return ""; // Otra opción es retornar una cadena vacía si str es null o undefined
    }
  }

  const handleChange = (event) => {
    console.log("GGG")
    console.log(event.target.value);
    /*
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
    
    console.log(props.propietario)

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
  */

  };
  const changeStado = () => {
    // props.cambiarEstado();
  };



  return (
    <div className="container-expediente-socio" id="container-expediente-socio">
      <div className="container-expediente-inquilino-detalle">
        <div className="title-container-expediente-socio">
          Expediente del Inquilino
        </div>
        <div>

          <div >
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <DownloadIcon onClick={handleDescargarClick} style={{ color: `green`, height: '30px', width: '30px', cursor: 'pointer' }} />
            </div>

            <div style={{ textAlign: 'center' }} className="title-descargar-expediente-inquilino">Descargar Expediente</div>
          </div>
        </div>

      </div>
      <div className="row">
        <div className="col-md-4">
          <div className="Partida-registral-socio-title">
            Puestos del socio:
          </div>
          {/*props.pabellones.map((item)=>(
            <div className="Partida-registral-socio-title-p">
             {item}
             </div>
          ))*/}

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
              Inquilino
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
              Conyugue del Inquilino
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
                Numero de telefono:
              </div>
              <div>{
                props.padron.data.num_telefono}</div>
            </div>
            <div className="container-info-personal">
              <div className="title-datos-personales-expediente-filter">
                Correo electronico:
              </div>
              <div>{
                props.padron.data.des_correo}</div>
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
                {props.inmueblesinfo.map((inmueble) => (
                  <option key={inmueble.id} value={`${inmueble.numPabellon}-${inmueble.numPuesto}`}>
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
            </div>
            <br />
            <br />
            <table className="tabla-co-propietario-datos">
              <thead>
                <tr>
                  <th className="title-co-propietarios-list">Propietarios del Puesto</th>
                  <th className="title-co-propietarios-dni">DNI</th>
                  <th className="title-co-propietarios-dni-conyugue">Cónyuge del propietario</th>
                </tr>
              </thead>
              <tbody>
                {coPropietarios?.length > 0 && (coPropietarios.map(
                  (elemento) =>

                    elemento.map((item) => (

                      <tr className="nombre-co-propietario" key={item.id}>
                        <td  >{item.des_nombres} </td>

                        <td className="dni-co-propietario" onClick={() => ChangeRouter(item.desDni, item.id)}  >
                          {item.desDni}{" "}
                        </td>

                        <td >{item.des_dni_conyugue} </td>
                      </tr>

                    ))

                ))}
              </tbody>
            </table>


            <div className="Documentos-asociado-padron-socio">
              Documentos del alquiler
            </div>
            <p>
              Adjuntar documentacion del asociado
            </p>
            <div className="row">
              <div className="col-md-3">
                <input onClick={openModal} id="mostrar-modal-documento-socio" name="modal" type="radio" />

                <label htmlFor="mostrar-modal-documento-socio">
                  {" "}
                  <FontAwesomeIcon icon={faFolderOpen} />{" "}

                </label>
                <ModalImagesConglomerado
                  isOpen={modalIsOpen}
                  onClose={closeModal}
                  components={[
                    <ImageUploader info={ModeloProps1}
                      documentoPropietario={
                        props.padron.data.documentoInquilinoEntities.find(item => item.desTipoDoc === 'ConatratoAlquiler')
                      }
                      dataPropietario={props.padron.data}
                      api={`${serverURL}/Inquilino/Upload-info-inquilino`}
                      request={ModeloProps1.request}
                      tipoDoc={ModeloProps1.tipDoc} />,
                    <ImageUploader info={ModeloProps2}
                      documentoPropietario={
                        props.padron.data.documentoInquilinoEntities.find(item => item.desTipoDoc === ModeloProps2.tipDoc)
                      }
                      api={`${serverURL}/Inquilino/Upload-info-inquilino`}
                      dataPropietario={props.padron.data}
                      tipoDoc={ModeloProps2.tipDoc}
                      request={ModeloProps1.request}
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

export default ExpedienteInquilino;
