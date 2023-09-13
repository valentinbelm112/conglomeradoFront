import "./styles/PerfilConglomerado.scss"
const PerfilSociosConglomerados=()=>{
    
    
    return(
        <div className="container">
      <div className="row">
        {/* Columna 1 */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-primary text-white text-center">
              <img
                src="/sgdfd/mat/resources/limitless/global_assets/images/avatar-set/man-2.png"
                alt="Foto de perfil"
                className="img-fluid rounded-circle"
                width="150"
              />
            </div>
            <div className="card-body">
              <h5 className="card-title">Datos de Perfil</h5>
              <p>Tipo Perfil: ALUMNO</p>
              <p>Código: 17200037</p>
              <p>Nombre: ANTÚNEZ GONZÁLES, VALENTÍN BELMUT</p>
              <p>Celular: 940472373</p>
              <p>Local: INGENIERÍA DE SISTEMAS E INFORMÁTICA</p>
            </div>
          </div>
        </div>

        {/* Columna 2 */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Datos Personales</h5>
              <p>Tipo de Documento:</p>
              <p>Número de Documento:</p>
              <p>Nombres:</p>
              <p>Apellido Paterno:</p>
              <p>Apellido Materno:</p>
              <p>Correo Institucional:</p>
              <p>Correo Personal:</p>
              <p>Celular:</p>
              <p>Teléfono Fijo:</p>
              <p>Sexo:</p>
              <p>Estado Civil:</p>
              <p>Fecha de Nacimiento:</p>
              <p>Dirección:</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
}

export default PerfilSociosConglomerados;
