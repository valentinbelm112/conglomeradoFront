import React, { useContext, useEffect } from "react";
import "./styles/NavbarConglomerados.scss";
import { Link } from "react-router-dom";
import logo_proempresa from "./assets/logoJosefej.png";
import MenuIcon from "@mui/icons-material/Menu";
import AuthContext from "../context/AuthContext";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
const NavbarConglomerado = ({ Estado }) => {
  const { auth } = useContext(AuthContext);
  console.log(auth);

  return (
    <nav className="header sticky-top navbar-conglomerado-pro">
      <div>
        <div />
      </div>

      <img src={logo_proempresa} alt="logo" className="logo-nav" />

      <div className="navbar-left"></div>

      <div className="navbar-right">
        <ul>
          <div className="container">
            <li>
              <h4 className="title-user-login" style={{ color: `white` }}>
                Hola,
              </h4>
              <h5 className="title-user-login" style={{ color: `white` }}>
                {auth ? auth.nomColaborador : []}
              </h5>
            </li>
          </div>
          <div className="constainer-options-account">
            <li className="navbar-shopping-cart">
              <Link
              
                style={{ display: "flex", alignItems: "baseline" }}
              >
                <img
                  src={auth.des_link_perf}
                  alt=""
                  className="perfil-fotot-cgm-nabvar"
                  style={{ color: `white` }}
                />

                <KeyboardArrowDownIcon style={{ color: "white" }} />
              </Link>
            </li>
            <ul className="options-account">
              <div className="user-name-account">
            
              </div>

              <Link   to="/cgm/perfil" style={{ color: "inherit", textDecoration: "none" }}>
                {" "}
                <li>
                  <div>Perfil</div>
                </li>
              </Link>

              <Link style={{ color: "inherit", textDecoration: "none" }}>
                <li>
                  <div>Logout</div>
                </li>
              </Link>
            </ul>
          </div>
          <div className="container-menu-desplegable">
            <li>
              <h4
                onClick={Estado}
                style={{ cursor: "pointer" }}
                className="icon-menu-nabvar"
              >
                <MenuIcon />
              </h4>
            </li>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default NavbarConglomerado;
