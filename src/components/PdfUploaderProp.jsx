import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Download from "yet-another-react-lightbox/plugins/download";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/captions.css";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SendIcon from "@mui/icons-material/Send";
import "./styles/ImageUploader.scss";
import axios from "axios";
import { format } from "date-fns";
import { serverURL } from "../utils/Configuration";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import * as pdfjs from "pdfjs-dist";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "react-tooltip";
import Loader from "./Loader/Loader";
import { South } from "@mui/icons-material";
const PdfUploaderProp = (props) => {
  const [open, setOpen] = useState(false);
  const [openCarga, setOpenCarga] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [dbImage, setDbImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [pdfContent, setPdfContent] = useState(null);
  const [pdfs, setPdfs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [uploadedFile, setUploadedFile] = useState(null);

  const fetchData = async () => {

    const config = {
      headers: {
        Authorization: `Bearer ${props.estado.accessToken}`,
      },
    };

  //console.log(config)
    try {
      await axios(
        `${serverURL}/CGM/download/all-pdfs/${props.codigo}/${props.info.tipo_usuario}`,
        config
      ).then((response) => {
       // console.log(response);
        setIsLoading(false);
        setPdfs(response.data);
      });
      //console.log(data);
    } catch (error) {
      console.error("Error fetching PDFs", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const onDrop = (acceptedFiles) => {
    // Tomar solo la primera imagen si se cargan múltiples imágenes
    const firstImage = acceptedFiles[0];

    // Manejar la imagen cargada aquí

    setUploadedImage(firstImage);
  };


  const handleZoomCarga = (event) => {
    setOpenCarga(true);

    event.stopPropagation();
    // Detiene la propagación del evento de clic
    // Abrir el modal al hacer clic en el botón de "Zoom"

    setIsLightboxOpen(true);
  };


  const { getRootProps, getInputProps } = useDropzone({
    accept: "application/pdf",
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      setUploadedFile(file);
    },
  });

  const handleUpload = async () => {
    setIsUploading(true);
    console.log(props);

   
    const formData = new FormData();
    formData.append("file", uploadedFile);
    formData.append("des_codigo_Asociacion",props.codigo);
    formData.append("des_dni",props.dataPropietario.desDni);
    formData.append("id_propietario",props.dataPropietario.codigoPropietario);
    try {
      const config = {
        headers: {
            Authorization: `Bearer ${props.estado.accessToken}`,
            "Content-Type": "multipart/form-data", // Puedes incluir otros encabezados según sea necesario
    
        },
    };
  
    
      await axios
        .post(`${serverURL}/Propietarios/upload/pdf`, formData, config)
        .then((response) => {
          fetchData();
          toast.success("Documento pdf agregado con éxito.");
        });
    } catch (error) {

      console.error("Error uploading file:", error);
      toast.error("Intente Nuevamente.");
    } finally {
      setIsUploading(false);
    }
 
  };


  const EliminarRegistro = async (identificador)=>{
    const formData = new FormData();
    formData.append("id_documento", identificador);
    const config = {
      headers: {
          Authorization: `Bearer ${props.estado.accessToken}`
      },
  };

    
    try {
       await axios.delete(
        `${serverURL}/CGM/delete/doc/pdf/directivo/${identificador}`,config
      
      ).then((response) => {
        fetchData();
       // console.log("Registro eliminado con éxito");
        toast.success("El documento se eliminó con éxito ");
      })
      
    } catch (error) {
      
    }

  }
  const loadPdf = async (pdfId) => {

   
    const config = {
      headers: {
          Authorization: `Bearer ${props.estado.accessToken}`
      },
  };



    try {
      const response = await axios(
        `${serverURL}/Propietarios/get/pdf/${pdfId}`,
        {
          responseType: "arraybuffer", 
        }
      );
    

      console.log(response)
      const file = new Blob([response.data], { type: "application/pdf" });

      // IE
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(file, "SamplePDF.pdf");
        return;
      }

      const fileUrl = URL.createObjectURL(file);
      const newWindow = window.open(fileUrl, "_blank");
      newWindow && newWindow.focus();
 
    } catch (error) {
      console.error("Error loading PDF", error);
    }

  };


  const loadPdfDowload = async (pdfId ,nombre_archivo) => {
    
    
    const config = {
      headers: {
          Authorization: `Bearer ${props.estado.accessToken}`
      },
  };
    
     

    try {
      
      const response = await axios(
        `${serverURL}/CGM/get/pdf/${pdfId}`,
        {
          responseType: "arraybuffer", // Solicitar el tipo de respuesta como arraybuffer
        }
      );
     // console.log(response);
     

      const file = new Blob([response.data], { type: "application/pdf" });

      // IE
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(file, "SamplePDF.pdf");
        return;
      }

  
    
      // Crear un enlace
        const link = document.createElement("a");

        // Establecer la URL del enlace como la URL del Blob
        link.href = URL.createObjectURL(file);

        // Establecer el nombre del archivo que se mostrará durante la descarga
        link.download = nombre_archivo;

        // Añadir el enlace al DOM
        document.body.appendChild(link);

        // Simular un clic en el enlace para iniciar la descarga
        link.click();
      //console.log(blob)
    } catch (error) {
      console.error("Error loading PDF", error);
    }
  };
  const handleDelete = (event) => {
    // Limpiar la imagen cargada
    event.stopPropagation();
    setUploadedFile(null);
  };
  return (
    <div className="container-image-upload-show-cgm">
      {console.log(props)}
      <div className="title-socio-upload-image-padron">{props.info.titulo}</div>
      <div style={containerStyles}>
        {/* Columna de carga con el Dropzone */}
        <div style={columnStyles}>
          <div
            {...getRootProps()}
            style={{ ...dropzoneStyles, width: "169px" }}
          >
            <input {...getInputProps()} />
            {uploadedFile ? (
              <div style={imageContainerStyles}>
                <Worker
                  workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`}
                >
                  <Viewer
                    fileUrl={URL.createObjectURL(uploadedFile)}
                    defaultScale={0.3}
                  />
                </Worker>
                <div style={buttonContainerStyles}>
                  <div>
                    <ZoomInIcon />
                  </div>

                  <div style={{ color: `red` }}>
                    <DeleteForeverIcon onClick={handleDelete} />
                  </div>
                </div>
              </div>
            ) : (
              <p>Arrastra y suelta un PDF aquí o haz clic para seleccionar.</p>
            )}
          </div>
          <div style={buttonStyles}>
            <button
              disabled={!uploadedFile || isUploading}
              style={{ fontSize: `11px` }}
              type="button"
              className="btn btn-success"
              onClick={handleUpload}
            >
              Enviar
            </button>
            {isUploading && <p>Subiendo PDF...</p>}
          </div>
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <div>
            <div className="outer-table-registro-propietario-upload-pdf">
              <div
                className="table-responsive container-list-table-registro-propietarios"
                style={{ overflowX: "auto" }}
              >
                <table className="pdf-list-table">
                  <thead>
                    <tr>
                      <th>Codigo Asociación</th>
                      <th>Nombre del PDF</th>
                      <th>Fecha de Actualización</th>
                      <th>Opciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.documentoPropietario.map((pdf) => (
                      <tr key={pdf.id}>
                         <td>{pdf.desCodigoAsociacion}</td>
                        <td>{pdf.des_nombre_documento}</td>
                        <td>{pdf.fec_actualizacion}</td>
                        <td>
                          <div className="table-column-gestion-info-directivo">
                            <button
                              style={{ marginRight: "2px" }}
                              data-tip="Ver PDF"
                              data-for="tooltip-eye"
                              className="btn-gestion-delete-info-directivo "
                              onClick={() => loadPdf(pdf.id)}
                            >
                              <FontAwesomeIcon
                                icon={faEye}
                                style={{ color: "#2e247b" }}
                              />
                            </button>
                            <button
                              style={{ marginRight: "2px" }}
                              className="btn-gestion-delete-info-directivo "
                              onClick={() => loadPdfDowload(pdf.id,pdf.des_nombre_documento)}
                            >
                              {" "}
                              <FontAwesomeIcon
                                icon={faDownload}
                                style={{ color: "#65c5d2" }}
                              />
                            </button>

                            <button
                              style={{ marginRight: "2px" }}
                              className="btn-gestion-delete-info-directivo "
                              onClick={() => EliminarRegistro(pdf.id)}
                            >
                              {" "}
                              <FontAwesomeIcon
                                className="btn-gestion-delete-info-directivo "
                                icon={faTrash}
                                style={{ color: "#ec7f36" }}
                              />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <Tooltip id="tooltip-eye">Ver PDF</Tooltip>
            <Tooltip id="tooltip-download">Descargar PDF</Tooltip>
            <Tooltip id="tooltip-trash">Eliminar PDF</Tooltip>
          </div>
        )}
      </div>
    </div>
  );
};
const containerStyles = {
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  height: "100%",
  width: "100%",
};

const columnStyles = {
  marginRight: "20px",
  display: "flex",
  flexDirection: "column",
  height: "90%",
  marginTop: "4%",
};

const columnStylesUpload = {
  marginRight: "20px",
  display: "flex",
  flexDirection: "column",
  height: "90%",
  width: "100%",
};

const dropzoneStyles = {
  border: "2px dashed #ccc",
  borderRadius: "4px",
  textAlign: "center",
  padding: "20px",
  cursor: "pointer",
  width: "209px", // Reducir el ancho del Dropzone
  height: "277px",
};

const imageContainerStyles = {
  position: "relative",
  height: "85%",
};

const imageStyles = {
  width: "102%",
  height: "100%",
  marginBottom: "10px",
};

const buttonContainerStyles = {
  display: "flex",
  justifyContent: "space-between",
  borderBottom: "1px solid rgb(16 16 16 / 35%)",
};

const buttonStyles = {
  textAlign: "center",
  marginTop: "10px", // Espacio entre el Dropzone y el botón
};

export default PdfUploaderProp;
