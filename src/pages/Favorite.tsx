
import { useNavigate } from 'react-router-dom';

import useFavorite from '../hooks/useFavorite';
import { Card, CoverImage } from '../styles/AlbumCard.styles';

import { Container, Headline, List, Title, BookmarkIcon } from '../styles/common.styles';

const Favorite = () => {
  const navigate = useNavigate();
  const {
    favorites,
    isAlbumFavorite,
    removeAlbumFromFavorites,
  } = useFavorite();

  const handleAlbumClick = (id: string) => {
    navigate(`/album/${id}`);
  };

  const handleBookmarkClick = (id) => {
    removeAlbumFromFavorites(id);
  };

  return (
    <Container>
      <div style={{
        alignSelf: 'flex-start',
      }}>
        <Headline>Favorite Albums</Headline>
      </div>
      <List>
        {!favorites.albums.length && (
          <Title>No favorite albums</Title>
        )}
        {favorites.albums.map((album) => (
          <Card key={album.id} onClick={() => handleAlbumClick(album.id)}>
            <CoverImage src={album.thumb} alt={album.title} />
            <Title>{album.title}</Title>
            <BookmarkIcon onClick={(event: React.MouseEvent) => {
              event.stopPropagation();
              handleBookmarkClick(album.id);
            }}>
              {isAlbumFavorite(album.id) ? '❤️' : '🤍'}
            </BookmarkIcon>
          </Card>
        ))}
      </List>
    </Container>
  );
};

export default Favorite;
