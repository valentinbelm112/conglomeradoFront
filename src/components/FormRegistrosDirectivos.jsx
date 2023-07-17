import { useState } from "react";
import "./styles/FormRegistroDirectivos.scss"
const FormRegistrosDirectivos=()=>{

    // onchange states
  const [excelFile, setExcelFile] = useState(null);
  const [typeError, setTypeError] = useState(null);

  // submit state
  const [excelData, setExcelData] = useState(null);

    const handleFile=(e)=>{
        let fileTypes = ['application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','text/csv'];
        let selectedFile = e.target.files[0];
        if(selectedFile){
          if(selectedFile&&fileTypes.includes(selectedFile.type)){
            setTypeError(null);
            let reader = new FileReader();
            reader.readAsArrayBuffer(selectedFile);
            reader.onload=(e)=>{
              setExcelFile(e.target.result);
            }
          }
          else{
            setTypeError('Please select only excel file types');
            setExcelFile(null);
          }
        }
        else{
          console.log('Please select your file');
        }
      }
    return(
        <div className="container-registro-directivo ">
            <div className="form form-registro-directivos">
                <div>Archivo-Inscripción de Asociaciones</div>
            <input type="file" className="form-control" required onChange={handleFile} />
                    </div>
        </div>
       
    );
}

export default FormRegistrosDirectivos;