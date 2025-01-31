import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as regularBookmark } from '@fortawesome/free-regular-svg-icons';
import { faBookmark as solidBookmark, faChevronLeft, faExternalLinkSquare } from '@fortawesome/free-solid-svg-icons';

import useFavorite from '../hooks/useFavorite';

import { getAlbum } from '../services/albums';
import { BookmarkIcon } from '../styles/common.styles';

import Loader from '../components/shared/Loader';
import StarComponent from '../components/shared/Star';
import { AlbumTitle, Card, Headline, Text, CoverImage, TrackName } from '../styles/common.styles';
import { DetailItem, ItemWrapper, DetailWrapper, GoBack } from '../styles/AlbumCard.styles';

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

    React.useEffect(() => {
      document.title = 'Songs discovery | Album';
    }, []);

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
    <React.Fragment>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'column'
      }}>
        <GoBack onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon={faChevronLeft} size='3x' />
          <Headline>Go Back</Headline>
        </GoBack>

        <div style={{ display: 'flex', gap: '40px', margin: '40px 0' }}>
          <ItemWrapper>
            <DetailItem>
              <span>Album:</span>
              <h1>{data.title}</h1>
            </DetailItem>
            <DetailItem>
              <span>Artist:</span>
              {data.artists.map((artist) => (
                <div
                  key={artist.id}
                  onClick={() => handleOnArtistClick(artist.id)}
                >
                  {artist.name}
                  <FontAwesomeIcon icon={faExternalLinkSquare} />
                </div>
              ))}
            </DetailItem>
            <DetailItem>
              <span>Released Date:</span>
              <h1>{data.released_formatted || 'N/A'}</h1>
            </DetailItem>
            <DetailItem>
              <span>Country:</span>
              <h1>{data.country}</h1>
            </DetailItem>
            <DetailItem>
              <span>Genres:</span>
              <h1>{data.genres.join(", ")}</h1>
            </DetailItem>
            <DetailItem>
              <span>Labels:</span>
              {data.labels.map((label) => (
                <h1
                  key={label.id}
                >
                  {label.name}
                </h1>
              ))}
            </DetailItem>
          </ItemWrapper>

          <ItemWrapper>
            <DetailItem>
              <span>Tracks:</span>
              {data.tracklist.map((track, idx) => (
                <TrackName key={track.id}> {idx + 1}. {track.title}</TrackName>
              ))}
            </DetailItem>
          </ItemWrapper>
          <Card>
            <CoverImage src={data.thumb} alt={data.title} />
            <DetailWrapper>
              <AlbumTitle>{data.title}</AlbumTitle>
              <Text>{data.year}</Text>
              <Text>{data.country}</Text>
              <Text>{data.description}</Text>
              <StarComponent value={data.community.rating.average} />
            </DetailWrapper>
            <BookmarkIcon onClick={(event: React.MouseEvent) => {
              event.stopPropagation();
              handleBookmarkClick(data.id, data);
            }}>
              {isAlbumFavorite(data.id) ? <FontAwesomeIcon icon={solidBookmark} color="#FFD700" /> : <FontAwesomeIcon icon={regularBookmark} size='2xs' />}
            </BookmarkIcon>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AlbumDetails;
