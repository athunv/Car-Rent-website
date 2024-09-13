import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';

function About() {
    useEffect(() => {
        AOS.init({
            duration: 1000, 
            easing: 'ease-in-out', 
            once: true, 
        });
    }, []);

    return (
        <div style={{ overflow: 'hidden', backgroundColor: 'black', paddingBottom: '0px' }} id='about'>
            <Row className='p-5 '>
                <Col className='container p-5 ' data-aos="fade-right"> 
                    <h1 className='text-white'>Your Comfort and Safety</h1>
                    <h1 className='text-white'>Are Our Top Priorities</h1>
                    <h5 className='text-white mt-2'>
                        Investing in a luxury car can be a dream come true, but it's important to do your research and plan carefully. This will help you make a smart decision that fits your goals and budget. Talking to experts like car dealers can be very helpful.
                    </h5>
                </Col>

                <Col style={{ display: 'flex', alignItems: 'flex-start' }} className='mb-5 mt-5' data-aos="fade-left">
                    <img
                        src="/images/your_comfort_img1.png"
                        alt=""
                        style={{ width: '400px', border: '1px solid black', borderRadius: '50px', marginRight: '20px' }}
                    />
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <img
                            src="/images/your_comfort_img2.png"
                            alt=""
                            style={{ width: '400px', border: '1px solid black', borderRadius: '50px', height: '300px' }}
                        />
                        <div style={{ width: '350px', height: '150px', border: '1px solid white', borderRadius: '50px', padding: '30px', marginTop: '20px' }} data-aos="fade-up"> {/* Animation effect */}
                            <h2 style={{ color: '#fff', textAlign: 'center' }}>10+ Years of Experience</h2>
                        </div>
                    </div>
                </Col>
            </Row>
            
        </div>
    );
}

export default About;
