import React from 'react';
import { Card, CardBody, User, Button } from "@nextui-org/react";
import { useAuth } from '@/contexts/authContext';

const EmployeeDetailsCard = ({ employeeDetails, onCreateRequest }) => {
  const { logout } = useAuth();  

  return (
    <Card className="mb-4">
        <CardBody className="flex flex-row items-center">
            <User
                name={employeeDetails.name}
                description={`ID: ${employeeDetails.id}`}
                avatarProps={{
                    src: "https://i.pravatar.cc/150?u=a04258114e29026708d"
                }}
                className="mr-4"
            />
            <div className="flex-grow">
                <p>Correo: {employeeDetails.email}</p>
                <p>Salario: ${employeeDetails.salary}</p>
            </div>
            <Button color="primary" onClick={onCreateRequest}>
                Crear Nueva Solicitud
            </Button>
            <Button 
                color="danger"
                onClick={logout}  
            >
                Cerrar sesión
            </Button>
        </CardBody>
    </Card>
  );
};

export default EmployeeDetailsCard;
