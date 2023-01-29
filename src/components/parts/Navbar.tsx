import { NavLink, Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

export default function AppNavbar() {
  return (
    <Navbar
      bg="primary"
      variant="dark"
      expand="lg"
      sticky="top"
      className="shadow-sm"
      style={{ zIndex: '10' }}
    >
      <div className="container">
        <Navbar.Brand as={Link} to="/">
          📝 Taskify
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="app-navbar" />
        <Navbar.Collapse id="app-navbar">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/login">
              Sign in
            </Nav.Link>
            <Nav.Link as={NavLink} to="/register">
              Register
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}
