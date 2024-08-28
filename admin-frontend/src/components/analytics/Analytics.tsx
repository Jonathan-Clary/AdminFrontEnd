import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Analytics: React.FC = () => {
    const navigate = useNavigate();
    return (
        <>
            <Button onClick={() => navigate('/')}> Back </Button>
            <h1>ANALYTICS</h1>
        </>
    )
}