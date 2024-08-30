import { Card, Col, Container, Form, Modal, Row } from "react-bootstrap"
import { UserInterface } from "../../../../interfaces/UserInterface";

interface UserDetailsModalProps {
    show: boolean;
    setShow: (show: boolean) => void;
    user: UserInterface;
}

export const UserDetailsModal: React.FC<UserDetailsModalProps> = ({ show, setShow, user }) => {
    const notes = [];

  
    return (
        <>
            <Modal size="lg" animation show={show} fullscreen='true' onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card className="shadow-lg border-0">
                        <Card.Body>
                            <Container>
                                <Form className="mt-2">
                                    <h3>Admin Information</h3>
                                    <hr className="my-3 section-divider" />

                                    <Row className="mb-3">
                                        <Col>
                                            <Form.Group controlId="id">
                                                <Form.Label className="font-weight-bold text-dark">ID:</Form.Label>
                                                <span className="text-muted ms-2">{user.adminId}</span>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <hr className="my-3 divider" />

                                    <Row className="mb-3">
                                        <Col md={6}>
                                            <Form.Group controlId="id">
                                                <Form.Label className="font-weight-bold text-dark">Name:</Form.Label>
                                                <span className="text-muted ms-2">{`${user.firstName} ${user.lastName}`} </span>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <hr className="my-3 divider"/>

                                    <Row className="mb-3">
                                    <Col>
                                            <Form.Group controlId="id">
                                                <Form.Label className="font-weight-bold text-dark">Email:</Form.Label>
                                                <span className="text-muted ms-2">{user.email}</span>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <hr className="my-3 divider" />

                                    <Row className="mb-3">
                                        <Col>
                                            <Form.Group controlId="id">
                                                <Form.Label className="font-weight-bold text-dark">Note:</Form.Label>
                                                <span className="text-muted ms-2">{}</span>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <hr className="my-3 divider" />

                                    <Row className="mb-3">
                                        <Col>
                                            <Form.Group controlId="id">
                                                <Form.Label className="font-weight-bold text-dark">ID:</Form.Label>
                                                <span className="text-muted ms-2">{user.adminId}</span>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Form>
                            </Container>
                        </Card.Body>
                    </Card>
                </Modal.Body>
            </Modal>
        </>
    )
}