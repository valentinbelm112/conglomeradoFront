import React, { useState } from 'react';
import ModalImagesConglomerado from '../components/ModalImagesConglomerado';
import ImageUploader from '../components/ImageUploader';
function App2() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      
      <button onClick={openModal}>Abrir Ventana Emergente</button>
      <ModalImagesConglomerado
  isOpen={modalIsOpen}
  onClose={closeModal}
  components={[
    <ImageUploader />,
    <ImageUploader />,
    <ImageUploader />,
  ]}
/>
    </div>
  );
}

export default App2;