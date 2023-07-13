import React, { useState } from 'react';
import  FormLogin from '../components/FormLogin.jsx'
import "../pages/styles/Auth.scss"
import logo_proempresa from "./assets/logo_proempresa.svg"

const Auth =()=>{

    return(
            <div className='row'>
                    <div className="block_left col-6">
                        <img src="" alt="" /> 
                    </div>
                    <div className="block_right col-6">
                        <div className="container-image" >
                            <img src={logo_proempresa} alt="" />
                        </div>
                            <FormLogin />             
                </div>
            </div>          
    );
}

export default Auth;