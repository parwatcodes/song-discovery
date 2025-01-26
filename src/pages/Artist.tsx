import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as solidBookmark } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as regularBookmark } from '@fortawesome/free-regular-svg-icons';

import useFavorite from '../hooks/useFavorite';

import Loader from '../components/shared/Loader';
import { getArtists } from '../services/artists';
import Pagination from '../components/shared/Pagination';
import { DetailWrapper } from '../styles/AlbumCard.styles';
import { Card, CardWrapper, Headline, BookmarkIcon, CoverImage, ArtistName } from '../styles/common.styles';

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

  React.useEffect(() => {
    document.title = 'Songs discovery | Artists';
  }, []);

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
            <CoverImage src={artist.cover_image} alt={artist.title} />
            <DetailWrapper>
              <ArtistName>{artist.title}</ArtistName>
            </DetailWrapper>
            <BookmarkIcon onClick={(event: React.MouseEvent) => {
              event.stopPropagation();
              handleBookmarkClick(artist.id, artist);
            }}>
              {isArtistFavorite(artist.id) ? <FontAwesomeIcon icon={solidBookmark} color="#FFD700" /> : <FontAwesomeIcon icon={regularBookmark} size='2xs' />}
            </BookmarkIcon>
          </Card>
        ))}
      </CardWrapper>
    </>
  );
};

export default ArtistList;
