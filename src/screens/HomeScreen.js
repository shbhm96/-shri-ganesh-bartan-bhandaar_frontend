import React, { useEffect } from 'react'
import { Col,  Row } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useGetProductQuery } from '../slices/productsApiSlice'


const Homescreen = () => {
  const {data:products,isLoading,isError : error}=useGetProductQuery();
  
  return (
  <>
  <h1>Latest Product</h1>
  {isLoading ? (<Loader/>) : error ? (<Message variant="danger">{error?.data?.message || error.error}</Message>):(
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