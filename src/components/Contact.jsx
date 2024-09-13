import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { addMessage } from '../services/allApi';
import { toast } from 'react-toastify';

function Contact() {
  const [formData, setFormData] = useState({
    name: '', email: '', message: ''
  });

  const getData = (e) => {
    e.preventDefault();

    const { name, email, message } = formData;
    if (!name || !email || !message) {
      toast.warning('Please fill out all fields.');
    } else {
      addMessage(formData).then((res) => {
        toast.success('Message from ' + res.data.name + ' was successfully sent!');
        setFormData({ name: '', email: '', message: '' }); 
      }).catch((err) => {
        toast.error('There was an error sending your message.');
        console.error(err);
      });
    }
  };

  const formcancel = () => {
    setFormData({ name: "", email: "", message: "" });
    navigate('/');
  };

  const containerStyle = {
    width: '100%',
    minHeight: '100vh',
    color: 'white',
    backgroundImage: 'url("./images/car2.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    padding: '30px',
  };

  return (
    <div style={containerStyle} id='contact'>
      <Row className='container'>
        <h2 className='text-center mb-4 mt-2'>Contact Us</h2>
        <h5 className='container p-4 text-center'>
          Our professional chauffeurs are highly trained and experienced individuals dedicated to providing exceptional transportation services. With a focus on safety, reliability, and customer satisfaction, our chauffeurs ensure a comfortable and luxurious travel experience for our clients.
        </h5>
        
        <Col className='mb-5 ms-5 mt-5'>
          <iframe
            loading="lazy"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3945.0251254763027!2d75.3482291!3d11.8731078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba422b9b2aca753%3A0x380605a11ce24f6c!2sKannur%2C%20Kerala!5e0!3m2!1sen!2sin!4v1692278652992!5m2!1sen!2sin"
            title="Kannur, Kerala"
            aria-label="Kannur, Kerala"
            style={{ width: '100%', height: '400px', border: '2px solid orange', borderRadius: '8px' }}
          ></iframe>
        </Col>

        <Col className='mb-5 ms-5 mt-5'>
          <form onSubmit={getData}>
            <div className="card shadow-sm" style={{ width: '100%', padding: '30px', borderRadius: '8px', border: '1px solid orange', backgroundColor: 'rgba(0, 0, 0, 0.7)', color: 'white' }}>
              <p>
                We'd love to hear from you! Whether you have a question about our services, need assistance, or just want to share your thoughts, feel free to drop us a message. We're here to help!
              </p>

              <FloatingLabel controlId="floatingName" label="Name" className="mb-3" style={{ color: '#ccc' }}>
                <Form.Control type="text" placeholder="Your Name" name="name" value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ backgroundColor: '#222', color: 'white' }}
                />
              </FloatingLabel>
              <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3" style={{ color: '#ccc' }}>
                <Form.Control type="email" placeholder="name@example.com" name="email" value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{ backgroundColor: '#222', color: 'white' }}
                />
              </FloatingLabel>
              <FloatingLabel controlId="floatingTextarea2" label="Message" style={{ color: '#ccc' }}>
                <Form.Control as="textarea" placeholder="Leave a Message here" name="message" value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{ height: '100px', backgroundColor: '#222', color: 'white' }}
                />
              </FloatingLabel>

              <div className='text-center mt-4 mb-1'>
                <Button variant="warning" type="submit" style={{ padding: '10px 30px' }}>Submit</Button>
                <button className='btn btn-danger ms-5 p-2' style={{ width: '100px' }} onClick={formcancel}>Clear</button>
              </div>
            </div>
          </form>
        </Col>
      </Row>
    </div>
  );
}

export default Contact;
