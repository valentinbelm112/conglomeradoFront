
import React, { useState } from 'react';

const UseGetExportPropietario = async (API) => {
  console.log(API)
  await fetch(API, { method: 'GET' })
      .then((response) => {
          if (response.ok) {
              return response.blob();
          }
          throw new Error('Error al exportar Excel.');
      })

      .then((blob) => {
          console.log("Link temporal")
          // Crear una URL temporal para el blob y descargar el archivo Excel
          const url = window.URL.createObjectURL(new Blob([blob]));
          const a = document.createElement('a');
          a.href = url;
          a.download = 'datos.xlsx'; // Nombre del archivo Excel que se descargará
          document.body.appendChild(a);
          a.click();
          a.remove(); // Eliminar el enlace después de descargar el archivo
      })

       

}

export default UseGetExportPropietario;