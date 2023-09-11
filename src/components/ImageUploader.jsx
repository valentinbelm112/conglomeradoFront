import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Download from "yet-another-react-lightbox/plugins/download";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/captions.css"
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SendIcon from '@mui/icons-material/Send';
import "./styles/ImageUploader.scss"
import axios from 'axios';
import { serverURL } from '../utils/Configuration';
const ImageUploader = (props) => {
  console.log(props)
  const [open, setOpen] = useState(false);
  const [openCarga, setOpenCarga] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [dbImage, setDbImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [datosDocumento, setDatosDocumento] = useState({
    id_propietario: 0,
    ds_dni: "",
    des_codigo_asoc: "",
    des_tipo_doc: ""
  });
  const [fecha_actualizacion, setFecha_Documento] = useState(new Date());
  // Supongamos que tienes una función para recuperar la imagen de la base de datos
  const fetchImageFromDatabase = async (desDni,codAs,desTipoDoc) => {
   
    
   await axios.get(`${serverURL}/Documento/propByDni/tipdoc/codAS?desDni=${desDni}&codAs=${codAs}&desTipoDoc=${desTipoDoc}`)
      .then(response => {
        // Handle the response data
        console.log(response)
        setDbImage(response.data.des_link_documento);
      })
      .catch(error => {
        // Handle any errors
        console.error(error);
      });
  };

  useEffect(() => {
    // Verifica si props.documentoPropietario[0].des_link_documento existe
  if (props.documentoPropietario[0] && props.documentoPropietario[0].des_link_documento) {
    // Llama a la función para recuperar la imagen
    setDbImage(props.documentoPropietario[0].des_link_documento);
  }
  }, []);

  const onDrop = (acceptedFiles) => {
    // Tomar solo la primera imagen si se cargan múltiples imágenes
    const firstImage = acceptedFiles[0];
    // Manejar la imagen cargada aquí
    console.log(firstImage)
    setUploadedImage(firstImage);
    
  };

 
  

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*', // Aceptar solo archivos de imagen
  });

  const handleZoom = (event) => {
    setOpen(true)
    console.log(isLightboxOpen)
    event.stopPropagation(); // Detiene la propagación del evento de clic
    // Abrir el modal al hacer clic en el botón de "Zoom"
    console.log("DDDD")
    setIsLightboxOpen(true);
    console.log(isLightboxOpen)
  };
  
  const handleZoomCarga = (event) => {
    setOpenCarga(true)
    console.log(isLightboxOpen)
    event.stopPropagation(); // Detiene la propagación del evento de clic
    // Abrir el modal al hacer clic en el botón de "Zoom"
    console.log("DDDD")
    setIsLightboxOpen(true);
    console.log(isLightboxOpen)
  };

  const handleDeleteCarga = (event) => {
    // Limpiar la imagen cargada
    event.stopPropagation();
    setUploadedImage(null);
  };

  const handleDelete = (event) => {
    // Limpiar la imagen cargada
    event.stopPropagation();
    setUploadedImage(null);
  };

  const handleUpload = async() => {
    
    // Verifica si se ha seleccionado una imagen.
    if (uploadedImage) {

      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result);
      };
      // Crea un objeto FormData y agrega la imagen a él.
      console.log(uploadedImage)
      const formData = new FormData();
      formData.append('file_upload_pdf', uploadedImage);
      formData.append('id_propietario',2)
      formData.append('ds_dni', "71858727")
      formData.append('des_codigo_asoc', "E00241")
      formData.append('des_tipo_doc', "DocProp")
      
      await axios.post(`${serverURL}/Propietarios/Upload-info-propietario`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then((response) => {
          fetchImageFromDatabase("71858727","E00241","DocProp");
          // Maneja la respuesta del servidor si es necesario.
          console.log(response.data);
        })
        .catch((error) => {
          // Maneja cualquier error que ocurra durante la solicitud.
          console.error(error);
        });
    } else {
      alert('Por favor, seleccione una imagen antes de enviar.');
    }
  };

  
  return (
    <div className='container-image-upload-show-cgm'>
      <div className='title-socio-upload-image-padron'>{props.info.titulo}</div>
      <div style={containerStyles}>
      {/* Columna de carga con el Dropzone */}
      <div style={columnStyles}>
        <div {...getRootProps()} style={{ ...dropzoneStyles, width: '125px' }}>
          <input 
          
          
          {...getInputProps()}/>
          {uploadedImage ? (
            <div style={imageContainerStyles}>
              <img
                src={URL.createObjectURL(uploadedImage)}
                alt={`Imagen cargada`}
                style={imageStyles}
              />
              <div style={buttonContainerStyles}>
                <div onClick={handleZoom}><ZoomInIcon/></div>
              
                <div onClick={handleDelete} style={{color:`red`}}><DeleteForeverIcon/></div>
              </div>
            </div>
          ) : (
            <p>Arrastra y suelta una imagen aquí o haz clic para seleccionar.</p>
          )}
        </div>
        <div style={buttonStyles}>
          <button onClick={handleUpload} disabled={!uploadedImage || isUploading} style={{fontSize:`11px`}} type="button" className="btn btn-success">
            Enviar <SendIcon style={{height:`15px`}}/>
          </button>
          {isUploading && <p>Subiendo imagen...</p>}
        </div>
      </div>

      {/* Columna de imagen recuperada de la base de datos */}
      <div style={columnStyles}>
        {dbImage && (
           <>
            <img
              src={dbImage}
              alt={`Imagen de la base de datos`}
              style={imageStyles}
            />
            <div style={buttonContainerStyles}>
            <div onClick={handleZoomCarga}><ZoomInIcon/></div>
          
            <div onClick={handleDeleteCarga} style={{color:`red`}}><DeleteForeverIcon/></div>
          </div>
           </>
           
        
        )}

        
      </div>

     
     
        <Lightbox
        plugins={[Zoom,Download,Captions]}
        open={open}
        close={() => setOpen(false)}
        slides={[
        { src: uploadedImage ? URL.createObjectURL(uploadedImage) : "",
        title: "Documento de la inscripcion del consejo directivo"
        }  ]}
    
        />

      <Lightbox
        plugins={[Zoom,Download,Captions]}
        open={openCarga}
        close={() => setOpenCarga(false)}
        slides={[
        { src: dbImage ? dbImage : "",
        title: "Documento de la inscripcion del consejo directivo"
        }  ]}
    
        />
     
    </div>
    </div>
  
  );
};
const containerStyles = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  height: '100%',
    width: '100%',
};

const columnStyles = {
  marginRight: '20px',
  display: 'flex',
  flexDirection: 'column',
  height: '90%',
  
};

const dropzoneStyles = {
  border: '2px dashed #ccc',
  borderRadius: '4px',
  textAlign: 'center',
  padding: '20px',
  cursor: 'pointer',
  width: '120px', // Reducir el ancho del Dropzone
  height: '175px',
};

const imageContainerStyles = {
  position: 'relative',
};

const imageStyles = {
  width: '102%',
  height: '100%',
  marginBottom: '10px',
};

const buttonContainerStyles = {
  display: 'flex',
  justifyContent: 'space-between',
};

const buttonStyles = {
  textAlign: 'center',
  marginTop: '10px', // Espacio entre el Dropzone y el botón
};

export default ImageUploader;