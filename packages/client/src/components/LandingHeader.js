import React from 'react'
import { Container, Jumbotron, Button, Nav } from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom'
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

export default function LandingHeader({login}) {
    let navigate = useNavigate();
    return (
        <Jumbotron
            fluid
            className='text-info'
            style={{
                background: "url('/spider.jpg') rgba(0, 0, 0, 0.7)",
                backgroundSize: 'cover',
                backgroundPosition: '50% 20%',
                backgroundBlendMode: 'multiply',
                height: '400px',
                padding: '4rem 2rem',
                marginBottom: '2vh'
            }}
        >
            <Container className='hero-text position-relative d-flex justify-content-center align-items-center flex-column'>
                    <div className='' style={{ height: '100%' }}>
                            <img 
                                src='/zen.png' 
                                alt='logo' 
                                width='300px' 
                                onClick={()=>{navigate("/")}} 
                                style={{
                                    cursor: "pointer",
                                    width: "300px"
                                }}/>
                    </div>
                    { login && (
                        <div className="pt-4 d-flex">
                            <Nav.Link
                                as={Link}
                                to='/login'
                                className="float-lg-right float-xs-none mx-3"
                            >
                                <Button variant='outline-primary'>Login</Button>
                            </Nav.Link>
                            <Nav.Link
                                as={Link}
                                to='/register'
                                className="float-lg-right float-xs-none mx-3"
                            >
                                <Button variant='primary'>Register</Button>
                            </Nav.Link>
                        </div>
                    )}
            </Container>
        </Jumbotron>
    )
}
