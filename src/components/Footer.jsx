import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <div style={{ overflow: 'hidden', backgroundColor: 'black', paddingBottom: '0px' }}>
      <div style={{ height: '10px', backgroundColor: '#333' }}></div>

      <div style={{ height: '200px' }} className='p-5'>
        <Row className='container p-4 mb-5'>
          <Col md={4}>
            <div className='text-white container'>
              <h3>Phone</h3>
              <h5>9827873362</h5>
            </div>
          </Col>
          <Col md={4}>
            <div className='text-white container'>
              <h3>Email</h3>
              <h5>carrent@gmail.com</h5>
            </div>
          </Col>
          <Col md={4}>
            <div className='text-white container'>
              <h3>Instagram</h3>
              <h5>car_rent_hub</h5>
            </div>
          </Col>
        </Row>
      </div>

      <div style={{ height: '10px', backgroundColor: '#333' }}></div>

      <div style={{ height: '380px' }} className='p-5'>
        <Row className='container'>
          <Col md={3} className='container text-white p-5'>
            <h6>We offer a luxurious and stylish transportation option for various occasions and events. Whether you're planning a special celebration, corporate event, wedding, prom night, or simply desire a sophisticated ride.</h6>
          </Col>
          <Col md={3} className='text-white p-5'>
            <h4>Links</h4>
            <Link to="#home" style={{ textDecoration: 'none', color: 'white' }}><h5>Home</h5></Link>
            <Link to="#about" style={{ textDecoration: 'none', color: 'white' }}><h5>About</h5></Link>
            <Link to="#contact" style={{ textDecoration: 'none', color: 'white' }}><h5>Contact</h5></Link>
            <Link to="#services" style={{ textDecoration: 'none', color: 'white' }}><h5>Services</h5></Link>
            <Link to="/cart" style={{ textDecoration: 'none', color: 'white' }}><h5>Cart</h5></Link>
          </Col>
          <Col md={3} className='text-white p-5'>
            <h4>Our Services</h4>
            <Link to="/airport-transfer" style={{ textDecoration: 'none', color: 'white' }}><h5>Airport Transfer</h5></Link>
            <Link to="/business-transfer" style={{ textDecoration: 'none', color: 'white' }}><h5>Business Transfer</h5></Link>
            <Link to="/luxury-vehicles" style={{ textDecoration: 'none', color: 'white' }}><h5>Luxury Vehicles</h5></Link>
            <Link to="/events-wedding" style={{ textDecoration: 'none', color: 'white' }}><h5>Events & Wedding</h5></Link>
            <Link to="/cart" style={{ textDecoration: 'none', color: 'white' }}><h5>Cart</h5></Link>
          </Col>
          <Col md={3} className='text-white p-5'>
            <h3>Address</h3>
            <h5>Lucipher Plaza,</h5>
            <h5>AVK Nair Road,</h5>
            <h5>Ernakulam, Kerala</h5>
          </Col>
        </Row>
      </div>

      <div style={{ height: '10px', backgroundColor: '#333' }}></div>

      <div style={{ height: '70px', backgroundColor: 'black' }}>
        <Row>
          <Col md={12}>
          <div className="text-white container d-flex justify-content-between align-items-center text-center mt-2">

              <p>&copy; 2020 Car Rent Hub. All rights reserved.</p>
              <div>
                <h1><i>RentWheelz</i></h1>
              </div>
              <div>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: 'white', margin: '0 10px' }}>
                  <FontAwesomeIcon icon={faInstagram} size="2x" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: 'white', margin: '0 10px' }}>
                  <FontAwesomeIcon icon={faFacebook} size="2x" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ color: 'white', margin: '0 10px' }}>
                  <FontAwesomeIcon icon={faTwitter} size="2x" />
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Footer;
