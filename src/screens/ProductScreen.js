import React, { useEffect, useState } from 'react'
import {productDetails} from "../action/productAction.js"
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button, Card, Col, Form, Image, ListGroup, Row } from 'react-bootstrap';
import Rating from '../components/Rating';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader.js';
import Message from '../components/Message.js';
import { RupeeSign } from '../assets/Symbols.js';

const ProductScreen = ({history}) => {
    const [qty,setQty] = useState(1)
    const navigate = useNavigate()

    const dispatch = useDispatch()
    const params = useParams()
    
    const productId = params.id
    const {loading,error,product}=useSelector(state=>state.productDetails)

    const addToCartHandler = () => {
        navigate(`/cart/${params.id}?qty=${qty}`)
    }

    useEffect(()=>{
        dispatch(productDetails(productId))
    },[dispatch,productId])

    const productDiscount = (price,mrp)=>{
        let mrp1 = Math.round(mrp)
        let price1 = Math.round(price)
        return Math.round((mrp1-price1)*100/mrp1)
    }


  return (
    <>
    
        <Link className='btn btn-dark my-3' to="/">Go Back</Link>
        {loading && <Loader/>}
        {error && <Message variant="danger">{error}</Message>}
        {product &&
        <Row>
            <Col md={5}>
                <Image src={product && product.image} alt={product.name} fluid thumbnail />
            </Col> 
            <Col md={4}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h3>{product.name}</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        
                        <span className='m-2' style={{color:"red",fontSize:"30px"}}>
                            -{productDiscount(product.price,product.mrp)}%
                        </span>{RupeeSign}{product.price}<br className='m-3'/>
                        <span className='text-decoration-line-through fw-bold'>{RupeeSign}{product.mrp} </span>
                        
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <b>Description: </b><br/>
                        {product.description &&  product.description.toString().split("\n").map((x)=>{
                            return(
                                <li key={x}>{x}</li>
                            )
                        })}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={3}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Price:
                                </Col>
                                <Col>
                                    <strong>
                                        {RupeeSign}{product.price}
                                    </strong>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Status:
                                </Col>
                                <Col>
                                    <strong>{product.countInStock > 0 ? "In Stock":"Out of Stock"}</strong>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        {product.countInStock > 0 && (
                            <ListGroup.Item>
                                <Row>                                    
                                    <Col>Qty:</Col>
                                    <Col><Form.Control 
                                            as="select" 
                                            value={qty} 
                                            onChange={(e)=>setQty(e.target.value)}>
                                                {[...Array(product.countInStock).keys()].map( x => {
                                                    return <option key={x+1} value={x+1}>{x+1}</option>
                                                })}
                                        </Form.Control></Col>
                                </Row>
                            </ListGroup.Item>
                        )}
                        <ListGroup.Item>
                            <Button 
                                onClick={addToCartHandler}
                                className='btn-block' 
                                type="button" 
                                disabled={product.countInStock===0}
                            >
                                    Add To Cart
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
}
        
    </>
  )
}

export default ProductScreen
