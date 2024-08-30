import React, { useEffect, useState } from "react";
import createAxiosInstance from "../../services/AxiosInstance";
import { Carousel, Card } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import './RecentReviews.css'; // Import custom CSS

interface Review {
    review_id: string;  // Primary key
    stars: number;      // Rating (stars)
    createdAt: string; // Timestamp
    hotel: {            // Foreign key relationship
        hotel_id: string;
        name: string;
    };
    user: {             // Foreign key relationship
        user_id: string;
        firstName: string;
        lastName: string;
    };
    reviewText: string; // Review content
}

export const RecentReviews: React.FC = () => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [index, setIndex] = useState(0); // State to control carousel
    const { token } = useAuth();
    const axiosInstance = createAxiosInstance(token);

    useEffect(() => {
        const fetchRecentReviews = async () => {
            try {
                const response = await axiosInstance.get('/reviews/latest');
                setReviews(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching recent reviews:", error);
                setLoading(false);
            }
        };

        fetchRecentReviews();
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return isNaN(date.getTime())
            ? "Invalid Date"
            : `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    };

    const handleSelect = (selectedIndex: number) => {
        setIndex(selectedIndex);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % reviews.length);
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(interval); // Cleanup on component unmount
    }, [reviews.length]);

    return (
        <>
            <h2>Most Recent Reviews</h2>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="this-carousel">
                <Carousel
                    activeIndex={index}
                    onSelect={handleSelect}
                    interval={null} // Disable automatic transitions since we handle them manually
                >
                    {reviews.map((review, idx) => (
                        <Carousel.Item key={review.review_id}>
                            <Card className="review-card text-center shadow-lg p-3 mb-5 bg-white rounded mx-auto">
                                <Card.Body>
                                    <Card.Title>{review.hotel.name} - {review.stars} Stars</Card.Title>
                                    <Card.Text>{review.reviewText}</Card.Text>
                                    <small>{formatDate(review.createdAt)}</small><br />
                                    <small>By: {review.user.firstName} {review.user.lastName}</small>
                                </Card.Body>
                            </Card>
                        </Carousel.Item>
                    ))}
                </Carousel>
                </div>
            )}
        </>
    );
};
