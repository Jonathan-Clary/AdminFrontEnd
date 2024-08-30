import { useState } from "react";
import { Button, Card, Col, Container, Form, Modal, Row } from "react-bootstrap";
import createAxiosInstance from "../../services/AxiosInstance";
import { useAuth } from "../../contexts/AuthContext";
import { useGlobalContext } from "../../contexts/GlobalContext";

interface AddUserModalProps {
    show: boolean;
    setShow: (s: boolean) => void;
    refreshUsers: () => void;
}

export const AddUserModal: React.FC<AddUserModalProps> = ({ show, setShow, refreshUsers }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { token, user } = useAuth();
    const axiosInstance = createAxiosInstance(token);
    const {handleToastShow} = useGlobalContext();

    const createUser = async () => {
        try {
            await axiosInstance.post('/master/admin', {firstName, lastName, email, password});
            handleToastShow('Successfully Created Admin!', 'success');
            refreshUsers();
         
        } catch (error) {
            console.log(error);
            handleToastShow('Failed to Create Admin!', 'danger');
         
        }
    }
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createUser();
        console.log({ firstName, lastName, email, password });
    
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setShow(false);
    };


    return (
        <>
            <Modal size="lg" animation show={show} fullscreen="true" onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Create Admin</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Card className="shadow-lg border-0">
                    <Card.Body>
                        <Container>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formFirstName">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter first name"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formLastName">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter last name"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </Container>
                    </Card.Body>
                </Card>
            </Modal.Body>
        </Modal>
        </>
    )
}