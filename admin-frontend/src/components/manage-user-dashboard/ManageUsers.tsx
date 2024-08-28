import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { UserTable } from "./UserTable.tsx/UserTable";

export const ManageUsers: React.FC = () => {
    const navigate = useNavigate();
    return (
        <>
         <Button onClick={() => navigate('/')}> Back </Button>
        <h1>MANAGE USERS</h1>
        <UserTable/>
        </>
    )
}