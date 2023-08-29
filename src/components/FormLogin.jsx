import React, {  useState } from "react";
import "./styles/LoginForm.scss"
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { serverURL } from "../utils/Configuration";
const FormLogin =(props)=>{
  const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [datos, setDatos] = useState({
        email: "",
        password: "",
      });

      const handleInputChange = (event) => {
        
        setDatos({
          ...datos,
          [event.target.name]: event.target.value,
        });
      };
  
      const enviarDatos =async(event)=>{
        setIsLoading(true);
        event.preventDefault();
        console.log("Enviando")
        console.log("Enviando datos" +datos.email);
     
        const user = await axios.post(
    
            `${serverURL}/api/auth/generatetoken`,
     
           {
             username: datos.email,
             password: datos.password,
           }
         ).then(({ data }) => {
            setIsLoading(false);
            console.log(data);
            console.log("holass");
            //saveToLocalStorage(data);
            //login();
            const successMessage = true;
            navigate(`/home-conglomerado?successLogin=${successMessage}`);
           
           
          })
       .catch (error => {
        console.error( 'función enRechazo invocada: ', error );
 
        setIsLoading(false);
        toast.error("Intente Nuevamente .");
      })
        
       
    }
     
    return(
        <div className="login-page">
            <div className="form">
              <div className="tile container-login-conglomerado">
                 Iniciar Sesión
                </div>
                  <br />
                <form action="" className="login-form" onSubmit={enviarDatos}>
                     <input 
                     name="email"
                     type="text" 
                      placeholder="Usuario"
                      className="lblUsuario" 
                      onChange={handleInputChange}/>
                     <input 
                      name="password"
                     type="password" 
                     placeholder="Password" 
                     className="lblPass" 
                     onChange={handleInputChange}/>

                 <div className="button-container-spinner">
				            <button className={isLoading ? 'btnSingLoading' : 'btnSing'} disabled={isLoading}>
                    {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
                   
                    </button>
                    {isLoading && <div className="spinner"></div>}
                    </div>
                  
                     
                </form>
                
            </div>
            <ToastContainer />
        </div>
    );
}

export default FormLogin;