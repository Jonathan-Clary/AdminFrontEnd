import { Modal, Card, Button, Container, Form, Col, Row } from "react-bootstrap";
import { SupportTicketInterface } from "../../../../interfaces/SuppportTicketInterface";
import { format } from "date-fns";
import './SupportTicketDetails.css'
import createAxiosInstance from "../../../../services/AxiosInstance";
import { useAuth } from "../../../../contexts/AuthContext";
import { useGlobalContext } from "../../../../contexts/GlobalContext";

interface SupportTicketDetailsProps {
    setShow: (show: boolean) => void;
    show: boolean;
    ticket: SupportTicketInterface;
}


export const SupportTicketDetails: React.FC<SupportTicketDetailsProps> = ({ setShow, show, ticket }) => {
    const { token } = useAuth();
    const axiosInstance = createAxiosInstance(token);
    const { setTicketUpdated  } = useGlobalContext();

    const handelResolve = async () => {
        try {
            console.log("ticket id: " + ticket.supportTicketId)
            await axiosInstance.patch(`/admin/support/resolve/${ticket.supportTicketId}`, "resolved",
                { headers: {'Content-Type': 'text/plain'}}
            );
            setTicketUpdated();
           
        } catch (error) {
            console.error('Error Resolving Ticket')
        }
    }

    // Convert date from milliseconds to Date
    const convertToDate = (timestamp: number) => {
        const date = new Date(timestamp);
        return format(date, 'MMMM d, yyyy @ hh:mm a');
    };
    return  (
        <Modal show={show} onHide={() => setShow(false)} size="lg" centered className="text-center">
            <Modal.Header closeVariant="white" closeButton className="bg-dark text-white">
                <Modal.Title>Support Ticket Details</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-dark">
                <Card className="shadow-lg border-dark">
                    <Card.Body className="bg-dark">
                        <Container>
                            <Form>
                                <Row className="mb-3">
                                    <Col md={6}>
                                        <Form.Group controlId="supportTicketId">
                                            <Form.Label className="form-label">Support Ticket ID</Form.Label>
                                            <Form.Control type="text" value={ticket.supportTicketId} readOnly className="bg-light border-0" />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="userId">
                                            <Form.Label>User ID</Form.Label>
                                            <Form.Control type="text" value={ticket.userId} readOnly className="bg-light border-0" />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row className="mb-3">
                                    <Col md={6}>
                                        <Form.Group controlId="firstName">
                                            <Form.Label>First Name</Form.Label>
                                            <Form.Control type="text" value={ticket.firstName} readOnly className="bg-light border-0" />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="lastName">
                                            <Form.Label>Last Name</Form.Label>
                                            <Form.Control type="text" value={ticket.lastName} readOnly className="bg-light border-0" />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row className="mb-3">
                                    <Col md={12}>
                                        <Form.Group controlId="email">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type="email" value={ticket.email} readOnly className="bg-light border-0" />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row className="mb-3">
                                    <Col md={12}>
                                        <Form.Group controlId="description">
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control as="textarea" rows={3} value={ticket.description} readOnly className="bg-light border-0" />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row className="mb-3">
                                    <Col md={6}>
                                        <Form.Group controlId="status">
                                            <Form.Label>Status</Form.Label>
                                            <Form.Control type="text" value={ticket.status} readOnly className="bg-light border-0" />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="type">
                                            <Form.Label>Type</Form.Label>
                                            <Form.Control type="text" value={ticket.type} readOnly className="bg-light border-0" />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row className="mb-3">
                                    <Col md={6}>
                                        <Form.Group controlId="createdDate">
                                            <Form.Label>Created Date</Form.Label>
                                            <Form.Control type="text" value={convertToDate(ticket.createdDate)} readOnly className="bg-light border-0" />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="resolvedDate">
                                            <Form.Label>Resolved Date</Form.Label>
                                            <Form.Control type="text" value={ticket.resolvedDate ? convertToDate(ticket.resolvedDate) : 'Not resolved yet'} readOnly className="bg-light border-0" />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Button variant="success" onClick={() => handelResolve()}>
                                    <i className="bi bi-check-circle"></i> Resolve Ticket
                                </Button>
                            </Form>
                        </Container>
                    </Card.Body>
                </Card>
            </Modal.Body>
        </Modal>
    )
}