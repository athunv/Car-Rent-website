import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { orderCar } from '../services/allApi';
import { Form, Button, Modal, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Order.css'; 
import html2canvas from 'html2canvas';


function Order() {
  const { carId } = useParams();
  const [formData, setFormData] = useState({
    address: '',
    email: '',
    phone: '',
    start_date: '',
    end_date: '',
    payment_method: '', // Radio button selection
    card_number: '',
    card_expiry: '',
    card_cvc: ''
  });
  const [orderStatus, setOrderStatus] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOrder = async (e) => {
    e.preventDefault();
    try {
      const orderData = { ...formData };
      await orderCar(carId, orderData);
      setOrderStatus(`Order placed for car ID ${carId}`);
      setShowModal(true);
    } catch (error) {
      console.error('Error placing order:', error);
      setOrderStatus('Failed to place order');
    }
  };

  const handleScreenshot = () => {
    const modalElement = document.getElementById('order-details-modal');
    html2canvas(modalElement).then((canvas) => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL();
      link.download = 'order-details.png';
      link.click();
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/home'); 
  };

  return (
    <div className="order-page p-5">
      <h1 className='text-center mb-5'>Place Your Order</h1>
      {orderStatus && <p className="order-status">{orderStatus}</p>}
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <div className="order-form ms-5">
            <Form onSubmit={handleOrder}>
              <Form.Group controlId="formAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter phone number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formStartDate">
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formEndDate">
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  type="date"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Form>
          </div>
        </Col>
        <Col xs={12} md={6}>
          <div className="order-form">
            <Form>
              <Form.Group controlId="formPaymentMethod">
                <Form.Label>Payment Method</Form.Label>
                <div className='d-flex justify-content-between align-items-center'>
                  <Form.Check 
                    type="radio" 
                    label="Gpay" 
                    name="payment_method" 
                    value="Gpay" 
                    onChange={handleInputChange}
                    checked={formData.payment_method === 'Gpay'}
                  />
                  <Form.Check 
                    type="radio" 
                    label="PhonePe" 
                    name="payment_method" 
                    value="PhonePe" 
                    onChange={handleInputChange}
                    checked={formData.payment_method === 'PhonePe'}
                  />
                  <Form.Check 
                    type="radio" 
                    label="COD" 
                    name="payment_method" 
                    value="COD" 
                    onChange={handleInputChange}
                    checked={formData.payment_method === 'COD'}
                  />
                </div>
              </Form.Group>
              <Form.Group controlId="formCardNumber">
                <Form.Label>Card Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter card number"
                  name="card_number"
                  value={formData.card_number}
                  onChange={handleInputChange}
                  disabled={formData.payment_method === 'COD'} // Disable card details for COD
                />
              </Form.Group>
              <Form.Group controlId="formCardExpiry">
                <Form.Label>Card Expiry</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter card expiry date"
                  name="card_expiry"
                  value={formData.card_expiry}
                  onChange={handleInputChange}
                  disabled={formData.payment_method === 'COD'} // Disable card details for COD
                />
              </Form.Group>
              <Form.Group controlId="formCardCVC">
                <Form.Label>Card CVC</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter card CVC"
                  name="card_cvc"
                  value={formData.card_cvc}
                  onChange={handleInputChange}
                  disabled={formData.payment_method === 'COD'} // Disable card details for COD
                />
              </Form.Group>
            </Form>
            <Button variant="danger" className='mt-4' onClick={() => navigate('/home')}>
              Cancel
            </Button>
            <Button variant="warning" className='mt-4 ms-5' onClick={handleOrder}>
              Place Order
            </Button>
          </div>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleCloseModal} id="order-details-modal">
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Order ID: {carId}</p>
          <p>Address: {formData.address}</p>
          <p>Email: {formData.email}</p>
          <p>Phone: {formData.phone}</p>
          <p>Start Date: {formData.start_date}</p>
          <p>End Date: {formData.end_date}</p>
          <p>Payment Method: {formData.payment_method}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleScreenshot}>
            Take Screenshot
          </Button>
          <Button variant="warning" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Order;
