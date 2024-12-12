import React from 'react';
import {
    Card, CardBody,
    Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
    Button, Pagination
} from "@nextui-org/react";

export const EmployeeTable = ({
    employees,
    currentPage,
    totalPages,
    onPageChange,
    onViewRequests
}) => {
    return (
        <Card className="mb-4">
            <CardBody>
                <Table
                    aria-label="Tabla de Empleados"
                    bottomContent={
                        <div className="flex w-full justify-center">
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
                    }
                >
                    <TableHeader>
                        <TableColumn>ID</TableColumn>
                        <TableColumn>Nombre</TableColumn>
                        <TableColumn>Email</TableColumn>
                        <TableColumn>Rol</TableColumn>
                        <TableColumn>Salario</TableColumn>
                        <TableColumn>Total Solicitudes</TableColumn>
                        <TableColumn>Acciones</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {employees.map((employee) => (
                            <TableRow key={employee.id}>
                                <TableCell>{employee.id}</TableCell>
                                <TableCell>{employee.name}</TableCell>
                                <TableCell>{employee.email}</TableCell>
                                <TableCell>{employee.role}</TableCell>
                                <TableCell>${employee.salary.toLocaleString()}</TableCell>
                                <TableCell>{employee.totalRequests}</TableCell>
                                <TableCell>
                                    <Button
                                        size="sm"
                                        color="primary"
                                        onClick={() => onViewRequests(employee.id)}
                                    >
                                        Consultar
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardBody>
        </Card>
    );
};