import { useLocation } from 'react-router-dom';
import { NavbarContainer, NavList, NavItem, NavLink } from '../../styles/NavBar.styles';


const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const Link = ({ children, to }: { children: React.ReactNode; to: string; }) => {
    return (
      <NavItem className={isActive(to) ? 'active' : ''}>
        <NavLink to={to}>{children}</NavLink>
      </NavItem>);
  };

  return (
    <NavbarContainer>
      <NavList>
        <Link to="/">Albums</Link>
        <Link to="/artists">Artists</Link>
        <Link to="/favorites">My Favorites</Link>
      </NavList>
    </NavbarContainer>
  );
};

export default Navbar;
