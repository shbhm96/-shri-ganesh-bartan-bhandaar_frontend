import React, {  useState } from 'react'

import { Button, Col, Form } from 'react-bootstrap';
import {  useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../action/cartAction';
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentScreen = () => {

    const {shippingAddress} = useSelector(state=>state.cart)

    const dispatch = useDispatch()
    const history = useNavigate()

    if(!shippingAddress){
        history("/shipping")
    }

    const [paymentMethod,setPaymentMethod] = useState('Paypal');


    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(savePaymentMethod({paymentMethod}))
        history('/placeorder')

    }

  return (
<FormContainer>
    <CheckoutSteps step1 step2 step3/>
    <h1>Payment Method</h1>
    <Form onSubmit={submitHandler}>
     <Form.Group>
        <Form.Label as="legend">Select Method</Form.Label>
     <Col>
        <Form.Check type='radio' label="Paypal or Credit Card" id="paypal" name="paymentMethod"
        value="Paypal" checked onChange={(e)=>setPaymentMethod(e.target.value)}>

        </Form.Check>

        <Form.Check type='radio' label="Stripe" id="Stripe" name="paymentMethod"
        value="Stripe" onChange={(e)=>setPaymentMethod(e.target.value)}>
            
        </Form.Check>
     </Col>
     </Form.Group>
      <Button type="submit" variant="primary">
        Continue
      </Button>
      

    </Form>
</FormContainer>
  )
}

export default PaymentScreen
