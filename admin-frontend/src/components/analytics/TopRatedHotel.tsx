import React, { useEffect, useState } from "react";
import createAxiosInstance from "../../services/AxiosInstance"; // Ensure axiosInstance is imported
import { Card } from "react-bootstrap";
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
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching the top-rated hotel:", error);
                setLoading(false);
            }
        };

        fetchTopRatedHotel();
    }, []);

    return (
        <>
            <h2>Highest Rated Hotel</h2>
            {loading ? (
                <div>Loading...</div>
            ) : hotel ? (
                <Card>
                    <Card.Body>
                        <Card.Title>{hotel.name}</Card.Title>
                        <Card.Text>Rating: {hotel.rating}</Card.Text>
                        <Card.Text>Address: {hotel.address}</Card.Text>
                        <img src = {hotel.image}></img>
                    </Card.Body>
                </Card>
            ) : (
                <div>No hotel data available.</div>
            )}
        </>
    );
};
