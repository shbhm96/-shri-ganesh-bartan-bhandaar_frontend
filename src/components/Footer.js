import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
      <Container style={{"background":"black"}}>
        <Row>
          <Col className="text-center py-3" style={{"color":"white"}}>
              <Link to="/home">Home</Link>
              <Link to="/about-us">About Us</Link>
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
