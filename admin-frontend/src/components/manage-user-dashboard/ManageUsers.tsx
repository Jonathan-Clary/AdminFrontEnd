import { Button, Container } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { UserTable } from "./user-table/UserTable";

export const ManageUsers: React.FC = () => {
    const navigate = useNavigate();
    return (
        <>
            <Button onClick={() => navigate('/')}> Back </Button>

            <Container>
               
                <UserTable />
            </Container>
        </>
    )
}