import React from "react";

const EditarInformacionDirectivo = () => {
    const [datos, setDatos] = useState({
        des_nombres: "",
        des_apellidos: "",
        dni:"",
        des_cargo:""
      });


      const enviarDatos = (e)=>{
        
        setDatos({
            ...datos,
            [event.target.name]: e.target.value,
          });
      }


    return (
        <div className="form">
            <div className="title container-editar-directivo-conglomerado">
                Iniciar Sesión
            </div>
            <br />
            <form action="" className="login-form" onSubmit={enviarDatos}>
                <input
                    name="des_nombres"
                    type="text"
                    placeholder="Nombres"
                    className="lblNombres"
                    onChange={handleInputChange} />
                <input
                    name="des_apellidos"
                    type="text"
                    placeholder="Apellidos"
                    className="lblApellidos"
                    onChange={handleInputChange} />
                <input
                    name="dni"
                    type="text"
                    placeholder="Dni"
                    className="lblDni"
                    onChange={handleInputChange} />
                <input
                    name="des_cargo"
                    type="text"
                    placeholder="Cargo"
                    className="lblCargo"
                    onChange={handleInputChange} />
                 
                <button className="btnSing">Editar Información</button>

            </form>
        </div>

    );
}