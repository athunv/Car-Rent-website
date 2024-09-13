import React, { useEffect, useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useParams, useNavigate } from 'react-router-dom';
import { viewCars, updateCar } from '../services/allApi';
import { toast } from 'react-toastify';

function EditCar() {
    const { id } = useParams();
    const [carDetails, setCarDetails] = useState({
        car_name: '', 
        description: '', 
        price: '', 
        car_model: '', 
        image: null
    });
    const [imagePreview, setImagePreview] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCarData = async () => {
            try {
                const res = await viewCars(id);
                if (res.data) {
                    setCarDetails({
                        car_name: res.data.car_name,
                        description: res.data.description,
                        price: res.data.price,
                        car_model: res.data.car_model,
                        image: res.data.image || null
                    });
                    if (res.data.image) {
                        setImagePreview(res.data.image);
                    }
                } else {
                    console.error('No data found for car:', id);
                    toast.error('Car data not found');
                }
            } catch (err) {
                console.error('Error fetching car data:', err);
                toast.error('Failed to fetch car data');
            }
        };

        fetchCarData();
    }, [id]);

    const handleUpdate = async () => {
        const { car_name, description, price, car_model, image } = carDetails;

        if (!car_name || !description || !price || !car_model) {
            toast.warning('Please fill all the fields');
            return;
        }

        const formData = new FormData();
        formData.append('car_name', car_name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('car_model', car_model);
        if (image) formData.append('image', image);

        try {
            await updateCar(id, formData);
            toast.success('Car updated successfully');
            navigate('/admin'); 
        } catch (err) {
            console.error('Error updating car:', err);
            toast.error('Failed to update car');
        }
    };

    return (
        <div className='container-fluid d-flex flex-column align-items-center p-5 justify-content-center' style={{backgroundColor:'black'}}>
            <style>
                {`
                    .bg-dark {
                        background-color: #333 !important;
                    }
                    .text-white {
                        color: #fff !important;
                    }
                    .border-primary {
                        border-color: orange !important;
                    }
                    .form-control-custom {
                        background-color: #333 !important;
                        color: #fff !important;
                        border-color: orange !important;
                    }
                    .form-container {
                        border: 1px solid orange;
                        background-color: #333;
                        color: #fff;
                    }
                    .btn-success {
                        background-color: #28a745;
                        border-color: #28a745;
                    }
                    .btn-secondary {
                        background-color: #6c757d;
                        border-color: #6c757d;
                    }
                `}
            </style>
            <div className='w-50 form-container shadow p-5'>
                <h3 className='mt-3 p-1 text-center'>Edit Car</h3>
                <FloatingLabel controlId="floatingCarName" label="Car Name" className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="Car Name"
                        className="form-control-custom"
                        value={carDetails.car_name}
                        onChange={(e) => setCarDetails({ ...carDetails, car_name: e.target.value })}
                    />
                </FloatingLabel>
                <FloatingLabel controlId="floatingDescription" label="Description" className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="Description"
                        className="form-control-custom"
                        value={carDetails.description}
                        onChange={(e) => setCarDetails({ ...carDetails, description: e.target.value })}
                    />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPrice" label="Price" className="mb-3">
                    <Form.Control
                        type="number"
                        placeholder="Price"
                        className="form-control-custom"
                        value={carDetails.price}
                        onChange={(e) => setCarDetails({ ...carDetails, price: e.target.value })}
                    />
                </FloatingLabel>
                <FloatingLabel controlId="floatingCarModel" label="Car Model" className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="Car Model"
                        className="form-control-custom"
                        value={carDetails.car_model}
                        onChange={(e) => setCarDetails({ ...carDetails, car_model: e.target.value })}
                    />
                </FloatingLabel>
                <FloatingLabel controlId="floatingImage" label="Image" className="mb-3">
                    <Form.Control
                        type="file"
                        placeholder="Image"
                        className="form-control-custom"
                        onChange={(e) => {
                            setCarDetails({ ...carDetails, image: e.target.files[0] });
                            setImagePreview(URL.createObjectURL(e.target.files[0]));
                        }}
                    />
                </FloatingLabel>

                {imagePreview && (
                    <div className="mb-3">
                        <img src={imagePreview} alt="Image preview" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                    </div>
                )}

                <div className='d-flex flex-column'>
                    <button className='btn btn-warning' onClick={handleUpdate}>
                        Update
                    </button>
                    <button className='btn btn-danger mt-3' onClick={() => navigate('/admin')}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditCar;
