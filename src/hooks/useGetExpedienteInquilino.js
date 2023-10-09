import axios from "axios";
import { useEffect, useState } from "react";
import { serverURL } from "../utils/Configuration";

export const useGetExpedienteInquilino = (API, id, id2) => {
  const [isLoading, SetLoading] = useState(true);
  const [dataExpediente, SetDataExpediente] = useState(null);
  const [dataDetallePropietario, SetDataDetallePropietario] = useState(null);
  const [sociosPabellon, SetSociosPabellon] = useState(null);
  const [expedienteConyugue, SetExpedienteConyugue] = useState(null);
  const [propietario, SetPropietario] = useState(null);
  const[pabellones,setPabellones] = useState(null);
  const[inmueblesinfo,setInmueblesinfo] = useState(null);

  const doSomething = async () => {
    const padroninquilinoDetalle = await axios.get(
      `${serverURL}/Inquilino/obtener/id?id_inquilino=${id2}`
    );

    console.log(padroninquilinoDetalle);

    const obtenerPuestos = padroninquilinoDetalle.data.inmuebleEntities.map(async(inmueble) => {
        const response = await axios.get(
            `${serverURL}/Inquilino/Obtener-propietarios-puesto?numPabellon=${inmueble.numPabellon}&numPuesto=${inmueble.numPuesto}`
          );

          console.log(response.data)
          return response.data; 
        
      });

    const resultados = await Promise.all(obtenerPuestos);


    //obtener los resultados
    console.log(resultados);  

   //capturar el nombre del  propietario

   const propietariosPuesto=resultados.map((item)=>{
    return item.socioEntities; 
   });


   console.log(propietariosPuesto);

    const NombreSocio=padroninquilinoDetalle.data.des_nombres;
    console.log(NombreSocio)

    const foundnumPabellon = padroninquilinoDetalle.data.inmuebleEntities.map(
      (element) =>element.numPabellon
    );

    const foundnumPuesto = padroninquilinoDetalle.data.inmuebleEntities.map(
        (element) =>element.numPuesto
      );


    
    console.log(foundnumPabellon)
    const sociosConPabellonPuesto = [];

    console.log(foundnumPuesto);

  
    padroninquilinoDetalle.data.inmuebleEntities.forEach((inmueble) => {
      if (foundnumPabellon.includes(inmueble.numPabellon) && foundnumPuesto.includes(inmueble.numPuesto)) {
        //console.log(inmueble.numPabellon)
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
   SetDataDetallePropietario(padroninquilinoDetalle);
   SetPropietario(propietariosPuesto)
   setPabellones(foundnumPabellon)
   setInmueblesinfo(resultados)
    //consultar si existen expedientes

    
  const existeCliente = await axios.get(
      `${serverURL}/Expediente?dni=${padroninquilinoDetalle.data.desDni}`
    );
  
    console.log(existeCliente)
  
    if (existeCliente.data) {
      const responsepostExpediente = await axios.get(
        `${serverURL}/Expediente/get?dni=${padroninquilinoDetalle.data.desDni}`
      );
   
      SetDataExpediente(responsepostExpediente);
    } else {
      console.log("Else");
      console.log(isLoading);
      const objetoRequest = {
        codempresa: "0001",
        option: "7",
        dni: padroninquilinoDetalle.data.desDni,
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

    if (padroninquilinoDetalle.data.des_dni_conyugue !== "-") {
      const existeClienteConyuge = await axios.get(
        `${serverURL}/Expediente?dni=${padroninquilinoDetalle.data.des_dni_conyugue}`
      );

      //consultar conyugue
      if (existeClienteConyuge.data) {
        const responseExpedienteConyugue = await axios.get(
          `${serverURL}/Expediente/get?dni=${padroninquilinoDetalle.data.des_dni_conyugue}`
        );
        SetExpedienteConyugue(responseExpedienteConyugue);
     
      } else {
        console.log("Else");
        console.log(isLoading);
        const objetoRequest = {
          codempresa: "0001",
          option: "7",
          dni: padroninquilinoDetalle.data.des_dni_conyugue,
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
    propietario,
    pabellones,
    inmueblesinfo
  };
};
