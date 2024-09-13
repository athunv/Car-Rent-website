import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa'

function IndexHome() {
  return (
    <div style={{
      backgroundImage: 'url("/images/car4.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: 'white',
      textAlign: 'center',
      padding: '20px',
    }}>
      <div style={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <h1 style={{
          fontSize: '3.5rem',
          marginBottom: '10px',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
        }}>
          Welcome to RentWheelz
        </h1>
        <p style={{
          fontSize: '1.2rem',
          maxWidth: '600px',
          margin: '0 auto 20px auto', 
          textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
        }}>
          Your trusted partner for renting the best cars at unbeatable prices. Whether you're planning a road trip or need a reliable vehicle for daily use, we've got you covered.
        </p>
        <Link to="/login" style={{
          padding: '12px 25px',
          backgroundColor: 'orange',
          color: 'white',
          borderRadius: '5px',
          textDecoration: 'none',
          fontSize: '1.2rem',
          boxShadow: '2px 2px 8px rgba(0, 0, 0, 0.3)',
          transition: 'transform 0.3s ease',
        }} 
        onMouseEnter={e => e.target.style.transform = 'scale(1.1)'} 
        onMouseLeave={e => e.target.style.transform = 'none'}>
          Get Started
        </Link>
      </div>

      <footer style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginTop: '30px',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
        }}>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" style={{
            color: 'white',
            fontSize: '1.5rem',
            transition: 'color 0.3s ease',
          }} 
          onMouseEnter={e => e.target.style.color = '#E1306C'} 
          onMouseLeave={e => e.target.style.color = 'white'}>
            <FaInstagram />
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" style={{
            color: 'white',
            fontSize: '1.5rem',
            transition: 'color 0.3s ease',
          }} 
          onMouseEnter={e => e.target.style.color = '#4267B2'} 
          onMouseLeave={e => e.target.style.color = 'white'}>
            <FaFacebookF />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" style={{
            color: 'white',
            fontSize: '1.5rem',
            transition: 'color 0.3s ease',
          }} 
          onMouseEnter={e => e.target.style.color = '#1DA1F2'} 
          onMouseLeave={e => e.target.style.color = 'white'}>
            <FaTwitter />
          </a>
        </div>

        <div style={{
          fontSize: '1.2rem',
          fontWeight: 'bold',
          color: 'white',
          marginRight: '20px',
        }}>
          RentWheelz
        </div>
      </footer>
    </div>
  )
}

export default IndexHome
