import { FooterContainer, FooterContent, FooterLinks } from '../../styles/Footer.styles';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <p>&copy; {new Date().getFullYear()} Songs Discovery. All rights reserved.</p>
        <FooterLinks>
          <a>Privacy Policy</a>
          <a>Terms of Service</a>
          <a>Contact</a>
        </FooterLinks>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
