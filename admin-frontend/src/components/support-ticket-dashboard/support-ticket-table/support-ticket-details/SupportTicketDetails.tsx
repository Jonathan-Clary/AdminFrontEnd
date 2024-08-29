import { Modal, Card, Button, Container, Form, Col, Row, Badge, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { SupportTicketInterface } from "../../../../interfaces/SuppportTicketInterface";
import { format } from "date-fns";
import './SupportTicketDetails.css'
import createAxiosInstance from "../../../../services/AxiosInstance";
import { useAuth } from "../../../../contexts/AuthContext";
import { useGlobalContext } from "../../../../contexts/GlobalContext";
import { useEffect, useRef, useState } from "react";
import { DeleteConfirmationModal } from "./modals/DeleteConfirmationModal";
import { UserInterface } from "../../../../interfaces/UserInterface";



interface SupportTicketDetailsProps {
    setShow: (show: boolean) => void;
    show: boolean;
    ticket: SupportTicketInterface;
}


export const SupportTicketDetails: React.FC<SupportTicketDetailsProps> = ({ setShow, show, ticket }) => {
    const { token } = useAuth();
    const axiosInstance = createAxiosInstance(token);
    const { setTicketUpdated, handleToastShow } = useGlobalContext();
    const [showResolveNoteModal, setShowResolveNoteModal] = useState<boolean>(false);
    const [note, setNote] = useState<string>('');
    const [tempNote, setTempNote] = useState<string>("");
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false);
    const [user, setUser] = useState<UserInterface | null>(null);

    const handleResolve = async (note: string) => {
        try {
            console.log("note" + note);
            console.log("ticket id: " + ticket.supportTicketId)
            await axiosInstance.patch(`/support/${ticket.supportTicketId}`, note,
                { headers: { 'Content-Type': 'text/plain' } }
            );
            setTicketUpdated();
            handleToastShow(`Support Ticket: ${ticket.supportTicketId} resolved successfuly!`, 'success');
        } catch (error) {
            handleToastShow(`Support Ticket: ${ticket.supportTicketId} resolved failed :(`, 'danger');
            console.error('Error Resolving Ticket')
        }
    }

    const getUserDetails = async () => {
        try {
            const response = await axiosInstance.get(`/user/${ticket.userId}`);
            setUser(response.data);
        } catch (error) {
            console.log('Error fetching user details');
        }
    }


    const capitalizeFirstLetter = (str: string): string => {
        if (str.length === 0) return str;
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

    const handleNote = () => {
       setNote(prevNote => {
            const updatedNote = tempNote;
            handleResolve(updatedNote);
            return updatedNote;
        });
    };


    useEffect(() => {
        getUserDetails();
    }, [])




    return (
        <>

            <Modal show={show} onHide={() => setShow(false)} size="xl" centered>
                {!showResolveNoteModal && !showDeleteConfirmation &&
                    <>
                        <Modal.Header closeVariant="white" closeButton className="bg-dark text-white">
                            <Modal.Title><i className="bi bi-info-circle"></i> Support Ticket Details</Modal.Title>
                        </Modal.Header>
                        <Container className="d-flex justify-content-between align-items-center mt-2">
                            {ticket.status === 'PENDING' ? <h3><Badge bg="primary">{capitalizeFirstLetter(ticket.status)}</Badge></h3> : <h3><Badge bg="success">{capitalizeFirstLetter(ticket.status)}</Badge></h3>}
                            {ticket.status !== 'PENDING' ? <Button variant="danger" onClick={() => setShowResolveNoteModal(true)}>
                                <i className="bi bi-exclamation-circle"></i> Unresolve Ticket
                            </Button> : <Button variant="success" onClick={() => setShowResolveNoteModal(true)}>
                                <i className="bi bi-check-circle"></i> Resolve Ticket
                            </Button>
                            }

                        </Container>

                        <Modal.Body className="bg-light">
                            <Card className="shadow-lg border-0">
                                <Card.Body>
                                    <Container>
                                        <Form className="mt-2">
                                            <h3>Ticket Information</h3>
                                            <hr className="my-3 section-divider" />
                                            <Row className="mb-3">
                                                <Col md={6}>
                                                    <Form.Group controlId="supportTicketId">
                                                        <Form.Label className="font-weight-bold text-dark">Support Ticket ID:</Form.Label>
                                                        <span className="text-muted ms-2">{ticket.supportTicketId}</span>
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            <hr className="my-3 divider" />

                                            <Row className="mb-3">
                                                <Col md={12}>
                                                    <Form.Group controlId="description">
                                                        <Form.Label className="font-weight-bold text-dark">Description:</Form.Label>
                                                        <div className="text-muted ms-2" style={{ whiteSpace: 'pre-wrap', lineHeight: '1.5' }}>
                                                            {ticket.description}
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            <hr className="my-3 divider" />

                                            <Row className="mb-3">
                                                <Col md={6}>
                                                    <Form.Group controlId="status">
                                                        <Form.Label className="font-weight-bold text-dark">Status:</Form.Label>
                                                        <span className="text-muted ms-2">{ticket.status}</span>
                                                    </Form.Group>
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Group controlId="type">
                                                        <Form.Label className="font-weight-bold text-dark">Type:</Form.Label>
                                                        <span className="text-muted ms-2">{ticket.type}</span>
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            <hr className="my-3 divider" />

                                            <Row className="mb-3">
                                                <Col md={6}>
                                                    <Form.Group controlId="createdDate">
                                                        <Form.Label className="font-weight-bold text-dark">Created Date:</Form.Label>
                                                        <span className="text-muted ms-2">{ticket.createdAt ? format(new Date(ticket.createdAt), 'MM/dd/yyyy @ hh:mm a') : 'N/A'}</span>
                                                    </Form.Group>
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Group controlId="resolvedDate">
                                                        <Form.Label className="font-weight-bold text-dark">Resolved Date:</Form.Label>
                                                        <span className="text-muted ms-2">{ticket.resolvedDate ? format(new Date(ticket.resolvedDate), 'MM/dd/yyyy @ hh:mm a') : 'N/A'}</span>
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            <hr className="my-3 section-divider" />

                                            <Row className="mb-3">
                                                <Col md={12}>
                                                    <h3 className="mb-1 mt-2">User Info</h3>
                                                    <hr className="my-3 section-divider" />
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Group controlId="userId">
                                                        <Form.Label className="font-weight-bold text-dark">User ID:</Form.Label>
                                                        <span className="text-muted ms-2">{user?.userId ? user.userId : 'N/A'}</span>
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            <hr className="my-3 divider" />

                                            <Row className="mb-3">
                                                <Col md={6}>
                                                    <Form.Group controlId="firstName">
                                                        <Form.Label className="font-weight-bold text-dark">First Name:</Form.Label>
                                                        <span className="text-muted ms-2">{user?.firstName ? user.firstName : 'N/A'}</span>
                                                    </Form.Group>
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Group controlId="lastName">
                                                        <Form.Label className="font-weight-bold text-dark">Last Name:</Form.Label>
                                                        <span className="text-muted ms-2">{user?.lastName ? user.lastName : 'N/A'}</span>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <hr className="my-3 divider" />
                                            <Row className="mb-3">
                                                <Col md={12}>
                                                    <Form.Group controlId="email">
                                                        <Form.Label className="font-weight-bold text-dark">Email:</Form.Label>
                                                        <span className="text-muted ms-2">{user?.email ? user.email : 'N/A'}</span>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <hr className="my-3 divider" />


                                            <Row className="mb-3">
                                                <Col md={12}>
                                                    <h3 className="mb-1 mt-2">Admin Notes</h3>
                                                    <hr className="my-3 section-divider" />
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Group controlId="Notes">
                                                        <Form.Label className="font-weight-bold text-dark">Note:</Form.Label>
                                                        <div className="text-muted ms-2" style={{ whiteSpace: 'pre-wrap', lineHeight: '1.5' }}>
                                                            {ticket.note?.text ? ticket.note.text : 'none'}
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <hr className="my-3 divider" />
                                        </Form>
                                    </Container>
                                </Card.Body>
                            </Card>
                        </Modal.Body>
                        <Modal.Footer className="bg-light d-flex justify-content-between">
                            <Button variant="danger" onClick={() => setShowDeleteConfirmation(true)}><i className="bi bi-trash3-fill"></i></Button>
                            <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
                        </Modal.Footer>

                    </>
                }
            </Modal>

            <Modal show={showResolveNoteModal} onHide={() => setShowResolveNoteModal(false)} centered backdrop="static" className="text-center">
                <Modal.Header closeButton className="text-center">
                    <Modal.Title className="fw-bold bg-"><i className="bi bi-journal-plus"></i> Add Notes</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    <FormGroup className="mb-3">
                        <FormLabel className="text-dark">Note Description</FormLabel>
                        <FormControl
                            as="textarea"
                            rows={3}
                            name='description'
                            value={tempNote}
                            onChange={(e) => setTempNote(e.target.value)}

                        />
                    </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowResolveNoteModal(false)}>
                        Cancel
                    </Button>
                    {ticket.status !== 'PENDING' ? <Button disabled variant="danger" onClick={() => handleNote()}>
                        Unresolve
                    </Button>
                        :
                        <Button variant="success" onClick={() => handleNote()}>
                            Resolve
                        </Button>}
                </Modal.Footer>
            </Modal>

            <DeleteConfirmationModal show={showDeleteConfirmation} setShow={setShowDeleteConfirmation} selectedTicketId={ticket.supportTicketId} closeDetailModal={setShow} />
        </>


    )
}