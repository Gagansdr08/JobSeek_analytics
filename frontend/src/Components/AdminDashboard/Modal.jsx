import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ children, onClose }) => {
    return ReactDOM.createPortal(
        <div style={modalStyle}>
            <div style={contentStyle}>
                <button onClick={onClose} style={closeButtonStyle}>X</button>
                {children}
            </div>
        </div>,
        document.getElementById("modal-root")
    );
};

const modalStyle = {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
};

const contentStyle = {
    background: '#fff',
    padding: '20px',
    borderRadius: '10px',
    position: 'relative',
    width: '50%',
};

const closeButtonStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'black',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer'
};

export default Modal;
