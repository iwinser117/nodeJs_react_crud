import React, { useState } from 'react';
import EmployeeDetailsCard from '../app/components/employee/employeeDetailsCard';
import EmployeeFilters from '../app/components/employee/employeeFilters';
import EmployeeRequestsTable from '../app/components/employee/employeeRequestsTable';
import CreateRequestModal from '../app/components/employee/createRequestModal';
import "../app/globals.css";

const Employee = () => {
    const employeeDetails = {
        id: 'EMP001',
        name: 'Juan Pérez',
        hireDate: '2023-05-15',
        salary: 45000
    };

    const [requestsData, setRequestsData] = useState([
        { id: 'REQ001', code: 'VAC-2024', description: 'Solicitud de vacaciones', summary: 'Vacaciones de verano', status: 'Pendiente', type: 'Vacaciones', date: '2024-06-15' },
        { id: 'REQ002', code: 'PER-2024', description: 'Permiso personal', summary: 'Trámite familiar', status: 'Aprobado', type: 'Permiso', date: '2024-05-20' },
        //y mucho mas
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newRequest, setNewRequest] = useState({ type: '', description: '', summary: '' });

    const [filters, setFilters] = useState({ status: '', type: '', dateFrom: '', dateTo: '' });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const filteredRequests = requestsData.filter((request) => (
        (!filters.status || request.status === filters.status) &&
        (!filters.type || request.type === filters.type) &&
        (!filters.dateFrom || request.date >= filters.dateFrom) &&
        (!filters.dateTo || request.date <= filters.dateTo)
    ));

    const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);

    const paginatedRequests = filteredRequests.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleFilterChange = (field, value) => {
        setFilters((prev) => ({ ...prev, [field]: value }));
        setCurrentPage(1); // Reinicia la página al aplicar filtros
    };

    const handleRequestChange = (field, value) => {
        setNewRequest((prev) => ({ ...prev, [field]: value }));
    };

    const handleCreateRequest = () => {
        const newRequestObj = {
            id: `REQ${requestsData.length + 1}`,
            code: `${newRequest.type.slice(0, 3).toUpperCase()}-${new Date().getFullYear()}`,
            ...newRequest,
            status: 'Pendiente',
            date: new Date().toISOString().split('T')[0]
        };

        setRequestsData([...requestsData, newRequestObj]);
        setIsModalOpen(false);
        setNewRequest({ type: '', description: '', summary: '' });
    };

    return (
        <div className="employee-dashboard p-4">
            <EmployeeDetailsCard
                employeeDetails={employeeDetails}
                onCreateRequest={() => setIsModalOpen(true)}
            />
            <EmployeeFilters filters={filters} onFilterChange={handleFilterChange} />
            <EmployeeRequestsTable
                requests={paginatedRequests}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
            <CreateRequestModal
                isOpen={isModalOpen}
                onOpenChange={setIsModalOpen}
                newRequest={newRequest}
                onRequestChange={handleRequestChange}
                onCreateRequest={handleCreateRequest}
            />
        </div>
    );
};

export default Employee;
