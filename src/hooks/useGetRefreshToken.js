import axios from 'axios';
import { accesUrlTocken } from "../utils/Configuration";
import { serverURL } from '../utils/Configuration';
export const refreshAccessToken = async (refreshToken) => {
    try {
      const response = await axios.get(`${serverURL}api`);
  
      console.log(response);
    } catch (error) {
      console.error('Error refreshing access token:', error);
      throw error;
    }
  };