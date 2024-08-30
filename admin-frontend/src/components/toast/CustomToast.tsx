import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import './CustomToast.css'
import { useGlobalContext } from '../../contexts/GlobalContext';

interface CustomToastProps {
    toastBg?: string;
}

function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

export const CustomToast: React.FC<CustomToastProps> = ({ toastBg }) => {
    const {handleToastHide, toastMessage, showToast} = useGlobalContext();

    return (
        <ToastContainer position="top-end" className="p-3">
        <Toast bg={toastBg} onClose={() => handleToastHide()} show={showToast} delay={3000} autohide>
         <Toast.Header>
             <strong className="me-auto">{capitalizeFirstLetter(toastBg!)}</strong>
             <small className="text-muted">Just Now</small>
         </Toast.Header>
         <Toast.Body>{toastMessage}</Toast.Body>
         </Toast>
     </ToastContainer>
    );
};