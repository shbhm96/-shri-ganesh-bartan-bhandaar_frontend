import React, { useEffect } from 'react'
import { Button, Card, Col,  Image, ListGroup, Row } from 'react-bootstrap';
import { Link, useNavigate,  } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../action/orderAction';
import { RupeeSign } from '../assets/Symbols';

const PlaceOrderScreen = () => {
    const {cartItems, shippingAddress,paymentMethod} = useSelector(state=>state.cart)
    const dispatch = useDispatch()
    const history = useNavigate()

    const addDecimal = (num) =>{
        return (Math.round(num*100)/100).toFixed(2)
    }

    //calculate price
    const itemsPrice =   addDecimal(cartItems && cartItems.reduce((acc,item)=> acc + item.price * item.qty,0))
    const shippingPrice= addDecimal(itemsPrice > 100 ? 0 :100)
    const taxPrice =     addDecimal(Number((0.15 * itemsPrice).toFixed(2)))
    const totalPrice =   addDecimal(Number(itemsPrice)+Number(shippingPrice)+Number(taxPrice))


    const {order,success,error} = useSelector(state=>state.orderCreate)

    useEffect(()=>{
        if(success){
            history(`/order/${order._id}`)
        }
    })

    const placeOrderHandler = (e) =>{
        e.preventDefault()
        dispatch(createOrder({
            orderItems: cartItems,
            shippingAddress,
            paymentMethod:paymentMethod.paymentMethod.toString(),
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice
        }))

    }

  return (
    <>
    <CheckoutSteps step1 step2 step3 step4/>
    <Row>
        <Col md={8}>
            <ListGroup varinat="flush">
                <ListGroup.Item>
                    <h2>Shipping</h2>
                    <p>
                        <strong>Address:</strong>
                        {shippingAddress.address},{shippingAddress.city},{shippingAddress.postalCode},
                        {shippingAddress.country}
                    </p>
                </ListGroup.Item>

                <ListGroup.Item>
                    <h2>Payment Method</h2>
                    <strong>Method:</strong>
                    {paymentMethod.paymentMethod}
                </ListGroup.Item>
                
                <ListGroup.Item>
                    <h2>Order Items</h2>
                    {cartItems && cartItems.length === 0 ? <Message>Your Cart is Empty</Message> :
                    (
                        <ListGroup variant='flush'>
                            {cartItems && cartItems.map((item,index)=>{
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
                            <Col>{RupeeSign}{itemsPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Shipping</Col>
                            <Col>{RupeeSign}{shippingPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Tax</Col>
                            <Col>{RupeeSign}{taxPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Total</Col>
                            <Col>{RupeeSign}{totalPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        {error && <Message variant="danger">{error}</Message>}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Button className='btn-block' type="button"
                            disabled = {cartItems && cartItems.length === 0} onClick={placeOrderHandler}>
                                Place Order
                        </Button>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Col>
    </Row>
      
    </>
  )
}

export default PlaceOrderScreen
