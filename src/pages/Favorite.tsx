import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as solidBookmark } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as regularBookmark } from '@fortawesome/free-regular-svg-icons';

import useFavorite from '../hooks/useFavorite';
import Message from '../components/shared/Message';
import { Headline, CardWrapper, Card, AlbumTitle as Title, BookmarkIcon, CoverImage } from '../styles/common.styles';

const Favorite = () => {
  const navigate = useNavigate();
  const {
    favorites,
    isAlbumFavorite,
    isArtistFavorite,
    removeArtistFromFavorites,
    removeAlbumFromFavorites,
  } = useFavorite();

  React.useEffect(() => {
    document.title = 'Songs discovery | Favorites';
  }, []);

  const handleAlbumClick = (id: string) => {
    navigate(`/albums/${id}`);
  };

  const handleArtistClick = (id: string) => {
    navigate(`/artists/${id}/albums`);
  };

  const handleAlbumBookmarkClick = (id) => {
    removeAlbumFromFavorites(id);
  };

  const handleArtistBookmarkClick = (id) => {
    removeArtistFromFavorites(id);
  };

  if (favorites.albums.length === 0 && favorites.artists.length === 0) {
    return <Message message='No favorites!' />;
  }

  return (
    <React.Fragment>
      {!!favorites.albums.length && (
        <React.Fragment>
          <div style={{
            alignSelf: 'flex-start',
            marginBottom: '20px',
          }}>
            <Headline>Favorite Albums ({favorites.albums.length})</Headline>
          </div>
          <CardWrapper>
            {favorites.albums.map((album) => (
              <Card key={album.id} onClick={() => handleAlbumClick(album.id)}>
                <CoverImage src={album.thumb} alt={album.title} />
                <Title>{album.title}</Title>
                <BookmarkIcon onClick={(event: React.MouseEvent) => {
                  event.stopPropagation();
                  handleAlbumBookmarkClick(album.id);
                }}>
                  {isAlbumFavorite(album.id) ? <FontAwesomeIcon icon={solidBookmark} color="#FFD700" /> : <FontAwesomeIcon icon={regularBookmark} color="#AAAAAA" />}
                </BookmarkIcon>
              </Card>
            ))}
          </CardWrapper>
        </React.Fragment>
      )}
      {!!favorites.artists.length && (
        <React.Fragment>
          <div style={{
            alignSelf: 'flex-start',
            margin: '20px 0',
          }}>
            <Headline>Favorite Artists ({favorites.artists.length})</Headline>
          </div>
          <CardWrapper>
            {favorites.artists.map((artist) => (
              <Card key={artist.id} onClick={() => handleArtistClick(artist.id)}>
                <CoverImage src={artist.thumb} alt={artist.title} />
                <Title>{artist.title}</Title>
                <BookmarkIcon onClick={(event: React.MouseEvent) => {
                  event.stopPropagation();
                  handleArtistBookmarkClick(artist.id);
                }}>
                  {isArtistFavorite(artist.id) ? <FontAwesomeIcon icon={solidBookmark} color="#FFD700" /> : <FontAwesomeIcon icon={regularBookmark} color="#AAAAAA" />}
                </BookmarkIcon>
              </Card>
            ))}
          </CardWrapper>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Favorite;
