import axios from 'axios';
import { accesUrlTocken } from "../utils/Configuration";
export const refreshAccessToken = async (refreshToken) => {
    try {
      const response = await axios.post(refreshToken, {
        grant_type: 'refresh_token',
        client_id: 'refresh_token',
        client_secret: 'refresh_token',
        refresh_token: 'refresh_token',

      });
  
      return response.data.access_token;
    } catch (error) {
      console.error('Error refreshing access token:', error);
      throw error;
    }
  };