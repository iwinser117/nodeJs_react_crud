import React, { useEffect, useState } from 'react';
import EmployeeDetailsCard from '../app/components/employee/employeeDetailsCard';
import EmployeeFilters from '../app/components/employee/employeeFilters';
import EmployeeRequestsTable from '../app/components/employee/employeeRequestsTable';
import CreateRequestModal from '../app/components/employee/createRequestModal';
import { useRouter } from 'next/router';

import "../app/globals.css";

const Employee = () => {
    const [employeeDetails, setEmployeeDetails] = useState({
        id: 'EMP001',
        name: 'Juan Pérez',
        hireDate: '2023-05-15',
        salary: 45000
    });

    const [requestsData, setRequestsData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newRequest, setNewRequest] = useState({ 
        title: '', 
        description: '', 
        status: 'pending' 
    });
    const [filters, setFilters] = useState({ 
        status: '', 
        type: '', 
        dateFrom: '', 
        dateTo: '' 
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [token, setToken] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [userData, setUserData] = useState(null);
    const [totalPages, setTotalPages] = useState(0);
    const [totalRequests, setTotalRequests] = useState(0);
    const itemsPerPage = 10;
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const authToken = localStorage.getItem('authToken');
            const role = localStorage.getItem('userRole');
            const user = JSON.parse(localStorage.getItem('userData'));
            
            setToken(authToken);
            setUserRole(role);
            setUserData(user);
            if (!authToken) {
                router.push('/');
            }
        }
    }, []);

    useEffect(() => {
        if (userRole && userRole !== 'employee') {
            router.push('/'); // Redirige si el rol no es empleado
        }
    }, [userRole]);

    // Fetch employee details
    const fetchEmployeeData = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/user`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            if (response.ok) {
                const data = await response.json();
                setEmployeeDetails(data.user);
            } else {
                console.error('Error fetching employee details:', response.status);
            }
        } catch (error) {
            console.error('Error fetching employee details:', error);
        }
    };

    const fetchRequestsData = async () => {
        try {
            // Construir parámetros de consulta para la paginación y los filtros
            const queryParams = new URLSearchParams({
                page: currentPage,
                limit: itemsPerPage,
                status: filters.status,
                type: filters.type,
                dateFrom: filters.dateFrom,
                dateTo: filters.dateTo
            });

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/requests?${queryParams}`, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            
            if (response.ok) {
                const { total, page, limit, data } = await response.json();
                
                setRequestsData(data);
                setTotalRequests(total);
                setTotalPages(Math.ceil(total / limit));
                setCurrentPage(page);
            } else {
                console.error('Error fetching requests:', response.status);
            }
        } catch (error) {
            console.error('Error fetching requests:', error);
        }
    };

    useEffect(() => {
        if (token) {
            fetchEmployeeData();
            fetchRequestsData();
        }
    }, [token, currentPage, filters]);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleFilterChange = (field, value) => {
        setFilters((prev) => ({ ...prev, [field]: value }));
        setCurrentPage(1); // Reset to first page when filters change
    };

    const handleRequestChange = (field, value) => {
        setNewRequest((prev) => ({ ...prev, [field]: value }));
    };

    const handleCreateRequest = async () => {
        const newRequestObj = {
            title: newRequest.title,
            description: newRequest.description,
            status: newRequest.status,
            userId: userData.id,
            createdAt: new Date().toISOString().split('T')[0]
        };

        try {
            const response = await fetch('http://localhost:3000/api/requests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(newRequestObj)
            });

            if (response.ok) {
                fetchRequestsData();
                setIsModalOpen(false);
                setNewRequest({ title: '', description: '', status: 'pending' });
            } else {
                console.error('Error creating request:', response.status);
            }
        } catch (error) {
            console.error('Error creating request:', error);
        }
    };

    const filteredRequests = requestsData.filter((request) => (
        (!filters.status || request.status === filters.status) &&
        (!filters.dateFrom || request.date >= filters.dateFrom) &&
        (!filters.dateTo || request.date <= filters.dateTo)
    ));

    return (
        <div className="employee-dashboard p-4">
            <EmployeeDetailsCard
                employeeDetails={employeeDetails}
                onCreateRequest={() => setIsModalOpen(true)}
            />
            <EmployeeFilters 
                filters={filters} 
                onFilterChange={handleFilterChange} 
            />
            <EmployeeRequestsTable
                requests={filteredRequests}  // Pasar solicitudes filtradas
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
