import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'
import { RupeeSign } from '../assets/Symbols'

const Product = ({product}) => {
  product.numReviews = Math.ceil(Math.random()*10)
  
  return (
     <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${product._id}`}>      
        <Card.Img src={product.image} variant='top' alt={product.name}/>        
      </Link>

      <Card.Body>
      <Link to={`/product/${product._id}`}>
        <Card.Title as="div">
          <strong>{product.name}</strong>
        </Card.Title>
      </Link>
      </Card.Body>

      <Card.Text as="div">
        <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
      </Card.Text>

      <Card.Text as="h3">
        {RupeeSign}{product.price}<br className='m-3'/>
        <h6>
          <span className='text-decoration-line-through fw-bold'>
            {RupeeSign}{product.mrp}
          </span>
        </h6>
      </Card.Text>
    </Card>
  )
}
export default Product