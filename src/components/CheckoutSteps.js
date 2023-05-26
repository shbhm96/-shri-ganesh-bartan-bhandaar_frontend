import React from 'react'
import { Nav } from 'react-bootstrap'

const CheckoutSteps = (step1,step2,step3,step4) => {
  return (     
    <Nav className='justify-content-center md-4'>
        <Nav.Item>
            {step1 ? (
                <Nav.Link to="/login">
                    <Nav.Link>Sign In</Nav.Link>
                </Nav.Link>
            ):<Nav.Link disabled>Sign In</Nav.Link>}
        </Nav.Item>
        <Nav.Item>
            {step2 ? (
                <Nav.Link to="/shipping">
                    <Nav.Link>Shipping</Nav.Link>
                </Nav.Link>
            ):<Nav.Link disabled>Shipping</Nav.Link>}
        </Nav.Item>
        <Nav.Item>
            {step3 ? (
                <Nav.Link to="/placeorder">
                    <Nav.Link>Place Order</Nav.Link>
                </Nav.Link>
            ):<Nav.Link disabled>Place Order</Nav.Link>}
        </Nav.Item>
        <Nav.Item>
            {step4 ? (
                <Nav.Link to="/login">
                    <Nav.Link>Sign In</Nav.Link>
                </Nav.Link>
            ):<Nav.Link disabled>Sign In</Nav.Link>}
        </Nav.Item>

    </Nav>
  )
}

export default CheckoutSteps
