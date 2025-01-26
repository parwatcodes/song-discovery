import styled from "styled-components";

export const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
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
  justify-content: space-between;
  height: fit-content;
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
    font-size: 1.5rem;
    font-weight: 500;
    margin: 0;
    color: #ffffff;
  }

  div {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1rem;
    cursor: pointer;
    transition: color 0.1s ease;
    font-size: 2rem;
    font-weight: 500;

    &:hover {
      color:rgb(54, 151, 212);
    }
  }
`;

export const GoBack = styled.div`
  display: flex;
  align-items: center;
  align-self: flex-start;
  gap: 10px;
  cursor: pointer;
  transition: transform .2s;

  &:hover {
    color: #1ED760;
    transform: scale(1.1);
  }
`;
