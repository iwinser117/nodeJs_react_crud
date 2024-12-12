import React, { useState, useMemo, useEffect } from 'react';

import { AdminHeader } from '../app/components/admin/adminHeader';
import { EmployeeFilters } from '../app/components/admin/employeeFilters';
import { EmployeeTable } from '../app/components/admin/employeeTable';
import { EmployeeRequestsModal } from '../app/components/admin/employeeRequestsModal';
import { CreateEmployeeModal } from '../app/components/admin/createEmployeeModal';
import { CreateRequestModal } from '../app/components/admin/createRequestModal';

import "../app/globals.css";


const AdminDashboard = () => {
    // Datos simulados del administrador
    const adminDetails = {
        id: 'ADM001',
        name: 'María Rodríguez',
        email: 'maria.rodriguez@empresa.com',
        role: 'Administrador General'
    };

    // data de prueba
    const [employeesData, setEmployeesData] = useState([
        {
            id: 'EMP001',
            name: 'Juan Pérez',
            email: 'juan.perez@empresa.com',
            role: 'Desarrollador',
            salary: 45000,
            totalRequests: 5,
            requestDetails: [
                { type: 'Vacaciones', pending: 2, approved: 3 }
            ]
        },
        {
            id: 'EMP002',
            name: 'Ana Gómez',
            email: 'ana.gomez@empresa.com',
            role: 'Diseñadora',
            salary: 42000,
            totalRequests: 3,
            requestDetails: [
                { type: 'Permiso', pending: 1, approved: 2 }
            ]
        },
    ]);

    // posibles estados de las oslicitudes
    const [requestsData, setRequestsData] = useState([
        {
            id: 'REQ001',
            employeeId: 'EMP001',
            employeeName: 'Juan Pérez',
            type: 'Vacaciones',
            status: 'Pendiente',
            date: '2024-06-15'
        }, {
            id: 'REQ002',
            employeeId: 'EMP002',
            employeeName: 'Ana Gómez',
            type: 'Vacaciones',
            status: 'Pendiente',
            date: '2024-06-15'
        }
    ]);

    // filtros
    const [filters, setFilters] = useState({
        employeeId: '',
        employeeName: '',
        salaryMin: '',
        salaryMax: '',
        requestType: '',
        requestCode: ''
    });

    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
    const [currentRequestPage, setCurrentRequestPage] = useState(1);
    const [selectedRequests, setSelectedRequests] = useState([]);



    const [currentPage, setCurrentPage] = useState(1);
    const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
    const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
    const [isRequestDetailsModalOpen, setIsRequestDetailsModalOpen] = useState(false);
    const [newEmployee, setNewEmployee] = useState({
        name: '',
        email: '',
        role: '',
        salary: ''
    });
    const [newRequest, setNewRequest] = useState({
        employeeId: '',
        type: '',
        description: ''
    });

    // filtrar aqui los empleados, testear proceso AQUIIII
    const filteredEmployees = useMemo(() => {
        return employeesData.filter(employee => {
            const matchEmployeeId = !filters.employeeId ||
                employee.id.toLowerCase().includes(filters.employeeId.toLowerCase());

            const matchEmployeeName = !filters.employeeName ||
                employee.name.toLowerCase().includes(filters.employeeName.toLowerCase());

            const matchSalary =
                (!filters.salaryMin || employee.salary >= parseFloat(filters.salaryMin)) &&
                (!filters.salaryMax || employee.salary <= parseFloat(filters.salaryMax));

            return matchEmployeeId && matchEmployeeName && matchSalary;
        });
    }, [employeesData, filters]);

    const handleFilterChange = (filterName, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [filterName]: value,
        }));
    };

    // paginas de 5 en 5
    const rowsPerPage = 5;
    const pages = Math.ceil(filteredEmployees.length / rowsPerPage);
    const displayedEmployees = useMemo(() => {
        const start = (currentPage - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return filteredEmployees.slice(start, end);
    }, [currentPage, filteredEmployees]);

    // Función para crear nuevo empleado
    const handleCreateEmployee = () => {
        const newEmployeeObj = {
            id: `EMP${employeesData.length + 1}`,
            ...newEmployee,
            totalRequests: 0,
            requestDetails: []
        };

        setEmployeesData([...employeesData, newEmployeeObj]);
        setIsEmployeeModalOpen(false);
        setNewEmployee({
            name: '',
            email: '',
            role: '',
            salary: ''
        });
    };

    // esto para crear nueva solicitud
    const handleCreateRequest = () => {
        const newRequestObj = {
            id: `REQ${requestsData.length + 1}`,
            ...newRequest,
            employeeName: employeesData.find(e => e.id === newRequest.employeeId)?.name,
            status: 'Pendiente',
            date: new Date().toISOString().split('T')[0], // Fecha actual
        };

        setRequestsData([...requestsData, newRequestObj]);
        setIsRequestModalOpen(false);
        setNewRequest({
            employeeId: '',
            type: '',
            description: ''
        });
    };


    const handleRequestChange = (field, value) => {
        setNewRequest((prev) => ({
            ...prev,
            [field]: value,
        }));
    };


    // para eliminar solicitudes
    const handleDeleteRequests = () => {
        setRequestsData((prevRequests) =>
            prevRequests.filter(request => !selectedRequests.includes(request.id))
        );
        setSelectedRequests([]);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleViewRequests = (employeeId) => {
        setSelectedEmployeeId(employeeId);
        console.log(employeeId)
        console.log(isRequestDetailsModalOpen)
        setIsRequestDetailsModalOpen(true);
    };

    const handleEmployeeChange = (field, value) => {
        setNewEmployee((prev) => ({
            ...prev,
            [field]: value,
        }));
    };



    return (
        <div className="admin-dashboard p-4">
            <AdminHeader
                adminDetails={adminDetails}
                onCreateEmployee={() => setIsEmployeeModalOpen(true)}
                onCreateRequest={() => setIsRequestModalOpen(true)}
                onDeleteRequests={handleDeleteRequests}
            />
            <EmployeeFilters filters={filters} onFilterChange={handleFilterChange} />
            <EmployeeTable
                employees={displayedEmployees}
                currentPage={currentPage}
                totalPages={pages}
                onPageChange={handlePageChange}
                onViewRequests={handleViewRequests}
            />
            <EmployeeRequestsModal
                isOpen={isRequestDetailsModalOpen}
                onOpenChange={setIsRequestDetailsModalOpen}
                employeeId={selectedEmployeeId}
                employeesData={employeesData}
                requestsData={requestsData}
                currentRequestPage={currentRequestPage}
                onRequestPageChange={setCurrentRequestPage}
                selectedRequests={selectedRequests}
                onRequestSelect={setSelectedRequests}
                onDeleteSelectedRequests={handleDeleteRequests}
            />
            <CreateEmployeeModal
                isOpen={isEmployeeModalOpen}
                onOpenChange={setIsEmployeeModalOpen}
                newEmployee={newEmployee}
                onEmployeeChange={handleEmployeeChange}
                onCreateEmployee={handleCreateEmployee}
            />
            <CreateRequestModal
                isOpen={isRequestModalOpen}
                onOpenChange={setIsRequestModalOpen}
                newRequest={newRequest}
                employeesData={employeesData}
                onRequestChange={handleRequestChange}
                onCreateRequest={handleCreateRequest}
            />

        </div>
    );

}

export default AdminDashboard;