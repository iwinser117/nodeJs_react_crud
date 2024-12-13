import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Select, SelectItem, Input, Button } from "@nextui-org/react";

const CreateRequestModal = ({ isOpen, onOpenChange, newRequest, onRequestChange, onCreateRequest }) => (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
            <ModalHeader>Crear Nueva Solicitud</ModalHeader>
            <ModalBody>
                <Input
                    label="Título"
                    value={newRequest.title}
                    onChange={(e) => onRequestChange("title", e.target.value)}
                    required
                />

                <Input
                    label="Descripción"
                    value={newRequest.description}
                    onChange={(e) => onRequestChange("description", e.target.value)}
                    required
                />

                <Select
                    label="Estado"
                    value={newRequest.status}
                    onChange={(e) => onRequestChange("status", e.target.value)}
                    required
                >
                    {['pending', 'in_progress', 'resolved', 'rejected', 'closed'].map((status) => (
                        <SelectItem key={status} value={status} textValue={status}>
                            {status.charAt(0).toUpperCase() + status.slice(1)} {/* Capitalizamos la primera letra */}
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
                    isDisabled={!newRequest.title || !newRequest.description || !newRequest.status}
                >
                    Crear Solicitud
                </Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
);

export default CreateRequestModal;
