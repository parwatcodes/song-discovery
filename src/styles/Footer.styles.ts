import styled from 'styled-components';

export const FooterContainer = styled.footer`
  margin: 40px 0;
  text-align: center;
  font-size: 1.5rem;
`;

export const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

export const FooterLinks = styled.div`
  margin-top: 10px;

  a {
    color: #fff;
    margin: 0 10px;
    text-decoration: none;

    &:hover {
      color: #1ED760;
    }
  }
`;
