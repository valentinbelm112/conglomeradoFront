import React from "react";
import { Link } from 'react-router-dom';
import "./styles/CardOptions.scss"
import imagePadronSocios from "./assets/3587855.png"
import imagePadronInquilinos from "./assets/2558089.png"
import imageInformacionGeneralAsociacion  from "./assets/3930402.png"
import imagePropietarios from "./assets/Icono-Propietarios.png"
const CardOptions = () => {
  return (
    <div className="row container-general-options">
      <div className="col-6">
      <Link to="/register-directivos" className="no-style-link">
        <div className="container-options-conglomerado ">
          <div className="card container-options-conglomerado-card1" style={{ width: "70%", height:"90%" }}>
            <img src={imageInformacionGeneralAsociacion} className="card-img-top img-info-general-asociacion" alt="..." />
            <div className="card-body">
             <p className="card-text-padron-socios">
                 Información General de la Asociación
              </p>
             
            </div>
          </div>
        
          
        </div>
        </Link>
        <Link to="/register-padron-socios" className="no-style-link">
        <div className="container-options-conglomerado ">
          <div className="card container-options-conglomerado-card2" style={{ width: "70%", height:"90%" }}>
            <img src={imagePadronSocios} className="card-img-top img-padron-socios" alt="..." />
            <div className="card-body">
              
              <p className="card-text-padron-socios">
                    Padron Socios
              </p>
             
            </div>
          </div>
          
        </div>
        </Link>
      </div>
      
      <div className="col-6">
      <Link to="/register-padron-socios" className="no-style-link">
        <div className="container-options-conglomerado">
          <div className="card container-options-conglomerado-card3" style={{ width: "70%", height:"90%" }}>
            <img src={imagePropietarios} className="card-img-top img-padron-porpietarios" alt="..." />
            <div className="card-body">
              <p className="card-text-padron-socios">
                 Padron de propietarios
              </p>
             
            </div>
          </div>
        </div>
        </Link>
        <Link to="/register-padron-socios" className="no-style-link">
        <div className="container-options-conglomerado">
          <div className="card container-options-conglomerado-card4" style={{ width: "70%", height:"90%" }}>
            <img src={imagePadronInquilinos} className="card-img-top  img-padron-inquilinos" alt="..." />
            <div className="card-body">
            <p className="card-text-padron-socios">
                 Padron Inquilinos
              </p>
             
            </div>
          </div>
        </div>
        </Link>
      </div>
    </div>
  );
};

export default CardOptions;
