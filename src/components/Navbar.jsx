import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import BootstrapNavbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { NavLink } from 'react-router-dom'
import logo from '../assets/logo.png'
import CartWidget from './CartWidget'

function Navbar() {
  return (
    <BootstrapNavbar expand="lg" className="urban-navbar">
      <Container>
        <BootstrapNavbar.Brand as={NavLink} to="/" className="d-flex align-items-center gap-2">
          <img src={logo} alt="Urban Store" style={{ width: '9rem' }} />
       </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">
              Todos
            </Nav.Link>
            <NavDropdown title="Categorías" id="basic-nav-dropdown">
              <NavDropdown.Item as={NavLink} to="/category/sneakers">
                Sneakers
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/category/casual">
                Casual
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={NavLink} to="/category/ofertas">
                Ofertas
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <CartWidget />
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  )
}

export default Navbar
