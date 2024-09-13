import React, { useContext, useState } from "react";
import { Button, Card, FloatingLabel, Form } from "react-bootstrap";
import { addCar } from "../services/allApi";  
import { toast } from "react-toastify";
import { addCarContextData } from "../contextApi/CarContextProvider";  
import './AddCar.css';

function AddCar() {
  const { setAddCarContext } = useContext(addCarContextData);

  const [newCar, setNewCar] = useState({
    car_name: "", 
    description: "", 
    price: "", 
    car_model: "", 
    image: null 
  });

  const formSubmit = (e) => {
    e.preventDefault();
    const { car_name, description, price, car_model, image } = newCar;

    if (!car_name || !description || !price || !car_model || !image) {
      toast.warning("Please fill out all fields and select an image.");
    } else {
      const fr = new FormData();
      fr.append("car_name", car_name);
      fr.append("description", description);
      fr.append("price", price);
      fr.append("car_model", car_model);
      fr.append("image", image);

      const header = { 'Content-Type': 'multipart/form-data',
        'Authorization':`Token ${sessionStorage.getItem("token")}`
       };
      addCar(header, fr).then(res => {
        toast.success('Car added successfully');
        setAddCarContext(res);
        formCancel();
      }).catch(err => {
        toast.error("Failed to add car. Please try again.");
      });
    }
  }

  const formCancel = () => {
    setNewCar({ car_name: "", description: "", price: "", car_model: "", image: null });
  }

  return (
    <div className="add-car-container" style={{backgroundColor:'black'}}>
      <Card className="add-car-card mb-3 bg-dark">
        
          <h1 className=" card-title bg-dark text-white ">Add Car</h1>
        
        <Card.Body className="add-car-card-body">
          <form onSubmit={formSubmit}>
            <FloatingLabel controlId="floatingCarName" label="Car Name" className="mb-3">
              <Form.Control 
                className="add-car-form-control"
                type="text" 
                placeholder="Car Name" 
                value={newCar.car_name}
                onChange={(e) => setNewCar({ ...newCar, car_name: e.target.value })}
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingDescription" label="Description" className="mb-3">
              <Form.Control 
                className="add-car-form-control"
                type="text" 
                placeholder="Description" 
                value={newCar.description}
                onChange={(e) => setNewCar({ ...newCar, description: e.target.value })}
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPrice" label="Price" className="mb-3">
              <Form.Control 
                className="add-car-form-control"
                type="number" 
                placeholder="Price" 
                value={newCar.price}
                onChange={(e) => setNewCar({ ...newCar, price: e.target.value })}
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingCarModel" label="Car Model" className="mb-3">
              <Form.Control 
                className="add-car-form-control"
                type="text" 
                placeholder="Car Model" 
                value={newCar.car_model}
                onChange={(e) => setNewCar({ ...newCar, car_model: e.target.value })}
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingImage" label="Image" className="mb-3">
              <Form.Control 
                className="add-car-form-control"
                type="file" 
                placeholder="Image" 
                onChange={(e) => setNewCar({ ...newCar, image: e.target.files[0] })}
              />
            </FloatingLabel>
            <div className="d-flex justify-content-between add-car-buttons">
              <Button className="add-car-button-submit btn-warning" type="submit">Submit</Button>
              <Button className="add-car-button-cancel btn-danger" type="button" onClick={formCancel}>Cancel</Button>
            </div>
          </form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default AddCar;
