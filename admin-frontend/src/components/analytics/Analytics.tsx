import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { SupportTicketAnalytics } from "../support-ticket-dashboard/ticket-overview/analytics/SupportTicketAnalytics";
import { SupportTicketInterface } from "../../interfaces/SuppportTicketInterface";
import createAxiosInstance from "../../services/AxiosInstance";
import { useAuth } from "../../contexts/AuthContext";
import { TopRatedHotel } from "./TopRatedHotel";
import { RecentReviews } from "./RecentReviews";
export const Analytics: React.FC = () => {
    const navigate = useNavigate();
    const [supportTickets, setSupportTickets] = useState<SupportTicketInterface[]>([]);
    const [loading, setLoading] = useState(true);
    const { token } = useAuth();
    const axiosInstance = createAxiosInstance(token);
    
    useEffect(() => {
        const fetchSupportTickets = async () => {
            try {
                const response = await axiosInstance.get('/support/all'); 
                setSupportTickets(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching support tickets:", error);
                setLoading(false); 
            }
        };

        fetchSupportTickets();
    }, [axiosInstance]);

    return (
        <>
            <Button onClick={() => navigate('/')}> Back </Button>
            <h1>ANALYTICS</h1>

            {/* Support Tickets Analytics Section */}
            <h2>Support Tickets by Type</h2>
            <SupportTicketAnalytics supportTickets={supportTickets} loading={loading} />
            <TopRatedHotel></TopRatedHotel>
            <RecentReviews/>
            {/* Other sections like Top Rated Hotels and Recent Reviews */}
        </>
    );
};