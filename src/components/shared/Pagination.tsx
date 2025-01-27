import React from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px
`;

const PaginationButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 100px;
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
      <PaginationButton onClick={() => handlePageChange(currentPage - 1)}>
        <FontAwesomeIcon icon={faChevronLeft} />
        Previous
      </PaginationButton>
      {currentPage} / {totalPages}
      <PaginationButton onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        Next
        <FontAwesomeIcon icon={faChevronRight} />
      </PaginationButton>
      <div>({currentPage * perPage} of {totalItems})</div>
    </PaginationContainer>
  );
};

export default Pagination;
