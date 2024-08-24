import React, { useEffect, useState } from 'react'

import { Button, ButtonGroup, ButtonToolbar, Card, CardBody, Container, Dropdown, DropdownButton, Form, InputGroup, Nav, Pagination } from 'react-bootstrap';

import './SuppportTicket.css';
import { SupportTicketInterface } from '../../interfaces/SuppportTicketInterface';
import { TicketTypeEnum } from '../../enums/TicketTypeEnum';
import { SupportTicketTable } from './support-ticket-table/SupportTicketTable';
import createAxiosInstance from "../../services/AxiosInstance";
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';


/* 
    TODO: 
        1. RESOLVED TICKETS SHOULD GO IN HISTORY TABLE OF SOME KIND 
        2. FILTER BY TICKET TYPE (INFORMATION, PRIVACY, FEEDBACK, TECHNICAL_ISSUES, GENERAL )
        3. SET UP PAGINATION
        4. 
*/


export const SupportTickets: React.FC = () => {
    const [supportTicketData, setSupportTicketData] = useState<SupportTicketInterface[]>([]);
    const [filterData, setFilterData] = useState<SupportTicketInterface[]>([]);
    const [typeFilter, setTypeFilter] = useState('Type');
    const [typeFilterBtnTitle, setTypeFilterBtnTitle] = useState('Type');
    const [statusTab, setStatusTab] = useState('Pending');
    const { token } = useAuth();
    const axiosInstance = createAxiosInstance(token);
    const [searchTerm, setSearchTerm] = useState<string>(''); // search box input state. 
    const [reset, setReset] = useState(false);
    const navigate = useNavigate();
    const getSupportAllTickets = async () => {
        try {
            const response = await axiosInstance.get('/admin/support/get/all');
            setSupportTicketData(response.data);
            console.log(supportTicketData)
        } catch (error) {
            console.error('Error fetching support tickets:', error);
        }
    }

    const handleTabsAndFilters = () => {
        setTypeFilterBtnTitle(typeFilter);
        let filtered = supportTicketData;

        if (typeFilter != 'Type') {
            if (typeFilter.toUpperCase() in TicketTypeEnum) {
                filtered = filtered.filter(data => 
                    data.type === TicketTypeEnum[typeFilter.toUpperCase() as keyof typeof TicketTypeEnum]
                );
            }
        }

        if (statusTab) {
            filtered = filtered.filter(data => data.status.toUpperCase() === statusTab.toUpperCase());
        }

        if (searchTerm) {
            filtered = filtered.filter(data => data.description.toUpperCase().includes(searchTerm.toUpperCase().trim()) || data.supportTicketId?.toFixed().startsWith(searchTerm.trim()) );
        }

        setFilterData(filtered);
    }


    

    // RESET FILTERS
    const handleResetFilters = () => {
        setTypeFilter('Type');
        setSearchTerm('');
        setReset(true);
        setTimeout(() => setReset(false), 100);
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    }
    
    useEffect(() => {
        getSupportAllTickets();
      }, []);

    useEffect(() => {
        handleTabsAndFilters();
    }, [typeFilter, statusTab, searchTerm, supportTicketData])

    return (
        <Container>
            <Button onClick={() => navigate('/')}> Back </Button>
            <Card className='mt-5 shadow'>
                <Card.Header>
                    <Nav justify variant="tabs" defaultActiveKey="#pending-tickets">
                        <Nav.Item >
                            <Nav.Link href="#pending-tickets" onClick={() => setStatusTab('Pending')}>Pending</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="#resolved-tickets" onClick={() => setStatusTab('Resolved')}>Resolved</Nav.Link>
                        </Nav.Item>

                    </Nav>
                </Card.Header>

                <Card.Body>
                    <Card.Title className='text-center m-4'>Support Tickets</Card.Title>
                    <Card className='card text-center'>

                        <Card.Header>
                            <ButtonToolbar aria-label="Toolbar with Button groups" className='d-flex justify-content-between'>
                                <InputGroup>
                                    <InputGroup.Text id="btnGroupAddon"><i className="bi bi-search"></i></InputGroup.Text>
                                    <Form.Control
                                        type="text"
                                        placeholder="search.."
                                        onChange={handleSearch}
                                        value={searchTerm}
                                    />
                                </InputGroup>
                                <ButtonGroup className="me-2" aria-label="First group">
                                    <DropdownButton as={ButtonGroup} title={typeFilterBtnTitle} id="bg-nested-dropdown">
                                        <Dropdown.Item onClick={() => setTypeFilter('General')}>General</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setTypeFilter('Technical_Issues')}>Technical Issue</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setTypeFilter('Information')}>Information</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setTypeFilter('Feedback')}>Feedback</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setTypeFilter('Privacy')}>Privacy</Dropdown.Item>
                                    </DropdownButton>
                                    <Button variant='secondary' onClick={() => handleResetFilters()}><i className="bi bi-arrow-clockwise"></i></Button>
                                </ButtonGroup>
                            </ButtonToolbar>
                        </Card.Header>

                        <Card.Body>
                            <SupportTicketTable data={filterData} reset={reset}/>
                            {/* PAGINATION */}
                            <Pagination className="justify-content-end">
                                <Pagination.Prev>Previous</Pagination.Prev>

                                <Pagination.Next>Next</Pagination.Next>
                            </Pagination>
                        </Card.Body>
                    </Card>
                </Card.Body>
            </Card>
        </Container>
    );
}
