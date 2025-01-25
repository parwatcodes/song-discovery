import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as solidBookmark } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as regularBookmark } from '@fortawesome/free-regular-svg-icons';

import useFavorite from '../hooks/useFavorite';

import { getAlbum } from '../services/albums';
import { BookmarkIcon } from '../styles/common.styles';

import Loader from '../components/shared/Loader';
import { AlbumTitle, Card, Headline } from '../styles/common.styles';
import { CoverImage, Text, ArtistName, DetailItem, ItemWrapper, DetailWrapper } from '../styles/AlbumCard.styles';

const AlbumDetails = () => {
  const navigate = useNavigate();
  const {
    isAlbumFavorite,
    addAlbumToFavorites,
    removeAlbumFromFavorites,
  } = useFavorite();
  const { id } = useParams<{ id: string; }>();
  const { data, error, isLoading } = useQuery({
    queryKey: ['album', id],
    queryFn: () => getAlbum(id!),
  });

  const handleOnArtistClick = (id) => {
    navigate(`/artists/${id}/albums`);
  };

  const handleBookmarkClick = (id, album) => {
    if (isAlbumFavorite(id)) {
      removeAlbumFromFavorites(id);
    } else {
      addAlbumToFavorites(id, album);
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <div>Error loading album details</div>;

  return (
    <>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'column'
      }}>
        {/* <Headline>Album Details</Headline> */}

        <div style={{ display: 'flex', gap: '40px', marginTop: '40px' }}>
          <ItemWrapper>
            <DetailItem>
              <span>Album:</span>
              <h1>{data.title}</h1>
            </DetailItem>
            <DetailItem>
              <span>Released:</span>
              <h1>{data.released}</h1>
            </DetailItem>
            <DetailItem>
              <span>Country:</span>
              <h1>{data.country}</h1>
            </DetailItem>
            <DetailItem>
              <span>Genres:</span>
              <h1>{data.genres.join(", ")}</h1>
            </DetailItem>
            <div>
              <span>Artist:</span>
              {data.artists.map((artist) => (
                <ArtistName
                  key={artist.id}
                  onClick={() => handleOnArtistClick(artist.id)}
                >
                  {artist.name}
                </ArtistName>
              ))}
            </div>
          </ItemWrapper>
          <Card>
            <CoverImage src={data.thumb} alt={data.title} />
            <DetailWrapper>
              <AlbumTitle>{data.title}</AlbumTitle>
              <Text>{data.year}</Text>
              <Text>{data.country}</Text>
              <Text>{data.description}</Text>
            </DetailWrapper>
            <BookmarkIcon onClick={(event: React.MouseEvent) => {
              event.stopPropagation();
              handleBookmarkClick(data.id, data);
            }}>
              {isAlbumFavorite(data.id) ? <FontAwesomeIcon icon={solidBookmark} color="#FFD700" /> : <FontAwesomeIcon icon={regularBookmark} color="#AAAAAA" />}
            </BookmarkIcon>
          </Card>
        </div>
      </div>
    </>

  );
};

export default AlbumDetails;
