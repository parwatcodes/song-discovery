import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as solidBookmark } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as regularBookmark } from '@fortawesome/free-regular-svg-icons';

import useFavorite from '../hooks/useFavorite';

import Loader from '../components/shared/Loader';
import { getArtistAlbums } from '../services/albums';
import Pagination from '../components/shared/Pagination';
import { DetailWrapper } from '../styles/AlbumCard.styles';
import { BookmarkIcon, AlbumTitle as Title, Card, CardWrapper, Headline, Text, CoverImage, Container as ArtistContainer } from '../styles/common.styles';

const ArtistAlbums = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = React.useState(1);
  const {
    isAlbumFavorite,
    addAlbumToFavorites,
    removeAlbumFromFavorites,
  } = useFavorite();
  const itemsPerPage = 30;

  const { id } = useParams<{ id: string; }>();
  const { data, error, isLoading } = useQuery({
    queryKey: ['album', id, currentPage],
    queryFn: () => getArtistAlbums(id!, {
      page: currentPage,
      per_page: itemsPerPage,
    }),
  });

  React.useEffect(() => {
    document.title = 'Songs discovery | Artist Albums';
  }, []);

  const handleBookmarkClick = (id, album) => {
    if (isAlbumFavorite(id)) {
      removeAlbumFromFavorites(id);
    } else {
      console.log('addAlbumToFavorites', id);
      addAlbumToFavorites(id, album);
    }
  };
  if (isLoading) return <Loader />;
  if (error) return <div>Error loading album details</div>;

  return (
    <ArtistContainer>
      <Headline>Artist: {data?.releases[0].artist}</Headline>
      <Pagination
        currentPage={data?.pagination?.page}
        totalPages={data?.pagination?.pages}
        onPageChange={setCurrentPage}
        perPage={data?.pagination?.per_page}
        totalItems={data?.pagination?.items}
      />
      <CardWrapper>
        {data.releases.map((release: any) => (
          <Card key={release.id} onClick={() => navigate(`/albums/${release.id}`)}>
            <CoverImage src={release.thumb} alt={release.title} />
            <DetailWrapper>
              <Title>{release.title}</Title>
              <Text>{release.year}</Text>
              <Text>{release.label}</Text>
            </DetailWrapper>
            <BookmarkIcon onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              handleBookmarkClick(release.id, release);
            }}>
              {isAlbumFavorite(release.id) ? <FontAwesomeIcon icon={solidBookmark} color="#FFD700" /> : <FontAwesomeIcon icon={regularBookmark} size='2xs' />}
            </BookmarkIcon>
          </Card>

        ))}
      </CardWrapper>
    </ArtistContainer>
  );
};

export default ArtistAlbums;
