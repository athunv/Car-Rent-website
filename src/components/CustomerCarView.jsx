import React, { useState, useEffect } from 'react';
import { userViewCars } from '../services/allApi';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import './CustomerCarView.css';

function CustomerCarOrderView() {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCars = async () => {
      try {
        const response = await userViewCars();
        const carData = response.data;

        if (Array.isArray(carData)) {
          setCars(carData);
        } else {
          console.error('Unexpected data format:', carData);
          setCars([]);
        }
      } catch (error) {
        console.error('Error loading cars:', error);
        setError('Failed to load cars');
        setCars([]);
      }
    };

    loadCars();
  }, []);

  const handleOrderClick = (carId) => {
    navigate(`/order/${carId}`);
  };

  return (
    <div className="customer-car-view">
      <h1>All Cars</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="car-container">
        {cars.length > 0 ? (
          cars.map((car) => (
            <div key={car.id} className="car-card">
              <div className="car-card-content">
                <div className="car-details">
                  <h3 className="car-name">{car.car_name}</h3>
                  <p className="car-price">Price: ${car.price}</p>
                  <p className="car-model">{car.car_model}</p>
                  <p className="car-description">{car.description}</p>
                  <Button 
                    variant="warning"
                    className="order-button"
                    onClick={() => handleOrderClick(car.id)}
                  >
                    Book Now
                  </Button>
                </div>
                <div className="car-image-container">
                  <img src={car.image} alt={`${car.car_name} ${car.car_model}`} className="car-image" />
                </div>
              </div>
            </div>
          ))
        ) : (
          navigate('/')
        )}
      </div>
      <div className="back-to-home">
        <Button variant="warning" as={Link} to="/home" className="back-to-home-button">
          Back to Home
        </Button>
      </div>
    </div>
  );
}

export default CustomerCarOrderView;
