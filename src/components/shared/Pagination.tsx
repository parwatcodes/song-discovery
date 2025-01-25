import React from 'react';
import styled from 'styled-components';

const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
  gap: 10px
`;

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  perPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, perPage, totalItems, onPageChange }) => {

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {

      onPageChange(page);
    }
  };

  return (
    <PaginationContainer>
      <button onClick={() => handlePageChange(currentPage - 1)}>
        Previous
      </button>
      {currentPage} / {totalPages}
      <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        Next
      </button>
      <div>({currentPage * perPage} of {totalItems})</div>
    </PaginationContainer>
  );
};

export default Pagination;
