import { Card, Container, Form, Table } from "react-bootstrap"
import { UserInterface } from "../../../interfaces/UserInterface"
import { useEffect, useState } from "react";
import createAxiosInstance from "../../../services/AxiosInstance";
import { useAuth } from "../../../contexts/AuthContext";
import { UserDetailsModal } from "./user-details-modal/UserDetailsModal";
import { Global } from "recharts";
import { useGlobalContext } from "../../../contexts/GlobalContext";
import { DeleteUserModal } from "../DeleteUserModal";
import { AddUserModal } from "../AddUserModal";

interface UserTableProps {
    isButtonEnabled: boolean;
    setIsButtonEnabled: (enabled: boolean) => void;
    show: boolean;
    setShow: (s: boolean) => void;
    showAdd: boolean;
    setShowAdd: (s: boolean) => void;
}

export const UserTable: React.FC<UserTableProps> = ({ isButtonEnabled, setIsButtonEnabled,showAdd, setShowAdd,  show, setShow}) => {
    const [userList, setUserList] = useState<UserInterface[] | null>(null);
    const { token, user } = useAuth();
    const axiosInstance = createAxiosInstance(token);
    const [selectedUser, setSelectedUser] = useState<UserInterface>();
    const [showUserDetails, setShowUserDetails] = useState<boolean>(false);
    const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);
    const {handleToastShow} = useGlobalContext();

    const getAllAdmins = async () => {
        try {
            const response = await axiosInstance.get('/master/admin');
            console.log(response)
            setUserList(response.data)
            console.log(user?.adminId)
            const filteredList = response.data.filter((data: UserInterface) => data.adminId !== user?.adminId);
        
            setUserList(filteredList)
        } catch (error) {
            console.log(error);
        }
    }

    const deleteUser = async () => {
        try {
            console.log("t", selectedUser)
            await axiosInstance.delete(`master/admin/${selectedUser?.adminId}`);
            handleToastShow('Successfully Deleted Admin!', 'success');
            getAllAdmins();
        } catch (error) {
            console.log(error);
            handleToastShow('Failed to delete Admin!', 'danger');
        }
    };

    const handleRowClick = (index: number) => {
        const selectUser = userList![index];
        console.log("Row clicked:", index);
        if (selectUser) {
            setSelectedUser(selectUser);
            setShowUserDetails(true);
        }
    };

    const handleCheckboxClick = (index: number, e: React.MouseEvent<HTMLInputElement>) => {
        e.stopPropagation();
        const selectUser = userList![index];
        if (selectedRowIndex === index) {
            setSelectedRowIndex(null);
            setIsButtonEnabled(false);
            setSelectedUser(selectUser);
        } else {
            setSelectedRowIndex(index);
            setIsButtonEnabled(true);
            setSelectedUser(selectUser);
        }
    };


    useEffect(() => {
        getAllAdmins();
    }, [])



    return (
        <Container>
              <DeleteUserModal show={show} setShow={setShow} deleteUser={deleteUser}/>
              <AddUserModal show={showAdd} setShow={setShowAdd}  refreshUsers={getAllAdmins} />
            <Card>
                <Card.Header className="text-center">
                    <h4 className="fw-bold">Admin Accounts</h4>
                </Card.Header>
                <Card.Body>
                    <Table responsive hover striped bordered className="shadow">
                        <thead className="table-dark">
                            <tr>
                                <th></th>
                                <th>ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userList?.map((user, index) => (
                                <tr
                                    className="clickable-row"
                                    key={index}
                                    onClick={() => handleRowClick(index)}
                                    onChange={() => {}}
                                >
                                    <td>
                                        <Form.Check
                                            type="checkbox"
                                            checked={selectedRowIndex === index}
                                            onClick={(e) => handleCheckboxClick(index, e)}
                                            onChange={() => {}}
                                        />
                                    </td>
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
                <UserDetailsModal
                    show={showUserDetails}
                    setShow={setShowUserDetails}
                    user={selectedUser}
                />
            )}
        </Container>

    )
}