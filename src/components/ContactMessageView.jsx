import React, { useEffect, useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { viewMessages, deleteMessage } from '../services/allApi';

function ContactMessageView() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const response = await viewMessages();
        if (Array.isArray(response.data)) {
          setMessages(response.data);
        } else {
          console.error('Unexpected data format:', response.data);
          setMessages([]);
        }
      } catch (error) {
        console.error('Error loading messages:', error);
        setMessages([]);
      }
    };

    loadMessages();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteMessage(id); 
      setMessages(messages.filter((messages) => messages.id !== id));
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  return (
    <Row style={{ padding: '20px', backgroundColor: 'black', color: 'white' }}>
      <Col sm={12}>
        <h1>Contact Messages</h1>
        <div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid red', padding: '8px' }}>ID</th>
                <th style={{ border: '1px solid red', padding: '8px' }}>Name</th>
                <th style={{ border: '1px solid red', padding: '8px' }}>Email</th>
                <th style={{ border: '1px solid red', padding: '8px' }}>Message</th>
                <th style={{ border: '1px solid red', padding: '8px' }}>Date</th>
                <th style={{ border: '1px solid red', padding: '8px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.length > 0 ? (
                messages.map((message) => (
                  <tr key={message.id}>
                    <td style={{ border: '1px solid blue', padding: '8px' }}>{message.id}</td>
                    <td style={{ border: '1px solid blue', padding: '8px' }}>{message.name}</td>
                    <td style={{ border: '1px solid blue', padding: '8px' }}>{message.email}</td>
                    <td style={{ border: '1px solid blue', padding: '8px' }}>{message.message}</td>
                    <td style={{ border: '1px solid blue', padding: '8px' }}>{new Date(message.created_at).toLocaleString()}</td>
                    <td style={{ border: '1px solid blue', padding: '8px' }}>
                      <Button variant="danger" onClick={() => handleDelete(message.id)}>Delete</Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '8px' }}>No messages available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Col>
    </Row>
  );
}

export default ContactMessageView;
