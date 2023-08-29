import React, { useContext } from "react";
import "./styles/NavbarConglomerados.scss";
import { Link } from "react-router-dom";
import logo_proempresa from "./assets/logo_proempresa.svg"
import MenuIcon from '@mui/icons-material/Menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const NavbarConglomerado = ({ Estado }) => {



  return (
    <nav className="header sticky-top">
      <div>
        <img src={""} alt="menu" className="menu" />
      </div>

      <img src={logo_proempresa} alt="logo" className="logo-nav" />

      <div className="navbar-left"></div>

      <div className="navbar-right">
        <ul>
     
            <div className="container">
              <li>
                <h4 className="title-user-login">Hola,</h4>
              </li>
            </div>
            <div className="constainer-options-account">
              <li className="navbar-shopping-cart">
                <Link to="/account">
                  {/* <FontAwesomeIcon icon={faUser} className="faUser" /> */}
                  <FontAwesomeIcon icon={faUser} style={{color:`white`,height:`20px`}} />
                </Link>
              </li>
              <ul className="options-account">
                <div className="user-name-account">
                  <h3 className="user1-name-account">
                   
                  </h3>
                </div>
              
                <Link style={{ color: "inherit", textDecoration: "none" }}>
                  {" "}
                  <li>
                    <div>Perfil</div>
                  </li>
                </Link>
            
                <Link
                  style={{ color: "inherit", textDecoration: "none" }}
                 
                >
                  <li>
                    <div>Logout</div>
                  </li>
                </Link>
              </ul>
            </div>
            <div className="container-menu-desplegable">
              <li>
                <h4 onClick={Estado} style={{cursor:"pointer"}} className="icon-menu-nabvar"><MenuIcon /></h4>
              </li>
            </div>
        
        </ul>
      </div>
    </nav>
  );
};

export default NavbarConglomerado;