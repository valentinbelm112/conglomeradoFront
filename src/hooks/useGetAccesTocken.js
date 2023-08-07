
import axios from 'axios';
import { accesUrlTocken } from "../utils/Configuration";
export const getAccessToken = async (accesUrlTocken) => {
    try {
      const response = await axios.post(accesUrlTocken, {
        grant_type: 'password',
        client_id: 'xGB7wMPgEIqf_Fm1vxTpI2RLHPca',
        client_secret: 'kxyaWfhgrUojR4FftZ94TEemm3Qa',
        username: 'ext_rmg',
        password: 'ext_rmg',
        scope: 'openid',
      });
  
      return response.data.access_token;
    } catch (error) {
      console.error('Error getting access token:', error);
      throw error;
    }
  };
  