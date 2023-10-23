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
import { format } from 'date-fns';
import { serverURL } from '../utils/Configuration';
const ImageUploader = (props) => {
  console.log(props)
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
    des_tipo_doc: ""
  });


  const [datosDocumentoConsejo, setDatosDocumentoConsejo] = useState({
    codigo_asociacion: "",
    tip_doc: "",
    fecha_desde: "",
    fecha_hasta: "",
    fecha_documento: ""
  });

  // Supongamos que tienes una función para recuperar la imagen de la base de datos
  const fetchImageFromDatabase = async (desDni,codAs,desTipoDoc) => {
   console.log(desDni)
   console.log(codAs)
   console.log(desTipoDoc)

   if(props.tipView.opcion===1){
    await axios.get(`${props.request}?codAs=${codAs}&desTipoDoc=${desTipoDoc}`)
    .then(response => {
      // Handle the response data
      console.log(response)
      setDbImage(response.data.des_link_documento);
    })
    .catch(error => {
      // Handle any errors
      console.error(error);
    });
   }
   else{
    await axios.get(`${props.request}?desDni=${desDni}&codAs=${codAs}&desTipoDoc=${desTipoDoc}`)
    .then(response => {
      // Handle the response data
      console.log(response)
      setDbImage(response.data.des_link_documento);
    })
    .catch(error => {
      // Handle any errors
      console.error(error);
    });
   }
   
  };

  useEffect(() => {
    setUploadedImage(null);
    setDbImage(null)
    

    if (props.documentoPropietario !== undefined) {
    // Llama a la función para recuperar la imagen
    if(props.tipView.opcion===1){
      console.log(props.documentoPropietario.des_link_documento_inscrito)
    setDbImage(props.documentoPropietario.des_link_documento_inscrito);
    }
    else{
      console.log(props.documentoPropietario.des_link_documento)
      setDbImage(props.documentoPropietario.des_link_documento);
    }
    
    }
  
    
  
   console.log(props);

  if(props.dataPropietario){
    if(props.tipView.opcion===1){
      const dataFound=props.dataPropietario.data.find(item=>item.destipdoc ==='DocInscripcion')
      console.log("Vista consejo directivo")
      setDatosDocumentoConsejo({
        codigo_asociacion: dataFound?.descodigoasociacion,                  
        tip_doc: props.tipoDoc,
        fecha_desde:format(new Date(dataFound?.fec_inicio_vigencia), "dd-MM-yyyy"),
        fecha_hasta:format(new Date(dataFound?.fec_fin_vigencia), "dd-MM-yyyy"),
        fecha_documento:format(new Date(dataFound?.fec_documento), "dd-MM-yyyy")
      })
    }else{
      setDatosDocumento({
        id_propietario: props.dataPropietario.id,
        ds_dni: props.dataPropietario.desDni,
        des_codigo_asoc: props.dataPropietario.codigoAsociacion,              
        des_tipo_doc: props.tipoDoc
      })
    }
   
  }
  }, [props.documentoPropietario]);

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
    if(props.tipView.opcion===1){

      console.log("Consejo Directivo");
      if (uploadedImage) {

        const reader = new FileReader();
        reader.onload = () => {
          setUploadedImage(reader.result);
        };
    
        const formData = new FormData();
        formData.append('file_upload_pdf', uploadedImage);
        formData.append('codigo_asociacion',datosDocumentoConsejo.codigo_asociacion)
        formData.append('fecha_desde', datosDocumentoConsejo.fecha_desde)
        formData.append('fecha_hasta', datosDocumentoConsejo.fecha_hasta)
        formData.append('fecha_documento', datosDocumentoConsejo.fecha_documento)
        formData.append('tip_doc', datosDocumentoConsejo.tip_doc)
       
        
  
        console.log(datosDocumentoConsejo)
        await axios.post(props.api, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
          .then((response) => {
            
            
            fetchImageFromDatabase("datosDocumento.ds_dni",datosDocumento.des_codigo_asoc, datosDocumento.des_tipo_doc);
            //Maneja la respuesta del servidor si es necesario.
  
            console.log(response.data);
          })
          .catch((error) => {
            // Maneja cualquier error que ocurra durante la solicitud.
            console.error(error);
          });
      } else {
        alert('Por favor, seleccione una imagen antes de enviar.');
      }
    }
    else{
      if (uploadedImage) {

        const reader = new FileReader();
        reader.onload = () => {
          setUploadedImage(reader.result);
        };
        // Crea un objeto FormData y agrega la imagen a él.
        //console.log(uploadedImage)
        const formData = new FormData();
        formData.append('file_upload_pdf', uploadedImage);
        formData.append('id_propietario',datosDocumento.id_propietario)
        formData.append('ds_dni',datosDocumento.ds_dni)
        formData.append('des_codigo_asoc', datosDocumento.des_codigo_asoc)
        formData.append('des_tipo_doc', datosDocumento.des_tipo_doc)
        
  
        console.log(datosDocumento)
        await axios.post(props.api, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
          .then((response) => {
            
            
            fetchImageFromDatabase(datosDocumento.ds_dni,datosDocumento.des_codigo_asoc, datosDocumento.des_tipo_doc);
            //Maneja la respuesta del servidor si es necesario.
  
            console.log(response.data);
          })
          .catch((error) => {
            // Maneja cualquier error que ocurra durante la solicitud.
            console.error(error);
          });
      } else {
        alert('Por favor, seleccione una imagen antes de enviar.');
      }
    }
    // Verifica si se ha seleccionado una imagen.
   
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
          <button onClick={handleUpload} disabled={dbImage==null? !uploadedImage || isUploading:true} style={{fontSize:`11px`}} type="button" className="btn btn-success">
            Enviar <SendIcon style={{height:`15px`}}/>
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

const columnStylesUpload= {
  marginRight: '20px',
  display: 'flex',
  flexDirection: 'column',
  height: '90%',
  width: '100%',
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
  height: '85%',
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