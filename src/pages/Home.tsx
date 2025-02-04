import React, { Suspense, lazy } from 'react';
import { useQuery } from '@tanstack/react-query';

import useSearch from '../hooks/useSearch';
import useFilters from '../hooks/useFilters';

import { getAlbums } from "../services/albums";
import Loader from '../components/shared/Loader';
import Message from '../components/shared/Message';
import { CardWrapper, Headline, Container as HomeContainer } from '../styles/common.styles';

const Filter = lazy(() => import('./Filter'));
const AlbumCard = lazy(() => import('../components/AlbumCard'));
const Pagination = lazy(() => import('../components/shared/Pagination'));

const Home = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 30;

  const { searchText, debouncedSearchText, handleSearchChange } = useSearch('', 1000);
  const { filters, setFilters, resetFilters } = useFilters({
    country: 'Canada',
    year: '2024',
    type: 'release',
    genre: ''
  });

  React.useEffect(() => {
    document.title = 'Songs discovery | Albums';
  }, []);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchText, filters.year, filters.genre, filters.country]);

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

  const getFiltersString = () => {
    const filterStrings = [];
    if (filters.country) filterStrings.push(`${filters.country}`);
    if (filters.year) filterStrings.push(`${filters.year}`);
    if (filters.genre) filterStrings.push(`${filters.genre}`);

    return filterStrings.length > 0 ? `${filterStrings.join(' / ')}` : '';
  };

  if (isLoading) return <Loader />;
  if (error) return <Message message="Error loading albums" />;

  return (
    <HomeContainer>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <input
          id='search'
          type="text"
          placeholder='Search albums...'
          value={searchText}
          onChange={handleSearchChange}
        />
      </div>
      <Suspense fallback={<Loader />}>
        <Filter
          filters={filters}
          handleInputChange={(e) => setFilters({ ...filters, [e.target.name]: e.target.value })}
          handleResetFilter={() => resetFilters({
            country: '',
            year: '',
            type: 'release',
            genre: ''
          })}
        />
      </Suspense>
      <Headline>
        {getFiltersString()}
      </Headline>
      <Suspense fallback={<Loader />}>
        <Pagination
          currentPage={data?.pagination?.page}
          totalPages={data?.pagination?.pages}
          onPageChange={setCurrentPage}
          perPage={data?.pagination?.per_page}
          totalItems={data?.pagination?.items}
        />
      </Suspense>
      {data?.results?.length === 0 && (
        <Message message='No albums found!' />
      )}
      <Suspense fallback={<Loader />}>
        {data?.results && (
          <CardWrapper>
            {data.results.map((album: any) => (
              <AlbumCard key={album.id} album={album} showCountry={!filters.country} />
            ))}
          </CardWrapper>
        )}
      </Suspense>
    </HomeContainer>
  );
};

export default Home;
