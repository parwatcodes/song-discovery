import { FooterContainer, FooterContent, FooterLinks } from '../../styles/Footer.styles';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <p>&copy; {new Date().getFullYear()} Songs Discovery. All rights reserved.</p>
        <FooterLinks>
          <a href="javascript:void(0);">Privacy Policy</a>
          <a href="javascript:void(0);">Terms of Service</a>
          <a href='javascript:void(0);'>Contact</a>
        </FooterLinks>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
