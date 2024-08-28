import { Card, Col, Container, Row } from "react-bootstrap";
import { SupportTicketAnalytics } from "../analytics/SupportTicketAnalytics";
import { SupportTicketInterface } from "../../../../interfaces/SuppportTicketInterface";

interface TicketOverviewProps {
    pendingCounter: number;
    overDueCounter: number;
    resolvedTodayCounter: number;
    statusFilter: (status: string) => void;
    supportTickets: SupportTicketInterface[];
    loading: boolean;
}

export const TicketOverview: React.FC<TicketOverviewProps> = ({ pendingCounter, overDueCounter, resolvedTodayCounter, statusFilter, supportTickets, loading }) => {

    return  (
        <Container>
            <Row className="justify-content-center align-items-stretch">
                <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} className="d-flex">
                    <Card className="shadow flex-fill d-flex flex-column">
                        <Card.Header className="text-center bg-dark text-white rounded-top">
                            <h4>Support Ticket Overview</h4>
                        </Card.Header>
                        <Card.Body className="d-flex flex-column justify-content-between">
                            <Row className="flex-fill">
                                <Col className="border rounded p-1 mb-3" onClick={() => statusFilter('pending')}>
                                    <Container className="d-flex align-items-center">
                                        <div className="btn-circle me-3 d-flex align-items-center justify-content-center bg-primary text-white">
                                            <h3 className="mb-0">{pendingCounter}</h3>
                                        </div>
                                        <h5 className="mb-0">Total Pending Tickets</h5>
                                    </Container>
                                </Col>
                            </Row>
                            <Row className="flex-fill">
                                <Col className="border rounded p-1 mb-3" onClick={() => statusFilter('overdue')}>
                                    <Container className="d-flex align-items-center">
                                        <div className="btn-circle me-3 d-flex align-items-center justify-content-center bg-danger text-white">
                                            <h3 className="mb-0">{overDueCounter}</h3>
                                        </div>
                                        <h5 className="mb-0">Overdue Tickets</h5>
                                    </Container>
                                </Col>
                            </Row>
                            <Row className="flex-fill">
                                <Col className="border rounded p-1" onClick={() => statusFilter('resolved')}>
                                    <Container className="d-flex align-items-center">
                                        <div className="btn-circle me-3 d-flex align-items-center justify-content-center bg-success text-white">
                                            <h3 className="mb-0">{resolvedTodayCounter}</h3>
                                        </div>
                                        <h5 className="mb-0">Tickets Resolved Today</h5>
                                    </Container>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} className="d-flex">
                    <Card className="shadow flex-fill d-flex flex-column">
                        <Card.Header className="text-center bg-dark text-white rounded-top">
                            <h4>Statistics</h4>
                        </Card.Header>
                        <Card.Body className="d-flex align-items-center justify-content-center flex-grow-1">
                            <SupportTicketAnalytics supportTickets={supportTickets} loading={loading} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}