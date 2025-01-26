import { NavbarContainer, NavList, NavItem, NavLink } from '../styles/NavBar.styles';

const NavBar = () => {

  return (
    <NavbarContainer>
      <NavList>
      <NavItem>
          <NavLink to="/">Albums</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/artists">Artists</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/favorites">My Favorites</NavLink>
        </NavItem>
      </NavList>
    </NavbarContainer>
  );
};

export default NavBar;
