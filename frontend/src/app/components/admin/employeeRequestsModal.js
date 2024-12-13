import React, { useMemo } from 'react';
import {
    Modal, ModalContent, ModalHeader, ModalBody,
    Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
    Button, Pagination, Chip
} from "@nextui-org/react";

export const EmployeeRequestsModal = ({
    isOpen,
    onOpenChange,
    employeeId,
    users, // Cambiado de employeesData
    currentRequestPage,
    onRequestPageChange,
    selectedRequests,
    onRequestSelect,
    onDeleteSelectedRequests
}) => {
    // Encontrar el usuario específico
    const selectedUser = users.find(user => user.id === employeeId);

    // Filtrar solicitudes del empleado específico
    const filteredEmployeeRequests = useMemo(() => {
        if (!selectedUser) return [];
        
        const requestsPerPage = 5;
        const startIndex = (currentRequestPage - 1) * requestsPerPage;
        const endIndex = startIndex + requestsPerPage;
        
        return (selectedUser.requests || []).slice(startIndex, endIndex);
    }, [employeeId, currentRequestPage, users]);

    // Calcular total de páginas
    const employeeRequestPages = useMemo(() => {
        if (!selectedUser) return 0;
        return Math.ceil((selectedUser.requests || []).length / 5);
    }, [employeeId, users]);

    // Mapeo de colores para estados de solicitud
    const statusColorMap = {
        'pending': 'warning',
        'approved': 'success', 
        'rejected': 'danger',
        'in_progress': 'primary'
    };

    // Logging para depuración
    console.log('Modal Props:', { 
        isOpen, 
        employeeId, 
        users, 
        selectedUser, 
        filteredEmployeeRequests 
    });

    return (
        <Modal
            isOpen={isOpen && employeeId}
            onOpenChange={onOpenChange}
            size="5xl"
        >
            <ModalContent>
                <ModalHeader className="flex flex-col">
                    Solicitudes de {selectedUser?.name || "Empleado desconocido"}
                    <p className="text-small text-default-500">
                        Total de solicitudes: {(selectedUser?.requests || []).length}
                    </p>
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
                            <TableColumn>Título</TableColumn>
                            <TableColumn>Estado</TableColumn>
                            <TableColumn>Fecha</TableColumn>
                        </TableHeader>
                        <TableBody 
                            emptyContent="No hay solicitudes para este empleado"
                        >
                            {filteredEmployeeRequests.map((request) => (
                                <TableRow key={request.id}>
                                    <TableCell>{request.id}</TableCell>
                                    <TableCell>{request.title}</TableCell>
                                    <TableCell>
                                        <Chip 
                                            color={statusColorMap[request.status] || 'default'}
                                            size="sm"
                                            variant="flat"
                                        >
                                            {request.status}
                                        </Chip>
                                    </TableCell>
                                    <TableCell>{request.createdAt}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};