import { Card, Col, Container, Row } from "react-bootstrap";

interface TicketOverviewProps {
    pendingCounter: number;
    overDueCounter: number;
    resolvedTodayCounter: number;
    statusFilter: (status: string) => void;
}

export const TicketOverview: React.FC<TicketOverviewProps> = ({pendingCounter, overDueCounter, resolvedTodayCounter, statusFilter}) => {
    
    return (
        <Container>
                    <Row className="justify-content-center">
                        <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                            <Container fluid>
                                <Card className="shadow">
                                    <Card.Header className="text-center bg-dark text-white rounded-top" >
                                        <h4>Support Ticket Overview</h4>
                                    </Card.Header>
                                    <Card.Body>
                                        <Row className="rows">
                                            <Col className="border rounded p-1" onClick={() => statusFilter('pending')}>
                                                <Container className="d-flex align-items-center">
                                                    <div className="btn-circle me-3 d-flex align-items-center justify-content-center bg-primary text-white">
                                                        <h3 className="mb-0">{pendingCounter}</h3>
                                                    </div>
                                                    <h5 className="mb-0">Total Pending Tickets</h5>
                                                </Container>


                                            </Col>
                                        </Row>
                                        <Row className="rows">
                                            <Col className="mt-3 p-1 border rounded" onClick={() =>statusFilter('overdue')}>
                                                <Container className="d-flex align-items-center">
                                                    <div className="btn-circle me-3 d-flex align-items-center justify-content-center bg-danger text-white">
                                                        <h3 className="mb-0">{overDueCounter}</h3>
                                                    </div>
                                                    <h5 className="mb-0">Overdue Tickets</h5>
                                                </Container>
                                            </Col>
                                        </Row>
                                        <Row className="rows" onClick={() =>statusFilter('resolved')}>
                                            <Col className="mt-3 p-1 border rounded">
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
                            </Container>
                        </Col>
                        <Col size='auto' xs={12} sm={6} md={6} lg={6} xl={6} xxl={6}>
                            <Card>
                                <Card.Body>
                                    Test
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
    )
}