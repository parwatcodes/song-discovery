import { useState } from 'react';

const useFilters = (initialFilters: any) => {
  const [filters, setFilters] = useState(initialFilters);

  const resetFilters = (newFilters?: any) => {
    setFilters(newFilters || initialFilters);
  };

  return { filters, setFilters, resetFilters };
};

export default useFilters;
