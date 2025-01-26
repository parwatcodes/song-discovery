import styled from "styled-components";
import { Link } from 'react-router-dom';

export const NavbarContainer = styled.nav`
  color: white;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NavList = styled.ul`
  list-style: none;
  display: flex;
  gap: 60px;
  margin: 0;
  padding: 0;
`;

export const NavItem = styled.li`
  font-size: 35px;

  &.active {
    a {
      color: #1ED760;
    }
  }
`;

export const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
`;
