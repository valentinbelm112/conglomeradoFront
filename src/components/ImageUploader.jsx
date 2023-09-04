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

const ImageUploader = (props) => {
  console.log(props)
  const [open, setOpen] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [dbImage, setDbImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  // Supongamos que tienes una función para recuperar la imagen de la base de datos
  const fetchImageFromDatabase = async () => {
    try {
      // Realiza una solicitud a la base de datos para obtener la imagen
      const response = await fetch('URL_DE_TU_API_PARA_OBTENER_IMAGEN');
      if (response.ok) {
        const imageBlob = await response.blob();
        setDbImage(URL.createObjectURL(imageBlob));
      } else {
        console.error('Error al recuperar la imagen de la base de datos');
      }
    } catch (error) {
      console.error('Error al recuperar la imagen de la base de datos', error);
    }
  };

  useEffect(() => {
    // Llama a la función para recuperar la imagen cuando se monta el componente
    fetchImageFromDatabase();
  }, []);

  const onDrop = (acceptedFiles) => {
    // Tomar solo la primera imagen si se cargan múltiples imágenes
    const firstImage = acceptedFiles[0];
    // Manejar la imagen cargada aquí
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

  const handleDelete = (event) => {
    // Limpiar la imagen cargada
    event.stopPropagation();
    setUploadedImage(null);
  };

  
  const handleSubmit = () => {
    // Aquí puedes enviar la imagen al servidor si es necesario
    // Puedes mostrar un indicador de carga mientras se envía la imagen
    setIsUploading(true);

    // Simulación de carga (en la realidad, enviarías la imagen al servidor)
    setTimeout(() => {
      setIsUploading(false);
    }, 2000);
  };

  return (
    <>
      <div className='title-socio-upload-image-padron'>{props.info.titulo}</div>
      <div style={containerStyles}>
      {/* Columna de carga con el Dropzone */}
      <div style={columnStyles}>
        <div {...getRootProps()} style={{ ...dropzoneStyles, width: '125px' }}>
          <input {...getInputProps()} />
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
          <button onClick={handleSubmit} disabled={!uploadedImage || isUploading} style={{fontSize:`11px`}} type="button" className="btn btn-success">
            Enviar <SendIcon style={{height:`15px`}}/>
          </button>
          {isUploading && <p>Subiendo imagen...</p>}
        </div>
      </div>

      {/* Columna de imagen recuperada de la base de datos */}
      <div style={columnStyles}>
        {dbImage && (
          <div>
            <img
              src={dbImage}
              alt={`Imagen de la base de datos`}
              style={imageStyles}
            />
          </div>
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
     
    </div>
    </>
  
  );
};
const containerStyles = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
};

const columnStyles = {
  marginRight: '20px',
  display: 'flex',
  flexDirection: 'column',
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
  maxWidth: '100%',
  maxHeight: '103px',
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