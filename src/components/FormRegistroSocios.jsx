import React from "react"
import "./styles/FormRegistroSocios.scss"
const FormRegistroSocios =()=>{

    return(
        <div className="container-form-socios">
                <form className="form-socios-details">
                <div className="mb-3 input-form-socios ">
                <label  className="form-label">Nº Documento</label>
                <input type="text" name="dni" className="form-control" id="FormControlInput1" placeholder="Nº Documento"/>
                </div>
                <div className="mb-3 input-form-socios ">
                <label  className="form-label">Nombres</label>
                <input type="text" name="nombres" className="form-control" id="FormControlInput2" placeholder="Nombres"/>
                </div>
                <div className="row">
                    <div className="col-8">
                    <div class="mb-3 input-form-sociosP">
                    <label  class="form-label">Apellido Paterno</label>
                    <input type="text" name="paterno" class="form-control" id="FormControlInput2" placeholder="Apellido Paterno"/>
                    </div>
                    <div class="mb-3 input-form-sociosP">
                    <label  class="form-label">Apellido Materno</label>
                    <input type="text" name="materno" class="form-control" id="FormControlInput2" placeholder="Apellido Materno"/>
                    </div>
                    <div class="mb-3 input-form-sociosP ">
                    <label  class="form-label">Fecha de nacimiento</label>
                    <input type="date" name="fecha" class="form-control" id="FormControlInput2" placeholder="Fecha Nacimiento"/>
                    </div>
                    <div className="row">
                        <div className="col-6">
                        <div class="mb-3 input-form-sociosP">
                        <label  class="form-label">Natural De:</label>
                        <input type="text" name="natural" class="form-control" id="FormControlInput2" placeholder="Natural de"/>
                       </div>
                        </div>
                        <div className="col-6 ">
                        <div class="mb-3">
                        <label  class="form-label">Provincia:</label>
                        <input type="text" name="provincia" class="form-control" id="FormControlInput2" placeholder="Provincia"/>
                       </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-7">
                        <div class="mb-3 input-form-sociosP">
                        <label  class="form-label">Distrito</label>
                        <input type="text" name="distrito" class="form-control" id="FormControlInput2" placeholder="Distrito"/>
                        </div>
                        </div>
                        <div className="col-5">
                        <div class="mb-3">
                        <label  class="form-label">Departamento</label>
                        <input type="text" name="departamento" class="form-control" id="FormControlInput2" placeholder="Departamento"/>
                        </div>
                        </div>
                    </div>
                    
                    </div>
                    <div className="col-4">
                        <img src="" alt="" className="form-foto-perfil-socio"/>
                    </div>
                </div>
                    <div class="mb-3 input-form-socios">
                    <label  class="form-label">Ocupación</label>
                    <input type="text" name="ocupacion" class="form-control" id="FormControlInput2" placeholder="Ocupación"/>
                    </div>
                    <div class="mb-3 input-form-socios">
                    <label  class="form-label">Grado de Instrucción</label>
                    <input type="text" name="grado" class="form-control" id="FormControlInput2" placeholder="Grado de Instrucción"/>
                    </div>
                <div className="row">
                 <div className="col-6">
                    <div class="mb-3 input-form-sociosP">
                    <label  class="form-label input-form-sociosP">Estado Civil</label>
                    <input type="text" name="estadoCivil" class="form-control" id="FormControlInput2" placeholder="Estado Civil"/>
                    </div>
                 </div>
                 <div className="col-6 ">
                    <div class="mb-3 input-form-sociosR">
                    <label  class="form-label">Libreta Militar Nº</label>
                    <input type="text" name="libretaMilitar" class="form-control" id="FormControlInput2" placeholder="Libreta militar"/>
                    </div>
                 </div>
                </div>

              
                    <div class="mb-3 input-form-socios">
                    <label  class="form-label">Direccion</label>
                    <input type="text" name="estadoCivil" class="form-control" id="FormControlInput2" placeholder="Estado Civil"/>
                    
                 
                 
                    <div class="mb-3">
                    <label  class="form-label">Esposa o Conviviente</label>
                    <input type="text" name="libretaMilitar" class="form-control" id="FormControlInput2" placeholder="Libreta militar"/>
                    </div>
                 
                </div>
               
              
                </form>

            
            
        </div>
    );

}

export default FormRegistroSocios;