import React, { useState, useContext } from "react";
import "./styles/LoginForm.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { serverURL } from "../utils/Configuration";
import { saveToLocalStorage } from "../hooks/useLocalStorage";
import AuthContext from "../context/AuthContext";


const FormLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);
  
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


  const enviarDatos = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    console.log("Enviando");
    console.log("Enviando datos" + datos.email);
    await axios
      .post(
        `${serverURL}/api/auth/generatetoken`,

        {
          username: datos.email,
          password: datos.password,
        }
      )
      .then(({ data }) => {
        setIsLoading(false);
        console.log(data);
         
        saveToLocalStorage(data);
        login();
        const successMessage = true;
        navigate(`/home-conglomerado?successLogin=${successMessage}`);
        
      })
      .catch((error) => {
        console.error("función enRechazo invocada: ", error);
        setIsLoading(false);
        toast.error("Intente Nuevamente .");
      });
  };

  return (
    <div className="login-wrap">
      <div className="login-html">
    
        <div className="title">
          <span className="texto-negrita-cgm">
            Plataforma de Gestión de Propietarios, Socios e Inquilinos
          </span>
          {`con apoyo de Financiera Proempresa`}
        </div>
        <input
          id="tab-1"
          type="radio"
          name="tab"
          className="sign-in-cgm"
          checked
        />
       
        <label htmlFor="tab-1" className="tab">
          Iniciar Sesión
        </label>
        <div className="login-form">
          <form className="sign-in-htm" onSubmit={enviarDatos}>
            <div className="group">
              <label htmlFor="user" className="label">
                Username
              </label>
              <input
                id="user"
                type="text"
                className="input"
                name="email"
                placeholder="Username"
                onChange={handleInputChange}
              />
            </div>
            <div className="group">
              <label htmlFor="pass" className="label">
                Password
              </label>
              <input
                id="pass"
                type="password"
                className="input"
                data-type="password"
                name="password"
                placeholder="Password"
                onChange={handleInputChange}
              />
            </div>
            <div className="group"></div>
            <div className="group-submit">
              <input
                type="submit"
                value={isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
                className={isLoading ? "button" : "button"}
                disabled={isLoading}
              />
              {isLoading && <div className="spinner"></div>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormLogin;
