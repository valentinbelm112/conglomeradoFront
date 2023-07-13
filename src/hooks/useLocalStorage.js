export function saveToLocalStorage(state) {
    try {
      console.log(state, "Agregando LocalStorege");
      const serializerStateEcommerce = JSON.stringify(state);
      localStorage.setItem("stateSerializer", serializerStateEcommerce);
      console.log(state, "FFF");
    } catch (error) {
      console.log(error);
    }
  }
  
  export function loadFromLocalStorage() {
    try {
      const serializerStateEcommerce = localStorage.getItem("stateSerializer");
      console.log(serializerStateEcommerce, "FFF");
      if (serializerStateEcommerce === null) return undefined;
      return JSON.parse(serializerStateEcommerce);
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }