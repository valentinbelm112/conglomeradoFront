
export function saveToLocalStorage(state) {

    try {
     // console.log(estae1, "Agregando LocalStorege state2");
      const serializerStateEcommerce = JSON.stringify(state);
      localStorage.setItem("stateSerializerCGM", serializerStateEcommerce);
     // console.log(state, "FFF");
    } catch (error) {
     // console.log(error);
    }

  }
  
  
  export function loadFromLocalStorage() {
    try {
      //console.log( "Obteniendo LocalStorege");
      const serializerStateEcommerce = localStorage.getItem("stateSerializerCGM");
      //console.log(serializerStateEcommerce, "FFF");
      if (serializerStateEcommerce === null) return undefined;
      return JSON.parse(serializerStateEcommerce);
    } catch (error) {
      //console.log(error);
      return undefined;
    }
  }


  export function removeFromLocalStorage() {
    
    try {
     // console.log("Borrando local storage")
      localStorage.removeItem("stateSerializerCGM");
      window.location.href ='/login'
     
    } catch (error) {
      console.error("Error al eliminar el elemento del LocalStorage:", error);
    }
  }