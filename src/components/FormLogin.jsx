import React, {  useState } from "react";
import "./styles/LoginForm.scss"
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { serverURL } from "../utils/Configuration";
const FormLogin =(props)=>{
    
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
            toast.success("Inicio de sesión realizado con éxito");
            console.log(data);
            console.log("holass");
            //saveToLocalStorage(data);
            //login();
            navigate('/home-conglomerado');
           
           
          })
       .catch (error => {
        console.error( 'función enRechazo invocada: ', error );
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
				            <button className="btnSing">Iniciar Sesión</button>
                     
                </form>
                
            </div>
            <ToastContainer />
        </div>
    );
}

export default FormLogin;