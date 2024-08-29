import React, { useEffect, useState } from "react";
import createAxiosInstance from "../../services/AxiosInstance";
import { ListGroup } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";

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
        firstName:string;
        lastName: string;
    };
    reviewText: string; // Review content
}


export const RecentReviews: React.FC = () => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const { token } = useAuth();
    const axiosInstance = createAxiosInstance(token);

    useEffect(() => {
        const fetchRecentReviews = async () => {
            try {
                const response = await axiosInstance.get('/reviews/latest');
                setReviews(response.data);
                setLoading(false);
                console.log(response.data);
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
    return (
        <>
            <h2>Most Recent Reviews</h2>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <ListGroup>
                    {reviews.map((review) => (
                        <ListGroup.Item key={review.review_id}> {/* Updated key */}
                            <strong>{review.hotel.name}</strong> - {review.stars} Stars<br />
                            {review.reviewText} <br />
                            <small>{formatDate(review.createdAt)}</small><br />
                            <small>By: {review.user.firstName} {review.user.lastName}</small>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </>
    );
};