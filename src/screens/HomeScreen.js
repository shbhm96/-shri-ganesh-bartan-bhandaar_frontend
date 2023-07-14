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

  {console.log("Hey",loading)}
 
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
  </>
  )
}
export default Homescreen