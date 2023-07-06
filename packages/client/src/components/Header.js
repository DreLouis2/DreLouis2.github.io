import React,  {useState, useEffect} from 'react'
import { Navbar, Nav, Button, Figure, Modal } from 'react-bootstrap'
import { useProvideAuth } from 'hooks/useAuth'

export default function Header() {
  const {
    state: { user },
    signout,
  } = useProvideAuth()

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  if (!user) {
    return null
  }
  return (
    <Navbar bg='header' expand='lg' variant='dark'>
      <Navbar.Brand style={{marginLeft:'50px'}}>
          <Nav.Link href={'/'}>
            <img src='/HeaderZEN.png' alt='logo' width='150px'/>
          </Nav.Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav' className='justify-content-end'>
        {user && (
          <>
            <Nav className='ml-auto mr-2'>
                <Nav.Link className='d-flex' style={{margin:  'auto'}}
                href={`/u/${user.username}`}>
                  <Figure
                    className='bg-border-color rounded-circle overflow-hidden my-auto ml-2 p-1'
                    style={{ height: '35px', width: '35px', background: 'white'}}
                  >
                    <Figure.Image
                      src={user.profile_image}
                      className='w-100 h-100'
                    />
                  </Figure>
                </Nav.Link>

                <Button variant='outline-info' href={`/u/${user.username}`}
                  style={{border:'none', color: 'White',  margin: 'auto'}}
                  >
                  View Profile
                </Button>

                <Button variant='outline-info' onClick={handleShow}
                  style={{border:'none', color: 'white',  margin: 'auto'}}
                  >
                  Sign Out
                </Button>

                <Modal show={show} onHide={handleClose}>
                  <Modal.Body style={{color: 'black', textAlign:  'center'}}>Are you sure you want to sign out?</Modal.Body>
                  <Modal.Footer style={{margin: 'auto'}}>
                    <Button variant="outline-primary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button variant="primary" onClick={signout}>
                      Sign Out
                    </Button>
                  </Modal.Footer>
                </Modal>

            </Nav>

          </>
        )}
      </Navbar.Collapse>
    </Navbar>
  )
}
