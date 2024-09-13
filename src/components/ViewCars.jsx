import React, { useEffect, useState } from 'react';
import { viewCars, deleteCar } from '../services/allApi';
import { Button } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa'; 
import { Link, useNavigate } from 'react-router-dom';

function ViewCars() {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCars = async () => {
      try {
        const response = await viewCars();

        const carData = response.data;
        if (Array.isArray(carData)) {
          setCars(carData);
        } else {
          console.error('Unexpected data format:', carData);
          setCars([]);
        }
      } catch (error) {
        console.error('Error loading cars:', error);
        setCars([]);
      }
    };

    loadCars();
  }, []);

  const handleEdit = (carId) => {
    navigate(`/update_car/${carId}`);
  };

  const handleDelete = async (id) => {
    try {
      await deleteCar(id); 
      setCars(cars.filter((car) => car.id !== id));
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  return (
    <>
      <div style={{ padding: '20px', backgroundColor:'black' }}>
        <h1>All Cars</h1>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid red', padding: '8px' }}>ID</th>
              <th style={{ border: '1px solid red', padding: '8px' }}>Name</th>
              <th style={{ border: '1px solid red', padding: '8px' }}>Model</th>
              <th style={{ border: '1px solid red', padding: '8px' }}>Image</th>
              <th style={{ border: '1px solid red', padding: '8px' }}>Description</th>
              <th style={{ border: '1px solid red', padding: '8px' }}>Price</th>
              <th style={{ border: '1px solid red', padding: '8px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {cars.length > 0 ? (
              cars.map((car) => (
                <tr key={car.id}>
                  <td style={{ border: '1px solid blue', padding: '8px' }}>{car.id}</td>
                  <td style={{ border: '1px solid blue', padding: '8px' }}>{car.car_name}</td>
                  <td style={{ border: '1px solid blue', padding: '8px' }}>{car.car_model}</td>
                  <td style={{ border: '1px solid blue', padding: '8px' }}>
                    <img src={car.image} alt={`${car.make} ${car.model}`} style={{ width: '100px', height: 'auto' }} />
                  </td>
                  <td style={{ border: '1px solid blue', padding: '8px' }}>{car.description}</td>
                  <td style={{ border: '1px solid blue', padding: '8px' }}>{car.price}</td>
                  <td style={{ border: '1px solid blue', padding: '8px', textAlign: 'center' }}>
                    <Link to={`/update_car/${car.id}`} className="btn btn-warning" style={{ marginRight: '10px', marginBottom: '10px' }}>
                      Edit
                    </Link>

                    <Button variant="danger" onClick={() => handleDelete(car.id)}>
                      <FaTrash /> Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '8px' }}>No cars available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ViewCars;

