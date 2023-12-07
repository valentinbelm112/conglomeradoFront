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
const ImageUploader = (props) => {
  
  const [open, setOpen] = useState(false);
  const [openCarga, setOpenCarga] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [dbImage, setDbImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

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

  const fetchImageFromDatabase = async (desDni, codAs, desTipoDoc) => {
    if (props.tipView.opcion === 1) {
      await axios
        .get(`${props.request}?codAs=${codAs}&desTipoDoc=${desTipoDoc}`)
        .then((response) => {
          
          setDbImage(response.data.des_link_documento_inscrito);
        })

        .catch((error) => {
          // Handle any errors
          console.error(error);
        });

      await axios
        .get(
          `${serverURL}/CGM/Documento-detalle-directivo?Codigo_Asociacion=${codAs}`
        )
        .then((response) => {
          //console.log(response);
          props.refrescarDocumento(response);
        })
        .catch((error) => {
          // Handle any errors
          console.error(error);
        });
    } else {
      //console.log(`${props.request}?desDni=${desDni}&codAs=${codAs}&desTipoDoc=${desTipoDoc}`)
      await axios
        .get(
          `${props.request}?desDni=${desDni}&codAs=${codAs}&desTipoDoc=${desTipoDoc}`
        )
        .then((response) => {
          // Handle the response data
           // console.log(response)
          setDbImage(response.data.des_link_documento);
        })
        .catch((error) => {
          // Handle any errors
          console.error(error);
        });
    }
  };

  useEffect(() => {
  //console.log(props.dataPropietario)
    setUploadedImage(null);
    setDbImage(null);

    if (props.dataPropietario) {
      if (props.tipView.opcion === 1) {
        const dataFound = props.dataPropietario.data.find(
          (item) => item.destipdoc === "DocInscripcion"
        );

        setDatosDocumentoConsejo({
          codigo_asociacion: dataFound?.descodigoasociacion,
          tip_doc: props.tipoDoc,
          fecha_desde: format(
            new Date(dataFound?.fec_inicio_vigencia),
            "dd-MM-yyyy"
          ),
          fecha_hasta: format(
            new Date(dataFound?.fec_fin_vigencia),
            "dd-MM-yyyy"
          ),
          fecha_documento: format(
            new Date(dataFound?.fec_documento),
            "dd-MM-yyyy"
          ),
        });
        fetchImageFromDatabase("EEE",dataFound?.descodigoasociacion,props.tipoDoc);
      } else {
        setDatosDocumento({
          id_propietario: props.dataPropietario.id,
          ds_dni: props.dataPropietario.desDni,
          des_codigo_asoc: props.dataPropietario.codigoAsociacion,
          des_tipo_doc: props.tipoDoc,
        });
        fetchImageFromDatabase(props.dataPropietario.desDni,props.dataPropietario.codigoAsociacion, props.tipoDoc);
      }
    }
  }, [ props.tipoDoc]);

  const onDrop = (acceptedFiles) => {

    
    const firstImage = acceptedFiles[0];

    // Manejar la imagen cargada aquí

    setUploadedImage(firstImage);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*", // Aceptar solo archivos de imagen
  });

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

  const handleDeleteCarga = async (event) => {
    event.stopPropagation();
    
    // Limpiar la imagen cargada
    

    if (props.tipView.opcion === 1) {
         await axios
        .delete(
          `${serverURL}/CGM/delete/documento/directivo?codAs=${datosDocumentoConsejo.codigo_asociacion}&desTipoDoc=${datosDocumentoConsejo.tip_doc}`
        )
        
        .then((response) => {
          setDbImage(null);
          toast.success("Registro Eliminado con éxito.");
        })
        .catch((error) => {
          toast.error("Intente Nuevamente.");
        });
    } 
    if (props.tipView.opcion === 2) {
      
      await axios
     .delete(
       `${serverURL}/Propietarios/delete/documento/propietario?codAs=${datosDocumento.des_codigo_asoc}&desTipoDoc=${datosDocumento.des_tipo_doc}&desDni=${datosDocumento.ds_dni}`
     )
     
     .then((response) => {
      //console.log("GGG")
       setDbImage(null);
       toast.success("Registro Eliminado con éxito.");
     })
     .catch((error) => {
       toast.error("Intente Nuevamente.");
     });
 }
    else {
      setUploadedImage(null);
    }
  };

  const handleDelete = (event) => {
    // Limpiar la imagen cargada
    event.stopPropagation();
    setUploadedImage(null);
  };

  const handleUpload = async () => {
    if (props.tipView.opcion === 1) {
      if (uploadedImage) {
        const reader = new FileReader();
        reader.onload = () => {
          setUploadedImage(reader.result);
        };

        const formData = new FormData();
        formData.append("file_upload_pdf", uploadedImage);
        formData.append(
          "codigo_asociacion",
          datosDocumentoConsejo.codigo_asociacion
        );
        formData.append("fecha_desde", datosDocumentoConsejo.fecha_desde);
        formData.append("fecha_hasta", datosDocumentoConsejo.fecha_hasta);
        formData.append(
          "fecha_documento",
          datosDocumentoConsejo.fecha_documento
        );
        formData.append("tip_doc", datosDocumentoConsejo.tip_doc);

        await axios
          .post(props.api, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then(async (response) => {
            toast.success("Documento agregado con éxito.");
            fetchImageFromDatabase(
              "datosDocumento.ds_dni",
              datosDocumentoConsejo.codigo_asociacion,
              datosDocumentoConsejo.tip_doc
            );
            //Maneja la respuesta del servidor si es necesario.
          })
          .catch((error) => {
            // Maneja cualquier error que ocurra durante la solicitud.
            toast.error("Intente Nuevamente .");
          });
      } else {
        alert("Por favor, seleccione una imagen antes de enviar.");
      }
    } else {
      if (uploadedImage) {
        const reader = new FileReader();
        //console.log("Ingresooo")
        reader.onload = () => {
          setUploadedImage(reader.result);
        };

        const formData = new FormData();
        formData.append("file_upload_pdf", uploadedImage);
        formData.append("id_propietario", datosDocumento.id_propietario);
        formData.append("ds_dni", datosDocumento.ds_dni);
        formData.append("des_codigo_asoc", datosDocumento.des_codigo_asoc);
        formData.append("des_tipo_doc", datosDocumento.des_tipo_doc);

        await axios
          .post(props.api, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            toast.success("Documento Agregado con éxito.");
            fetchImageFromDatabase(
              datosDocumento.ds_dni,
              datosDocumento.des_codigo_asoc,
              datosDocumento.des_tipo_doc
            );
            //Maneja la respuesta del servidor si es necesario.
          })
          .catch((error) => {
            // Maneja cualquier error que ocurra durante la solicitud.
          });
      } else {
        alert("Por favor, seleccione una imagen antes de enviar.");
      }
    }
    // Verifica si se ha seleccionado una imagen.
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
            {uploadedImage ? (
              <div style={imageContainerStyles}>
                <img
                  src={URL.createObjectURL(uploadedImage)}
                  alt={`Imagen cargada`}
                  style={imageStyles}
                />
                <div style={buttonContainerStyles}>
                  <div onClick={handleZoom}>
                    <ZoomInIcon />
                  </div>

                  <div onClick={handleDelete} style={{ color: `red` }}>
                    <DeleteForeverIcon />
                  </div>
                </div>
              </div>
            ) : (
              <p>
                Arrastra y suelta una imagen aquí o haz clic para seleccionar.
              </p>
            )}
          </div>
          <div style={buttonStyles}>
            <button
              onClick={handleUpload}
              disabled={dbImage == null ? !uploadedImage || isUploading : true}
              style={{ fontSize: `11px` }}
              type="button"
              className="btn btn-success"
            >
              Enviar <SendIcon style={{ height: `15px` }} />
            </button>
            {isUploading && <p>Subiendo imagen...</p>}
          </div>
        </div>

        {/* Columna de imagen recuperada de la base de datos */}
        <div style={columnStylesUpload}>
          {dbImage && (
            <>
              <img
                src={dbImage}
                alt={`Imagen de la base de datos`}
                className="container-image-stilo-cgm"
                style={imageStyles}
              />
              <div style={buttonContainerStyles}>
                <div onClick={handleZoomCarga} style={{ cursor: "pointer" }}>
                  <ZoomInIcon />
                </div>

                <div
                  onClick={(e) =>
                    handleDeleteCarga(
                      e,                   
                    )
                  }
                  style={{ color: `red`, cursor: "pointer" }}
                >
                  <DeleteForeverIcon />
                </div>
              </div>
            </>
          )}
        </div>

        <Lightbox
          plugins={[Zoom, Download, Captions]}
          open={open}
          close={() => setOpen(false)}
          slides={[
            {
              src: uploadedImage ? URL.createObjectURL(uploadedImage) : "",
              title: "Documento de la inscripcion del consejo directivo",
            },
          ]}
        />

        <Lightbox
          plugins={[Zoom, Download, Captions]}
          open={openCarga}
          close={() => setOpenCarga(false)}
          slides={[
            {
              src: dbImage ? dbImage : "",
              title: "Documento de la inscripcion del consejo directivo",
            },
          ]}
        />
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
  width: "120px", // Reducir el ancho del Dropzone
  height: "175px",
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

export default ImageUploader;
