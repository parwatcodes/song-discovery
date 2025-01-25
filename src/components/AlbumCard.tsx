import React from "react";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as solidBookmark } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as regularBookmark } from '@fortawesome/free-regular-svg-icons';

import useFavorite from '../hooks/useFavorite';

import { BookmarkIcon } from '../styles/common.styles';
import { DetailWrapper } from '../styles/AlbumCard.styles';
import { Card, CoverImage, Text, AlbumTitle } from '../styles/common.styles';

const AlbumCard: React.FC = (props) => {
  const { cover_image, title, year, country, id } = props.album;
  const {
    isAlbumFavorite,
    addAlbumToFavorites,
    removeAlbumFromFavorites,
  } = useFavorite();

  const navigate = useNavigate();

  const handleAlbumClick = () => {
    navigate(`/albums/${id}`);
  };

  const handleBookmarkClick = (id, album) => {
    if (isAlbumFavorite(id)) {
      removeAlbumFromFavorites(id);
    } else {
      addAlbumToFavorites(id, album);
    }
  };

  return (
    <Card onClick={handleAlbumClick}>
      <CoverImage src={cover_image} alt={title} />
      <DetailWrapper>
        <AlbumTitle>{title}</AlbumTitle>
        <Text>{year}</Text>
        <Text>{country}</Text>
      </DetailWrapper>
      <BookmarkIcon onClick={(event: React.MouseEvent) => {
        event.stopPropagation();
        handleBookmarkClick(id, props.album);
      }}>
        {isAlbumFavorite(id) ? <FontAwesomeIcon icon={solidBookmark} color="#FFD700" /> : <FontAwesomeIcon icon={regularBookmark} color="#AAAAAA" />}
      </BookmarkIcon>
    </Card>
  );
};

export default AlbumCard;
