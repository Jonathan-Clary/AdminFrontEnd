import { Card, Container, Table } from "react-bootstrap"
import { UserInterface } from "../../../interfaces/UserInterface"
import { useEffect, useState } from "react";
import createAxiosInstance from "../../../services/AxiosInstance";
import { useAuth } from "../../../contexts/AuthContext";
import { UserDetailsModal } from "./user-details-modal/UserDetailsModal";

export const UserTable: React.FC = () => {
    const [userList, setUserList] = useState<UserInterface[] | null>(null);
    const { token } = useAuth();
    const axiosInstance = createAxiosInstance(token);
    const [selectedUser, setSelectedUser] = useState<UserInterface>();
    const [showUserDetails, setShowUserDetails] = useState<boolean>(false);

    const getAllAdmins = async () => {
        try {
            const response = await axiosInstance.get('/master/admin');
            console.log(response)
            setUserList(response.data)
        } catch (error) {
            console.log(error);
        }
    }


    const handleRowClick = (index: number) => {
        const selectUser = userList![index];
        console.log("Row clicked:", index);
        if (selectUser) {
            setSelectedUser(selectUser);
            setShowUserDetails(true);
        }
    };


    useEffect(() => {
        getAllAdmins();
    }, [])


    return (
        <Container>
            <Card>
                <Card.Header className="text-center">
                    <h4 className="fw-bold">Admin Accounts</h4>
                </Card.Header>
                <Card.Body>
                    <Table responsive hover striped bordered className="shadow">
                        <thead className="table-dark">
                            <tr>
                                <th> ID </th>
                                <th> First Name </th>
                                <th> Last Name </th>
                                <th> Email </th>
                            </tr>
                        </thead>
                        <tbody>
                            {userList?.map((user, index) => (
                                <tr className='clickable-row' key={index} onClick={() => handleRowClick(index)} >
                                    <td>{user.adminId}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

            {selectedUser && (
                <UserDetailsModal show={showUserDetails} setShow={setShowUserDetails} user={selectedUser} />
            )}

        </Container>

    )
}