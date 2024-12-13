import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/router';

import { AdminHeader } from '../app/components/admin/adminHeader';
import { EmployeeFilters } from '../app/components/admin/employeeFilters';
import { EmployeeTable } from '../app/components/admin/employeeTable';
import { EmployeeRequestsModal } from '../app/components/admin/employeeRequestsModal';
import { CreateEmployeeModal } from '../app/components/admin/createEmployeeModal';
import { CreateRequestModal } from '../app/components/admin/createRequestModal';
import { useAuth } from '../contexts/authContext'; 

import "../app/globals.css";

const AdminDashboard = () => {
    const router = useRouter();
    const [token, setToken] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [userData, setUserData] = useState(null);
    const { isTokenExpired, logout } = useAuth();

    useEffect(() => {
        if (isTokenExpired()) {
          alert("Sesión terminada. Por favor, inicia sesión de nuevo.");
          if(router.pathname === '/admin-dashboard'){
              logout();
          }
        }
      }, []);
    const [adminDetails, setAdminDetails] = useState({
        id: '',
        name: '',
        email: '',
        role: ''
    });

    const [employeesData, setEmployeesData] = useState([]);
    const [requestsData, setRequestsData] = useState([]);

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
    const [totalPages, setTotalPages] = useState(0);
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
        console.log(userRole)
        if (userRole && userRole !== 'administrator') {
            console.log(userRole)
            router.push('/'); 
        }
    }, [userRole]);
    // Fetch admin details
    const fetchAdminDetails = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/user`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            if (response.ok) {
                const data = await response.json();
                setAdminDetails(data.user);
            } else {
                console.error('Error fetching admin details:', response.status);
            }
        } catch (error) {
            console.error('Error fetching admin details:', error);
        }
    };

    const fetchEmployeesData = async () => {
        try {
            const queryParams = new URLSearchParams({
                page: currentPage,
                limit: 5,
                name: filters.employeeName,
                salaryMin: filters.salaryMin,
                salaryMax: filters.salaryMax
            });

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/users`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.ok) {
                const { users, total, page, limit } = await response.json();

                const transformedEmployees = users.map(user => ({
                    ...user,
                    totalRequests: user.requests.length,
                    requestDetails: [{
                        type: 'Solicitudes',
                        pending: user.requests.filter(r => r.status === 'pending').length,
                        approved: user.requests.filter(r => r.status === 'approved').length
                    }]
                }));

                setEmployeesData(transformedEmployees);
                setTotalPages(Math.ceil(total / limit));
                setCurrentPage(page);
            } else {
                console.error('Error fetching employees:', response.status);
            }
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    const fetchRequestsData = async () => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/requests`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.ok) {
                const { data } = await response.json();
                const transformedRequests = data.map(request => ({
                    id: request.id,
                    employeeId: request.userId,
                    employeeName: employeesData.find(e => e.id === request.userId)?.name || 'Unknown',
                    type: request.title,
                    status: request.status,
                    date: request.createdAt
                }));

                setRequestsData(transformedRequests);
            } else {
                console.error('Error fetching requests:', response.status);
            }
        } catch (error) {
            console.error('Error fetching requests:', error);
        }
    };

    useEffect(() => {
        if (token) {
            fetchAdminDetails();
            fetchEmployeesData();
            fetchRequestsData();
        }
    }, [token, currentPage, filters]);

    const filteredEmployees = useMemo(() => {
        return employeesData.filter(employee => {
            const matchEmployeeId = !filters.employeeId ||
                employee.id.toString().toLowerCase().includes(filters.employeeId.toLowerCase());

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
        setCurrentPage(1);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleViewRequests = (employeeId) => {
        setSelectedEmployeeId(employeeId);
        setIsRequestDetailsModalOpen(true);
    };

    const handleCreateEmployee = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(newEmployee)
            });

            if (response.ok) {
                fetchEmployeesData();
                setIsEmployeeModalOpen(false);
                setNewEmployee({
                    name: '',
                    email: '',
                    role: '',
                    salary: ''
                });
            } else {
                console.error('Error creating employee:', response.status);
            }
        } catch (error) {
            console.error('Error creating employee:', error);
        }
    };

    const handleCreateRequest = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/requests`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(newRequest)
            });

            if (response.ok) {
                fetchRequestsData();
                setIsRequestModalOpen(false);
                setNewRequest({
                    employeeId: '',
                    type: '',
                    description: ''
                });
            } else {
                console.error('Error creating request:', response.status);
            }
        } catch (error) {
            console.error('Error creating request:', error);
        }
    };

    const handleDeleteRequests = async () => {
        try {
            const deletePromises = selectedRequests.map(requestId =>
                fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/requests/${requestId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                })
            );

            const responses = await Promise.all(deletePromises);

            // Check if all deletions were successful
            const allSuccessful = responses.every(response => response.ok);

            if (allSuccessful) {
                fetchRequestsData();
                setSelectedRequests([]);
            } else {
                console.error('Error deleting some requests');
            }
        } catch (error) {
            console.error('Error deleting requests:', error);
        }
    };

    const handleEmployeeChange = (field, value) => {
        setNewEmployee((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleRequestChange = (field, value) => {
        setNewRequest((prev) => ({
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
                employees={filteredEmployees}
                currentPage={currentPage}
                totalPages={totalPages}
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