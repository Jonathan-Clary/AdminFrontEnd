import React, { useEffect, useState } from "react";
import createAxiosInstance from "../../services/AxiosInstance"; // Ensure axiosInstance is imported
import { Card, Button, Spinner, Col, Row, Container } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";

interface Hotel {
    id: string;
    name: string;
    rating: number;
    address: string;
    image: string;
}

export const TopRatedHotel: React.FC = () => {

    const [hotel, setHotel] = useState<Hotel | null>(null);
    const [loading, setLoading] = useState(true);
    const { token } = useAuth();
    const axiosInstance = createAxiosInstance(token);
    
    useEffect(() => {
        const fetchTopRatedHotel = async () => {
            try {
                const response = await axiosInstance.get('/reviews/hotel/best');
                setHotel(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching the top-rated hotel:", error);
                setLoading(false);
            }
        };

        fetchTopRatedHotel();
    }, []);

    return (
        <>
            <h2 className="text-center mt-4">Highest Rated Hotel</h2>
            {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
                    <Spinner animation="border" variant="primary" />
                </div>
            ) : hotel ? (
                <Container className="my-4">
                    <Row className="justify-content-center">
                        <Col md={8}>
                        <Card 
    className="shadow-lg" 
    style={{ 
        borderRadius: '15px', 
        overflow: 'hidden', 
        transition: 'transform 0.3s ease, box-shadow 0.3s ease', 
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // softer shadow
        cursor: 'pointer' // change cursor to pointer on hover
    }}
    onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = 'scale(1.02)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
    }}
    onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    }}
>
                            <Card.Img variant="top" src={hotel.image} alt={hotel.name} style={{ height: '90%', width: '90%', objectFit: 'fill' }} className= {'mx-auto d-block'}
/>
                                <Card.Body>
                                    <Card.Title className="text-center" style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>
                                        {hotel.name}
                                    </Card.Title>
                                    <Card.Text className="text-center text-muted" style={{ fontSize: '1.2rem' }}>
                                        {hotel.address}
                                    </Card.Text>
                                    <div className="text-center">
                                        <Button variant="outline-primary" disabled style={{ fontSize: '1.2rem', padding: '0.5rem 2rem' }}>
                                            {hotel.rating} ★
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            ) : (
                <div className="text-center">No hotel data available.</div>
            )}
        </>
    );
};

