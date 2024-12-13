import React, { useMemo } from 'react';
import {
    Card, CardBody,
    Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
    Button, Pagination
} from "@nextui-org/react";

export const EmployeeTable = ({
    employees,
    currentPage,
    itemsPerPage,
    totalPages,
    onPageChange
}) => {
    return (
        <Card className="mb-4">
            <CardBody>
                <Table aria-label="Tabla de Empleados">
                    <TableHeader>
                        <TableColumn>ID</TableColumn>
                        <TableColumn>Nombre</TableColumn>
                        <TableColumn>Salario</TableColumn>
                        <TableColumn>Rol</TableColumn>
                        <TableColumn>Total Solicitudes</TableColumn>
                        <TableColumn>Acciones</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {employees.map(employee => (
                            <TableRow key={employee.id}>
                                <TableCell>{employee.id}</TableCell>
                                <TableCell>{employee.name}</TableCell>
                                <TableCell>{employee.salary}</TableCell>
                                <TableCell>{employee.role}</TableCell>
                                <TableCell>{employee.totalRequests}</TableCell>
                                <TableCell>
                                    <Button size="sm" color="primary">Consultar</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <div className="flex justify-center mt-4">
                    <Pagination
                        isCompact
                        showControls
                        showShadow
                        color="secondary"
                        page={currentPage}
                        total={totalPages}
                        onChange={onPageChange}
                    />
                </div>
            </CardBody>
        </Card>
    );
};
