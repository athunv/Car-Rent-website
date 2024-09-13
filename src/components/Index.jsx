import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';


function Index() {
    useEffect(() => {
        AOS.init({
            duration: 1000, 
            easing: 'ease-in-out', 
            once: false,
            offset: 100,
        });
    }, []);

    return (
        <div style={{ height: '100vh',  overflow: 'hidden', position: 'relative' }} id='home'>
            <video
                src="./images/vedio.mp4"
                autoPlay
                loop
                muted
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    zIndex: -1,
                }}
            ></video>
            <Row className='text-white p-5 align-items-center justify-content-center' style={{ height: '100%' }}>
                <Col className='text-center'>
                    <h1 
                        style={{ fontSize: '80px',  }} 
                        data-aos="fade-up"
                        data-aos-offset="150"
                        
                    >
                        Effortless Travel
                    </h1>
                    <h1 
                        style={{ fontSize: '80px' }} 
                        data-aos="fade-up"
                        data-aos-delay="200"
                        data-aos-offset="150"
                    >
                        Starts Here
                    </h1>
                    <h1 
                        data-aos="fade-up"
                        data-aos-delay="400"
                        data-aos-offset="150"
                    >
                        Drive in Style, Arrive in Elegance.
                    </h1>
                    
                </Col>
                
            </Row>
            
        </div>
        
    );
}

export default Index;
