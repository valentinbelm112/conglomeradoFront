import "./styles/DarBajaPropietario.scss"
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
import { serverURL } from "../utils/Configuration";
import { ToastContainer, toast } from 'react-toastify';
const FormDarBajaPropietario = (props) => {

    console.log(props);
    const [datos, setDatos] = useState({
        id_propietario:"",
        des_motivo: "",
        fec_baja: "",
        des_obserbaciones: "",
        des_link_documento: ""
    });
    const [pdfFile, setPdfFile] = useState(null);

    const handleClickCloseForm = () => {
        const parrafo = document.querySelector('#modal-mostrar-form-documento-propietarios-person-dar-baja');
        parrafo.style.top = '-100vh'
    };

    const enviarDatos = async (event) => {

        event.preventDefault();
        console.log("Enviando")
        console.log("Enviando  + datos.fecha_documento");
        
 
        //console.log(pdfFile)
        //console.log(datos)
        const formData = new FormData();
        //console.log( typeof datos.fec_baja + "Fecha tipo de datos")
        formData.append('file_upload_pdf', pdfFile)
        formData.append('id_propietario', datos.id_propietario)
        formData.append('des_obserbacioes', datos.des_obserbaciones)
        formData.append('des_motivo', datos.des_motivo)
        formData.append('fec_baja', datos.fec_baja )

        fetch( `${serverURL}/Propietarios/Upload-info-baja-propietario`, {
            method: 'POST',
            body: formData
          })
            .then((data) => {


                if (data.status === 400) {
                    //toast.error("Error de cliente: solicitud incorrecta");

                    throw new Error('Error de cliente: solicitud incorrecta.'); // Lanza un error personalizado para el código 400
                } else if (data.status === 404) {
                    //toast.error("Recurso no encontrado.");

                    throw new Error('Recurso no encontrado.'); // Lanza un error personalizado para el código 404

                } else if (data.status === 500) {
                    //toast.error("Error del servidor.");

                    throw new Error('Error del servidor.'); // Lanza un error personalizado para otros códigos de estado (500, etc.)
                }
                else {
                    //console.log(data); // Maneja la respuesta del servidor aquí
                   // RefrescarInformacion();
                    toast.success("Estado Modificado satisfactoriamente");
                    const parrafo = document.querySelector('#modal-mostrar-form-documento-propietarios-person-dar-baja');
                    parrafo.style.top = '-100vh'

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

    //console.log()

    const handleInputChange = (event) => {
        console.log(event.target.value + "input datos")
        setDatos({
            ...datos,
            [event.target.name]: event.target.value,
        });
    };


    return (
        <>
            <div id="modal1" >
                <div className="container-dar-baja-padron-propietario">

                    <div className="form form-registro-padron-propietario">
                        <div className="close-form-register-directivo" >
                            <div className="close-form-register-directivo" >
                                <input id="cerrar-modal" name="modal" type="radio" />
                                <label for="cerrar-modal">
                                    <CloseIcon onClick={handleClickCloseForm} style={{ position: `absolute` }} className="icono-close-register-directivo" /> </label>
                            </div>
                        </div>
                        <form className="form" onSubmit={enviarDatos}>
                            <div className="tilte-inscripcion-registro-padron-propietarios">
                                Dar de baja Propietario</div>
                            <div className="container-form-darbaja-padron-propietarios">


                                <div className="title-nuevo-propieatario-registro-formpadron-green  title-nuevo-dar-baja-registro-formpadron-black-div">
                                    Codigo de Propietario
                                </div>


                                <input

                                    name="id_propietario"
                                    type="text"
                                    className="form-control upload-inscripcion-directivos"
                                    onChange={handleInputChange} />

                                <div className="title-nuevo-propieatario-registro-formpadron-green title-nuevo-dar-baja-registro-formpadron-black-div">
                                    Motivo de la baja
                                </div>
                                <input
                                    type="text"
                                    name="des_motivo"

                                    className="form-control upload-inscripcion-directivos"
                                    onChange={handleInputChange}
                                >


                                </input>


                                <div className="title-nuevo-propieatario-registro-formpadron-orange title-nuevo-dar-baja-registro-formpadron-black-div">
                                    Fecha de la baja
                                </div>
                                <input
                                    type="date"
                                    name="fec_baja"

                                    className="form-control upload-inscripcion-directivos"
                                    onChange={handleInputChange}
                                >


                                </input>
                                <div div className="title-nuevo-propieatario-registro-formpadron-orange title-nuevo-dar-baja-registro-formpadron-black-div">
                                    Obserbaciones
                                </div>
                                <textarea
                                    type="text"
                                    name="des_obserbaciones"

                                    className="form-control upload-inscripcion-directivos"
                                    onChange={handleInputChange}
                                >


                                </textarea>

                                <div className="title-nuevo-propieatario-registro-formpadron-orange title-nuevo-dar-baja-registro-formpadron-black-div">
                                    Por favor Adjuntar documentacion que sustente la baja del propietario
                                </div>

                                <input
                                    type="file"


                                    className="form-control upload-inscripcion-directivos"
                                    onChange={handleFile}
                                >


                                </input>

                            </div>

                            <div className="btn-register-padron-propietarios-info" style={{ width: `100%` }}>

                                <button type="submit" className="btn-enviar-carga-masiva-directivos">Dar de Baja</button>

                            </div>
                        </form>

                    </div>
                </div>
            </div>

        </>
    );

}

export default FormDarBajaPropietario;