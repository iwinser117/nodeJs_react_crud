import React from 'react';
import {
    Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Pagination
} from "@nextui-org/react";

const EmployeeRequestsTable = ({ requests, currentPage, totalPages, onPageChange }) => {
    const renderStatusChip = (status) => {
        const colorMap = {
            'Pendiente': 'warning',
            'Aprobado': 'success',
            'Rechazado': 'danger'
        };

        return <Chip color={colorMap[status] || 'default'} size="sm">{status}</Chip>;
    };

    return (
        <>
            <Table aria-label="Tabla de solicitudes">
                <TableHeader>
                    <TableColumn>ID</TableColumn>
                    <TableColumn>Código</TableColumn>
                    <TableColumn>Descripción</TableColumn>
                    <TableColumn>Resumen</TableColumn>
                    <TableColumn>Fecha</TableColumn>
                    <TableColumn>Estado</TableColumn>
                </TableHeader>
                <TableBody>
                    {requests.map((request) => (
                        <TableRow key={request.id}>
                            <TableCell>{request.id}</TableCell>
                            <TableCell>{request.code}</TableCell>
                            <TableCell>{request.description}</TableCell>
                            <TableCell>{request.summary}</TableCell>
                            <TableCell>{request.date}</TableCell>
                            <TableCell>{renderStatusChip(request.status)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="flex justify-center mt-4">
                <Pagination
                    isCompact
                    showControls
                    color="secondary"
                    page={currentPage}
                    total={totalPages}
                    onChange={onPageChange}
                />
            </div>
        </>
    );
};

export default EmployeeRequestsTable;
