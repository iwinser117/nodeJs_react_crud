import React from 'react';
import { 
    Card, CardBody, 
    Input, Select, SelectItem
} from "@nextui-org/react";

export const EmployeeFilters = ({ 
    filters, 
    onFilterChange 
}) => {
    return (
        <Card className="mb-4">
            <CardBody className="grid grid-cols-3 gap-4">
                <Input
                    label="ID Empleado"
                    value={filters.employeeId}
                    onChange={(e) => onFilterChange('employeeId', e.target.value)}
                />
                <Input
                    label="Nombre Empleado"
                    value={filters.employeeName}
                    onChange={(e) => onFilterChange('employeeName', e.target.value)}
                />
                <Input
                    type="number"
                    label="Salario Mínimo"
                    value={filters.salaryMin}
                    onChange={(e) => onFilterChange('salaryMin', e.target.value)}
                />
                <Input
                    type="number"
                    label="Salario Máximo"
                    value={filters.salaryMax}
                    onChange={(e) => onFilterChange('salaryMax', e.target.value)}
                />
                {/* <Select
                    label="Tipo de Solicitud"
                    value={filters.requestType}
                    onChange={(e) => onFilterChange('requestType', e.target.value)}
                >
                    {['Vacaciones', 'Permiso', 'Otro'].map((type) => (
                        <SelectItem key={type} value={type}>
                            {type}
                        </SelectItem>
                    ))}
                </Select>
                <Input
                    label="Código de Solicitud"
                    value={filters.requestCode}
                    onChange={(e) => onFilterChange('requestCode', e.target.value)}
                /> */}
            </CardBody>
        </Card>
    );
};