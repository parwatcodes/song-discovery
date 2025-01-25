import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import useFavorite from '../hooks/useFavorite';

import Loader from '../components/shared/Loader';
import { getArtists } from '../services/artists';
import { ArtistName } from '../styles/Artist.styles';
import { CoverImage } from '../styles/AlbumCard.styles';
import Pagination from '../components/shared/Pagination';
import { Card, CardWrapper, Headline, BookmarkIcon } from '../styles/common.styles';

const ArtistList = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 30;
  const {
    isArtistFavorite,
    addArtistToFavorites,
    removeArtistFromFavorites,
  } = useFavorite();

  const { data, error, isLoading } = useQuery({
    queryKey: ['artists', currentPage],
    queryFn: async () => {
      const artists = await getArtists({ type: 'artist', page: currentPage, per_page: itemsPerPage });
      return artists;
    }
  });

  const handleBookmarkClick = (id, artist) => {
    console.log('handleBookmarkClick', id, artist);
    if (isArtistFavorite(id)) {
      removeArtistFromFavorites(id);
    } else {
      addArtistToFavorites(id, artist);
    }
  };


  const handleOnArtistClick = (id: string) => {
    navigate(`/artists/${id}/albums`);
  };

  if (isLoading) return <Loader />;
  if (error) return <div>Error loading artists</div>;

  return (
    <>
      <div>
        <Headline>List of Artists</Headline>
        <Pagination
          currentPage={data?.pagination?.page}
          totalPages={data?.pagination?.pages}
          onPageChange={setCurrentPage}
          perPage={data?.pagination?.per_page}
          totalItems={data?.pagination?.items}
        />
      </div>
      <CardWrapper>
        {data?.results.map((artist: { id: string; name: string; cover_image: string; }) => (
          <Card key={artist.id} onClick={() => handleOnArtistClick(artist.id)}>
            <CoverImage src={artist.cover_image || artist.thumb} alt={artist.title} />
            <ArtistName>{artist.title}</ArtistName>
            <BookmarkIcon onClick={(event: React.MouseEvent) => {
              event.stopPropagation();
              handleBookmarkClick(artist.id, artist);
            }}>
              {isArtistFavorite(artist.id) ? '❤️' : '🤍'}
            </BookmarkIcon>
          </Card>
        ))}
      </CardWrapper>
    </>
  );
};

export default ArtistList;
