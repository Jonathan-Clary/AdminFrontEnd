import { Modal, Button, Container } from "react-bootstrap"
import { useAuth } from "../../../../../contexts/AuthContext";
import createAxiosInstance from "../../../../../services/AxiosInstance";
import { useGlobalContext } from "../../../../../contexts/GlobalContext";


interface DeleteConfirmationModalPorps {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    selectedTicketId: string;
    closeDetailModal: (close: boolean) => void;
}

export const DeleteConfirmationModal: React.FC<DeleteConfirmationModalPorps> = ({ show, setShow, selectedTicketId, closeDetailModal }) => {
    const { token } = useAuth();
    const axiosInstance = createAxiosInstance(token);
    const { setTicketUpdated, handleToastShow } = useGlobalContext();

    const deleteSelectedTicket = async () => {
        try {
            await axiosInstance.delete(`/support/${selectedTicketId}`);
            handleToastShow(`Support Ticket deleted successfuly!`, 'success');
            handleClose();
            closeDetailModal(false);
            setTicketUpdated();
        } catch (error) {
            handleToastShow(`Support Ticket failed to delete`, 'danger');
        }
    }

    const handleClose = () => {
        setShow(false);
    }
    return (
        <Container>
            <Modal size="lg" backdrop="static" centered show={show} onHide={handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title><i className="bi bi-exclamation-octagon-fill text-danger"></i> Warning</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h6 className="fs-4 text-center">Are you sure you want to delete this support ticket?</h6>
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-between">
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="danger" onClick={deleteSelectedTicket}>Proceed</Button>
                </Modal.Footer>
            </Modal>
        </Container>

    )
}

