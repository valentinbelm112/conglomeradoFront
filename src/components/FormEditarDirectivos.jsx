import { useState,useEffect } from "react";
import "./styles/FormRegistroDirectivos.scss"
import '@fortawesome/fontawesome-svg-core/styles.css';
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import DownloadIcon from '@mui/icons-material/Download';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import ExcelDownloadButton from './ExcelDownloadFormatoConsejo';
import "./styles/FormEditarDirectivos.scss"
import { serverURL } from "../utils/Configuration";
const FormEditarDirectivos = ( props ) => {
  
const [datos, setDatos] = useState(props.enviarDatos);

const [formData, setFormData] = useState(props.enviarDatos);
  
const handleClickCloseForm = () => {
  props.onClickEstado(false)
  };

  const handleInputChange = (event) => {
    console.log(datos);
    console.log(event.target.value + "input datos")
    setDatos({
      ...datos,
      [event.target.name]: event.target.value,
    });
  };


  const enviarDatos = async (event) => {

    event.preventDefault();
    console.log("Enviando")
    console.log(datos);
    console.log(formData);
     
    
    // Realizar la solicitud POST con Axios
    //http://localhost:8080/upload/imagenes
    fetch(`${serverURL}/CGM/update/${datos.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json', // Utiliza 'application/json' para enviar JSON
      },
      body:JSON.stringify(datos)
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
          props.refrescarInformacion();
          toast.success("Actualización exitosa del consejo directivo");
          const parrafo = document.querySelector('#modal');
          parrafo.style.top = '-100vh'

        }

      })

      .catch((error) => {
        console.error('Error al cargar el archivo:', error);

      });


  }

  return (
    <div id="modal-edit-directivos" >
      <div className="container-edit-directivo ">

        <div className="form form-edit-directivos">
          <div className="close-form-edit-directivo" >
            <input id="cerrar-modal" name="modal" type="radio" />
            <label for="cerrar-modal">
              <CloseIcon onClick={handleClickCloseForm} style={{ position: `absolute` }} className="icono-close-edit-directivo" /> </label>
          </div>

          <form action="" className="login-form" onSubmit={enviarDatos}>
          <div className="tilte-edit-registro-directivo">
                                Editar Registro</div>
            <div className="nombre-edit-directivo">
              <div className="tilte-datos-edit-directivo">
                Nombres:
              </div>
              <div className="fecha-document-container-input">
                <input
                  type="text"
                  name="des_nombres"
                  value={datos.des_nombres}
                  className="form-control input-edit-directivo"
                  placeholder={props.enviarDatos.des_nombres}
                  onChange={handleInputChange} />
              </div>

            </div>

            <div className="apellido-edit-directivo">
              <div className="tilte-datos-edit-directivo">
                Apellidos:
              </div>
              <div className="fecha-document-container-input">
                <input
                  type="text"
                  name="des_apellidos"
                  value={datos.des_apellidos}
                  placeholder={props.enviarDatos.des_apellidos}
                  className="form-control input-edit-directivo"

                  onChange={handleInputChange} />
              </div>

            </div>
            <div className="apellido-edit-directivo">
              <div className="tilte-datos-edit-directivo">
                Dni:
              </div>
              <div className="fecha-document-container-input">
                <input
                  type="text"
                  name="dni"
                  placeholder={props.enviarDatos.dni}
                  className="form-control input-edit-directivo"

                  onChange={handleInputChange} />
              </div>

            </div>

            <div className="apellido-edit-directivo">
              <div className="tilte-datos-edit-directivo">
                cargo:
              </div>
              <div className="fecha-document-container-input">
                <input
                  type="text"
                  name="des_cargo"
                  value={datos.des_cargo}
                  placeholder={props.enviarDatos.des_cargo}
                  className="form-control input-edit-directivo"

                  onChange={handleInputChange} />
              </div>

            </div>

          

            <div className="btn-register-directivo-info" style={{ width: `100%` }}>
           

              <button type="submit" className="btn-enviar-carga-masiva-directivos">Editar Directivo
              </button>



            </div>
          </form>
        </div>
      </div>
    </div>


  );
}

export default FormEditarDirectivos;