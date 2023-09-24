export function saveToLocalStorage(state) {
  const estate2={
    nombrePersonal:"EEEEE",
    codPerfil:"12",
    codUsuario:"EEEEE",
    codEstado:"EEEE",
    des_codigo_asociacion:"eerr"

  }
    try {
      console.log(state, "Agregando LocalStorege");
      const serializerStateEcommerce = JSON.stringify(state);
      localStorage.setItem("stateSerializerCGM", serializerStateEcommerce);
      console.log(state, "FFF");
    } catch (error) {
      console.log(error);
    }
  }
  
  export function loadFromLocalStorage() {
    try {
      console.log( "Obteniendo LocalStorege");
      const serializerStateEcommerce = localStorage.getItem("stateSerializerCGM");
      console.log(serializerStateEcommerce, "FFF");
      if (serializerStateEcommerce === null) return undefined;
      return JSON.parse(serializerStateEcommerce);
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }