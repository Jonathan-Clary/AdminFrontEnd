import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import './CustomToast.css'
import { useGlobalContext } from '../../contexts/GlobalContext';

interface CustomToastProps {
    bg?: string;
}

export const CustomToast: React.FC<CustomToastProps> = ({bg}) => {
    const {handleToastHide, toastMessage, showToast} = useGlobalContext();

    return (
        <ToastContainer position="top-end" className="p-3">
            {toastMessage && (
                <Toast bg={bg} onClose={() => handleToastHide()} show={showToast} delay={3000} autohide className="custom-toast">
                    <Toast.Body>{toastMessage}</Toast.Body>
                </Toast>
            )}
        </ToastContainer>
    );
};