import React, { useContext } from "react";
import "./styles/NavbarConglomerados.scss";
import { Link } from "react-router-dom";
import logo_proempresa from "./assets/logo_proempresa.svg"
import MenuIcon from '@mui/icons-material/Menu';

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
                  <svg viewBox="0 0 32 32" width="32px" height="32px">
                    <path
                      d="M15.988 15.257c2.968 0 5.382-2.917 5.382-6.502C21.37 5.367 19.157 3 15.988 3c-3.168 0-5.38 2.367-5.38 5.755 0 3.586 2.413 6.502 5.38 6.502zm0-11.209c2.592 0 4.334 1.892 4.334 4.707 0 3.007-1.944 5.454-4.334 5.454-2.389 0-4.332-2.447-4.332-5.454 0-2.815 1.74-4.707 4.332-4.707zm9.982 20.313c-.013-.829-.02-1.14-.03-1.237-.446-4.093-3.932-6.349-9.815-6.349L16 16.78l-.045-.001c-.034-.001-.069-.003-.105-.003-5.883 0-9.368 2.256-9.814 6.35-.01.09-.016.36-.028 1.126L6 24.745l.003.033c0 .02.002.04.005.059.002.016.007.032.01.048l.016.05c.005.016.013.031.02.046.007.016.015.031.024.046l.03.042c.01.013.019.026.03.038.013.015.029.028.044.041.008.008.014.016.023.023l.016.011.003.003c2.745 2.1 6.029 3.165 9.762 3.165h.002c3.642 0 7.017-1.095 9.763-3.164l.005-.004.013-.01c.009-.006.015-.014.023-.021a.397.397 0 0 0 .046-.043l.03-.037a.42.42 0 0 0 .03-.043c.01-.014.016-.03.024-.044.007-.016.015-.031.021-.047.006-.016.01-.033.014-.05a.447.447 0 0 0 .012-.048c.003-.019.004-.038.005-.057 0-.012.003-.024.003-.037l-.007-.384zm-9.982 2.94h-.001c-3.412 0-6.415-.946-8.934-2.808l.003-.225c.006-.377.015-.946.022-1.03.488-4.475 5.04-5.414 8.772-5.414l.15.003.125-.003c3.733 0 8.285.939 8.773 5.407.008.096.018.754.024 1.147l.002.112c-2.527 1.84-5.61 2.811-8.936 2.811z"
                      stroke="#124983"
                      strokeWidth="0.6"
                      fill="#124983"
                      fillRule="nonzero"
                    ></path>
                  </svg>
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