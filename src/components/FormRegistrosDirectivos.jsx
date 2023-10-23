import { useState } from "react";
import "./styles/FormRegistroDirectivos.scss"
import '@fortawesome/fontawesome-svg-core/styles.css';
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import DownloadIcon from '@mui/icons-material/Download';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import ExcelDownloadButton from './ExcelDownloadFormatoConsejo';
const FormRegistrosDirectivos = ({ RefrescarInformacion ,EstadoGlobal,onClickEstado}) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [datos, setDatos] = useState({
    fecha_documento: "",
    fecha_desde: "",
    fecha_hasta: "",
    observaciones: "",
    codigo_asociacion: EstadoGlobal.des_codigo_asociacion,
    des_tipdoc:"DocInscripcion"
  });

  const [fecha_actualizacion, setFecha_Documento] = useState(new Date());

  // onchange states
  const [excelFile, setExcelFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);

  const handleClickCloseFrom = () => {

    onClickEstado(false);
  };

  const handleInputChange = (event) => {
    console.log(event.target.value + "input datos")
    setDatos({
      ...datos,
      [event.target.name]: event.target.value,
    });
  };


  const enviarDatos = async (event) => {

    event.preventDefault();
    console.log("Enviando")
    console.log("Enviando  +datos.fecha_documento");
    const formData = new FormData();
    console.log(typeof datos.fecha_documento + "Fechaaaaaa tipo datos")
    formData.append('file_upload_excel', excelFile)
    formData.append('file_upload_pdf', pdfFile)
    formData.append('fecha_documento', datos.fecha_documento)
    formData.append('fecha_desde', datos.fecha_desde)
    formData.append('fecha_hasta', datos.fecha_hasta)
    formData.append('obserbaciones', datos.observaciones)
    formData.append('codigo_asociacion', datos.codigo_asociacion)
    formData.append('tip_doc', datos.des_tipdoc)

    console.log(datos.obserbaciones + "Observaciones")
    console.log(pdfFile + "Enviando data de la imagen");

    // Realizar la solicitud POST con Axios
    //http://localhost:8080/upload/imagenes
    fetch('http://localhost:9090/CGM/Upload-info-directivo', {
      method: 'POST',
      body: formData
    })
      .then((data) => {


        if (data.status === 400) {
          toast.error("Error de cliente: solicitud incorrecta");

          throw new Error('Error de cliente: solicitud incorrecta.'); // Lanza un error personalizado para el código 400
        } else if (data.status === 404) {
          toast.error("Recurso no encontrado.");
          throw new Error('Recurso no encontrado.'); // Lanza un error personalizado para el código 404

        } else if (data.status === 500) {
          toast.error("Error del servidor.");
          throw new Error('Error del servidor.'); // Lanza un error personalizado para otros códigos de estado (500, etc.)
        }
        else {
          console.log(data); // Maneja la respuesta del servidor aquí
          RefrescarInformacion();
          toast.success("Registro exitoso del consejo directivo");
          
          onClickEstado(false);
        }

      })

      .catch((error) => {
        console.error('Error al cargar el archivo:', error);

      });


  }


  const handleFile = (e) => {
  
    let selectedFile = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onload = async () => {
      const base64Image = reader.result.split(',')[1];
      setPdfFile(base64Image);
    }
    
   


  }

  const handleFile2 = (e) => {
    let fileTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'];
    let selectedFile = e.target.files[0];

    
    setExcelFile(selectedFile);

  }



  return (
    <div id='modal1-sombra-form-Prop' >
      <div className="container-registro-directivo ">

        <div className="form form-registro-directivos">
          <div className="close-form-register-directivo" >
            <input id="cerrar-modal" name="modal" type="radio" />
            <label for="cerrar-modal">
              <CloseIcon onClick={handleClickCloseFrom} style={{ position: `absolute` }} className="icono-close-register-directivo" /> </label>
          </div>

          <form action="" className="login-form" onSubmit={enviarDatos}>



            <div className="tilte-inscripcion-registro-directivos">
              Archivo-Inscripción de Asociaciones</div>
            <div className="container-form-upload-inscripcion-directivos">
              <input
                type="file"
                name="file"
                className="form-control upload-inscripcion-directivos"

                onChange={handleFile} >

              </input>
            </div>

            <div className="fecha-registro-directivo">
              <div className="tilte-fecha-registro-directivo">
                Fecha del documento
              </div>
              <div className="fecha-document-container-input">
                <input
                  type="date"
                  name="fecha_documento"
                  className="form-control fecha-document-input"

                  onChange={handleInputChange} />
              </div>

            </div>
            <div className="row">
              <div className="col-md-8">
                <div className="title-documento-consejo-directivo">
                  Archivo- Documento de Consejo Directivo Actualizado
                </div>


              </div>
              <div className="col-md-4">
                <div className="row">
                  <div className="col-md-8">
                    <div className="tilte-icono-descargar-plantilla-consejo-directivo">
                      <div className="tilte-icono-descargar-plantilla-consejo-directivo-p">
                       <ExcelDownloadButton/>
                      </div>
                      <div>
                        <DownloadIcon style={{ color: `green` }} />
                      </div>
                    </div>

                  </div>
                  <div className="col-md-4">

                  </div>
                </div>
              </div>
            </div>
            <div className="upload-documento-registroconsejo-directivo">
              <input
                type="file"
                name="file"
                className="form-control upload-inscripcion-directivos"

                onChange={handleFile2} />
            </div>

            <div className="periodo-registroconsejo-directivo">
              <div className="title-periodo-registro-consejo-directivo">
                Periodo vigente del Consejo Directivo
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="title-periodo-registro-consejo-directivo-child">
                    <div className="title-periodo-inicio">
                      Desde
                    </div>
                    <div className="title-periodo-final">
                      <input

                        name="fecha_desde"
                        type="date"
                        className="form-control"
                        onChange={handleInputChange} />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="title-periodo-registro-consejo-directivo-child">
                    <div className="title-periodo-inicio">
                      Hasta
                    </div>
                    <div className="title-periodo-final">
                      <input
                        name="fecha_hasta"
                        type="date"
                        className="form-control"
                        onChange={handleInputChange} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="observaciones-registro-directivo">
              <div className="title-observaciones-registro-directivo">
                Observaciones
              </div>
              <div className="input-obserbaciones-registro-directivo">
                <textarea
                  name="observaciones"
                  type="text"
                  className="form-control input-obserbaciones-reg-directivo "
                  onChange={handleInputChange} />
              </div>

            </div>

            <div className="btn-register-directivo-info" style={{ width: `100%` }}>
            

              <button type="submit" class="btn-enviar-carga-masiva-directivos">Inscribir Asociación
              </button>



            </div>
          </form>
        </div>
      </div>
    </div>


  );
}

export default FormRegistrosDirectivos;