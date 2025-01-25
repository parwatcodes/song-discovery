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
  color: #aaaaaa;
`;

export const CoverImage = styled.img`
  width: 190px;
  height: 190px;
  object-fit: cover;
`;

export const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const Card = styled.div`
  position: relative;
  background-color: #1e1e1e;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s ease-in-out;
  width: 220px; /* Fixed width for uniformity */
  height: 300px; /* Fixed height for uniformity */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;

  &:hover {
    transform: translateY(-2px);
    cursor: pointer;
  }
`;

export const Title = styled.p`
  margin: 10px 0;
  /* text-align: center; */
`;
