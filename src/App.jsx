import { useState } from 'react'
import './App.css'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Admin from './pages/Admin'
import Contact from './components/Contact'
import Register from './auth/Register'
import Login from './auth/Login'
import CustomerCarView from './components/CustomerCarView'
import EditCar from './components/EditCar'
import Order from './components/Order'
import AdminLogin from './auth/AdminLogin'
import ViewCars from './components/ViewCars'
import CustomerOrderList from './components/CustomerOrderList'
import IndexHome from './components/IndexHome'
import ForgotPassword from './components/ForgotPassword'







function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<IndexHome />} />
        <Route path='/home' element={<Home/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/admin' element={<Admin/>} />
        <Route path='/reg' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path="/cars" element={<CustomerCarView />} />
        <Route path="/update_car/:id" element={<EditCar />} />
        <Route path="/order/:carId" element={<Order />} />
        <Route path='/adminLogin' element={<AdminLogin/>}/>
        <Route path="/cars/:carId" element={<ViewCars />} />
        <Route path='/orders' element={<CustomerOrderList/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>} />
   
      </Routes>
    </>
  )
}

export default App
