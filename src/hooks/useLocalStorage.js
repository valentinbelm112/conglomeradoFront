
export function saveToLocalStorage(state) {
 const estate2={
  "accessToken": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJKREVMQUNSVVpSIiwidXNlcl9uYW1lIjoiSkRFTEFDUlVaUiIsImNvZF9wZXJzb25hbCI6IkpPU0UgQU5UT05ZIERFIExBIENSVVogUk9NQU5JIiwiY29kX2VzdGFkbyI6IiIsImlhdCI6MTY5NzczMTc1NywiZXhwIjoxNjk3NzQ2MTU3fQ.x3XjOsxIpT_tXNwGg5XT_wI5Qhm0sm6IDm1m1ocC_W-Zwv_iPS8nZkjt2P6mI11xJgtA0Rjh2r16ZGDHt-D8Eg",
  "tokenType": "Bearer",
  "success": true,
  "codAuxiliar": null,
  "nomColaborador": "JOSE ANTONY DE LA CRUZ ROMANI",
  "codUsuario": "JDELACRUZR",
  "codPerfil": "",
  "codEstado": "",
  "existeUsuario": false,
  "des_codigo_asociacion": "E00241",
  "des_link_perf": "https://www.ejemplo.com"
}

    try {
     // console.log(estae1, "Agregando LocalStorege state2");
      const serializerStateEcommerce = JSON.stringify(estate2);
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


  export function removeFromLocalStorage() {
    
    try {
      console.log("Borrando local storage")
      localStorage.removeItem("stateSerializerCGM");
      window.location.href ='/login'
     
    } catch (error) {
      console.error("Error al eliminar el elemento del LocalStorage:", error);
    }
  }