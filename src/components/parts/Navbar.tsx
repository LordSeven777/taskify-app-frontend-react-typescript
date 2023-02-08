import { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

// Store
import type { RootState } from '@/store';

// Components
import LogoutModal from './LogoutModal';

export default function AppNavbar() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const [showLogoutModal, setLogoutModalShow] = useState(false);

  return (
    <>
      <Navbar
        bg="primary"
        variant="dark"
        expand="lg"
        sticky="top"
        className="shadow-sm"
        style={{ zIndex: '10', position: 'sticky' }}
      >
        <div className="container">
          <Navbar.Brand as={Link} to="/">
            📝 Taskify
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="app-navbar" />
          <Navbar.Collapse id="app-navbar">
            <Nav className="ms-auto">
              {!isAuthenticated && (
                <>
                  <Nav.Link as={NavLink} to="/login">
                    Sign in
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/register">
                    Register
                  </Nav.Link>
                </>
              )}
              {isAuthenticated && (
                <>
                  <Nav.Link as={NavLink} to="/tasks">
                    Tasks
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/register">
                    My account
                  </Nav.Link>
                  <Nav.Link
                    as={Button}
                    variant="light"
                    className="text-dark"
                    onClick={() => setLogoutModalShow(true)}
                  >
                    Log out
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
      <LogoutModal
        show={showLogoutModal}
        onClose={() => setLogoutModalShow(false)}
      />
    </>
  );
}
