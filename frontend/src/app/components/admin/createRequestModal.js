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
                        value={newRequest.userId}
                        onChange={(e) => onRequestChange('userId', e.target.value)}
                    >
                        {employeesData.map((employee) => (
                            <SelectItem key={employee.id} value={employee.id}>
                                {employee.name}
                            </SelectItem>
                        ))}
                    </Select>
                    <Input
                        label="titulo"
                        value={newRequest.title}
                        onChange={(e) => onRequestChange('title', e.target.value)}
                    />
                    <Input
                        label="Descripción"
                        value={newRequest.description}
                        onChange={(e) => onRequestChange('description', e.target.value)}
                    />
                    <Select
                        label="Estado inicial solicitud"
                        value={newRequest.type}
                        onChange={(e) => onRequestChange('type', e.target.value)}
                    >
                        {['pending', 'in_progress', 'resolved', 'rejected', 'closed'].map((type) => (
                            <SelectItem key={type} value={type}>
                                {type}
                            </SelectItem>
                        ))}
                    </Select>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="light" onClick={() => onOpenChange(false)}>
                        Cancelar
                    </Button>
                    <Button 
                        color="primary" 
                        onClick={onCreateRequest}
                        isDisabled={!newRequest.userId || !newRequest.type}
                    >
                        Crear Solicitud
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};