import React, { useEffect } from 'react';
import { Row, Col, Table } from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Services() {
    useEffect(() => {
        AOS.init({
            duration: 1000, 
            easing: 'ease-in-out', 
            once: true, 
            delay: 100, 
        });
    }, []);

    const mainDivStyle = {
        backgroundImage: 'url("./images/car.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        height: '100vh',
        minHeight: '500px',
        padding: '20px',
        color: 'white',
    };

    const tableStyle = {
        width: '100%',
        color: 'white',
        borderCollapse: 'collapse', 
        backgroundColor: 'transparent',
    };

    const colStyle = {
        marginTop: '100px',
        marginLeft:'100px'
    };

    return (
        <div id='service' style={mainDivStyle}>
            <Row className='text-white'>
                <Col md={5} style={colStyle}>
                    <Table style={tableStyle} bordered  >
                        <tbody>
                            <tr>
                                <td style={{ borderColor: 'white', backgroundColor:'transparent', color:'white' }} data-aos="fade-up" data-aos-delay="100">
                                    <div style={{ padding: '20px', textAlign: 'center' }}>
                                        <h3>Best Price Guarantee</h3>
                                    </div>
                                </td>
                                <td style={{ borderColor: 'white', backgroundColor:'transparent', color:'white' }} data-aos="fade-up" data-aos-delay="200">
                                    <div style={{ padding: '20px', textAlign: 'center' }}>
                                        <h3>Luxury Car Collection</h3>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ borderColor: 'white', backgroundColor:'transparent', color:'white' }} data-aos="fade-up" data-aos-delay="400">
                                    <div style={{ padding: '20px', textAlign: 'center' }}>
                                        <h3>Professional Drivers</h3>
                                    </div>
                                </td>
                                <td style={{ borderColor: 'white', backgroundColor:'transparent', color:'white' }} data-aos="fade-up" data-aos-delay="600">
                                    <div style={{ padding: '20px', textAlign: 'center' }}>
                                        <h3>Clean & Safe Journey</h3>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ borderColor: 'white',backgroundColor:'transparent', color:'white' }} data-aos="fade-up" data-aos-delay="800">
                                    <div style={{ padding: '20px', textAlign: 'center' }}>
                                        <h3>Fastest Car Delivery</h3>
                                    </div>
                                </td>
                                <td style={{ borderColor: 'white', backgroundColor:'transparent', color:'white'}} data-aos="fade-up" data-aos-delay="1000">
                                    <div style={{ padding: '20px', textAlign: 'center' }}>
                                        <h3>24/7 Customer Support</h3>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
                <Col md={6}>
                    <h1 className='text-center fw-bold' style={{marginTop:'150px'}}>Unforgettable Luxury Car</h1>
                    <h1 className='text-center fw-bold'>Journeys Await You</h1>
                </Col>
            </Row>
        </div>
    );
}

export default Services;
