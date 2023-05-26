import React, {  useState } from 'react'

import { Button,  Form } from 'react-bootstrap';
import {  useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../action/cartAction';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingScreen = () => {

    const {shippingAddress} = useSelector(state=>state.cart)
    const dispatch = useDispatch()
    const history = useNavigate()


    const [address,setAddress] = useState(shippingAddress.address);
    const [city,setCity] = useState(shippingAddress.city);
    const [postalCode,setPostalCode] = useState(shippingAddress.postalCode);
    const [country,setCountry] = useState(shippingAddress.country);


    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(saveShippingAddress({address,city,postalCode,country}))
        history('/payment')

    }

  return (
<FormContainer>
    <CheckoutSteps step1 step2/>
    <h1>Shipping</h1>
    <Form onSubmit={submitHandler}>
      <Form.Group controlId='address'>
        <Form.Label>Address</Form.Label>
        <Form.Control placeholder='enter your Address' type='text' onChange={(e)=>setAddress(e.target.value)} value={address}/ >
      </Form.Group>
      <Form.Group controlId='city'>
        <Form.Label>city</Form.Label>
        <Form.Control placeholder='enter your city' type='text' onChange={(e)=>setCity(e.target.value)} value={city}/ >
      </Form.Group>
      <Form.Group controlId='postalCode'>
        <Form.Label>Postal Code</Form.Label>
        <Form.Control placeholder='enter your postalCode' type='text' onChange={(e)=>setPostalCode(e.target.value)} value={postalCode}/ >
      </Form.Group>
      <Form.Group controlId='country'>
        <Form.Label>Country</Form.Label>
        <Form.Control placeholder='enter your country' type='text' onChange={(e)=>setCountry(e.target.value)} value={country}/ >
      </Form.Group>
      <Button type="submit" variant="primary">
        Continue
      </Button>

    </Form>
</FormContainer>
  )
}

export default ShippingScreen
