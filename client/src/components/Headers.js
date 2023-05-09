import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {NavLink} from "react-router-dom"

const Headers = () => {
  return (
    <>
      <Navbar bg="black" variant="dark">
        <Container>
          <NavLink to="/login" className=" text-light text-decoration-none">Login</NavLink>
          <Nav className="">
            <NavLink to="/register" className="mt-3 mx-2 text-light text-decoration-none">Register</NavLink>

          </Nav>
        </Container>
      </Navbar>
    <h3 style={{"text-align": "center", "margin-top": "50px", "fontFamily":"oblique"}}>Please login or register to continue</h3>
    </>
  )
}

export default Headers
