export function saveToLocalStorage(state) {
  const estae1={
    "jwt": "tu_token_jwt_aqui",
    "success": true,
    "codPersonal": "12345",
    "nombrePersonal": "Ejemplo Usuario",
    "codUsuario": "usuario123",
    "codPerfil": "perfil123",
    "codEstado": "activo",
    "existeUsuario": true,
    "des_codigo_asociacion": "E00241",
    "des_link_perf": "https://ejemplo.com/perfil"
  }

  
    try {
      console.log(estae1, "Agregando LocalStorege state2");
      const serializerStateEcommerce = JSON.stringify(estae1);
      localStorage.setItem("stateSerializerCGM", serializerStateEcommerce);
     // console.log(state, "FFF");
    } catch (error) {
     // console.log(error);
    }

  }
  
  
  export function loadFromLocalStorage() {
    try {
      console.log( "Obteniendo LocalStorege");
      const serializerStateEcommerce = localStorage.getItem("stateSerializerCGM");
      //console.log(serializerStateEcommerce, "FFF");
      if (serializerStateEcommerce === null) return undefined;
      return JSON.parse(serializerStateEcommerce);
    } catch (error) {
      //console.log(error);
      return undefined;
    }
  }