import axios from 'axios';



export const useGetReniec = async () => {
     /*try {
     
      let accessToken = await getAccessToken();
  
      console.log(accessToken +"Accestoken")
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json', // Ajusta el tipo de contenido según tu API
      };
  
     /* const response = await axios.get(apiUrl, { headers });
      console.log(response.data); // Aquí puedes procesar la respuesta según tus necesidades
    } catch (error) {
      if (error.response && error.response.status === 401 && error.response.data.error === 'invalid_token') {
        // Si el token de acceso ha expirado, utiliza el token de actualización para obtener uno nuevo.
        try {
          const newAccessToken = await refreshAccessToken('tu-refresh-token');
          accessToken = newAccessToken;
  
          // Vuelve a intentar la petición original con el nuevo token de acceso.
          const headers = {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          };
  
          const response = await axios.get(apiUrl, { headers });
          console.log(response.data); // Aquí puedes procesar la respuesta según tus necesidades después de la actualización del token.
        } catch (error) {
          console.error('Error making API request:', error);
        }
      } else {
        console.error('Error making API request:', error);
      }

      */
     
    }
  