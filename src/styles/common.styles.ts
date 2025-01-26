import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
`;

export const Headline = styled.div`
  font-size: 2rem;
  font-weight: 500;
`;

export const BookmarkIcon = styled.div`
  font-size: 24px;
  cursor: pointer;
  position: absolute;
  bottom: 10px;
  right: 10px;
`;

export const SectionTitle = styled.h2`
  margin-bottom: 20px;
`;

export const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

export const Text = styled.p`
  width: 190px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 14px;
`;

export const TrackName = styled(Text)`
  font-size: 1rem;
  width: 230px;
  height: 20px;
`
export const CoverImage = styled.img`
  width: 190px;
  height: 190px;
  object-fit: cover;
  border-radius: 4px;
`;

export const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 2fr));
  grid-auto-rows: auto;
  gap: 20px;
`;

export const Card = styled.div`
  position: relative;
  background-color: #1e1e1e;
  border-radius: 4px;
  padding: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: fit-content;

  &:hover {
    transform: translateY(-2px);
    cursor: pointer;
  }
`;

export const AlbumTitle = styled(Text)`
  margin: 10px 0;
  font-size: 1rem;
`;

export const ArtistName = styled(AlbumTitle)`
  margin: 10px 0 0 0;
`;
