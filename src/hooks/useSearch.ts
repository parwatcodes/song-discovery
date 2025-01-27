import { useState, useEffect } from 'react';

const useSearch = (initialSearchText: string = '', debounceDelay: number = 500) => {
  const [searchText, setSearchText] = useState(initialSearchText);
  const [debouncedSearchText, setDebouncedSearchText] = useState(initialSearchText);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, debounceDelay);

    return () => {
      clearTimeout(handler);
    };
  }, [searchText, debounceDelay]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return {
    searchText,
    debouncedSearchText,
    handleSearchChange,
  };
};

export default useSearch;
