import React, { useEffect, useState } from 'react'

import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../action/userAction';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { myOrderList } from '../action/orderAction';

const ProfileScreen = () => {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword]= useState('')
  const [confPass,setConfPass]= useState('')
  const [msg,setMsg]= useState(null)
  const history = useNavigate()

  const dispatch = useDispatch()
  
  const {userInfo} = useSelector((state)=>state.userLogin)
  const {success} =useSelector((state)=>state.userUpdateProfile)
  const {loading:loadingOrders,orders,error:errorOrders} = useSelector((state)=>state.myOrderList)

  useEffect(()=>{
    if(!userInfo){
      history('/login')
    }else{
      dispatch(myOrderList())
    }
  },[dispatch,history,userInfo])

  const submitHandler=(e)=>{
    e.preventDefault()
    if(password !== confPass){
      setMsg("Password Do not match")
    }else{
      const user = {id: userInfo._id,name,email,password}
      dispatch(updateUserProfile(user))
    //   setEmail('')
    //   setPassword('')
    //   setName('')
    //   setConfPass('')
    }
  }
  return (
    <Row>
      <Col md={3}>
      <h2>User Profile</h2>
      {msg && <Message variant="info">{msg}</Message>}
      {/* {error &&<Message variant="danger">{error}</Message>}
      {loading && <Loader/>} */}
      {success && <Message variant='sucess'>Profile Updated!</Message>}
      <Form onSubmit={submitHandler} >
      <Form.Group controlId='name'>
        <Form.Label>Name</Form.Label>
        <Form.Control placeholder='enter your name' type='name' onChange={(e)=>setName(e.target.value)} value={userInfo.name}/ >
        </Form.Group>
        <Form.Group controlId='emailId'>
        <Form.Label>Email Address</Form.Label>
        <Form.Control placeholder='enter your email address' type='email' onChange={(e)=>setEmail(e.target.value)} value={userInfo.email}/ >
        </Form.Group>
        <Form.Group controlId='password'>
        <Form.Label>Password</Form.Label>
        <Form.Control placeholder='enter your password' type='password' onChange={(e)=>{setPassword(e.target.value) || setMsg('')}} value={password}/ >       
        </Form.Group>
        <Form.Group controlId='Confirm password'>
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control placeholder='enter your confirm password' type='password' onChange={(e)=>setConfPass(e.target.value) || setMsg('')} value={confPass}/ >       
        </Form.Group>
        <Button type="submit" variant="primary">
          Update
        </Button>
      </Form>
      </Col>

      <Col md={9}>
        <h2>My Orders</h2>
        {loadingOrders && <Loader/>}
        {errorOrders ? <Message variant="danger">{errorOrders}</Message>:(
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>Id</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th> 
                <th>DELIVERED</th>
              </tr>
            </thead>
            <tbody>
              {console.log("order kya hai",orders)}
              {orders && orders.map((order)=>{
                return <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.toString().substring(0,10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>{order.isPaid ? order.paidAt : (
                    <i className='fas fa-times' style={{color:'red'}}></i>
                  )} </td>
                  <td>
                    {order.isDelivered ? order.isDelivered.toString().substring(0,10):(
                      <i className='fas fa-times' style={{color:'red'}}></i>
                    )}
                  </td>
                  <td>
                    <Link to={`/order/${order._id}`}>
                      <Button variant="light" className='btn-block btn-sm'>Details</Button>
                    </Link>
                  </td>
                </tr>
              })}
            </tbody>

          </Table>
        )}
      </Col>
    </Row>

    
  )

}


export default ProfileScreen
