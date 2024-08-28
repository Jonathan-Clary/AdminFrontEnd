import { Button, Card, Container } from "react-bootstrap"
import { useNavigate } from "react-router-dom";

export const AdminDashboard: React.FC = () => {
    const navigate = useNavigate();


    return (
        <>
            <Container className="mt-5 d-flex justify-content-center">
                <Card className="shadow text-center m-4" style={{ width: '18rem' }}>
                    <Card.Img variant="top" src='images/manage-users-image.png'  loading="lazy"/>
                    <Card.Body>
                        <Card.Title>Manage Employees</Card.Title>
                        <Card.Text>

                        </Card.Text>
                        <Button variant="primary" onClick={() => navigate('/users')}>View All</Button>
                    </Card.Body>
                </Card>

                <Card className="shadow text-center m-4" style={{ width: '18rem' }}>
                    <Card.Img variant="top" src='images/support-image.jpg' loading="lazy" />
                    <Card.Body>
                        <Card.Title>Support Tickets</Card.Title>
                        <Card.Text>

                        </Card.Text>
                        <Button variant="primary" onClick={() => navigate('/support-tickets')}>View All</Button>
                    </Card.Body>
                </Card>

                <Card className="shadow text-center m-4" style={{ width: '18rem' }}>
                    <Card.Img variant="top" src='images/analytics-image.png'  loading="lazy"/>
                    <Card.Body>
                        <Card.Title>View Analytics</Card.Title>
                        <Card.Text>

                        </Card.Text>
                        <Button variant="primary" onClick={() => navigate('/analytics')}>View All</Button>
                    </Card.Body>
                </Card>
            </Container>
            <Container>
            </Container>
        </>
    )
}