import "./styles/RegistrarNuevoPropietario.scss"
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
import ExcelDownloadButton from './ExcelDownloadFormatoConsejo';
import DownloadIcon from '@mui/icons-material/Download';
import { serverURL } from "../utils/Configuration";
import { ToastContainer, toast } from 'react-toastify';
const FormInportCoPropietario = (props) => {
   // onchange states
   const [excelFile, setExcelFile] = useState(null);

   const handleClickCloseForm = () => {
    console.log(props)
    props.onClickEstado(false);
};


    const handleFile = (e) => {
        let fileTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'];
        let selectedFile = e.target.files[0];
    
        
        setExcelFile(selectedFile);
    
      }


    const enviarDatos = async (event) => {

        event.preventDefault();
        console.log("Enviando")
        console.log("Enviando  +datos.fecha_documento");
        const formData = new FormData();
 
        formData.append('file_upload_excel', excelFile)

        fetch(`${serverURL}/Asiento/Upload-info-directivo`, {
            method: 'POST',
            body: formData
          })
          .then(response => {
            // Verifica si la respuesta tiene un cuerpo JSON
            if (!response.ok) {
                // Si la respuesta no es exitosa, lanza un error
                throw new Error('Error en la solicitud.');
            }
            return response.json();
        })
            .then((data) => {


                if (data.status === 400) {
                    //toast.error("Error de cliente: solicitud incorrecta");

                    throw new Error('Error de cliente: solicitud incorrecta.'); // Lanza un error personalizado para el código 400
                } else if (data.status === 404) {
                    // toast.error("Recurso no encontrado.");
                    throw new Error('Recurso no encontrado.'); // Lanza un error personalizado para el código 404

                } else if (data.status === 500) {
                    //   toast.error("Error del servidor.");
                    throw new Error('Error del servidor.'); // Lanza un error personalizado para otros códigos de estado (500, etc.)
                }
                else {
                    console.log(data); // Maneja la respuesta del servidor aquí
                    props.RefrescarInformacion();
                    toast.success(data.mensaje);
                     props.onClickEstado(false);

                }

            })

            .catch((error) => {
                console.error('Error al cargar el archivo:', error);

            });


    }

 return (
        <>
            <div id="modal1-sombra-form-Prop" >
                <div className="container-dar-baja-padron-propietario">

                    <div className="form form-registro-padron-propietario">
                        <div className="close-form-register-directivo" >
                            <div className="close-form-register-directivo" >
                                <input id="cerrar-modal" name="modal" type="radio" />
                                <label htmlFor="cerrar-modal">
                                    <CloseIcon onClick={handleClickCloseForm} style={{ position: `absolute` }} className="icono-close-register-directivo" /> </label>
                            </div>
                        </div>
                        <form className="form" onSubmit={enviarDatos}>
                            <div className="tilte-inscripcion-registro-padron-propietarios">
                                Importar co-propietarios</div>
                            <div className="container-form-darbaja-padron-propietarios">

                               <div className="row">
                                <div className="col-md-8"> 
                                <div className="title-nuevo-propieatario-registro-formpadron-green  title-nuevo-dar-baja-registro-formpadron-black-div">
                                    Archivo
                                </div>
                                </div>
                                <div className="col-md-4">
                                                <div className="tilte-icono-descargar-plantilla-consejo-directivo">
                                    <div className="tilte-icono-descargar-plantilla-consejo-directivo-p">
                                    <ExcelDownloadButton/>
                                    </div>
                                    <div>
                                        <DownloadIcon style={{ color: `green` }} />
                                    </div>
                                    </div>
                                
                                </div>
                               </div>
                                

                                <input

                                    name="file"
                                    type="file"
                                    className="form-control upload-inscripcion-directivos"
                                    onChange={handleFile}/>


                            </div>



                            <div className="btn-register-padron-propietarios-info" style={{ width: `100%` }}>

                                <button type="submit" className="btn-enviar-carga-masiva-directivos">Aceptar
                                </button>

                            </div>
                        </form>

                    </div>
                </div>
            </div>

        </>
    );



}

export default FormInportCoPropietario;