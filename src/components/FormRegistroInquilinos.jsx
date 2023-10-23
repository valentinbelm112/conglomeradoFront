import React from "react";
import "./styles/FormRegistroInquilinos.scss";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { serverURL } from "../utils/Configuration";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";
const FormRegistroInquilinos = ({
  RefrescarInformacion,
  clickR,
  setClickR,
  EstadoGlobal,
  dataPuestos,
  dataPabellonPuesto,
}) => {
  
  const [telefonoValido, setTelefonoValido] = useState(true);
  const [areaValido, setAreaValido] = useState(true);
  const [dniValido, setDniValido] = useState(true);
  const [dniCValido, setDniCValido] = useState(true);
  const [puestoValido, setPuestoValido] = useState(true);
  const [pabellonValido, setPabellonValido] = useState(true);
  const [showInputConyugue, setShowInputConyugue] = useState(true);
  const [pabellonSelect, setPabellonSelect] = useState(null);
  const [puestosSelect, setPuestosSelect] = useState([]);


  const [datos, setDatos] = useState({
    codInquilino: "",
    desApellidos: "",
    des_nombres: "",
    desDni: "",
    des_estado_civil: "",
    des_dni_conyugue: "-",
    num_telefono: "",
    des_correo: "",
    des_documento_link: "",
    des_codigo_asociacion: EstadoGlobal.des_codigo_asociacion,
    des_estado: "",
    inmuebleEntities: [
      {
        des_codigo_asociacion: EstadoGlobal.des_codigo_asociacion,
        numPabellon: 0,
        numPuesto: 0,
        des_direccion: "",
        des_giro: "",
        des_negocio: "",
        num_area: "",
      },
    ],
  });

  // console.log(EstadoGlobal)
  //Validar telefono
  const validateTelefono = (telefono) => {
    // Elimina espacios en blanco y guiones si es necesario
    const telefonoLimpio = telefono.replace(/\s+/g, "").replace(/-/g, "");

    // Verifica si el número de teléfono tiene exactamente 9 dígitos
    return /^\d{9}$/.test(telefonoLimpio);
  };

  const validatePuesto = (puesto) => {
    // Elimina espacios en blanco y guiones si es necesario
    const numeroLimpio = puesto.trim();

    // Verifica si el número de teléfono tiene exactamente 9 dígitos
    return /^\d+$/.test(numeroLimpio);
  };

  const validatePabellon = (pabellon) => {
    // Elimina espacios en blanco y guiones si es necesario

    const numeroLimpio = pabellon.trim();

    // Verifica si el número de teléfono tiene exactamente 9 dígitos
    return /^\d+$/.test(numeroLimpio);
  };

  //Validar telefono
  const validateDNI = (dni) => {
    // Elimina espacios en blanco y guiones si es necesario
    const numeroRegex = /^[0-9]{8}$/;
    return numeroRegex.test(dni);
  };

  const validarPorcentajeAcciones = (valor) => {
    // Expresión regular para verificar números decimales en el rango de 1 a 100
    const numeroRegex = /^(100(\.0{1,2})?|[1-9]?\d(\.\d{1,2})?)$/;
    return numeroRegex.test(valor);
  };

  const validarNumeroDecimal = (cadena) => {
    const regex = /^\d+(\.\d+)?$/;
    return regex.test(cadena);
  };

  const handleClickCloseForm = () => {
    const parrafo = document.querySelector(
      "#modal-mostrar-form-documento-socios-person-add-import"
    );
    parrafo.style.top = "-586vh";
    console.log(clickR);
    setClickR(!clickR);
  };

  const enviarDatos = async (event) => {
    // console.log(EstadoGlobal.des_codigo_asociacion)
    event.preventDefault();
    console.log("Enviando");
    console.log("Enviando  + datos.fecha_documento");
    // console.log(datos);
    //console.log(datos)

    fetch(`${serverURL}/Inquilino/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    })
      .then((data) => {
        if (data.status === 400) {
          //toast.error("Error de cliente: solicitud incorrecta");

          throw new Error("Error de cliente: solicitud incorrecta."); // Lanza un error personalizado para el código 400
        } else if (data.status === 404) {
          // toast.error("Recurso no encontrado.");
          throw new Error("Recurso no encontrado."); // Lanza un error personalizado para el código 404
        } else if (data.status === 500) {
          //   toast.error("Error del servidor.");
          throw new Error("Error del servidor."); // Lanza un error personalizado para otros códigos de estado (500, etc.)
        } else {
          RefrescarInformacion();
          toast.success("Registro exitoso del consejo directivo");
          const parrafo = document.querySelector(
            "#modal-mostrar-form-documento-socios-person-add-import"
          );
          console.log(parrafo);
          parrafo.style.top = "-586vh";
          setClickR(!clickR);
        }
      })

      .catch((error) => {
        console.error("Error al cargar el archivo:", error);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (
      name === "des_nombres" ||
      name === "desApellidos" ||
      name === "desDni" ||
      name === "codInquilino" ||
      name === "des_correo" ||
      name === "des_dni_conyugue" ||
      name === "des_documento_link" ||
      name === "des_estado_civil" ||
      name === "des_nombres" ||
      name === "num_telefono"
    ) {
      setDatos((prevData) => ({
        ...prevData,
        [name]: value,
      }));
      name === "num_telefono" && setTelefonoValido(validateTelefono(value));
      name === "desDni" && setDniValido(validateDNI(value));
      name === "des_dni_conyugue" && setDniCValido(validateDNI(value));
    } else {
      setDatos((prevData) => ({
        ...prevData,
        inmuebleEntities: [
          {
            ...prevData.inmuebleEntities[0],
            [name]: value,
          },
        ],
      }));

      name === "numPabellon" && setPabellonValido(validatePabellon(value));
      name === "numPuesto" && setPuestoValido(validatePuesto(value));
      name === "num_area" && setAreaValido(validarNumeroDecimal(value));
    }
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "lightgray" : "white",
    }),

    menu: (provided, state) => ({
      ...provided,
      backgroundColor: "#3a87b3",
      // Cambia el color de fondo del menú de opciones a blanco o el que desees
    }),

    // Otros estilos personalizados que desees agregar
  };

  const handleEstadoCivilChange = (event) => {
    if (event.value === "Casado") {
      setShowInputConyugue(!showInputConyugue);
    } else {
      setShowInputConyugue(true);
    }

    setDatos((prevData) => ({
      ...prevData,
      ["des_estado_civil"]: event.value,
    }));
    console.log(event);
  };
  const handlePuesto = (event) => {
    console.log(event.value);
    console.log(pabellonSelect);
    setPabellonSelect(event.value);
    setDatos((prevData) => ({
      ...prevData,
      inmuebleEntities: [
        {
          ...prevData.inmuebleEntities[0],
          ["numPuesto"]: event.value,
        },
      ],
    }));

    const elementosFiltrados = dataPabellonPuesto
      .map((item) => {
        console.log(item);
        if (item.numPabellon === pabellonSelect) {
          if (item.numPuesto === event.value) {
            setDatos((prevData) => ({
              ...prevData,
              inmuebleEntities: [
                {
                  ...prevData.inmuebleEntities[0],
                  ["des_direccion"]: item.des_direccion,
                  ["des_giro"]: item.des_giro,
                  ["des_negocio"]: item.des_negocio,
                  ["num_area"]: item.num_area,
                },
              ],
            }));
            // Si se cumple la condición, retornar el elemento en el formato deseado
            return { value: item.numPuesto, label: item.numPuesto };
          }
        } else {
          // Si no se cumple la condición, retornar null o un objeto vacío
          return null;
        }
      })
      .filter((elemento) => elemento !== null); // Filtrar elementos nulos

    setPuestosSelect(elementosFiltrados);
  };

  const handlePabellon = (event) => {
    setPabellonSelect(event.value);
    setDatos((prevData) => ({
      ...prevData,
      inmuebleEntities: [
        {
          ...prevData.inmuebleEntities[0],
          ["numPabellon"]: event.value,
        },
      ],
    }));

    const elementosFiltrados = dataPabellonPuesto
      .map((item) => {
        if (item.numPabellon === event.value) {
          // Si se cumple la condición, retornar el elemento en el formato deseado
          return { value: item.numPuesto, label: item.numPuesto };
        } else {
          // Si no se cumple la condición, retornar null o un objeto vacío
          return null;
        }
      })
      .filter((elemento) => elemento !== null); // Filtrar elementos nulos

    setPuestosSelect(elementosFiltrados);
    //console.log(elementosFiltrados);
  };

  const opcionesEstadoCivil = [
    { value: "Soltero", label: "Soltero" },
    { value: "Casado", label: "Casado" },
    { value: "Divorciado", label: "Divorciado" },
  ];

  //id={clickR ?'modal1' : 'modal1-sombra-form-Prop'}

  return (
    <>
      <div id={clickR ? "modal1" : "modal1-sombra-form-Prop"}>
        <div className="container-registro-padron-inquilino">
          <div className="form form-registro-padron-inquilino">
            <div className="close-form-register-directivo">
              <div className="close-form-register-directivo">
                <input id="cerrar-modal" name="modal" type="radio" />
                <label htmlFor="cerrar-modal">
                  <CloseIcon
                    onClick={handleClickCloseForm}
                    style={{ position: `absolute` }}
                    className="icono-close-register-directivo"
                  />{" "}
                </label>
              </div>
            </div>
            <form className="form" onSubmit={enviarDatos}>
              <div className="tilte-inscripcion-registro-padron-inquilinos">
                Registrar Nuevo Inquilino
              </div>
              <div className="container-form-upload-inscripcion-directivos">
                <div className="row" style={{ width: "100%" }}>
                  <div className="tile-form-register-inquilino-datos-personales">
                    Datos Personales
                  </div>
                  <div className="col-md-4">
                    <div className="title-nuevo-inquilino-registro-formpadron-green  title-nuevo-inquilino-registro-formpadron-black-div">
                      Codigo de inquilino
                    </div>
                    <input
                      type="text"
                      name="codInquilino"
                      value={datos.codInquilino}
                      className="form-control upload-inscripcion-directivos"
                      onChange={handleInputChange}
                    ></input>
                    <div className="title-nuevo-inquilino-registro-formpadron-green title-nuevo-inquilino-registro-formpadron-black-div">
                      DNI
                      {!dniValido && (
                        <span className="error-message-from-prop ">
                          *No válido
                        </span>
                      )}
                    </div>
                    <input
                      type="text"
                      name="desDni"
                      value={datos.desDni}
                      className={
                        !dniValido
                          ? "form-control input-error-form-prop"
                          : "form-control upload-inscripcion-directivos"
                      }
                      onChange={handleInputChange}
                    ></input>
                    <div className="tile-form-register-inquilino-datos-inmueble">
                      Datos del comercio
                    </div>

                    <div className="title-nuevo-inquilino-registro-formpadron-orange title-nuevo-inquilino-registro-formpadron-black-div">
                      Pabellon{" "}
                      {!puestoValido && (
                        <span className="error-message-from-prop ">
                          *No válido
                        </span>
                      )}
                    </div>
                    <Select
                      name="des_estado_civil"
                      value={{
                        value: datos.inmuebleEntities[0].numPabellon,
                        label: datos.inmuebleEntities[0].numPabellon,
                      }}
                      onChange={handlePabellon}
                      options={dataPuestos}
                      styles={customStyles}
                    />
                    <div
                     
                      className="title-nuevo-inquilino-registro-formpadron-orange title-nuevo-inquilino-registro-formpadron-black-div"
                    >
                      Giro
                    </div>
                    <input
                      type="text"
                      name="des_giro"
                      value={datos.inmuebleEntities[0].des_giro}
                      className="form-control upload-inscripcion-directivos"
                      onChange={handleInputChange}
                      disabled
                    ></input>

                    <div className="tile-form-register-inquilino-datos-contacto">
                      Datos de contacto
                    </div>

                    <div className="title-nuevo-inquilino-registro-formpadron-green title-nuevo-inquilino-registro-formpadron-black-div">
                      Nª Teléfono{" "}
                      {!telefonoValido && (
                        <span className="error-message-from-prop ">
                          *No válido
                        </span>
                      )}
                    </div>
                    <input
                      type="number"
                      name="num_telefono"
                      value={datos.num_telefono}
                      className={
                        !telefonoValido
                          ? "form-control input-error-form-prop"
                          : "form-control upload-inscripcion-directivos"
                      }
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="col-md-4">
                    <div className="title-nuevo-inquilino-registro-formpadron-green title-nuevo-inquilino-registro-formpadron-black-div">
                      Apellidos Completos
                    </div>
                    <input
                      type="text"
                      name="desApellidos"
                      value={datos.desApellidos}
                      className="form-control upload-inscripcion-directivos"
                      onChange={handleInputChange}
                    ></input>

                    <div className="title-nuevo-inquilino-registro-formpadron-green title-nuevo-inquilino-registro-formpadron-black-div">
                      Estado Civil
                    </div>
                    <Select
                      name="des_estado_civil"
                      value={{
                        value: datos.des_estado_civil,
                        label: datos.des_estado_civil,
                      }}
                      onChange={handleEstadoCivilChange}
                      options={opcionesEstadoCivil}
                      styles={customStyles}
                    />
                    <br />
                    <div className="title-nuevo-inquilino-registro-formpadron-green title-nuevo-inquilino-registro-formpadron-black-div">
                      Puesto
                      {!pabellonValido && (
                        <span className="error-message-from-prop ">
                          *No válido
                        </span>
                      )}
                    </div>
                    <Select
                      name="numPuesto"
                      value={{
                        value: datos.inmuebleEntities[0].numPuesto,
                        label: datos.inmuebleEntities[0].numPuesto,
                      }}
                      onChange={handlePuesto}
                      options={puestosSelect}
                      styles={customStyles}
                    />
                    <div className="title-nuevo-inquilino-registro-formpadron-green title-nuevo-inquilino-registro-formpadron-black-div">
                      Nombre del Negocio
                    </div>
                    <input
                      type="text"
                      name="des_negocio"
                      className="form-control upload-inscripcion-directivos"
                      value={datos.inmuebleEntities[0].des_negocio}
                      onChange={handleInputChange}
                      disabled
                    ></input>

                    <br />
                    <div className="title-nuevo-inquilino-registro-formpadron-green title-nuevo-inquilino-registro-formpadron-black-div">
                      Correo Electrónico
                    </div>
                    <input
                      type="email"
                      name="des_correo"
                      value={datos.des_correo}
                      className="form-control upload-inscripcion-directivos"
                      onChange={handleInputChange}
                    ></input>
                  </div>
                  <div className="col-md-4">
                    <div className="title-nuevo-inquilino-registro-formpadron-green title-nuevo-inquilino-registro-formpadron-black-div">
                      Nombres Completos
                    </div>
                    <input
                      type="text"
                      name="des_nombres"
                      value={datos.des_nombres}
                      className="form-control upload-inscripcion-directivos"
                      onChange={handleInputChange}
                    ></input>

                    <div className="title-nuevo-inquilino-registro-formpadron-red title-nuevo-inquilino-registro-formpadron-black-div">
                      DNI del cónyugue{" "}
                      {!dniCValido && (
                        <span className="error-message-from-prop ">
                          *No válido
                        </span>
                      )}
                    </div>
                    <input
                      type="text"
                      name="des_dni_conyugue"
                      value={datos.des_dni_conyugue}
                      className={
                        !dniCValido
                          ? "form-control input-error-form-prop"
                          : "form-control upload-inscripcion-directivos"
                      }
                      onChange={handleInputChange}
                      disabled={showInputConyugue}
                    ></input>
                    <br />
                    <div className="title-nuevo-inquilino-registro-formpadron-green title-nuevo-inquilino-registro-formpadron-black-div">
                      Direccion
                    </div>
                    <input
                      type="text"
                      name="des_direccion"
                      value={datos.inmuebleEntities[0].des_direccion}
                      className="form-control upload-inscripcion-directivos"
                      onChange={handleInputChange}
                      disabled
                    ></input>

                    <div className="title-nuevo-inquilino-registro-formpadron-green title-nuevo-inquilino-registro-formpadron-black-div">
                      Área(m2){" "}
                      {!areaValido && (
                        <span className="error-message-from-prop ">
                          *No válido
                        </span>
                      )}
                    </div>
                    <input
                      type="text"
                      name="num_area"
                      value={datos.inmuebleEntities[0].num_area}
                      className={
                        !areaValido
                          ? "form-control input-error-form-prop"
                          : "form-control upload-inscripcion-directivos"
                      }
                      onChange={handleInputChange}
                      disabled
                    ></input>
                  </div>
                </div>
              </div>

              <div
                className="btn-register-padron-socios-info"
                style={{ width: `100%` }}
              >
                <button
                  type="submit"
                  className="btn-enviar-carga-masiva-directivos"
                >
                  Registrar Inquilino
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormRegistroInquilinos;
