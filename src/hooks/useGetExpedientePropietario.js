import axios from "axios";
import { useEffect, useState } from "react";
import { serverURL } from "../utils/Configuration";

export const useGetExpedientePropietario = (API, id, id2,auth) => {
  const [isLoading, SetLoading] = useState(true);
  const [dataExpediente, SetDataExpediente] = useState(null);
  const [dataDetallePropietario, SetDataDetallePropietario] = useState(null);
  const [propietariosPartida, SetPropietariosPartida] = useState(null);
  const [expedienteConyugue, SetExpedienteConyugue] = useState(null);
  const [coPropietario, SetCoPropietario] = useState(null);
  const[partidasRegistrales,setPartidasRegistrales] = useState(null);


  const config = {
        
    headers: {
        Authorization: `Bearer ${auth.accessToken}`,
    },
};


  const doSomething = async () => {
    const padronPropietariosDetalle = await axios.get(
      `${serverURL}/Propietarios/obtener/propietario/id?id_propietario=${id2}`,
      config
    );

    

   //capturar el nombre del  propeitario

    const NombrePropietario=padronPropietariosDetalle.data.des_nombres;
    console.log(NombrePropietario)

    const found = padronPropietariosDetalle.data.inmuebleEntities.map(
      (element) =>element.numPartida
    );

    console.log(found)
    const propietariosConPartida = [];

    padronPropietariosDetalle.data.inmuebleEntities.forEach((inmueble) => {
      if (found.includes(inmueble.numPartida)) {
        console.log(inmueble.numPartida)
        const propietarios = inmueble.padronPropietariosentity;
        const PropietariosWihtPartidaR={
          numPartida:inmueble.numPartida,
          propietario:propietarios
        }
      
        propietariosConPartida.push(PropietariosWihtPartidaR);
      }
    });


   //console.log(propietariosConPartida)
    SetPropietariosPartida(propietariosConPartida);
    SetDataDetallePropietario(padronPropietariosDetalle);
    SetCoPropietario(NombrePropietario)
    setPartidasRegistrales(found)
    //consultar si existen expedientes

    
    const existeCliente = await axios.get(
      `${serverURL}/Expediente?dni=${padronPropietariosDetalle.data.desDni}`,
      config
    );

  
    if (existeCliente.data) {
      const responsepostExpediente = await axios.get(
        `${serverURL}/Expediente/get?dni=${padronPropietariosDetalle.data.desDni}`,
        config
      );
   
      SetDataExpediente(responsepostExpediente);
    } else {
      console.log("Else");
      console.log(isLoading);
      const objetoRequest = {
        codempresa: "0001",
        option: "7",
        dni: padronPropietariosDetalle.data.desDni,
      };

      await axios
        .post(API, objetoRequest)
        .then(async (response) => {
          console.log(response.data.data.apellido_materno);
          console.log(response.data);
          const bodyExpediente = {
            data: {
              des_apellido_materno: response.data.data.apellido_materno,
              des_apellido_paterno: response.data.data.apellido_paterno,
              des_cargo: response.data.data.grado_instruccion,
              des_correo_electronico: "cccc@gmail.com",
              des_departamento_dom: response.data.data.departamento_domicilio,
              des_departamento_nacimiento:
                response.data.data.departamento_nacimiento,
              des_direccion_dom: response.data.data.direccion,
              des_distrito_dom: response.data.data.distrito_domicilio,
              des_edad: "30",
              des_email: "cccc@gmail.com",
              des_estado_civil: response.data.data.estado_civil,
              des_genero: response.data.data.sexo,
              des_grado_instruccion: response.data.data.grado_instruccion,
              des_nombres: response.data.data.nombres,
              des_provincia_dom: response.data.data.provincia_domicilio,
              des_telefono: "3434343434",
              des_url_foto: response.data.data.urlFoto,
              dni: response.data.data.dni,
              fec_Fecha_nacimiento: "2023-08-07T21:47:30.828Z",
            },
          };

          const responsepostExpediente = await axios.post(
            `${serverURL}/Expediente/save`,
            bodyExpediente.data,
            config
          );

          console.log(responsepostExpediente);
          console.log(response.data.data);
          SetDataExpediente(bodyExpediente);
        })
        .catch((error) => {
          console.error("Error en la solicitud:", error);
        });
    }

    if (padronPropietariosDetalle.data.des_dni_conyugue !== "-") {
      const existeClienteConyuge = await axios.get(
        `${serverURL}/Expediente?dni=${padronPropietariosDetalle.data.des_dni_conyugue}`,
        config
      );

      //consultar conyugue
      if (existeClienteConyuge.data) {
        const responseExpedienteConyugue = await axios.get(
          `${serverURL}/Expediente/get?dni=${padronPropietariosDetalle.data.des_dni_conyugue}`,
          config
        );
        SetExpedienteConyugue(responseExpedienteConyugue);
     
      } else {
        console.log("Else");
        console.log(isLoading);
        const objetoRequest = {
          codempresa: "0001",
          option: "7",
          dni: padronPropietariosDetalle.data.des_dni_conyugue,
        };
        await axios
          .post(API, objetoRequest)
          .then(async (response) => {
            console.log(response.data.data.apellido_materno);
            console.log(response.data);
            const bodyExpediente = {
              data: {
                des_apellido_materno: response.data.data.apellido_materno,
                des_apellido_paterno: response.data.data.apellido_paterno,
                des_cargo: response.data.data.grado_instruccion,
                des_correo_electronico: "cccc@gmail.com",
                des_departamento_dom: response.data.data.departamento_domicilio,
                des_departamento_nacimiento:
                  response.data.data.departamento_nacimiento,
                des_direccion_dom: response.data.data.direccion,
                des_distrito_dom: response.data.data.distrito_domicilio,
                des_edad: "30",
                des_email: "cccc@gmail.com",
                des_estado_civil: response.data.data.estado_civil,
                des_genero: response.data.data.sexo,
                des_grado_instruccion: response.data.data.grado_instruccion,
                des_nombres: response.data.data.nombres,
                des_provincia_dom: response.data.data.provincia_domicilio,
                des_telefono: "3434343434",
                des_url_foto: response.data.data.urlFoto,
                dni: response.data.data.dni,
                fec_Fecha_nacimiento: "2023-08-07T21:47:30.828Z",
              },
            };

            const responsepostExpediente = await axios.post(
              `${serverURL}/Expediente/save`,
              bodyExpediente.data,
              config
            );

            console.log(responsepostExpediente);
            console.log(response.data.data);
            SetExpedienteConyugue(bodyExpediente);
           
          })
          .catch((error) => {
            console.error("Error en la solicitud:", error);
          });
      }
    }
    SetLoading(false);
  };

  useEffect(() => {
    doSomething();
  }, []);
  return {
    dataExpediente,
    isLoading,
    dataDetallePropietario,
    propietariosPartida,
    expedienteConyugue,
    coPropietario,
    partidasRegistrales
  };
};
