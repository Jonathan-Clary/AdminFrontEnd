import React, { useEffect, useMemo, useState } from 'react'
import { Pagination, Table } from 'react-bootstrap';
import { SupportTicketInterface } from '../../../../interfaces/SuppportTicketInterface';
import { format } from 'date-fns';
import { SupportTicketDetails } from '../support-ticket-details/SupportTicketDetails';
import './SupportTicketTable.css'


interface SupportTicketTableProps {
    data: SupportTicketInterface[];
    reset?: boolean;
}

export const SupportTicketTable: React.FC<SupportTicketTableProps> = ({ data, reset }) => {
    const [sortData, setSortData] = useState<{ key: 'supportTicketId' | 'createdDate', direction: 'ascending' | 'descending' } | null>(null);
    const [selectedSupportTicket, setSelectedSupportTicket] = useState<SupportTicketInterface | null>(null);
    const [showTicketDetails, setShowTicketDetails] = useState(false);
    const pageSize = 10;
    const [currentPage, setCurrentPage] = useState(1);

    //useMemo is a React Hook that lets you cache the result of a calculation between re-renders.
    //https://react.dev/reference/react/useMemo
    const sortedData = useMemo(() => {
        let sortableData = [...data];
        if (sortData !== null) {
            sortableData.sort((a, b) => {
                const aValue = sortData.key === 'createdDate' ? a[sortData.key] : a[sortData.key];
                const bValue = sortData.key === 'createdDate' ? b[sortData.key] : b[sortData.key];
                const aSortValue = aValue ?? (sortData.key === 'createdDate' ? 0 : '');
                const bSortValue = bValue ?? (sortData.key === 'createdDate' ? 0 : '');

                if (aSortValue < bSortValue) {
                    return sortData.direction === 'ascending' ? -1 : 1;
                }
                if (aSortValue > bSortValue) {
                    return sortData.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableData;
    }, [data, sortData]);



    const paginationData = React.useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        const end = start + pageSize;
        return sortedData.slice(start, end);
    }, [sortedData, currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    }

    const requestSort = (key: 'supportTicketId' | 'createdDate') => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortData && sortData.key === key && sortData.direction === 'ascending') {
            direction = 'descending';
        }
        setSortData({ key, direction });
    };

    useEffect(() => {
        if (reset) {
            setSortData(null);
        }
    }, [reset])

    const capitalizeFirstLetter = (str: string): string => {
        if (str.length === 0) return str;
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };


    // Convert date from milliseconds to Date
    const convertToDate = (timestamp: number) => {
        const date = new Date(timestamp);
        return format(date, 'MMMM d, yyyy @ hh:mm a');
    };

    /* TABLE ROW CLICK */
    const handleRowClick = (index: number) => {
        const selectedTicket = sortedData[index];
        if (selectedTicket) {
            setSelectedSupportTicket(selectedTicket);
            setShowTicketDetails(true);
        }
    };

    const totalPages = useMemo(() => Math.ceil(sortedData.length / pageSize), [sortedData]);



    return (
        <>
        <div className='table-container'>
            {showTicketDetails && selectedSupportTicket && (<SupportTicketDetails setShow={setShowTicketDetails} show={showTicketDetails} ticket={selectedSupportTicket} />)}
            <Table hover striped bordered className="shadow">
                <thead className="table-dark">
                    <tr>
                        <th onClick={() => requestSort('supportTicketId')}>
                            ID {sortData?.key === 'supportTicketId' ? (
                                sortData.direction === 'ascending' ?
                                    <i className="bi bi-sort-up"></i> :
                                    <i className="bi bi-sort-down"></i>
                            ) : (
                                <i className="bi bi-filter"></i>
                            )}
                        </th>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Description</th>
                        <th onClick={() => requestSort('createdDate')}>
                            Creation Date {sortData?.key === 'createdDate' ? (
                                sortData.direction === 'ascending' ?
                                    <i className="bi bi-sort-up"></i> :
                                    <i className="bi bi-sort-down"></i>
                            ) : (
                                <i className="bi bi-filter"></i>
                            )}
                        </th>
                    </tr>
                </thead>
                <tbody className='table-container'>
                    {data.length === 0 &&
                        <tr>
                            <td colSpan={7} className="text-center">
                                <p className="m-0">No support tickets found</p>
                            </td>
                        </tr>
                    }
                    {paginationData.map((ticket, index) => (
                        <tr className='clickable-row' key={index} onClick={() => handleRowClick(index)} >
                            <td>{ticket.supportTicketId}</td>
                            <td>{capitalizeFirstLetter(ticket.type)}</td>
                            <td>{capitalizeFirstLetter(ticket.status)}</td>
                            <td>{ticket.description}</td>
                            <td>{ticket.createdDate !== undefined ?
                                convertToDate(ticket.createdDate) :
                                'N/A'
                            }</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
           
        </div>
              <Pagination className="justify-content-end">
              <Pagination.Prev onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</Pagination.Prev>
              {Array.from({ length: totalPages }, (_, index) => (
                  <Pagination.Item
                      key={index + 1}
                      active={index + 1 === currentPage}
                      onClick={() => handlePageChange(index + 1)}
                  >
                      {index + 1}
                  </Pagination.Item>
              ))}
              <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={paginationData.length < pageSize}>Next</Pagination.Next>
          </Pagination>
          </>
    )
}
