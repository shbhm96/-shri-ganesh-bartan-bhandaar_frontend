import React from 'react'
import { Col, Container, Nav, NavLink, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
      <Container style={{"background":"black"}} fluid>
        <Row>
          <Col className="text-center py-3" style={{"color":"white"}}>
              <NavLink to="/home">Home</NavLink>
              <NavLink to="/about-us">About Us</NavLink>
              <i className="fa-brands fa-facebook-f"></i>
              <i className="fa-brands fa-instagram"></i>
              <i className="fa-brands fa-youtube"></i>
              <i className="fa-brands fa-twitter"></i>
              
          </Col>
        </Row>
      </Container>
      
    </footer>
  )
}

export default Footer
