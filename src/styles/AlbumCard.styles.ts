import styled from "styled-components";

export const CoverImage = styled.img`
  width: 190px;
  height: 190px;
  object-fit: cover;
`;

export const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;


export const Text = styled.p`
  color: #aaaaaa;
`;

export const ArtistSection = styled.div`
  font-size: 1.5rem;
  color: #444;
  margin-top: 20px;
  text-align: center;
`;

export const ArtistName = styled.h1`
  cursor: pointer;
  font-weight: bold;
  color: #007bff;
  transition: color 0.3s ease;

  &:hover {
    color: #0056b3;
  }
`;

export const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px
`;

export const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;

  span {
    font-size: 16px;
    color: #aaaaaa;
  }

  h1 {
    font-size: 22px;
    margin: 0;
    color: #ffffff;
  }
`;
