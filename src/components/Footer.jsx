import { FaInstagram, FaFacebook } from "react-icons/fa";
import logo from "../assets/logo.png";

const Footer = () => (
  <footer className="urban-footer">
    <img src={logo} alt="Urban Store" />
    <p>Sneakers para todos los estilos.</p>
    <div className="footer-icons">
      <FaInstagram />
      <FaFacebook />
    </div>
    <small>© 2026 Urban Store. Todos los derechos reservados.</small>
  </footer>
);

export default Footer;
