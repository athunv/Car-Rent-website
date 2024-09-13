import React, { useState, useEffect } from 'react';
import { cancelOrder, customerorderList } from '../services/allApi';
import { Link } from 'react-router-dom';

function CustomerOrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await customerorderList();
        setOrders(response.data);
      } catch (err) {
        setError('Failed to load orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleCancelOrder = async (orderId) => {
    try {
      await cancelOrder(orderId); // Pass orderId here
      setOrders(orders.filter(order => order.id !== orderId));
    } catch (err) {
      console.error('Failed to cancel order', err);
    }
  };

  const isCancellable = (startDate) => {
    const today = new Date();
    const start = new Date(startDate);
    return start > today;
  };

  if (loading) {
    return <div style={{ color: 'white' }}>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: 'white' }}>{error}</div>;
  }

  return (
    <>
      <div className='container p-5'>
        <style>
          {`
            table {
              width: 100%;
              border-collapse: collapse;
              color: white;
            }
            th, td {
              border: 1px solid blue;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #333;
            }
            td {
              background-color: #222;
            }
            button {
              padding: 5px 10px;
              background-color: red;
              color: white;
              border: none;
              cursor: pointer;
            }
            button:disabled {
              background-color: grey;
              cursor: not-allowed;
            }
          `}
        </style>
        <h2 style={{ color: 'white' }} className='text-center mt-3 mb-4'>Your Orders</h2>
        {orders.length === 0 ? (
          <p style={{ color: 'white' }}>No orders found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Car</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Address</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  {/* <td>{order.car?.car_name || 'Car name not available'}</td> */}
                  <td>{order.car} </td>

                  <td>{order.start_date}</td>
                  <td>{order.end_date}</td>
                  <td>{order.address}</td>
                  <td>{order.email}</td>
                  <td>{order.phone}</td>
                  <td>
                    <button
                      onClick={() => handleCancelOrder(order.id)}
                      disabled={!isCancellable(order.start_date)}
                    >
                      Cancel Order
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className='container p-5 mt-5'>
        <Link to={'/home'} style={{ textDecoration: 'none', color: 'white', marginTop: '20px' }}>
          Back to Home
        </Link>
      </div>
    </>
  );
}

export default CustomerOrderList;
