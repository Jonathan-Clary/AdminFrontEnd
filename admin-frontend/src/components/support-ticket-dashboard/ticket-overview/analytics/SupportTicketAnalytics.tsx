import { Cell, ResponsiveContainer, Tooltip, BarChart, Bar, CartesianGrid, XAxis, YAxis, LabelList } from 'recharts';
import { SupportTicketInterface } from "../../../../interfaces/SuppportTicketInterface";
import _ from 'lodash';
import { Spinner } from 'react-bootstrap';

// Ref Docs
// https://recharts.org/en-US
// https://lodash.com/docs/

interface SupportTicketProps {
    supportTickets: SupportTicketInterface[];
    loading: boolean;
}
export const SupportTicketAnalytics: React.FC<SupportTicketProps> = ({ supportTickets, loading }) => {
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    const aggregatedData = _(supportTickets)
        .groupBy('type')
        .map((group, type) => ({ name: type, value: group.length }))
        .value();

        const renderCustomizedLabel = ({ x, y, width, value }: any) => {
            return (
                <text
                    x={x + width / 2}
                    y={y + 15}
                    textAnchor="middle"
                    fill="#fff"
                    fontSize={14}
                    fontWeight="bold">
                    {value}
                </text>
            );
        };

    return (
        <>
            {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
                    <Spinner animation="border" variant="primary" />
                </div>
            ) : (
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart
                        data={aggregatedData}
                        margin={{ top: 10, right: 30, bottom: 50, left: 0 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" angle={-30} textAnchor="end" fontSize={13} />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#8884d8">
                            {aggregatedData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                            <LabelList content={renderCustomizedLabel} />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            )}

        </>
    )
}