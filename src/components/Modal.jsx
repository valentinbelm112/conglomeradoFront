import React from 'react';

const ModalZoom = ({ isOpen, onClose, imageSrc }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <img src={imageSrc} alt="Imagen en zoom" />
      </div>
    </div>
  );
};

export default ModalZoom;