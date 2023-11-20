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
import { Tooltip } from 'react-tooltip';
import Loader from "./Loader/Loader";
const PdfUploader = (props) => {
  const [open, setOpen] = useState(false);
  const [openCarga, setOpenCarga] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [dbImage, setDbImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [pdfContent, setPdfContent] = useState(null);
  const [pdfs, setPdfs] = useState([]);
  const[isLoading,setIsLoading]=useState(true);
  const handleDownloadPdf = async () => {
    try {
      const response = await fetch("http://tu-servidor/download/pdf/1"); // Reemplaza con tu URL y fileId
      const blob = await response.blob();
      setPdfContent(URL.createObjectURL(blob));
    } catch (error) {
      console.error("Error downloading PDF", error);
    }
  };
  const [uploadedFile, setUploadedFile] = useState(null);

  const [datosDocumento, setDatosDocumento] = useState({
    id_propietario: 0,
    ds_dni: "",
    des_codigo_asoc: "",
    des_tipo_doc: "",
  });

  const [datosDocumentoConsejo, setDatosDocumentoConsejo] = useState({
    codigo_asociacion: "",
    tip_doc: "",
    fecha_desde: "",
    fecha_hasta: "",
    fecha_documento: "",
  });
  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:9090/CGM/download/all-pdfs"
      );
      const data = await response.json().then((response)=>{
        setIsLoading(false)
        setPdfs(response);
      })
      console.log(data);
     
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

  const handleZoom = (event) => {
    setOpen(true);

    event.stopPropagation();
    // Detiene la propagación del evento de clic
    // Abrir el modal al hacer clic en el botón de "Zoom"

    setIsLightboxOpen(true);
  };

  const handleZoomCarga = (event) => {
    setOpenCarga(true);

    event.stopPropagation();
    // Detiene la propagación del evento de clic
    // Abrir el modal al hacer clic en el botón de "Zoom"

    setIsLightboxOpen(true);
  };

  const handleDeleteCarga = async (event) => {};
  const { getRootProps, getInputProps } = useDropzone({
    accept: "application/pdf",
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      setUploadedFile(file);
    },
  });

  const handleUpload = async () => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", uploadedFile);

    try {
      const response = await axios.post(
        "http://localhost:9090/CGM/upload/pdf",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      ).then((response)=>{
      
        fetchData()
        console.log("File uploaded successfully:", response.data);
      })
  
     
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const loadPdf = async (pdfId) => {
    try {
      const response = await axios(
        `http://localhost:9090/CGM/get/pdf/${pdfId}`,
        {
          responseType: "arraybuffer", // Solicitar el tipo de respuesta como arraybuffer
        }
      );
      console.log(response);
      //const blob = await response.blob();

      const file = new Blob([response.data], { type: "application/pdf" });

      // IE
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(file, "SamplePDF.pdf");
        return;
      }

      const fileUrl = URL.createObjectURL(file);
      const newWindow = window.open(fileUrl, "_blank");
      newWindow && newWindow.focus();
      //console.log(blob)
    } catch (error) {
      console.error("Error loading PDF", error);
    }
  };

 
  return (
    <div className="container-image-upload-show-cgm">
      <div className="title-socio-upload-image-padron">{props.info.titulo}</div>
      <div style={containerStyles}>
        {/* Columna de carga con el Dropzone */}
        <div style={columnStyles}>
          <div
            {...getRootProps()}
            style={{ ...dropzoneStyles, width: "125px" }}
          >
            <input {...getInputProps()} />
            {uploadedFile ? (
              <div style={imageContainerStyles}>
                <Worker
                  workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`}
                >
                  <Viewer
                    fileUrl={URL.createObjectURL(uploadedFile)}
                    defaultScale={0.12}
                  />
                </Worker>
                <div style={buttonContainerStyles}>
                  <div>
                    <ZoomInIcon />
                  </div>

                  <div style={{ color: `red` }}>
                    <DeleteForeverIcon />
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
        {isLoading?<Loader/>:(
        <div>
          <table className="pdf-list-table">
            <thead>
              <tr>
                <th>Nombre del PDF</th>
                <th>Fecha de Actualización</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              {pdfs.map((pdf) => (
                <tr>
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
                        onClick={() => loadPdf(pdf.id)}
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
                        onClick={() => loadPdf(pdf.id)}
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
          <Tooltip id="tooltip-eye">Ver PDF</Tooltip>
  <Tooltip id="tooltip-download">Descargar PDF</Tooltip>
  <Tooltip id="tooltip-trash">Eliminar PDF</Tooltip>
        </div>)}
       
       
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
  width: "211px", // Reducir el ancho del Dropzone
  height: "200px",
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

export default PdfUploader;
