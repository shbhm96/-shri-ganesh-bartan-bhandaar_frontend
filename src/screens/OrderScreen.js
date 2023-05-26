import React, { useEffect } from 'react'
import {  Card, Col,  Image, ListGroup, Row } from 'react-bootstrap';
import { Link, useParams,  } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';

import { getOrderDetails } from '../action/orderAction';

const OrderScreen = () => {

    const orderId = useParams().id
    const dispatch = useDispatch()
    console.log("id",orderId)

    const {order,loading,error} = useSelector(state=>state.orderDetails)
    console.log("order",order)


    useEffect(()=>{
        console.log('User Esffect')
        dispatch(getOrderDetails(orderId))
    },[dispatch,orderId])


  return (
    <>
    {loading && <Loader/>}
    {error && <Message variant="danger">{error}</Message> }
    <>
    {console.log("orderss",order)}
        <h1>Order {order._id}</h1>
        
        <Row>
        <Col md={8}>
            <ListGroup varinat="flush">
                <ListGroup.Item>
                    <h2>Shipping</h2>
                    <p><strong>Name</strong>{order.user.name}</p>
                    <p><a href={`mailto:${order.user.email}`}>
                        <i class="fa fa-envelope" aria-hidden="true"></i>
                        {order.user.email}
                    </a></p>
                    <p>
                        <strong>Address:</strong>
                        {order.shippingAddress.address},{order.shippingAddress.city},{order.shippingAddress.postalCode},
                        {order.shippingAddress.country}
                    </p>
                    {order.isDelivered ? <Message variant="success">Delivered on {order.deliveredAt}</Message>:
                    <Message variant="danger">Not Delivered</Message>}
                </ListGroup.Item>

                <ListGroup.Item>
                    <h2>Payment Method</h2>
                    <p><strong>Method:</strong>
                    {order.paymentMethod.paymentMethod}</p>
                    {order.isPaid ? <Message variant="success">Paid on {order.paidAt}</Message>:
                    <Message variant="danger">Not Paid</Message>}
                </ListGroup.Item>

                <ListGroup.Item>
                    <h2>Order Items</h2>
                    {order.orderItems && order.orderItems.length === 0 ? <Message>Your Order is Empty</Message> :
                    (
                        <ListGroup variant='flush'>
                            {order && order.orderItems.map((item,index)=>{
                                return <ListGroup.Item key={index}>
                                    <Row>
                                        <Col md={1}>
                                            <Image src={item.image} alt={item.name} fluid rounded/>
                                        </Col>
                                        <Col>
                                            <Link to={`/product/${item.product}`}>
                                                {item.name}
                                            </Link>                                          
                                        </Col>
                                        <Col md={4}>
                                            {item.qty} X {item.price} = {item.qty * item.price}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            })}
                        </ListGroup>
                    )}
                </ListGroup.Item>
            </ListGroup>    
        </Col>
        <Col md={4}>
            <Card>
                <ListGroup>
                    <ListGroup.Item>
                        <h2>Order Summary</h2>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Items</Col>
                            <Col>${order.itemsPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Shipping</Col>
                            <Col>${order.shippingPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Tax</Col>
                            <Col>${order.taxPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Total</Col>
                            <Col>${order.totalPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        {error && <Message variant="danger">{error}</Message>}
                    </ListGroup.Item>
                   
                </ListGroup>
            </Card>
        </Col>
    </Row>

        </>
    </>
  )
}

export default OrderScreen
