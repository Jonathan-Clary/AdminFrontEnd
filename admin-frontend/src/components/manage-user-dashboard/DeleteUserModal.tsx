import { Modal, Container, Button } from "react-bootstrap";


interface DeleteUserModalProps {
    show: boolean;
    setShow: (s: boolean) => void;
    deleteUser: () => void;
}

export const DeleteUserModal: React.FC<DeleteUserModalProps> = ({ show, setShow, deleteUser  }) => {

    return (
        <>
           <Container>
            <Modal size="lg" backdrop="static" centered show={show} onHide={() => setShow(false)} >
                <Modal.Header closeButton>
                    <Modal.Title><i className="bi bi-exclamation-octagon-fill text-danger"></i> Warning</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h6 className="fs-4 text-center">{`Are you sure you want to delete this user?`}</h6>
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-between">
                    <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
                    <Button variant="danger"  onClick={() => { deleteUser(); setShow(false); }}>Proceed</Button>
                </Modal.Footer>
            </Modal>
        </Container>
        </>
    )
}