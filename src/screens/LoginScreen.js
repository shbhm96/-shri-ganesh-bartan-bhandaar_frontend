import React, { useEffect, useState } from 'react'

import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../action/userAction';
import Message from '../components/Message';
import Loader from '../components/Loader';

const LoginScreen = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword]= useState('')
  const history = useNavigate()

  const dispatch = useDispatch()

  const {loading,error,userInfo} = useSelector(state=>state.userLogin)


  // const redirect= window.location ? window.location.pathname.toString().split("=")[1] : "/"
  // console.log("value",redirect)

  useEffect(()=>{
    if(userInfo){
        history("/")
    }
  },[userInfo,history])

  const submitHandler=(e)=>{
    e.preventDefault()
    dispatch(loginUser(email,password))
    setEmail('')
    setPassword('')
  }
  
  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error &&<Message variant="danger">{error}</Message>}
      {loading && <Loader/>}
      <Form onSubmit={submitHandler} >
        <Form.Group controlId='emailId'>
        <Form.Label>Email Address</Form.Label>
        <Form.Control placeholder='enter your email address' type='email' onChange={(e)=>setEmail(e.target.value)} value={email}/ >
        </Form.Group>
        <Form.Group controlId='password'>
        <Form.Label>Password</Form.Label>
        <Form.Control placeholder='enter your password' type='password' onChange={(e)=>setPassword(e.target.value)} value={password}/ >       
        </Form.Group>
        <Button type="submit" variant="primary">
          Sign In
        </Button>
        <Row>
          <Col>
            New Customer?<Link to={'/register'}>Register</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>  
    
  )
}

export default LoginScreen
