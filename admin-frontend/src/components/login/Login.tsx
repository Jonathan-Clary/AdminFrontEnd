import React, { useState } from 'react';
import { Button, Card, Container, FloatingLabel, Form } from 'react-bootstrap';
import './Login.css';
import { useAuth } from '../../contexts/AuthContext';

export const Login: React.FC = () => {

    const { login } = useAuth();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        await login(email, password);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };


    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <Card className="login-card shadow">
                <Card.Header className='login-card-header'>
                </Card.Header>
                <Form className="w-75 mx-auto d-flex flex-column justify-content-center align-items-center h-100" onSubmit={handleLogin}>
                    <h3 className="mb-4 mt-3">Login</h3>
                    <FloatingLabel controlId="floatingInput" label="Email" className="mb-3 w-100">
                        <Form.Control
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            required
                        />
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3 w-100">
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            required
                        />
                    </FloatingLabel>

                    <Button type="submit" className="w-50 mb-2" variant="primary">
                        Log In
                    </Button>

                    
                </Form>
            </Card>
        </Container>

    );
};
