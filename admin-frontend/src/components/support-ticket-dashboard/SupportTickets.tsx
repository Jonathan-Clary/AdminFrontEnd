import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, ButtonToolbar, Card, Col, Container, Dropdown, DropdownButton, Form, InputGroup, Nav, Pagination, Row, Spinner } from 'react-bootstrap';
import './SupportTicket.css';
import { SupportTicketInterface } from '../../interfaces/SuppportTicketInterface';
import { TicketTypeEnum } from '../../enums/TicketTypeEnum';
import { SupportTicketTable } from './support-ticket-table/SupportTicketTable';
import createAxiosInstance from "../../services/AxiosInstance";
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { TicketStatusEnum } from '../../enums/TicketStatusEnum';
import { TicketOverview } from './ticket-overview/TicketOverview';
import { addDays, isBefore, startOfDay, subHours } from 'date-fns';
import { useGlobalContext } from '../../contexts/GlobalContext';




export const SupportTickets: React.FC = () => {
    const [supportTicketData, setSupportTicketData] = useState<SupportTicketInterface[]>([]);

    const [filterData, setFilterData] = useState<SupportTicketInterface[]>([]);

    const [typeFilter, setTypeFilter] = useState('Type');
    const [typeFilterBtnTitle, setTypeFilterBtnTitle] = useState('Type');

    const [statusTab, setStatusTab] = useState<string>('Pending');

    const [searchTerm, setSearchTerm] = useState<string>(''); // search box input state. 

    const [reset, setReset] = useState(false);

    const [pendingCounter, setPendingCounter] = useState(0);
    const [overDueCounter, setOverDueCounter] = useState(0);
    const [resolvedTodayCounter, setResolvedTodayCounter] = useState(0);

    const [statusFilter, setStatusFilter] = useState<string>('');

    const { ticketUpdated } = useGlobalContext();
    const { token } = useAuth();
    const axiosInstance = createAxiosInstance(token);
    const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>(false);


    // Method for over ticket status (checking if date has passed)
    const isTicketOverDue = (date: string) => {
        const now = new Date();
        const twentyFourHoursAgo = subHours(now, 24);
        return isBefore(date, twentyFourHoursAgo);
    }

    // Method for checking if ticket was resolved today.
    const getStartOfToday = () => {
        return startOfDay(new Date());
    };


    const getSupportAllTickets = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/support/all');
            setSupportTicketData(response.data);
            //Count pending tickets
            setPendingCounter(response.data.filter((data: { status: TicketStatusEnum; }) => data.status === TicketStatusEnum.PENDING).length)

            // Count overdue tickets
            const overdue = response.data.filter((ticket: SupportTicketInterface) =>
                ticket.status === TicketStatusEnum.PENDING &&
                isTicketOverDue(ticket.createdAt)
            );
            setOverDueCounter(overdue.length);

            // Count resolved today tickets
            const todayStart = getStartOfToday();

            const resolvedToday = response.data.filter((data: { status: string; resolvedDate?: string }) =>
                data.status.toUpperCase() === 'RESOLVED' &&
                data.resolvedDate !== undefined &&
                new Date(data.resolvedDate) >= todayStart &&
                new Date(data.resolvedDate) < addDays(todayStart, 1)
            );
            setResolvedTodayCounter(resolvedToday.length);
        } catch (error) {
            console.error('Error fetching support tickets:', error);
        } finally {
            setLoading(false);
        }
    }

    const handleTabsAndFilters = () => {
        setTypeFilterBtnTitle(typeFilter);
        if (typeFilter === 'Technical_Issues') {
            setTypeFilterBtnTitle('Technical Issues');
        }

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
            filtered = filtered.filter(data => data.description.toUpperCase().includes(searchTerm.toUpperCase().trim()) || data.supportTicketId?.startsWith(searchTerm.trim()) || data.type?.startsWith(searchTerm.toUpperCase().trim()));
        }

        if (statusFilter === 'pending') {
            handleStatusTabClick('Pending');
        }

        if (statusFilter === 'overdue') {
            setStatusTab('Pending');
            filtered = filtered.filter((ticket: SupportTicketInterface) =>
                ticket.status === TicketStatusEnum.PENDING &&
                isTicketOverDue(ticket.createdAt)
            );
        }

        if (statusFilter === 'resolved') {
            setStatusTab('Resolved');
            const todayStart = getStartOfToday();
            filtered = filtered.filter(data =>
                data.status.toUpperCase() === 'RESOLVED' &&
                new Date(data.resolvedDate!) >= todayStart &&
                new Date(data.resolvedDate!) < addDays(todayStart, 1)
            );
            setResolvedTodayCounter(filtered.length);
        }

        setFilterData(filtered);

    }


    // RESET FILTERS
    const handleResetFilters = () => {
        setTypeFilter('Type');
        setSearchTerm('');
        setReset(true);
        setTimeout(() => setReset(false), 100);
        setStatusFilter('');

    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    }

    const handleStatusTabClick = (status: string) => {
        setStatusFilter('');
        setStatusTab(status);
    }


    useEffect(() => {
        console.log("1rst use effect")
        getSupportAllTickets();
    }, []);

    useEffect(() => {
        handleTabsAndFilters();
        console.log("2nd use effect")
    }, [typeFilter, statusTab, searchTerm, supportTicketData, statusFilter])

    useEffect(() => {
        console.log("3rd use effect")
        getSupportAllTickets();
        handleTabsAndFilters();
    }, [ticketUpdated]);


    return (
        <>
            <Container className='top-container'>
                <Button className='ms-2' size='lg' onClick={() => navigate('/')}> <i className="bi bi-caret-left-fill"></i> </Button>
                <TicketOverview pendingCounter={pendingCounter} overDueCounter={overDueCounter} resolvedTodayCounter={resolvedTodayCounter} statusFilter={setStatusFilter} supportTickets={supportTicketData} loading={loading} />
            </Container>

            <Container>
                <Card className='mt-5 shadow'>
                    <Card.Header>
                        <Nav justify variant="tabs" activeKey={statusTab}>
                            <Nav.Item>
                                <Nav.Link eventKey="Pending" onClick={() => handleStatusTabClick('Pending')}>Pending</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="Resolved" onClick={() => handleStatusTabClick('Resolved')}>Resolved</Nav.Link>
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

                                {loading ? (
                                    <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
                                        <Spinner animation="border" variant="primary" />
                                    </div>
                                ) : (
                                    <SupportTicketTable data={filterData} reset={reset} statusTab={statusTab} />
                                )}
                            </Card.Body>
                        </Card>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}
