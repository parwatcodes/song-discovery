import styled from "styled-components";

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
  margin: 10px; /* Space between cards */

  &:hover {
    transform: translateY(-2px);
    cursor: pointer;
  }
`;

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

export const AlbumDetailsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
`;

export const ArtistSection = styled.div`
  font-size: 1.5rem;
  color: #444;
  margin-top: 20px;
  text-align: center;
`;

export const ArtistName = styled.span`
  cursor: pointer;
  font-weight: bold;
  color: #007bff;
  transition: color 0.3s ease;

  &:hover {
    color: #0056b3;
  }
`;
