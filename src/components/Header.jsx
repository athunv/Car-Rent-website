import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import './Header.css';  
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Header() {
  const [navbarLoaded, setNavbarLoaded] = useState(false);
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    setTimeout(() => setNavbarLoaded(true), 100); 
    const storedUserId = sessionStorage.getItem('id'); 
    setUserId(storedUserId); 
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('id'); 
    toast.success('Logged out successfully!');
    navigate('/login');
  };

  return (
    <div className={`navbar-container ${navbarLoaded ? 'fade-in' : ''}`}>
      <Navbar expand="lg" className="bg-white">
        <Container>
          <Navbar.Brand href="#home" className="navbar-brand">
            <img
              alt="CarWheelz"
              src="/images/logo.png"
              width="30"
              height="30"
              className="d-inline-block align-top logo-animation"  
            />{' '}
            RentWheelz
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="toggle-animation" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="navbar-nav main-links"> 
              <Nav.Link href="#home" className="nav-link-animation ms-5">Home</Nav.Link>
              <Nav.Link href="#service" className="nav-link-animation">Services</Nav.Link>
              <Nav.Link href="#about" className="nav-link-animation">About Us</Nav.Link>
              <Nav.Link href="#contact" className="nav-link-animation">Contact Us</Nav.Link>
              <Nav.Link as={Link} to="/cars" className="nav-link-animation">Cars</Nav.Link>
              
              <Nav.Link as={Link} to="/orders" className="nav-link-animation">Orders</Nav.Link>

            </Nav>
          </Navbar.Collapse>
          <Nav className="navbar-nav auth-links"> 
            {/* <Nav.Link as={Link} to="/login" className="nav-link-animation">Login</Nav.Link> */}
            <Nav.Link onClick={handleLogout} className="nav-link-animation">Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <ToastContainer /> 
    </div>
  );
}

export default Header;
