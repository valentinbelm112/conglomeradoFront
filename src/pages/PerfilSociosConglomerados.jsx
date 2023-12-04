import React, { useEffect, useContext } from "react";
import NavbarConglomerado from "../components/NavbarConglomerados";
import SidebarMenu from "../components/SidebarMenu";
import "./styles/PerfilConglomerado.scss";
import { useState } from "react";
import AuthContext from "../context/AuthContext";
import { UseGetPerfilUsuario } from "../hooks/useGetPerfil";
import { serverURL } from "../utils/Configuration";
import ContainerNavSidbLoad from "../components/Container_Nav_Sidb_Load";
import { format } from "date-fns";
const PerfilSociosConglomerados = ({ estadoGlobal }) => {
  const { login } = useContext(AuthContext);
  const { auth } = useContext(AuthContext);
  const [togle, setTogle] = useState(true);
  const { dataPerfil, isLoading } = UseGetPerfilUsuario(
    `${serverURL}/perfil/CGM/buscar`,
    estadoGlobal.des_codigo_asociacion,
    estadoGlobal.codUsuario,
    estadoGlobal
  );
  useEffect(() => {
    login();
  }, []);

  if (isLoading) {

    return <ContainerNavSidbLoad />;

  }
  return (
    <div className="navbar-sidebar-directivos">
      <NavbarConglomerado Estado={auth} />
      <div className="container-Sidebar-view-directivo">
        <SidebarMenu setTogle={setTogle} />
        <div className="container" style={{ zIndex: "1" }}>
          <div
            className="row"
            style={{ paddingTop: "10px", justifyContent: "center" }}
          >
            <div className="title-consejo-directivo">Mi Perfil</div>
            {/* Columna 1 */}
            <div className="col-md-5">
              <div className="card">
                <div
                  className="card-header  text-white text-center"
                  style={{ backgroundColor: "#3498db", height: "150px" }}
                >
                  <img
                    src={dataPerfil?.data?.des_link_perf}
                    alt="Foto de perfil"
                    className="img-fluid rounded-circle"
                    style={{ height: "100%", width: "30%" }}
                  />
                </div>
                <div className="card-body">
                  <h5
                    className="card-title-perfil-datos-personales"
                    style={{ color: "#428bca" }}
                  >
                    
                    NOMBRES
                  </h5>
                  <p>
                    {" "}
                    {dataPerfil
                      ? dataPerfil.data.des_usuario?.toUpperCase()
                      : []}
                  </p>
                </div>
              </div>
            </div>

            {/* Columna 2 */}
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5
                    className="card-title-perfil-datos-personales"
                    style={{ color: "#428bca" }}
                  >
                    DATOS PERSONALES
                  </h5>
                  <p>
                    {" "}
                    <span className="title-perfil-datos-personales">DNI:</span>
                    {dataPerfil ? dataPerfil.data.desDni : []}{" "}
                  </p>
                  <p>
                    <span className="title-perfil-datos-personales">
                      ESTADO CIVIL:{" "}
                    </span>

                    {dataPerfil ? dataPerfil.data.des_estado_civ : []}
                  </p>
                  <p>
                    <span className="title-perfil-datos-personales">
                      SEXO:{" "}
                    </span>
                    {dataPerfil ? dataPerfil.data.des_sexo : []}
                  </p>
                  <p>
                    <span className="title-perfil-datos-personales">
                      FECHA DE NACIMIENTO:{" "}
                    </span>

                    {format(
                      new Date(dataPerfil?.data?.fec_nacimiento),
                      "dd-MM-yyyy"
                    )}
                  </p>
                  <p>
                    <span className="title-perfil-datos-personales">
                      LUGAR DE NACIMIENTO:{" "}
                    </span>

                    {dataPerfil ? dataPerfil.data.des_lugar_nac : []}
                  </p>
                  <p>
                    <span className="title-perfil-datos-personales">
                      TELÉFONO:{" "}
                    </span>
                    {dataPerfil ? dataPerfil.data.des_num_cel: []}
                  </p>
                  <p>
                    <span className="title-perfil-datos-personales">
                      CELULAR:{" "}
                    </span>
                    {dataPerfil ? dataPerfil.data.des_num_cel : []}
                  </p>
                  <p>
                    <span className="title-perfil-datos-personales">
                      DIRECCIÓN:{" "}
                    </span>
                    {dataPerfil ? dataPerfil.data.des_domicilio : []}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfilSociosConglomerados;
