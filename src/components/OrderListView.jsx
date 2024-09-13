import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { orderList } from '../services/allApi';

function OrderListView() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const response = await orderList();
        console.log(response.data); 
        const orderData = response.data;
        if (Array.isArray(orderData)) {
          setOrders(orderData);
        } else {
          console.error('Unexpected data format:', orderData);
          setOrders([]);
        }
      } catch (error) {
        console.error('Error loading orders:', error);
        setError('Failed to load orders. Please try again later.');
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>;
  }

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
  };

  const thTdStyle = {
    border: '1px solid red',
    padding: '8px',
  };

  const tdStyle = {
    border: '1px solid blue',
    padding: '8px',
  };

  const headerStyle = {
    padding: '20px',
    backgroundColor: 'black',
    color: 'white',
  };

  return (
    <Row style={headerStyle}>
      <Col sm={12}>
        <h1>Order List</h1>
        <div>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thTdStyle}>Order ID</th>
                <th style={thTdStyle}>Car </th>
                <th style={thTdStyle}>Customer </th>
                <th style={thTdStyle}>Email</th>
                <th style={thTdStyle}>Phone</th>
                <th style={thTdStyle}>Start Date</th>
                <th style={thTdStyle}>End Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order.id}>
                    <td style={tdStyle}>{order.id}</td>
                    <td style={tdStyle}>{order.car}</td> 
                    <td style={tdStyle}>{order.user}</td> 
                    <td style={tdStyle}>{order.email}</td>
                    <td style={tdStyle}>{order.phone}</td>
                    <td style={tdStyle}>{new Date(order.start_date).toLocaleDateString()}</td>
                    <td style={tdStyle}>{new Date(order.end_date).toLocaleDateString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '8px' }}>No orders available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Col>
    </Row>
  );
}

export default OrderListView;
