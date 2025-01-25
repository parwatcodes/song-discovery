import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import useFavorite from '../hooks/useFavorite';

import { getArtistAlbums } from '../services/albums';
import Pagination from '../components/Pagination';
import { BookmarkIcon, Title } from '../styles/common.styles';
import { Card, CoverImage, Text, AlbumDetailsWrapper, DetailWrapper } from '../styles/AlbumCard.styles';

const ArtistDetails = () => {
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
    queryFn: () => getArtistAlbums(id!),
  });

  const handleBookmarkClick = (id, album) => {
    if (isAlbumFavorite(id)) {
      removeAlbumFromFavorites(id);
    } else {
      console.log('addAlbumToFavorites', id);
      addAlbumToFavorites(id, album);
    }
  };
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading album details</div>;

  return (
    <AlbumDetailsWrapper>
      <div style={{
        alignSelf: 'flex-start',
        margin: '10px'
      }}>
        <h1>Artist: {data?.releases[0].artist}</h1>
        <Pagination
          currentPage={data?.pagination?.page}
          totalPages={data?.pagination?.pages}
          onPageChange={setCurrentPage}
          perPage={data?.pagination?.per_page}
          totalItems={data?.pagination?.items}
        />
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {data.releases.map((release: any) => (
          <Card key={release.id} onClick={() => navigate(`/album/${release.id}`)}>
            <CoverImage src={release.thumb} alt={release.title} />
            <DetailWrapper>
              <Title>{release.title}</Title>
              <Text>{release.year}</Text>
              <Text>{release.label}</Text>
            </DetailWrapper>
            <BookmarkIcon onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              handleBookmarkClick(release.id, release)
            }}>
              {isAlbumFavorite(release.id) ? '❤️' : '🤍'}
            </BookmarkIcon>
          </Card>

        ))}
      </div>
    </AlbumDetailsWrapper>
  );
};

export default ArtistDetails;
