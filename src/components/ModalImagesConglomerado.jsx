import React, { useState } from 'react';
import Modal from 'react-modal';
import "./styles/ModalImagesConglomerado.scss"
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close"; // Importa el ícono de "X"
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const ModalImagesConglomerado = ({ isOpen, onClose, components }) => {
   const [completedSections, setCompletedSections] = useState([]);
  const [currentSection, setCurrentSection] = useState(0);
  const totalSections = components.length;
  const progress = (currentSection + 1) / totalSections * 100; // Calcula el progreso en porcentaje
  const handleNext = () => {
   
    if (currentSection < totalSections - 1) {
      setCurrentSection(currentSection + 1);
      if (completedSections.includes(currentSection)) {
        setCompletedSections(completedSections.filter((index) => index !== currentSection));
      } else {
        setCompletedSections([...completedSections, currentSection]);
      }
    }
  };

  
  const handleSectionClick = (sectionIndex) => {
  
    console.log(sectionIndex + "seccion")
   
      setCompletedSections([...completedSections, sectionIndex]);

    
  };


  const handlePrevious = (sectionIndex) => {
  
    const nuevoContador = currentSection - 1;
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      //console.log("DDDDw" + nuevoContador)
      if (completedSections.includes(nuevoContador)) {
        setCompletedSections(completedSections.filter((index) => index !== nuevoContador));
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      contentLabel="Ventana emergente"
      style={{
        content: {
          maxWidth: '700px', // Define el ancho máximo deseado
          margin: 'auto',    // Centra la ventana emergente horizontalmente
          zIndex: '200000',
          height:'98.5%'
        }
      }}
    >
      {/* Botón "X" para cerrar el modal */}
      <button
        className="close-button"
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '5px',
          right: '5px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        <CloseIcon />
      </button>
      <style>
        y
      </style>

      {/* Barra de progreso en la parte superior */}
      <div className="progress-container">
      <div className="icons-container-upload-images">
        {/* Coloca íconos en la parte superior de la barra de progreso */}
        {Array.from({ length: totalSections }, (_, index) => (
          <div
            key={index}
            className={`icon ${index === currentSection ? "current" : ""}`}
           
          >
            {completedSections.includes(index) ? (
              <CheckIcon className="check-icon" /> // Muestra el ícono de "check" si está completado
            ) : (
              <EditIcon className="edit-icon" /> // Muestra el ícono de "edit" si no está completado
            )}
          </div>
        ))}
      </div>
      <progress value={progress} max="100"></progress>
    </div>
      <div style={{height:'87%'}}>
        {components[currentSection]}
      </div>

      {/* Botones de siguiente y anterior en la parte inferior derecha */}
      <div style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
        <button onClick={handlePrevious} disabled={currentSection === 0}  style={{margin:'5px',cursor:'pointer'}} className='btn'>
        <ArrowBackIosIcon/>
          <label htmlFor="" style={{fontSize:`11px`,cursor:'pointer'}} >Anterior</label>
          
        </button>

        <button onClick={handleNext} disabled={currentSection === totalSections - 1} className='btn' style={{background:' #00bcd4',cursor:'pointer'}}>
          <label htmlFor="" style={{fontSize:`11px`,cursor:'pointer'}}>Siguiente</label>
         <NavigateNextIcon/>
        </button>
      </div>
    </Modal>
  );
};

export default ModalImagesConglomerado;