import React from 'react';
import { Card, CardBody, User, Button } from "@nextui-org/react";

const EmployeeDetailsCard = ({ employeeDetails, onCreateRequest }) => (
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
                <p>Fecha de Ingreso: {employeeDetails.hireDate}</p>
                <p>Salario: ${employeeDetails.salary.toLocaleString()}</p>
            </div>
            <Button color="primary" onClick={onCreateRequest}>
                Crear Nueva Solicitud
            </Button>
        </CardBody>
    </Card>
);

export default EmployeeDetailsCard;
