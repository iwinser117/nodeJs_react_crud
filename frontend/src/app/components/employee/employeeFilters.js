import React from 'react';
import { Card, CardBody, Select, SelectItem, Input } from "@nextui-org/react";

const EmployeeFilters = ({ filters, onFilterChange }) => (
    <Card className="mb-4">
        <CardBody className="flex flex-row space-x-4">
            <Select
                label="Estado"
                className="max-w-xs"
                selectedKeys={filters.status ? [filters.status] : []}
                onChange={(e) => onFilterChange("status", e.target.value)}
            >
                {['pending', 'in_progress', 'resolved', 'rejected', 'closed'].map((status) => (
                    <SelectItem key={status} value={status}>
                        {status}
                    </SelectItem>
                ))}
            </Select>

            {/* <Select
                label="Tipo"
                className="max-w-xs"
                selectedKeys={filters.type ? [filters.type] : []}
                onChange={(e) => onFilterChange("type", e.target.value)}
            >
                {['Vacaciones', 'Permiso', 'Otro'].map((type) => (
                    <SelectItem key={type} value={type}>
                        {type}
                    </SelectItem>
                ))}
            </Select> */}

            <Input
                type="date"
                label="Fecha Desde"
                value={filters.dateFrom}
                onChange={(e) => onFilterChange("dateFrom", e.target.value)}
            />

            <Input
                type="date"
                label="Fecha Hasta"
                value={filters.dateTo}
                onChange={(e) => onFilterChange("dateTo", e.target.value)}
            />
        </CardBody>
    </Card>
);

export default EmployeeFilters;
