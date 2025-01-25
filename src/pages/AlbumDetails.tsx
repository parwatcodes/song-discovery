import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { getAlbum } from '../services/albums';
import { BookmarkIcon } from '../styles/common.styles';

import Loader from '../components/Loader';
import { Title } from '../styles/common.styles';
import { Card, CoverImage, Text, AlbumDetailsWrapper, ArtistName } from '../styles/AlbumCard.styles';

const AlbumDetails = () => {
  const navigate = useNavigate();
  const [bookmarked, setBookmarked] = React.useState(false);

  const { id } = useParams<{ id: string; }>();
  const { data, error, isLoading } = useQuery({
    queryKey: ['album', id],
    queryFn: () => getAlbum(id!),
  });

  const handleOnArtistClick = (id) => {
    navigate(`/artists/${id}`);
  };

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the album click
    setBookmarked(!bookmarked);
  };

  if (isLoading) return <Loader />;
  if (error) return <div>Error loading album details</div>;

  return (
    <AlbumDetailsWrapper style={{
      justifyContent: 'space-evenly',
      flexDirection: 'row'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        margin: '10px'
      }}>
        <h1>Album: {data.title}</h1>
        <h1>Released: {data.released}</h1>
        <h1>Genre: {data.genres.join(", ")}</h1>
        <h1>Artist: { }
          {data.artists.map((artist) => (
            <ArtistName
              key={artist.id}
              onClick={() => handleOnArtistClick(artist.id)}
            >
              {artist.name}
            </ArtistName>
          ))}
        </h1>
      </div>
      <Card>
        <CoverImage src={data.thumb} alt={data.title} />
        <Title>{data.title}</Title>
        <Text>{data.year}</Text>
        <Text>{data.country}</Text>
        <Text>{data.description}</Text>
      <BookmarkIcon onClick={handleBookmarkClick}>
        {bookmarked ? '❤️' : '🤍'}
      </BookmarkIcon>
      </Card>
    </AlbumDetailsWrapper>
  );
};

export default AlbumDetails;
