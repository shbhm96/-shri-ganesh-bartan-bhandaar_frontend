import React, { useEffect } from 'react'
import { Col,  Row } from 'react-bootstrap'
import Product from '../components/Product'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProducts } from '../action/productAction'
import { useNavigate } from 'react-router-dom'


const Homescreen = () => {
  const dispatch = useDispatch()
  const history = useNavigate()
  const {loading,products,error} = useSelector(state=>state.productList)
 
  useEffect(()=>{
      dispatch(listProducts())
  },[dispatch,history])
  
  return (
  <>

  <h1>Latest Product</h1>
  
  {loading ? (<Loader/>) : error ? (<Message variant="danger">{error}</Message>):(
    <Row>      
      {products && products.map((product)=>{
        return <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                  <Product product={product}/>
                </Col>
      })}
    </Row>
  )}
  <Message variant="info">
    Did Not Find? What you are looking for? 
    <a 
      href="https://forms.gle/Z2ph2YH6GsP36Pnh8"
      target='_blank' 
      rel="noreferrer"
    >
      Click Here!!
    </a>
  </Message>
  </>
  )
}
export default Homescreen