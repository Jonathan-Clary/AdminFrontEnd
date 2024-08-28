import { Modal, Button } from "react-bootstrap";

interface ResolveNoteMoalProps {
   
   
}
// MOVE FROM DETAILS TO SEP COMP

export const ResolveNoteModal: React.FC<ResolveNoteMoalProps> = ({  }) => {


    return (
        <Modal centered  >
            <Modal.Dialog>
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Modal body text goes here.</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary">Close</Button>
                    <Button variant="primary">Save changes</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </Modal>
    );
}