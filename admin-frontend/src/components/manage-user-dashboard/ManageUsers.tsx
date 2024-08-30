import { Button, Card, Container } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { UserTable } from "./user-table/UserTable";
import './ManageUser.css'
import {useState } from "react";



export const ManageUsers: React.FC = () => {
    const navigate = useNavigate();
    const [showAddModal, setShowAddModal] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);

 
    return (
        <>

           
           

            <Button className='ms-2 mt-3' size='lg' onClick={() => navigate('/')}> <i className="bi bi-caret-left-fill"></i> </Button>
            <Container className="mt-5 d-flex justify-content-center">
                <Card className="shadow text-center m-4 clickable-card" onClick={() => setShowAddModal(true)} style={{ width: '10rem', height: '10rem' }}>
                    <Card.Img className="p-3" variant="top" src='images/new.png' loading="lazy" />
                </Card>

                {isButtonEnabled ? <Card className="shadow text-center m-4 clickable-card" onClick={() => setShowDeleteModal(true)} style={{ width: '10rem', height: '10rem' }}>
                    <Card.Img className="p-3" variant="top" src='images/image.png' loading="lazy" />
                </Card> : <Card className="shadow text-center m-4" style={{ width: '10rem', height: '10rem' }}>
                    <Card.Img className="p-3" variant="top" src='images/image.png' loading="lazy" style={{ filter: 'grayscale(100%)' }}/>
                </Card>}

              


            </Container>
            <Container>

                <UserTable isButtonEnabled={isButtonEnabled} setIsButtonEnabled={setIsButtonEnabled} show={showDeleteModal} setShow={setShowDeleteModal} showAdd={showAddModal} setShowAdd={setShowAddModal}  />
            </Container>
        </>
    )
}

function createAxiosInstance(token: string | null) {
    throw new Error("Function not implemented.");
}
