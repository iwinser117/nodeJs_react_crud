import React from 'react';

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <div className="pagination flex justify-center items-center space-x-2 mt-4">
            <button 
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className="pagination-button"
            >
                Anterior
            </button>
            {[...Array(totalPages)].map((_, index) => (
                <button 
                    key={index}
                    onClick={() => onPageChange(index + 1)}
                    className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
                >
                    {index + 1}
                </button>
            ))}
            <button 
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="pagination-button"
            >
                Siguiente
            </button>
        </div>
    );
};

export default Pagination;
