import React, { useMemo } from 'react';
import {
    Modal, ModalContent, ModalHeader, ModalBody,
    Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
    Button, Pagination
} from "@nextui-org/react";

export const EmployeeRequestsModal = ({
    isOpen,
    onOpenChange,
    employeeId,
    employeesData,
    requestsData,
    currentRequestPage,
    onRequestPageChange,
    selectedRequests,
    onRequestSelect,
    onDeleteSelectedRequests
}) => {
    const filteredEmployeeRequests = useMemo(() => {
        if (!employeeId) return [];
        const employeeRequests = requestsData.filter(req => req.employeeId === employeeId);
        console.log("Filtradas:", employeeRequests);
        const requestsPerPage = 5;
        const startIndex = (currentRequestPage - 1) * requestsPerPage;
        const endIndex = startIndex + requestsPerPage;
        return employeeRequests.slice(startIndex, endIndex);
    }, [employeeId, currentRequestPage, requestsData]);

    const employeeRequestPages = useMemo(() => {
        if (!employeeId) return 0;
        const employeeRequests = requestsData.filter(req => req.employeeId === employeeId);
        return Math.ceil(employeeRequests.length / 5);
    }, [employeeId, requestsData]);

    const employeeName = employeesData.find(e => e.id === employeeId)?.name;

    return (
        <Modal
            isOpen={isOpen && employeeId}
            onOpenChange={onOpenChange}
            size="5xl"
        >
            <ModalContent>
                <ModalHeader>
                    Solicitudes de {employeeName || "Empleado desconocido"}
                </ModalHeader>
                <ModalBody>
                    <Table
                        aria-label="Tabla de Solicitudes del Empleado"
                        selectionMode="multiple"
                        selectedKeys={selectedRequests}
                        onSelectionChange={(keys) => onRequestSelect(Array.from(keys))}
                        bottomContent={
                            <div className="flex w-full justify-between items-center">
                                <Button
                                    color="danger"
                                    isDisabled={selectedRequests.length === 0}
                                    onPress={onDeleteSelectedRequests}
                                >
                                    Eliminar Solicitudes Seleccionadas
                                </Button>
                                <Pagination
                                    isCompact
                                    showControls
                                    color="secondary"
                                    page={currentRequestPage}
                                    total={employeeRequestPages}
                                    onChange={onRequestPageChange}
                                />
                            </div>
                        }
                    >
                        <TableHeader>
                            <TableColumn>ID</TableColumn>
                            <TableColumn>Tipo</TableColumn>
                            <TableColumn>Estado</TableColumn>
                            <TableColumn>Fecha</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {filteredEmployeeRequests.map((request) => (
                                <TableRow key={request.id}>
                                    <TableCell>{request.id}</TableCell>
                                    <TableCell>{request.type}</TableCell>
                                    <TableCell>{request.status}</TableCell>
                                    <TableCell>{request.date}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};