import React , { useEffect,  useContext }from "react";
import NavbarConglomerado from "../components/NavbarConglomerados";
import SidebarMenu from "../components/SidebarMenu";
import "./styles/PerfilConglomerado.scss";
import AuthContext from "../context/AuthContext";
const PerfilSociosConglomerados=()=>{
  const { login } = useContext(AuthContext);
  const { auth } = useContext(AuthContext);
  useEffect(() => {
    login();

  }, []);
    
    return(
      <div className="navbar-sidebar-directivos">
      <NavbarConglomerado />
        <div className="container-Sidebar-view-directivo">
              <SidebarMenu />
              <div className="container" style={{zIndex:'1'}}>
      <div className="row"  style={{paddingTop:'10px' ,}}>
        {/* Columna 1 */}
        <div className="col-md-5">
          <div className="card">
            <div className="card-header  text-white text-center" style={{backgroundColor:'#3498db',height:'150px'}}>
              <img
                src="https://media.licdn.com/dms/image/D4D03AQHf79vVLS5CMw/profile-displayphoto-shrink_800_800/0/1667133462647?e=1700092800&v=beta&t=eLb8D31vTBqIuc5XFvl71dL1pFoTFjg_Ukl6ySQWkh8"
                alt="Foto de perfil"
                className="img-fluid rounded-circle"
                 style={{height:'100%',width:'30%'}}
              />
            </div>
            <div className="card-body">
              <h5 className="card-title" style={{color: '#428bca'}}>NOMBRES</h5>
              <p>  {auth ? auth.nomColaborador?.toUpperCase() : []}</p>
            </div>
          </div>
        </div>

        {/* Columna 2 */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title" style={{color: '#428bca'}}>DATOS PERSONALES</h5>
              <p>DNI:</p>
              <p>ESTADO CIVIL:</p>
              <p>SEXO:</p>
              <p>FECHA DE NACIMIENTO:</p>
              <p>LUGAR DE NACIMIENTO:</p>
              <p>TELÉFONO:</p>
              <p>CELULAR:</p>
              <p>DIRECCIÓN:</p>
            </div>
          </div>
        </div>
      </div>
    </div>
        </div>
        
        
        </div>
       
    );
}

export default PerfilSociosConglomerados;
