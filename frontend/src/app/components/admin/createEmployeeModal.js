import React from 'react';
import { 
    Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
    Input, Select, SelectItem, Button
} from "@nextui-org/react";

export const CreateEmployeeModal = ({ 
    isOpen, 
    onOpenChange, 
    newEmployee, 
    onEmployeeChange, 
    onCreateEmployee 
}) => {
    return (
        <Modal 
            isOpen={isOpen} 
            onOpenChange={onOpenChange}
        >
            <ModalContent>
                <ModalHeader>Crear Nuevo Empleado</ModalHeader>
                <ModalBody>
                    <Input
                        label="Nombre"
                        value={newEmployee.name}
                        onChange={(e) => onEmployeeChange('name', e.target.value)}
                    />
                    <Input
                        label="Email"
                        value={newEmployee.email}
                        onChange={(e) => onEmployeeChange('email', e.target.value)}
                    />
                    <Select
                        label="Rol"
                        value={newEmployee.role}
                        onChange={(e) => onEmployeeChange('role', e.target.value)}
                    >
                        {['Desarrollador', 'Diseñador', 'Recursos Humanos', 'Administrador'].map((role) => (
                            <SelectItem key={role} value={role}>
                                {role}
                            </SelectItem>
                        ))}
                    </Select>
                    <Input
                        type="number"
                        label="Salario"
                        value={newEmployee.salary}
                        onChange={(e) => onEmployeeChange('salary', e.target.value)}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="light" onClick={() => onOpenChange(false)}>
                        Cancelar
                    </Button>
                    <Button 
                        color="primary" 
                        onClick={onCreateEmployee}
                        isDisabled={!newEmployee.name || !newEmployee.email || !newEmployee.role}
                    >
                        Crear Empleado
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};