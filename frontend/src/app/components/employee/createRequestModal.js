import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Select, SelectItem, Input, Button } from "@nextui-org/react";

const CreateRequestModal = ({ isOpen, onOpenChange, newRequest, onRequestChange, onCreateRequest }) => (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
            <ModalHeader>Crear Nueva Solicitud</ModalHeader>
            <ModalBody>
                <Select
                    label="Tipo de Solicitud"
                    value={newRequest.type}
                    onChange={(e) => onRequestChange("type", e.target.value)}
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
                    onChange={(e) => onRequestChange("description", e.target.value)}
                />

                <Input
                    label="Resumen"
                    value={newRequest.summary}
                    onChange={(e) => onRequestChange("summary", e.target.value)}
                />
            </ModalBody>
            <ModalFooter>
                <Button color="danger" variant="light" onClick={() => onOpenChange(false)}>
                    Cancelar
                </Button>
                <Button 
                    color="primary" 
                    onClick={onCreateRequest}
                    isDisabled={!newRequest.type || !newRequest.description}
                >
                    Crear Solicitud
                </Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
);

export default CreateRequestModal;
