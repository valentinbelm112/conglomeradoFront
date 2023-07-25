import axios from 'axios';
import { accesUrlTocken } from "../utils/Configuration";
export const refreshAccessToken = async (refreshToken) => {
    try {
      const response = await axios.post(tokenUrl, {
        grant_type: 'refresh_token',
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        scope: scope,
      });
  
      return response.data.access_token;
    } catch (error) {
      console.error('Error refreshing access token:', error);
      throw error;
    }
  };