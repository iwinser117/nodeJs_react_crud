import React from 'react';
import { 
    Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
    Select, SelectItem, Input, Button
} from "@nextui-org/react";

export const CreateRequestModal = ({ 
    isOpen, 
    onOpenChange, 
    newRequest, 
    employeesData, 
    onRequestChange, 
    onCreateRequest 
}) => {
    return (
        <Modal 
            isOpen={isOpen} 
            onOpenChange={onOpenChange}
        >
            <ModalContent>
                <ModalHeader>Crear Nueva Solicitud</ModalHeader>
                <ModalBody>
                    <Select
                        label="Empleado"
                        value={newRequest.employeeId}
                        onChange={(e) => onRequestChange('employeeId', e.target.value)}
                    >
                        {employeesData.map((employee) => (
                            <SelectItem key={employee.id} value={employee.id}>
                                {employee.name}
                            </SelectItem>
                        ))}
                    </Select>
                    <Select
                        label="Tipo de Solicitud"
                        value={newRequest.type}
                        onChange={(e) => onRequestChange('type', e.target.value)}
                    >
                        {['Vacaciones', 'Permiso', 'Otro'].map((type) => (
                            <SelectItem key={type} value={type}>
                                {type}
                            </SelectItem>
                        ))}
                    </Select>
                    <Input
                        label="Descripción"
                        value={newRequest.description}
                        onChange={(e) => onRequestChange('description', e.target.value)}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="light" onClick={() => onOpenChange(false)}>
                        Cancelar
                    </Button>
                    <Button 
                        color="primary" 
                        onClick={onCreateRequest}
                        isDisabled={!newRequest.employeeId || !newRequest.type}
                    >
                        Crear Solicitud
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};