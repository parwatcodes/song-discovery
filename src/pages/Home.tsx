import React from 'react';
import { useQuery } from '@tanstack/react-query';

import Filter from './Filter';
import { getAlbums } from "../services/albums";
import AlbumCard from "../components/AlbumCard";
import Pagination from '../components/shared/Pagination';

import Loader from '../components/shared/Loader';
import Message from '../components/shared/Message';
import { CardWrapper, Headline } from '../styles/common.styles';

const Home = () => {
  const [searchText, setSearchText] = React.useState('');
  const [filters, setFilters] = React.useState({ country: 'Canada', year: '2024', type: 'release', genre: '' });
  const [debouncedSearchText, setDebouncedSearchText] = React.useState(searchText);
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 30;


  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [searchText]);

  React.useEffect(() => {
    document.title = 'Songs discovery | Albums'
  }, [])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleResetFilter = () => {
    setFilters({ country: '', year: '', type: 'release', genre: '' });
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ['albums', filters, debouncedSearchText, currentPage],
    queryFn: async () => {
      const albums = await getAlbums({
        type: filters.type,
        year: filters.year,
        genre: filters.genre,
        country: filters.country,
        searchText: debouncedSearchText,
        page: currentPage,
        per_page: itemsPerPage,
      });

      return albums;
    }
  });

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchText, filters.year, filters.genre, filters.country]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  if (isLoading) {
    return <Loader />;
  }

  const getFiltersString = () => {
    const filterStrings = [];
    if (filters.country) filterStrings.push(`${filters.country}`);
    if (filters.year) filterStrings.push(`${filters.year}`);
    if (filters.genre) filterStrings.push(`${filters.genre}`);

    return filterStrings.length > 0 && `${filterStrings.join(' / ')}`;
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <input
          id='search'
          type="text"
          placeholder='Search...'
          value={searchText}
          onChange={handleSearchChange}
        />
      </div>
      <Filter
        filters={filters}
        handleInputChange={handleInputChange}
        handleResetFilter={handleResetFilter}
      />
      <>
        <Headline>
          <p>{getFiltersString()}</p>
        </Headline>
        <Pagination
          currentPage={data?.pagination?.page}
          totalPages={data?.pagination?.pages}
          onPageChange={setCurrentPage}
          perPage={data?.pagination?.per_page}
          totalItems={data?.pagination?.items}
        />
        {data?.results?.length === 0 && (
          <Message message='No albums found!' />
        )}
        {data?.results && (
          <CardWrapper>
            {data.results.map((album: any) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </CardWrapper>

        )}
      </>
    </>
  );
};

export default Home;
