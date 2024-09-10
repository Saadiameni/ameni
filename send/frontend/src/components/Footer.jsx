
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      &copy; {new Date().getFullYear()} Mon Site. Tous droits réservés.
    </footer>
  );
};

export default Footer;
