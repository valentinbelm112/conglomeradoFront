
import React, { useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const UseGetExportPropietario = async (API) => {
    const codigo_asociacion="E00241";

    console.log(API)
        
    try{
        const response = await axios.get(`${API}?Codigo_Asociacion=${codigo_asociacion}`); 
        

        const formattedData = response.data.map(item => {
            return {
              Propietario: `${item.des_nombres} ${item.des_Apellidos}`,
              Inmuebles: item.inmuebleEntities.map(inmueble => inmueble.des_tipo_dominio).join(', ')
            };
          });
        console.log("Ingreso")

        console.log(formattedData)
      
        const ws = XLSX.utils.json_to_sheet(formattedData);
        console.log(ws)

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Datos');
        console.log(wb)
        
        const blob = new Blob([XLSX.write(wb, { bookType: 'xlsx', type: 'blob' })], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            });

            console.log(blob)

            saveAs(blob, 'datos.xlsx');
    }
    catch(error){
        console.error('Error fetching data:', error);
    }

       

}

export default UseGetExportPropietario;