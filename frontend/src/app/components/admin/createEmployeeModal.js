import React from 'react';
import {
    Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
    Input, Select, SelectItem, Button
} from "@nextui-org/react";
import { useAuth } from '@/contexts/authContext';

export const CreateEmployeeModal = ({
    isOpen,
    onOpenChange,
    newEmployee,
    onEmployeeChange,
    onCreateEmployee
}) => {
    // Función para validar la contraseña
    const getPasswordError = (value) => {
        if (!value) return
        if (value && value.length < 8) return "La contraseña debe tener al menos 8 caracteres";
        if (!/[A-Z]/.test(value)) return "La contraseña necesita al menos 1 letra mayúscula";
        if (!/[a-z]/.test(value)) return "La contraseña necesita al menos 1 letra minúscula";
        // if (!/[0-9]/.test(value)) return "La contraseña necesita al menos 1 número";
        // if (!/[^a-zA-Z0-9]/.test(value)) return "La contraseña necesita al menos 1 símbolo";
        return null;
    };

    const passwordError = getPasswordError(newEmployee.password);

    const auth = useAuth();


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
                        type="email"
                        value={newEmployee.email}
                        onChange={(e) => onEmployeeChange('email', e.target.value)}
                    />
                    <Input
                        label="Contraseña"
                        type="password"
                        value={newEmployee.password}
                        errorMessage={passwordError}
                        isInvalid={!!passwordError}
                        onChange={(e) => onEmployeeChange('password', e.target.value)}
                    />
                    <Select
                        label="Rol"
                        value={newEmployee.role}
                        onChange={(e) => onEmployeeChange('role', e.target.value)}
                    >
                        {['employee', 'administrator'].map((role) => (
                            <SelectItem key={role} value={role}>
                                {role}
                            </SelectItem>
                        ))}
                    </Select>
                    {newEmployee.role !== 'administrator' && (
                        <Input
                            type="number"
                            label="Salario"
                            value={newEmployee.salary}
                            onChange={(e) => onEmployeeChange('salary', e.target.value)}
                        />
                    )}

                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="light" onClick={() => onOpenChange(false)}>
                        Cancelar
                    </Button>
                    <Button
                        color="primary"
                        onPress={onCreateEmployee}
                        isDisabled={
                            !newEmployee.name ||
                            !newEmployee.email ||
                            !newEmployee.role ||
                            !newEmployee.password ||
                            passwordError
                        }
                    >
                        Crear Empleado
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
