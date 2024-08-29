import { Modal, Offcanvas } from "react-bootstrap"
import { UserInterface } from "../../../../interfaces/UserInterface";

interface UserDetailsModalProps {
    show: boolean;
    setShow: (show: boolean) => void;
    user: UserInterface;
}

export const UserDetailsModal: React.FC<UserDetailsModalProps> = ({ show, setShow, user }) => {
    return (
        <>
            <Modal animation show={show} fullscreen='true' onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    Modal body content

                </Modal.Body>
            </Modal>
        </>
    )
}