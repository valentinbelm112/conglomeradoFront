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
import DownloadIcon from "@mui/icons-material/Download";
import "jspdf-autotable";
import jsPDF from "jspdf";
import oswaldBold from "../styles/Oswald-Bold.ttf";
import oswaldRegular from "../styles/Oswald-Regular.ttf";
import { format } from "date-fns";
import logo_proempresa from "./assets/logoJosefej.png";
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

  const handleDescargarClick = async () => {
    // Configura las dimensiones del PDF
    const tuContenidoDelArchivoTTF = await import(
      "../assets/styles/PlayfairDisplay-Regular.ttf"
    );

    console.log(tuContenidoDelArchivoTTF);

    const pdf = new jsPDF("p", "mm", "a4");
    // Define la función para el encabezado
    pdf.addFileToVFS("Oswald-Regular.ttf", oswaldRegular);
    pdf.addFileToVFS("Oswald-Bold.ttf", oswaldBold);
    pdf.addFont("Oswald-Regular.ttf", "Oswald", "normal");
    pdf.addFont("Oswald-Bold.ttf", "Oswald", "bold");

    const header = () => {
      // Agrega el encabezado aquí, por ejemplo:
      pdf.setFontSize(10);
      pdf.setTextColor(100);
      pdf.text(
        "Plaza Josfel",
        pdf.internal.pageSize.getWidth() / 2,
        10,
        { align: "center" }
       

      );
       // Agrega una línea separadora en la parte inferior del encabezado
  const headerBottomY = 13; // Ajusta la posición Y según sea necesario
  pdf.setLineWidth(0.05); // Ajusta el grosor de la línea según sea necesario
  pdf.line(20, headerBottomY, pdf.internal.pageSize.getWidth() - 20, headerBottomY);
    };
    // Agrega una imagen en la izquierda del encabezado
  const imagePath = require('./assets/logoJosefej.png'); // Reemplaza con la ruta de tu imagen
  const imageWidth = 30; // Ancho de la imagen
  const imageHeight = 10; // Altura de la imagen
  pdf.addImage(imagePath, 'PNG', 20, 2, imageWidth, imageHeight);

  
    // Define la función para el pie de página
    const footer = () => {
      // Agrega el pie de página aquí, por ejemplo:
      pdf.setFontSize(10);
      pdf.setTextColor(100);
      pdf.text(
        "Pie de Página Personalizado",
        pdf.internal.pageSize.getWidth() / 2,
        pdf.internal.pageSize.getHeight() - 10,
        { align: "center" }
      );
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

    pdf.addFileToVFS("PlayfairDisplay-Regular.ttf", tuContenidoDelArchivoTTF);


    // Cargar la fuente "Playfair Display"
    pdf.addFont("PlayfairDisplay-Regular.ttf", "Playfair Display", "normal");

    // Aplicar el estilo al título
    pdf.setFontSize(20); // Tamaño de fuente
    pdf.setFont("Playfair Display", "bold"); // Utilizar la negrita
    pdf.setTextColor("rgb(39, 26, 10)"); // Color de texto
    pdf.text("Expediente del Inquilino", startX, startY);

    // Agrega la sección de información personal
    pdf.setFontSize(17); // Tamaño de fuente
    pdf.setFont("Playfair Display", "bold"); // Utilizar la negrita
    pdf.setTextColor("#428bca"); // Color de texto
    pdf.text("Información Personal:", startX, startY + lineHeight);
    pdf.setFontSize(12);
    pdf.setFont("bold");
    pdf.setTextColor("#000000"); // Color negro
    // Aplicar el estilo al título en negrita
    pdf.setFontSize(12); // Tamaño de fuente
    pdf.setFont("Playfair Display", "bold");
    pdf.setTextColor("rgb(39, 26, 10)"); // Color de texto
    let textoTemporal = "Nombres:";
    // Obtener el ancho del texto temporal
    let anchoTextoTemporal = pdf.getTextWidth(textoTemporal);
    pdf.text("Nombres:", startX, calculateYPosition(2));
   pdf.setFont("Playfair Display", "regular");
    pdf.text(
      capitalizeFirstLetter(expedienteSelect?.des_nombres?.trim()),
      startX + anchoTextoTemporal,
      calculateYPosition(2)
    );
    pdf.setFont("Playfair Display", "bold");
    textoTemporal = "Apellidos:";
    // Obtener el ancho del texto temporal
    anchoTextoTemporal = pdf.getTextWidth(textoTemporal);
    pdf.text("Apellidos:", startX, calculateYPosition(3));
    pdf.setFont("Playfair Display", "regular");
    pdf.text(
      `${capitalizeFirstLetter(
        expedienteSelect?.des_apellido_paterno?.trim()
      )} ${capitalizeFirstLetter(
        expedienteSelect?.des_apellido_materno?.trim()
      )}`,
      startX + anchoTextoTemporal,
      calculateYPosition(3),
      
  { encoding: 'UTF-8' }  // Puedes ajustar la codificación según sea necesario
    );

    pdf.setFont("Playfair Display", "bold");
    textoTemporal = "Dni:";
    // Obtener el ancho del texto temporal
    anchoTextoTemporal = pdf.getTextWidth(textoTemporal);
    pdf.text("Dni:", startX, calculateYPosition(4));
   pdf.setFont("Playfair Display", "regular");
    pdf.text(
      expedienteSelect?.dni.trim(),
      startX + anchoTextoTemporal,
      calculateYPosition(4)
    );

    pdf.setFont("Playfair Display", "bold");
    textoTemporal = "Sexo:";
    // Obtener el ancho del texto temporal
    anchoTextoTemporal = pdf.getTextWidth(textoTemporal);
    pdf.text("Sexo:", startX, calculateYPosition(5));
   pdf.setFont("Playfair Display", "regular");
    pdf.text(
      expedienteSelect?.des_genero?.trim(),
      startX + anchoTextoTemporal,
      calculateYPosition(5)
    );

    pdf.setFont("Playfair Display", "bold");
    textoTemporal = "Fecha de Nacimiento:";
    // Obtener el ancho del texto temporal
    anchoTextoTemporal = pdf.getTextWidth(textoTemporal);
    pdf.text("Fecha de Nacimiento:", startX, calculateYPosition(6));
   pdf.setFont("Playfair Display", "regular");

    pdf.text(
      format(new Date(expedienteSelect?.fec_nacimiento), "dd/MM/yyyy"),
      startX + anchoTextoTemporal,
      calculateYPosition(6)
    );

    pdf.setFont("Playfair Display", "bold");
    textoTemporal = "Departamento de nacimiento:";
    // Obtener el ancho del texto temporal
    anchoTextoTemporal = pdf.getTextWidth(textoTemporal);
    pdf.text("Departamento de nacimiento:", startX, calculateYPosition(7));
   pdf.setFont("Playfair Display", "regular");
    pdf.text(
      expedienteSelect?.des_departamento_nacimiento?.trim(),
      startX + anchoTextoTemporal,
      calculateYPosition(7)
    );

    pdf.setFont("Playfair Display", "bold");
    textoTemporal = "Grado de Instruccion:";
    // Obtener el ancho del texto temporal
    anchoTextoTemporal = pdf.getTextWidth(textoTemporal);
    pdf.text("Grado de Instruccion:", startX, calculateYPosition(8));
   pdf.setFont("Playfair Display", "regular");
    pdf.text(
      expedienteSelect?.des_grado_instruccion?.trim(),
      startX + anchoTextoTemporal,
      calculateYPosition(8)
    );

    pdf.setFont("Playfair Display", "bold");
    textoTemporal = "Estado Civil:";
    // Obtener el ancho del texto temporal
    anchoTextoTemporal = pdf.getTextWidth(textoTemporal);
    pdf.text("Estado Civil:", startX, calculateYPosition(9));
   pdf.setFont("Playfair Display", "regular");
    pdf.text(
      expedienteSelect?.des_estado_civil?.trim(),
      startX + anchoTextoTemporal,
      calculateYPosition(9)
    );

    pdf.setFont("Playfair Display", "bold");
    textoTemporal = "Departamento de Domicilio:";
    // Obtener el ancho del texto temporal
    anchoTextoTemporal = pdf.getTextWidth(textoTemporal);
    pdf.text("Departamento de Domicilio:", startX, calculateYPosition(10));
   pdf.setFont("Playfair Display", "regular");
    pdf.text(
      expedienteSelect?.des_departamento_dom?.trim(),
      startX + anchoTextoTemporal,
      calculateYPosition(10)
    );

    pdf.setFont("Playfair Display", "bold");
    textoTemporal = "Provincia de Domicilio:";
    // Obtener el ancho del texto temporal
    anchoTextoTemporal = pdf.getTextWidth(textoTemporal);
    pdf.text("Provincia de Domicilio:", startX, calculateYPosition(11));
   pdf.setFont("Playfair Display", "regular");
    pdf.text(
      expedienteSelect?.des_provincia_dom?.trim(),
      startX + anchoTextoTemporal,
      calculateYPosition(11)
    );

    pdf.setFont("Playfair Display", "bold");
    textoTemporal = "Distrito de Domicilio:";
    // Obtener el ancho del texto temporal
    anchoTextoTemporal = pdf.getTextWidth(textoTemporal);
    pdf.text("Distrito de Domicilio:", startX, calculateYPosition(12));
   pdf.setFont("Playfair Display", "regular");
    pdf.text(
      expedienteSelect?.des_distrito_dom?.trim(),
      startX + anchoTextoTemporal,
      calculateYPosition(12)
    );

    pdf.setFont("Playfair Display", "bold");
    textoTemporal = "Dirección de Domicilio:";
    // Obtener el ancho del texto temporal
    anchoTextoTemporal = pdf.getTextWidth(textoTemporal);
    pdf.text("Dirección de Domicilio:", startX, calculateYPosition(13));
   pdf.setFont("Playfair Display", "regular");
    pdf.text(
      expedienteSelect?.des_direccion_dom?.trim(),
      startX + anchoTextoTemporal,
      calculateYPosition(13)
    );


    // Calcula la posición vertical de la foto centrada
    const photoY = calculateYPosition(2); // Puedes ajustar la línea de la foto para alinearla verticalmente
    const photoWidth = 70; // Ancho de la foto
    const photoHeight = 90; // Alto de la foto
    const photoX = startX + pageWidth - photoWidth; // Posición X de la foto

    // Agrega la foto
    pdf.addImage(
      expedienteSelect?.des_url_foto,
      "JPEG",
      photoX,
      photoY,
      photoWidth,
      photoHeight
    );

    // Dibuja un marco alrededor de la foto
    pdf.setDrawColor("#428bca"); // Color del borde del marco
    pdf.setLineWidth(1); // Ancho del borde del marco
    pdf.rect(photoX, photoY, photoWidth, photoHeight); // Dibuja el rectángulo alrededor de la foto
    // Agrega más información personal aquí...e

    // Agrega la sección de información de contacto
    pdf.addFileToVFS("PlayfairDisplay-Regular.ttf", tuContenidoDelArchivoTTF);

    // Cargar la fuente "Playfair Display"
    pdf.addFont("PlayfairDisplay-Regular.ttf", "Playfair Display", "normal");
    pdf.setFontSize(17); // Tamaño de fuente
    pdf.setFont("Playfair Display", "bold"); // Utilizar la negrita
    pdf.setTextColor("#428bca"); // Color de texto
    pdf.text("Información de Contacto:", startX, calculateYPosition(14));
    pdf.setFontSize(12);
    pdf.setFont("bold");
    pdf.setTextColor("#000000"); // Color negro

    textoTemporal = "Número de Teléfono:";
    //Obtener el ancho del texto temporal
    anchoTextoTemporal = pdf.getTextWidth(textoTemporal);
    pdf.text("Número de Teléfono:", startX, calculateYPosition(15));
   pdf.setFont("Playfair Display", "regular");
    pdf.text(
      props.padron.data.num_telefono
        ? props.padron.data.num_telefono
        : "No se registro el teléfono",
      startX + anchoTextoTemporal,
      calculateYPosition(15)
    );

    pdf.setFont("Playfair Display", "bold");
    textoTemporal = "Correo Electrónico:";
    //Obtener el ancho del texto temporal
    anchoTextoTemporal = pdf.getTextWidth(textoTemporal);
    pdf.text("Correo Electrónico:", startX, calculateYPosition(16));
   pdf.setFont("Playfair Display", "regular");
    pdf.text(
      props.padron.data.num_telefono
        ? props.padron.data.num_telefono
        : "No se registro el teléfono",
      startX + anchoTextoTemporal,
      calculateYPosition(16)
    );

      // Agrega la sección de información personal
      pdf.setFontSize(17); // Tamaño de fuente
      pdf.setFont("Playfair Display", "bold"); // Utilizar la negrita
      pdf.setTextColor("#428bca"); // Color de texto
      pdf.text("Información Comercial:", startX, calculateYPosition(17));

    
      const tableData = [];
      props.padron.data.inmuebleEntities.map((inmueble) => 
        tableData.push([inmueble.numPartida,inmueble.numAsiento, inmueble.des_oficina_registral, props.padron.data.des_estado,inmueble.des_tipo_dominio,inmueble.num_acciones_derechos, inmueble.des_direccion])
     
       
      );
      const tableData1 = [];
      props.situacionAsiento.forEach((element) => {
        props.padron.data.inmuebleEntities.forEach((inmueble) => {
          if (inmueble.numAsiento === element.asiento) {
            tableData1.push([
              element.situacion,
              element.fechar,
              extraerTextoDespuesParentesis(element.comentario)
            ]);
          }
        });
      });
      pdf.autoTable({
        startY: calculateYPosition(18), // Establece la posición vertical de inicio de la tabla
        margin: { left: startX },
        head: [["Partida","Asiento", "Oficina Registral", "Estado Propietario","Tipo de dominio", "%Acciones y Derechos","Dirección"]],
       body: tableData,
      });
    
      pdf.autoTable({
        startY: pdf.autoTable.previous.finalY + 10, // Comienza después del final de la primera tabla con un espacio de 10 unidades
        margin: { left: startX },
        head: [["Detalle Asiento","Fecha registro Sunarp", "Detalle"]],
       body: tableData1,
      });


      console.log()
    
      
    
    pdf.save("expediente-inquilino.pdf");
  };

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

      const situacionAsiento = props.situacionAsiento.filter(
        (element) =>
          element.asiento === props.padron.data.inmuebleEntities[0].numAsiento
      );

      if (situacionAsiento.length > 0) {
        setSituacionAsiento(situacionAsiento);
      }
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

      setCoPropietarios(foundCopropietario);
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
    setSelectedValueAsiento(event.target.value);
    const situacionAsiento = props.situacionAsiento.filter(
      (element) => element.asiento === event.target.value
    );

    if (situacionAsiento.length > 0) {
      setSituacionAsiento(situacionAsiento);
    }
  };

  const extraerTextoDespuesParentesis = (texto) => {
    const inicioParentesis = texto.indexOf('(');
    const finParentesis = texto.indexOf(')');

  if (inicioParentesis !== -1 && finParentesis !== -1 && finParentesis < texto.length - 1) {
    return texto.substring(finParentesis + 1).trim();
  } else {
    return texto; // O manejar el caso en el que no se encuentren paréntesis o no haya texto después del paréntesis
  }
  };


  return (
    <div
      className="container-expediente-propietario"
      style={{ marginLeft: "2%" }}
    >
      <div className="title-container-expediente-propietario">
        Expediente del Propietario
      </div>
      <div className="row">
        <div className="col-md-5">
          <div className="container-partidas-info-foto">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <div className="Partida-registral-propietario-title">
                  Partidas Registral del propietario:
                </div>
                {props.partidasRegistrales.map((item) => (
                  <div className="Partida-registral-propietario-title-p">
                    {item}
                  </div>
                ))}
              </div>

              <label
                htmlFor="contactChoice1"
                className="container-expediente-contactChoice1-propietario"
              >
                Descargar Expediente
                <DownloadIcon
                  onClick={handleDescargarClick}
                  style={{
                    color: `rgb(96, 139, 189)`,
                    height: "30px",
                    width: "30px",
                    cursor: "pointer",
                  }}
                />
              </label>
            </div>

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
                  src={expedienteSelect?.des_url_foto}
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
              <div>
                {expedienteSelect?.fec_expedicion &&
                expedienteSelect?.fec_expedicion
                  ? format(
                      new Date(expedienteSelect?.fec_expedicion),
                      "dd/MM/yyyy"
                    )
                  : "Fecha no disponible"}
              </div>
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
              <div>
                {expedienteSelect?.fec_nacimiento &&
                expedienteSelect?.fec_nacimiento
                  ? format(
                      new Date(expedienteSelect?.fec_nacimiento),
                      "dd/MM/yyyy"
                    )
                  : "Fecha no disponible"}
              </div>
            </div>
            <div className="container-info-personal">
              <div className="title-datos-personales-expediente-filter">
                Departamento de nacimiento :
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
                <div>Seleccionar Partida a Revisar</div>
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
                    <div className="title-estado">Estado Propietario</div>
                    <div className="title-estado-p">
                      {props.padron.data.des_estado}
                    </div>
                  </div>
                </div>

                <div className="row" style={{ marginTop: "10px" }}>
                  <div className="col-md-4">
                    <div className="title-tipo-dominio">Tipo de Dominio</div>
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
                    <div className="title-acciones-drechos">Asiento</div>

                    <div className="title-acciones-drechos-p">
                      {situacionAsiento.length > 0 &&
                        situacionAsiento[0].situacion}
                    </div>
                  </div>
                </div>
                <div className="row" style={{ marginTop: "10px" }}>
                  <div className="col-md-12">
                    <div className="title-tipo-dominio">
                      Fecha de Registro de Acciones en Sunarp
                    </div>
                    <div className="title-tipo-dominio-p">
                      {situacionAsiento.length > 0
                        ? situacionAsiento[0].fechar
                        : "Fecha no disponible"}
                    </div>
                  </div>
                </div>

                <div
                  className="title-acciones-drechos"
                  tyle={{ marginTop: "10px" }}
                >
                  Direccion
                </div>
                <div className="title-direccion-propietarios-p">
                  {inmuebleSelect?.des_direccion}
                </div>

                <div
                  className="title-acciones-drechos"
                  tyle={{ marginTop: "10px" }}
                >
                  Detalle
                </div>
                <div className="title-direccion-propietarios-p">
                  {situacionAsiento.length > 0
                    ? situacionAsiento[0].comentario != null
                      ? extraerTextoDespuesParentesis(situacionAsiento[0].comentario)
                      : "Fundador del Inmueble"
                    : "Fundador del Inmueble"}
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
                      props.padron.data.propietarioBajaDetEntities[0]
                        .des_obserbaciones
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
              <div
                className="outer-table-registro-directivo-copropietario"
                style={{ marginTop: "3px" }}
              >
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
