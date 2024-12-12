import React from 'react';
import { 
    Card, CardBody, 
    User, Button
} from "@nextui-org/react";

export const AdminHeader = ({ 
    adminDetails, 
    onCreateEmployee, 
    onCreateRequest, 
    onDeleteRequests 
}) => {
    return (
        <Card className="mb-4">
            <CardBody className="flex flex-row items-center">
                <User
                    name={adminDetails.name}
                    description={`${adminDetails.role}`}
                    avatarProps={{
                        src: "https://i.pravatar.cc/150?u=a04258114e29026708d"
                    }}
                    className="mr-4"
                />
                <div className="flex-grow">
                    <p>ID: {adminDetails.id}</p>
                    <p>Email: {adminDetails.email}</p>
                </div>
                <div className="flex space-x-2">
                    <Button 
                        color="primary" 
                        onPress={onCreateEmployee}
                    >
                        Crear Empleado
                    </Button>
                    <Button 
                        color="secondary" 
                        onPress={onCreateRequest}
                    >
                        Crear Solicitud
                    </Button>
                    <Button 
                        color="danger" 
                        onPress={onDeleteRequests}
                    >
                        Eliminar Solicitudes
                    </Button>
                </div>
            </CardBody>
        </Card>
    );
};