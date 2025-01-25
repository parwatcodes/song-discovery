import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import Loader from '../components/Loader';
import { getArtists } from '../services/artists';
import Pagination from '../components/Pagination';
import { ArtistName } from '../styles/Artist.styles';
import { Card, CoverImage, AlbumDetailsWrapper as ArtistDetailsWrapper } from '../styles/AlbumCard.styles';

const ArtistList = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 30;

  const { data, error, isLoading } = useQuery({
    queryKey: ['artists', currentPage],
    queryFn: async () => {
      const artists = await getArtists({ type: 'artist', page: currentPage, per_page: itemsPerPage });
      return artists;
    }
  });

  const handleOnArtistClick = (id: string) => {
    navigate(`/artists/${id}`);
  };

  if (isLoading) return <Loader />;
  if (error) return <div>Error loading artists</div>;

  return (
    <ArtistDetailsWrapper>
      <div style={{
        alignSelf: 'flex-start',
        margin: '10px'
      }}>
        <h1>List of Artists</h1>
        <Pagination
          currentPage={data?.pagination?.page}
          totalPages={data?.pagination?.pages}
          onPageChange={setCurrentPage}
          perPage={data?.pagination?.per_page}
          totalItems={data?.pagination?.items}
        />
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {data?.results.map((artist: { id: string; name: string; cover_image: string; }) => (
          <Card key={artist.id} onClick={() => handleOnArtistClick(artist.id)}>
            <CoverImage src={artist.cover_image || artist.thumb} alt={artist.title} />
            <ArtistName>{artist.title}</ArtistName>
          </Card>
        ))}
      </div>
    </ArtistDetailsWrapper>
  );
};

export default ArtistList;
