import axios from 'axios';
import { serverURL } from '../utils/Configuration';
export const refreshAccessToken = async (refreshToken) => {
    try {
      
      const response = await axios.get(`${API}?Codigo_Asociacion=${codigo_asociacion}`); 
      return response.data.access_token;

    } catch (error) {
      console.error('Error refreshing access token:', error);
      throw error;
    }
  };