import React, { useEffect } from 'react'
import { Col,  Row } from 'react-bootstrap'
import Product from '../components/Product'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../action/productAction'
import Message from '../components/Message'
import Loader from '../components/Loader'
const Homescreen = () => {
  const dispatch = useDispatch()
  const {loading,products,error} = useSelector(state=>state.productList)
 
  useEffect(()=>{
    dispatch(listProducts())
  },[dispatch])
  
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
  </>
  )
}
export default Homescreen