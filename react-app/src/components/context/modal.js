
import ReactDOM from 'react-dom';
import './modal.css';
import React, { useContext, useRef, useState, useEffect } from 'react';


const ModalContext = React.createContext();


export function ModalProvider({ children }) {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  }, []);


  return (
    
    <div>
      <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
      <div ref={modalRef} />
    </div>
  );
}

export function Modal({ onClose, children }) {
  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id='modal'>
      <div id='modal-background' onClick={onClose} />
      <div id='modal-content'>{children}</div>
    </div>,
    modalNode
  );
}
