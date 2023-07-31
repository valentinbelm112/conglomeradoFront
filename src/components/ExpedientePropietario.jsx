import React from "react";
import { useState } from "react";
import "./styles/ExpedientePropietario.scss"
const valorZoomScale = [
    {
        value: '1',
        name: '1'
    },
    {
        value: '2',
        name: '2'

    },
    {
        value: '3',
        name: '3'

    },
    {
        value: '4',
        name: '4'

    },
    {
        value: '5',
        name: '5'

    },
];
const ExpedientePropietario=()=>{
    const [selectedValue, setSelectedValue] = useState('');

    const handleChange = (event) => {
      setSelectedValue(event.target.value);
    };
    return(
        <div className="container-expediente-propietario">
            <div className="title-container-expediente-propietario">
                Expediente del Propietario
            </div>
            <div className="row">
                <div className="col-md-4">
                    <div className="Partida-registral-propietario-title">
                       Partidas Registral del propietario: 
                    </div>
                    <div className="Partida-registral-propietario-title-p">
                        1000345600
                    </div>
                    <div className="Partida-registral-propietario-title-p">
                        1000000000
                    </div>
                    <div className="container-expediente-radio-button">
                    <input type="radio" id="contactChoice1" name="contact" value="email" />
                    <label htmlFor="contactChoice1" className="container-expediente-contactChoice1-propietario">Propietarios</label>
                    <input type="radio" id="contactChoice2" name="contact" value="phone" />
                    <label htmlFor="contactChoice2" className="container-expediente-contactChoice1-propietario">Conyugue</label>
                    </div>

                    <div className="container--expediente-propietario">
                        <img src="https://media.licdn.com/dms/image/C4D03AQEhZq9QrIZpyw/profie-displayphoto-shrink_400_400/0/1645396258936?e=1695254400&v=beta&t=W1SudiT4AMNNe8rsRD8MmPI9_UsOFZkNjbdx-Y79FbI" alt="" className="foto-expediente-propietario"/>
                    </div>
                    <div className="container-info-personal-expediente-filter">
                        <div className="title-info-personal-expediente">
                            Información Personal
                        </div>
                        <div className="container-info-personal">
                        <div className="title-datos-personales-expediente-filter">
                            Nombres :
                        </div>
                            <div>
                                #################
                            </div>
                        </div>
                        
                        <div className="container-info-personal">
                        <div className="title-datos-personales-expediente-filter">
                            Apellidos :  
                        </div>
                        <div>
                            #######################
                        </div>
        
                           </div>

                           <div className="container-info-personal">
                           <div className="title-datos-personales-expediente-filter">
                            Dni : 
                        </div>
                        <div>
                            ####################
                        </div>
                            </div> 
                            <div className="container-info-personal">
                            <div className="title-datos-personales-expediente-filter">
                            Fecha de expedicion : 
                        </div>
                        <div>
                            #########################
                        </div>
                                </div>
                       
                                <div className="container-info-personal">
                                <div className="title-datos-personales-expediente-filter">
                            Sexo : 
                        </div>
                        <div>
                            ############
                        </div>
                                     </div>
                    <div className="container-info-personal"> 
                    <div className="title-datos-personales-expediente-filter">
                            Fecha de Nacimiento :
                        </div>
                        <div>
                            ###########
                        </div>
                    </div>
                    <div className="container-info-personal"> 
                    <div className="title-datos-personales-expediente-filter">
                            Deparatamento de nacimiento :
                        </div>
                        <div>
                            ######
                        </div>
                    </div>
                    <div className="container-info-personal"> 
                    <div className="title-datos-personales-expediente-filter">
                            Grado de Instruccion : 
                        </div>
                        <div>
                            ############
                        </div>
                    </div>
                       
                       
                    <div className="container-info-personal"> 
                    <div className="title-datos-personales-expediente-filter">
                            Estado Civil :
                        </div>
                        <div>
                            ###################
                        </div>
                    </div>
                        
                    <div className="container-info-personal"> 
                    <div className="title-datos-personales-expediente-filter">
                            Deparatamento de Domicilio : 
                        </div>

                        <div>
                            ###################
                        </div>
                    </div>
                    <div className="container-info-personal"> 
                    <div className="title-datos-personales-expediente-filter">
                            Provincia de Domicilio :
                        </div>
                        <div>
                            ###########
                        </div>
                    </div>
                    <div className="container-info-personal"> 
                    <div className="title-datos-personales-expediente-filter">
                            Distrito de Domicilio :
                        </div>
                        <div>
                            ##############
                        </div>
                    </div>
                    <div className="container-info-personal">
                    <div className="title-datos-personales-expediente-filter">
                            Dirección de Domicilio :
                        </div>
                        <div>
                           ############
                        </div>
                         </div>
                         <div className="container-info-personal">

                            
                         </div>

                    </div>
                    <div className="title-info-personal-expediente">
                        Información del contacto
                    </div>
                    <div className="container-info-contacto-expediente-filter">
                    <div className="container-info-personal"> 
                    <div className="title-datos-personales-expediente-filter">
                            Numero de telefono
                        </div>
                        <div>
                            ##############
                        </div>
                    </div>
                    <div className="container-info-personal">
                    <div className="title-datos-personales-expediente-filter">
                            Correo electronico
                        </div>
                        <div>
                            ##############
                        </div>
                    </div>
                       
                       
                    </div>
                
                </div>
                <div className="col-md-8 ">
                   <div className="title-info-personal-expediente">
                    Información del inmueble
                   </div>
                   <div className="container-partida-filter-expediente">
                      <div>
                        Selecionar Partida  a Revisar
                      </div>
                    
                        <select id="myCombobox" value={selectedValue} onChange={handleChange}>
                            <option value="">Seleccione...</option>
                            <option value="opcion1">Opción 1</option>
                            <option value="opcion2">Opción 2</option>
                            <option value="opcion3">Opción 3</option>
                        </select>
                        <p>Seleccionaste: {selectedValue}</p>
                   </div>
                   <div className="row container-infor-personal-inmuebles">
                    <div className="col-7">
                        <div className="row">
                        <div className="col-md-3 container-title-numero-partida">
                            <div className="title-numero-partida">Numero Partida</div>
                            <div className="title-numero-partida-p">Numero Partida</div>
                        </div>
                          <div className="col-md-3 container-title-oficina-registral">
                            <div className="title-oficina-registral">
                                Oficina Registral
                            </div>
                            <div className="title-oficina-registral-p">
                                Oficina Registral
                            </div>

                        </div>
                        <div className="col-md-3 container-title-area">
                        <div className="title-area">
                                Area
                            </div>
                        <div className="title-area-p">
                                Area
                            </div>

                          </div>
                          <div className="col-md-3 container-title-estado">
                          <div className="title-estado">
                             Estado 
                           </div>
                           <div className="title-estado-p">
                             Estado 
                           </div>
                          </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                <div className="title-tipo-dominio">
                                    Tipo de dominio
                                </div>
                                <div className="title-tipo-dominio-p">
                                    ##############
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="title-acciones-drechos">
                                    % Acciones y Derechos
                                </div>
                                <div className="title-acciones-drechos-p">
                                    ##############
                                </div>
                            </div>
                        </div>
                        <div className="title-direccion-propietarios">
                            Direccion
                        </div>
                        <div className="title-direccion-propietarios-p">
                            #############################
                        </div>
                        <div className="title-co-conyugue-propietario">
                          Co-Propietario / Cónyugue del propietario
                        </div>
                        <div className="title-co-conyugue-propietario-p">
                        #############################
                        </div>
                        <div className="row">
                           
                                <div className="col-md-3">
                                Blacker
                                </div>
                                <div className="col-md-3">
                                Co-Propietario
                                </div>
                                <div className="col-md-3">
                                    Dni
                                </div>
                                <div className="col-md-3">
                                    Ir a su expediente
                                </div>
                           
                        </div>
                       
                    </div>
                    <div className="col-5">
                      <div className="title-fecha-baja">
                        Fecha baja
                      </div>
                      <div className="title-fecha-baja">
                        Mótivo de la  baja
                      </div>
                      <div className="title-fecha-baja">
                        Observaciones Adicionales
                      </div>
                    </div>
                    <div className="Documentos-asociado-padron-propietario">
                        Documentos del asociado
                    </div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum gravida diam vel lectus consequat, in ullamcorper nulla suscipit. Morbi elementum tincidunt odio sed auctor. Cras malesuada dolor non pellentesque mollis. Pellentesq</p>
                    <div className="row">
                        <div className="col-md-3">

                        </div>
                    </div>
                   </div>
                </div>
            </div>
        </div>
    );
}

export default ExpedientePropietario;