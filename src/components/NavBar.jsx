import React from 'react'
import { Container, Nav, Navbar as Navs, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function Navbar(props) {
  console.log(props)
  return (
    <Navs expand='lg' className='p-2' bg="dark" variant="dark">
        <Container fluid>
        <Navs.Brand as={Link} to='/'>
          News360
        </Navs.Brand>
        <Navs.Toggle />
        <Navs.Collapse className="justify-content-end">
          <Nav >
            {props?.user ? 
            <>
                      
            <Nav.Link as={Link} to='/saved'>Saved</Nav.Link>
            <Nav.Link as={Link} to='/profile'>Profile</Nav.Link>
            <Nav.Link onClick={props.logoutUser}>Logout</Nav.Link>

          </>
          :
          <>
          <Nav.Link as={Link} to='/login'>Login</Nav.Link>
          <Nav.Link as={Link} to='/signup'>Signup</Nav.Link>
          </>
          }



          </Nav>
        </Navs.Collapse>
        </Container>
      </Navs>
  )
}