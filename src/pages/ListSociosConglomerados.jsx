
import {React,useState} from "react";
import FormRegistroSocios from "../components/FormRegistroSocios.jsx";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import "./styles/ListSociosConglomerados.scss"
import NavbarConglomerado from "../components/NavbarConglomerados.jsx";
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
  } from "mdb-react-ui-kit";
const ListSociosConglomerados =()=>{
    const [basicModal, setBasicModal] = useState(false);

    const toggleShow = () => setBasicModal(!basicModal);
    const [estadoReg,SetEstadoReg]=useState(false);
    const CambiarRegitroEstado=()=>{
       SetEstadoReg(!estadoReg);
          
    }
    return (
        <>
        <NavbarConglomerado/>
        <div className="container-list-socios">
             <div className="row">
                <div className="col-8">
                    Socios Registrados
                </div>
                <div className="col-4" >
                    <div className="row">
                        <div className="col-7">
                        <div className="mb-3 input-form-socios ">
                        <input type="text" name="dni" className="form-control" id="FormControlInput1Search" placeholder="Nº Documento"/>
                        </div>
                        </div>
                        <div className="col-4">
                        <button onClick={toggleShow} className="btnAddsocio">
                        Consultar
                    </button>
                        <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
                            <MDBModalDialog>
                            <MDBModalContent>
                                <MDBModalHeader>
                                <MDBModalTitle>Datos Socio</MDBModalTitle>
                                <MDBBtn
                                    className="btn-close"
                                    color="none"
                                    onClick={toggleShow}
                                ></MDBBtn>
                                </MDBModalHeader>
                                <MDBModalBody>
                                    <FormRegistroSocios/>
                                </MDBModalBody>

                                <MDBModalFooter>
                                <MDBBtn color="secondary" onClick={toggleShow}>
                                    Close
                                </MDBBtn>
                                <MDBBtn>Save changes</MDBBtn>
                                </MDBModalFooter>
                            </MDBModalContent>
                            </MDBModalDialog>
                        </MDBModal>
                        </div>
                    </div>
                    
                </div>
                <div>
                {
                    estadoReg? <FormRegistroSocios/>:null
                }
                </div>
                
                </div>
        </div>
        
      
   
        </>
        
           
          
    );

}

export default ListSociosConglomerados;