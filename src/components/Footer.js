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
              <i class="fa-brands fa-facebook-f"></i>
              <i class="fa-brands fa-instagram"></i>
              <i class="fa-brands fa-youtube"></i>
              <i class="fa-brands fa-twitter"></i>
              
          </Col>
        </Row>
      </Container>
      
    </footer>
  )
}

export default Footer
