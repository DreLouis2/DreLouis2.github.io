import React, { useState } from 'react'
import {
  Container,
  Row,
  Col,
  InputGroup,
  Form,
  Button,
  Figure
} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useProvideAuth } from 'hooks/useAuth'
import { LandingHeader, LoadingSpinner } from 'components'
import { setAuthToken } from 'utils/axiosConfig'
import { useEffect } from 'react'

const initialState = {
  username: '',
  password: '',
  email: '',
  isSubmitting: false,
  errorMessage: null,
}



export default function RegisterPage() {

  let imgs = [
    'bird.svg',
    'dog.svg',
    'fox.svg',
    'frog.svg',
    'lion.svg',
    'owl.svg',
    'tiger.svg',
    'whale.svg',
  ]

  const [data, setData] = useState(initialState)
  const auth = useProvideAuth()
  
  let navigate = useNavigate();

  const [profileImage, setProfileImage] = useState(imgs[Math.floor(Math.random() * imgs.length)])
  const [selectedImg, setSelectedImg] = useState(null)
  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    })
  }

  const handleSignup = async (event) => {
    const form = event.currentTarget
    event.preventDefault()
    event.stopPropagation()

    if (form.checkValidity() === false) {
    }

    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null,
    })
    try {
      const res = await auth.signup(data.username, data.password, profileImage, data.email)
      setData({
        ...data,
        isSubmitting: false,
        errorMessage: null,
      })
      setAuthToken(res.token)
      navigate('/')
    } catch (error) {
      setData({
        ...data,
        isSubmitting: false,
        errorMessage: error ? error.message || error.statusText : null,
      })
    }
  }

  return (
    <div style={{overflow: "auto", height: "100vh"}}>
      <LandingHeader/>
      <Container className='mb-5'>
        <Row className='pt-5 justify-content-center'>
            <Form
                noValidate
                validated
                style={{ width: '350px' }}
                onSubmit={handleSignup}
            >
                <h3 className="mb-3">Join Us!</h3>
                <Form.Group controlId='username-register'>
                <Form.Label>Username</Form.Label>
                <InputGroup>
                    <InputGroup.Prepend>
                    <InputGroup.Text id='inputGroupPrepend'>@</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                    type='text'
                    name='username'
                    placeholder='Username'
                    aria-describedby='inputGroupPrepend'
                    required
                    value={data.username}
                    onChange={handleInputChange}
                    />
                </InputGroup>
                </Form.Group>
                <Form.Group>
                <Form.Label htmlFor='Register'>Password</Form.Label>
                <Form.Control
                    type='password'
                    name='password'
                    required
                    id='inputPasswordRegister'
                    value={data.password}
                    onChange={handleInputChange}
                />
                <Form.Label htmlFor='email'>Email</Form.Label>
                <Form.Control
                    type='email'
                    name='email'
                    required
                    id='inputEmailRegister'
                    value={data.email}
                    onChange={handleInputChange}
                />
                </Form.Group>
                {data.errorMessage && (
                <span className='form-error text-warning'>{data.errorMessage}</span>
                )}
                <Form.Group>
                  <Form.Label>Choose an Avatar</Form.Label> 
                  <div align="center">
                  {imgs.map((img) => {
                  
                  return <Figure key={img}
                  className="bg-border-primary rounded-circle my-2 ml-2 m-2 p-2"
                  style={{
                    height: "50px",
                    width: "50px",
                    backgroundColor: "white",
                  }}
                >
                  <Figure.Image 
                  onClick={(e)=> {
                    setProfileImage(`/${img}`)
                    setSelectedImg(img)
                  }} 
                  className='class="w-100 h-100 figure-img img-fluid"' 
                  src={`/${img}`} />
                </Figure>
                  })}
                  </div>
                  <br/>
                {selectedImg?
                <div>
                <Form.Label>Selected Avatar</Form.Label>
                <Figure.Image
                className='class="w-100 h-100 figure-img img-fluid"' 
                src={`/${selectedImg}`} />
                </div>
                    :
                <p></p>
                }
                </Form.Group>

                
                  
                
                <Row className='mr-0'>
                <Col>
                    Already Registered?
                    <Button
                    as='a'
                    variant='link'
                    onClick={() => navigate("/login")}
                    >
                    Login
                    </Button>
                </Col>
                <Button type='submit' disabled={data.isSubmitting}>
                    {data.isSubmitting ? <LoadingSpinner /> : 'Sign up'}
                </Button>
                </Row>
            </Form>
        </Row>
      </Container>
    </div>
  )
}
