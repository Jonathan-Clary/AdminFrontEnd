import { Table } from "react-bootstrap"
import { UserInterface } from "../../../interfaces/UserInterface"
import { useEffect, useState } from "react";
import createAxiosInstance from "../../../services/AxiosInstance";
import { useAuth } from "../../../contexts/AuthContext";

export const UserTable: React.FC = () => {
    const [userList, setUserList] = useState<UserInterface[] | null>(null);
    const { token } = useAuth();
    const axiosInstance = createAxiosInstance(token);

    const getAllAdmins = async () => {
        try {
            const response = await axiosInstance.get('/master/admin/list');
            console.log(response)
            setUserList(response.data)
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getAllAdmins();
    }, [])


    return (
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

                {userList?.map((user: UserInterface) => (
                    <tr style={{ cursor: 'pointer' }} key={user.userId} >  
                        <td>{user.adminId}</td>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.email}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}