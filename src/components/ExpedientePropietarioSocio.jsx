import React from "react";
import { useState } from "react";
import "./styles/ExpedienteSocio.scss"


const ExpedientePropietarioSocio = () => {
    const [selectedValue, setSelectedValue] = useState('');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };
    return (
        <div className="container-expediente-socio">
            <div className="title-container-expediente-socio">
                Expediente del Propietario
            </div>
            <div className="row">
                <div className="col-md-4">
                    <div className="Partida-registral-socio-title">
                        Puestos del socio:
                    </div>
                    <div className="Partida-registral-socio-title-p">
                        puesto: #### -
                    </div>
                    <div className="Partida-registral-socio-title-p">
                        puesto: ####
                    </div>
                    <div className="container-expediente-radio-button">
                        <input type="radio" id="contactChoice1" name="contact" value="email" />
                        <label htmlFor="contactChoice1" className="container-expediente-contactChoice1-socio">Socio</label>
                        <input type="radio" id="contactChoice2" name="contact" value="phone" />
                        <label htmlFor="contactChoice2" className="container-expediente-contactChoice1-socio">Conyugue del Socio</label>
                    </div>

                    <div className="container--expediente-socio">
                        <img src="https://tramiteonline.unmsm.edu.pe/sgdfd/mat/resources/limitless/global_assets/images/avatar-set/man-2.png" alt="" className="foto-expediente-propietario" />
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
                        Información Comercial
                    </div>
                    <div className="container-partida-filter-expediente">
                        <div className="container-partida-filter-expediente">
                            Selecionar el puesto a Revisar
                        </div>
                        <div className="container-combo-socio">
                            <select id="myCombobox-socio" value={selectedValue} onChange={handleChange}>
                                <option value="">Seleccione Nº Puesto</option>
                                <option value="opcion1">Opción 1</option>
                                <option value="opcion2">Opción 2</option>
                                <option value="opcion3">Opción 3</option>
                            </select>

                        </div>

                    </div>
                    <div className="row container-infor-personal-inmuebles">
                        <div className="col-7">
                            <div className="row  container-puesto-negocio-estado">
                                <div className="col-md-2 container-title-numero-partida">
                                    <div className="title-numero-partida">Puesto</div>
                                    <div className="title-numero-partida-p">Puesto</div>
                                </div>
                                <div className="col-md-7 container-title-oficina-registral">
                                    <div className="title-oficina-registral">
                                        Nombre del Negocio
                                    </div>
                                    <div className="title-oficina-registral-p">
                                        Nombre del Negocio
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
                            <div className="row container-dominio-acciones">
                                <div className="col-md-12">
                                    <div className="title-tipo-dominio">
                                        Direccion
                                    </div>
                                    <div className="title-tipo-dominio-p">
                                        ##############
                                    </div>
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

                        <div className="title-co-conyugue-socio">
                            Co-Titular / Cónyugue del puesto
                        </div>
                        <div className="title-co-conyugue-socio-p">
                            Si
                        </div>


                        <div className="title-cotitular-conyugue-p">
                            Blacker |
                        </div>
                        <div className="title-cotitular-conyugue-p">
                            Co-Propietario |
                        </div>
                        <div className="title-cotitular-conyugue-p">
                            Dni |
                        </div>
                        <div className="title-cotitular-conyugue-p">
                            Ir a su expediente
                        </div>
                        <div className="title-co-conyugue-socio">
                            Inquilinos del Puesto
                        </div>
                        <div className="title-co-conyugue-socio-p">
                            Si
                        </div>


                        <div className="title-cotitular-conyugue-p">
                            Blacker |
                        </div>
                        <div className="title-cotitular-conyugue-p">

                        </div>
                        <div className="title-cotitular-conyugue-p">
                            Dni |
                        </div>
                        <div className="title-cotitular-conyugue-p">
                            Ir a su expediente
                        </div>
                        <div className="Documentos-asociado-padron-socio">
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

export default ExpedientePropietarioSocio;