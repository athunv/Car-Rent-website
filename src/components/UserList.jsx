import React, { useEffect, useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { getUsers, deleteUser } from '../services/allApi';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await getUsers(null);
        console.log(response.data); // Verify field names in response
        const userData = response.data;
        if (Array.isArray(userData)) {
          setUsers(userData);
        } else {
          console.error('Unexpected data format:', userData);
          setUsers([]);
        }
      } catch (error) {
        console.error('Error loading users:', error);
        setError('Failed to load users. Please try again later.');
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      console.log(`Deleting user with ID: ${id}`); 
      await deleteUser(id);
      setUsers(users.filter(user => user.id !== id)); // Update based on your user object structure
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Failed to delete user. Please try again later.');
    }
  };

  const handleDeleteAll = async () => {
    try {
      // Optionally, implement bulk delete or clear all users from the state if API doesn't support bulk delete
      setUsers([]);
    } catch (error) {
      console.error('Error deleting users:', error);
      setError('Failed to delete users. Please try again later.');
    }
  };

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
    border: '1px solid violet',
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
        <h1>Customer Details</h1>
        
        <div>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thTdStyle}>SI Number</th>
                <th style={thTdStyle}>ID</th>
                <th style={thTdStyle}>Username</th>
                <th style={thTdStyle}>Email</th>
                <th style={thTdStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={user.id}> 
                    <td style={tdStyle}>{index + 1}</td>
                    <td style={tdStyle}>{user.id}</td> 
                    <td style={tdStyle}>{user.username}</td>
                    <td style={tdStyle}>{user.email}</td>
                    <td style={tdStyle}>
                      <Button variant="danger" onClick={() => handleDelete(user.id)}>
                        Delete
                      </Button>
                    </td>
                    
                  </tr>
                  
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', padding: '8px' }}>No users found</td>
                </tr>
              )}
            </tbody>
            <Button variant="danger" onClick={handleDeleteAll} className='mt-5'>Delete All Users</Button>
          </table>
        </div>
      </Col>
    </Row>
  );
}

export default UserList;
