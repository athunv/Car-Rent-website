import React, { useState } from 'react';
import AddCar from '../components/AddCar';
import ViewCars from '../components/ViewCars';
// import EditCar from '../components/EditCar'; 
// import ViewOrders from '../components/ViewOrders'; 
import CarContextProvider from '../contextApi/CarContextProvider';
import './Admin.css'; 
import ContactMessageView from '../components/ContactMessageView';
import OrderListView from '../components/OrderListView';
import OrdersByDateChart from '../components/OrdersByDateChart';
import UserList from '../components/UserList';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function Admin() {
  const [selectedOption, setSelectedOption] = useState('userlist');
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    toast.success('Logged out successfully!');
    navigate('/adminlogin');
  };
  
  return (
    <CarContextProvider>
      <div className="admin-container">
        <aside className="admin-aside">
          <button onClick={() => setSelectedOption('userlist')}>Customers</button>
          <button onClick={() => setSelectedOption('viewCars')}>View Cars</button>
          <button onClick={() => setSelectedOption('addCar')}>Add Car</button>
          <button onClick={() => setSelectedOption('contactMessages')}>Contact Messages</button>
          <button onClick={() => setSelectedOption('orderList')}>View Orders</button>
          <button onClick={() => setSelectedOption('orderChart')}>Order Chart</button>
          <button onClick={handleLogout} style={{ marginTop: 'auto', color: 'red' }}>Logout</button> {/* Logout Button */}
        </aside>
        <main className="admin-main">
          {selectedOption === 'userlist' && <UserList />}
          {selectedOption === 'addCar' && <AddCar />}
          {selectedOption === 'viewCars' && <ViewCars />}
          {selectedOption === 'contactMessages' && <ContactMessageView />}
          {selectedOption === 'orderList' && <OrderListView />}
          {selectedOption === 'orderChart' && <OrdersByDateChart />}
        </main>
      </div>
      <ToastContainer /> {/* Toast container for logout message */}
    </CarContextProvider>
  );
}

export default Admin;
