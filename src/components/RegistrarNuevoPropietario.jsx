import "./styles/RegistrarNuevoPropietario.scss"
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
import PostAddIcon from '@mui/icons-material/PostAdd';

const RegistrarNuevoPropietario = ({ RefrescarInformacion }) => {
   
    const [datos, setDatos] = useState({
        des_Apellidos: "",
        des_codigo_Dni: "",
        des_codigo_propietario: "",
        des_correo: "",
        des_dni_conyugue: "",
        des_documento_link: "",
        des_estado_civil: "",
        des_nombres: "",
        num_telefono:"",
        inmuebleEntities:[
            {
                des_codigo_asociacion:"",
                des_departamento:"",
                des_direccion:"",
                des_oficina_registral:"",
                des_provincia:"",
                des_tipo_dominio:"",
                num_acciones_derechos:"",
                num_area:"",
                num_partida_registral:"",


            }
           
        ]
        
    });

    const handleClickCloseForm = () => {
        const parrafo = document.querySelector('#modal-mostrar-form-documento-propietarios-person-add-import');
        parrafo.style.top = '-100vh'
      };

    const enviarDatos = async (event) => {

        event.preventDefault();
        console.log("Enviando")
        console.log("Enviando  +datos.fecha_documento");
        setDatos((prevData) => ({
            ...prevData,
            ['des_codigo_asociacion']: 'E00241'
          }))
       
          console.log(datos )

        fetch('http://localhost:9090/Propietarios/save', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(datos)
      
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
                RefrescarInformacion();
             // toast.success("Registro exitoso del consejo directivo");
              const parrafo = document.querySelector('#modal-mostrar-form-documento-propietarios-person-add-import');
              parrafo.style.top = '-100vh'
    
            }
    
          })
    
          .catch((error) => {
            console.error('Error al cargar el archivo:', error);
    
          });
    
    
      }


      const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'des_nombres' || name === 'des_Apellidos'|| name === 'des_codigo_Dni'|| name === 'des_codigo_propietario' || name === 'des_correo' || name === 'des_dni_conyugue'|| name === 'des_documento_link' || name === 'des_estado_civil'|| name === 'des_nombres' || name === 'num_telefono') {
          setDatos((prevData) => ({

            ...prevData,
            [name]: value

          }));
        } else {
            setDatos((prevData) => ({
            ...prevData,
            inmuebleEntities: [
              {
                
                ...prevData.inmuebleEntities[0],
                [name]: value

              }
            ]
          }));
        }
      };

    return (
        <>
            <div id="modal1" >
                <div className="container-registro-padron-propietario">

                    <div className="form form-registro-padron-propietario">
                        <div className="close-form-register-directivo" >
                            <div className="close-form-register-directivo" >
                                <input id="cerrar-modal" name="modal" type="radio" />
                                <label for="cerrar-modal">
                                    <CloseIcon onClick={handleClickCloseForm} style={{ position: `absolute` }} className="icono-close-register-directivo" /> </label>
                            </div>
                        </div>
                        <form className="form"  onSubmit={enviarDatos}>
                            <div className="tilte-inscripcion-registro-padron-propietarios">
                                Registrar Nuevo Propietario</div>
                            <div className="container-form-upload-inscripcion-directivos">

                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="title-nuevo-propieatario-registro-formpadron-green  title-nuevo-propieatario-registro-formpadron-black-div">
                                            Codigo de Propietario
                                        </div>
                                        <input
                                            
                                            type="text"
                                            name="des_codigo_propietario"
                                            value={datos.des_codigo_propietario}
                                            className="form-control upload-inscripcion-directivos"
                                            onChange={handleInputChange}
                                        >



                                        </input>
                                        <div className="title-nuevo-propieatario-registro-formpadron-green title-nuevo-propieatario-registro-formpadron-black-div">
                                            DNI
                                        </div>
                                        <input
                                            type="text"
                                            name="des_codigo_Dni"
                                            value={datos.des_codigo_Dni}
                                            className="form-control upload-inscripcion-directivos"
                                            onChange={handleInputChange}
                                        >


                                        </input>

                                        <div className="title-nuevo-propieatario-registro-formpadron-green title-nuevo-propieatario-registro-formpadron-black-div">
                                            Datos del Inmueble
                                        </div>
                                        <div className="title-nuevo-propieatario-registro-formpadron-orange title-nuevo-propieatario-registro-formpadron-black-div">
                                            Nª Partida  registra (**)
                                        </div>
                                        <input
                                            type="text"
                                            name="num_partida_registral"
                                            value={datos.inmuebleEntities[0].num_partida_registral}
                                            className="form-control upload-inscripcion-directivos"
                                            onChange={handleInputChange}
                                        >


                                        </input>
                                        <div div className="title-nuevo-propieatario-registro-formpadron-orange title-nuevo-propieatario-registro-formpadron-black-div">
                                            Tipo de dominio
                                        </div>
                                        <input
                                            type="text"
                                            name="des_tipo_dominio"
                                            value={datos.inmuebleEntities[0].des_tipo_dominio}
                                            className="form-control upload-inscripcion-directivos"
                                            onChange={handleInputChange}
                                        >


                                        </input>
                                        <div div className="title-nuevo-propieatario-registro-formpadron-orange title-nuevo-propieatario-registro-formpadron-black-div">
                                            Dirección
                                        </div>
                                        <input
                                            type="text"
                                            name="des_direccion"
                                            value={datos.inmuebleEntities[0].des_direccion}
                                            className="form-control upload-inscripcion-directivos"
                                            onChange={handleInputChange}
                                        >


                                        </input>

                                        <div div className="title-nuevo-propieatario-registro-formpadron-orange title-nuevo-propieatario-registro-formpadron-black-div">
                                            Datos de contacto
                                        </div>
                                        <div className="title-nuevo-propieatario-registro-formpadron-green title-nuevo-propieatario-registro-formpadron-black-div">
                                            Número de telefono
                                        </div>
                                        <input
                                            type="number"
                                            name="num_telefono"
                                            value={datos.inmuebleEntities[0].num_telefono}
                                            className="form-control upload-inscripcion-directivos"
                                            onChange={handleInputChange}
                                        >


                                        </input>
                                    </div>

                                    <div className="col-md-4">

                                        <div className="title-nuevo-propieatario-registro-formpadron-green title-nuevo-propieatario-registro-formpadron-black-div">
                                            Apellidos Completos
                                        </div>
                                        <input
                                            type="text"
                                            name="des_Apellidos"
                                            value={datos.des_Apellidos}
                                            className="form-control upload-inscripcion-directivos"
                                            onChange={handleInputChange}
                                        >


                                        </input>

                                        <div className="title-nuevo-propieatario-registro-formpadron-green title-nuevo-propieatario-registro-formpadron-black-div">
                                            Estado Civil
                                        </div>
                                        <input
                                            type="text"
                                            name="des_estado_civil"
                                            value={datos.des_estado_civil}
                                            className="form-control upload-inscripcion-directivos"
                                            onChange={handleInputChange}
                                        >


                                        </input>
                                        <br />
                                        <div className="title-nuevo-propieatario-registro-formpadron-green title-nuevo-propieatario-registro-formpadron-black-div">
                                            Oficina registral
                                        </div>
                                        <input
                                            type="text"
                                            name="des_oficina_registral"
                                            className="form-control upload-inscripcion-directivos"
                                            value={datos.inmuebleEntities[0].des_oficina_registral}
                                            onChange={handleInputChange}
                                        >


                                        </input>
                                        <div className="title-nuevo-propieatario-registro-formpadron-green title-nuevo-propieatario-registro-formpadron-black-div">
                                            %Acciones y Derechos
                                        </div>
                                        <input
                                            type="text"
                    
                                            name="num_acciones_derechos"
                                            className="form-control upload-inscripcion-directivos"
                                            value={datos.inmuebleEntities[0].num_acciones_derechos}
                                            onChange={handleInputChange}
                                        >


                                        </input>
                                        <div className="title-nuevo-propieatario-registro-formpadron-green title-nuevo-propieatario-registro-formpadron-black-div">
                                            Departamento
                                        </div>
                                        <input
                                            type="text"
                                            name="des_departamento"
                                            value={datos.inmuebleEntities[0].des_departamento}
                                            className="form-control upload-inscripcion-directivos"
                                            onChange={handleInputChange}
                                        >


                                        </input>
                                        <br />
                                        <div className="title-nuevo-propieatario-registro-formpadron-green title-nuevo-propieatario-registro-formpadron-black-div">
                                            Correo Electrónico
                                        </div>
                                        <input
                                            type="text"
                                            name="des_correo"
                                            value={datos.inmuebleEntities[0].des_correo}
                                            className="form-control upload-inscripcion-directivos"
                                            onChange={handleInputChange}
                                        >


                                        </input>

                                    </div>
                                    <div className="col-md-4">
                                        <div className="title-nuevo-propieatario-registro-formpadron-green title-nuevo-propieatario-registro-formpadron-black-div">
                                            Nombres Completos
                                        </div>
                                        <input
                                            type="text"
                                            name="des_nombres"
                                            value={datos.des_nombres}
                                            className="form-control upload-inscripcion-directivos"
                                            onChange={handleInputChange}
                                        >


                                        </input>

                                        <div className="title-nuevo-propieatario-registro-formpadron-red title-nuevo-propieatario-registro-formpadron-black-div">
                                            DNI del cónyugue
                                        </div>
                                        <input
                                            type="text"
                                            name="des_dni_conyugue"
                                            value={datos.des_dni_conyugue}
                                            className="form-control upload-inscripcion-directivos"
                                            onChange={handleInputChange}
                                        >




                                        </input>
                                        <br />
                                        <div className="title-nuevo-propieatario-registro-formpadron-green title-nuevo-propieatario-registro-formpadron-black-div">
                                            Área(m2)
                                        </div>
                                        <input
                                            type="text"
                                            name="num_area"
                                            value={datos.inmuebleEntities[0].num_area}
                                            className="form-control upload-inscripcion-directivos"
                                            onChange={handleInputChange}
                                        >


                                        </input>

                                        <div className="title-nuevo-propieatario-registro-formpadron-green title-nuevo-propieatario-registro-formpadron-black-div">
                                            Provincia
                                        </div>
                                        <input
                                            type="text"
                                            name="des_provincia"
                                            value={datos.inmuebleEntities[0].des_provincia}
                                            className="form-control upload-inscripcion-directivos"
                                            onChange={handleInputChange}
                                        >


                                        </input>
                                        <br />
                                        <div className="title-nuevo-propieatario-registro-formpadron-green title-nuevo-propieatario-registro-formpadron-black-div">
                                            <label for="mostrar-modal1" id="searchInput-upload"> <PostAddIcon style={{ color: `green` }} /> </label>
                                            Adjuntar Documento
                                        </div>
                                        <input
                                            type="file"
                                            name="file"
                                            className="form-control upload-inscripcion-directivos"
                                            id="mostrar-modal1"
                                            onChange={handleInputChange}
                                        >
                                        </input>

                                    </div>
                                </div>



                            </div>

                            <div className="btn-register-padron-propietarios-info" style={{ width: `100%` }}>


                                <button type="submit" class="btn-enviar-carga-masiva-directivos">Inscribir Asociación
                                </button>



                            </div>
                        </form>

                    </div>
                </div>
            </div>

        </>
    );

}

export default RegistrarNuevoPropietario;