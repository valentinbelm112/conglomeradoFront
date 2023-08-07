
import axios from 'axios';
import { useGetReniec } from './useGetReniec';
export const  useGetExpediente=async(api)=>{
    await useGetReniec();
  console.log(api + "Dni")
}