import axios from "axios";
import { useEffect, useState } from "react";
import { serverURL } from "../utils/Configuration";

export const useGetExpedienteSocio = (API, id, id2) => {
  const [isLoading, SetLoading] = useState(true);
  const [dataExpediente, SetDataExpediente] = useState(null);
  const [dataDetallePropietario, SetDataDetallePropietario] = useState(null);
  const [sociosPabellon, SetSociosPabellon] = useState(null);
  const [expedienteConyugue, SetExpedienteConyugue] = useState(null);
  const [coPropietario, SetCoPropietario] = useState(null);
  const[pabellones,setPabellones] = useState(null);

  const doSomething = async () => {
    const padronSociosDetalle = await axios.get(
      `${serverURL}/Socio/obtener/socio/id?id_socio=${id2}`
    );

    

   //capturar el nombre del  propeitario

    const NombreSocio=padronSociosDetalle.data.des_nombres;
    console.log(NombreSocio)

    const foundnumPabellon = padronSociosDetalle.data.inmuebleSocioEntities.map(
      (element) =>element.numPabellon
    );

    const foundnumPuesto = padronSociosDetalle.data.inmuebleSocioEntities.map(
        (element) =>element.numPuesto
      );


    console.log(foundnumPabellon)
    const sociosConPabellonPuesto = [];

    padronSociosDetalle.data.inmuebleSocioEntities.forEach((inmueble) => {
      if (foundnumPabellon.includes(inmueble.numPabellon) && foundnumPuesto.includes(inmueble.numPuesto)) {
        console.log(inmueble.numPabellon)
        const socios = inmueble.socioEntities;
        const PropietariosWihtPabellonAndPuesto={
          numPabellon:inmueble.numPabellon,
          numPuesto:inmueble.numPuesto,
          propietario:socios
        }
      
        sociosConPabellonPuesto.push(PropietariosWihtPabellonAndPuesto);
      }
    });


   //console.log(propietariosConPartida)
   SetSociosPabellon(sociosConPabellonPuesto);
    SetDataDetallePropietario(padronSociosDetalle);
    SetCoPropietario(NombreSocio)
    setPabellones(foundnumPabellon)
    //consultar si existen expedientes

    
    const existeCliente = await axios.get(
      `${serverURL}/Expediente?dni=${padronSociosDetalle.data.desDni}`
    );

  
    if (existeCliente.data) {
      const responsepostExpediente = await axios.get(
        `${serverURL}/Expediente/get?dni=${padronSociosDetalle.data.desDni}`
      );
   
      SetDataExpediente(responsepostExpediente);
    } else {
      console.log("Else");
      console.log(isLoading);
      const objetoRequest = {
        codempresa: "0001",
        option: "7",
        dni: padronSociosDetalle.data.desDni,
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
            bodyExpediente.data
          );

          console.log(responsepostExpediente);
          console.log(response.data.data);
          SetDataExpediente(bodyExpediente);
        })
        .catch((error) => {
          console.error("Error en la solicitud:", error);
        });
    }

    if (padronSociosDetalle.data.des_dni_conyugue !== "-") {
      const existeClienteConyuge = await axios.get(
        `${serverURL}/Expediente?dni=${padronSociosDetalle.data.des_dni_conyugue}`
      );

      //consultar conyugue
      if (existeClienteConyuge.data) {
        const responseExpedienteConyugue = await axios.get(
          `${serverURL}/Expediente/get?dni=${padronSociosDetalle.data.des_dni_conyugue}`
        );
        SetExpedienteConyugue(responseExpedienteConyugue);
     
      } else {
        console.log("Else");
        console.log(isLoading);
        const objetoRequest = {
          codempresa: "0001",
          option: "7",
          dni: padronSociosDetalle.data.des_dni_conyugue,
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
              bodyExpediente.data
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
    sociosPabellon,
    expedienteConyugue,
    coPropietario,
    pabellones
  };
};
