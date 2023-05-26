import React, { useEffect, useState } from 'react'

import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {  productDetails } from '../action/productAction';

const ProductEditScreen = () => {
  const productId =useParams().id
  const history = useNavigate()

  const [name,setName] = useState('');
  const [price,setPrice] = useState(0);
  const [image,setImage] = useState('');
  const [category,setCategory] = useState('');
  const [brand,setBrand] = useState('');
  const [countInStock,setCountInStock] = useState(0);
  const [description,setDescription] = useState('')
  
  

  const dispatch = useDispatch()

  const {loading,error,product} = useSelector(state=>state.productDetails)


  useEffect(()=>{

       if(product){
  
         if(!product.name){
          console.log("Hello")
            dispatch(productDetails(product.Id))

        }else{
          console.log("Hello121")
            setName(product.name)
            setPrice(product.price)
            setImage(product.image)
            setCategory(product.category)
            setBrand(product.brand)
            setCountInStock(product.countInStock)
            setDescription(product.description)

        }          
    }
  },[product,dispatch,productId,history])

  const submitHandler=(e)=>{
    e.preventDefault()
    //update Product
  }
  
  return (
    <>
        <Link to="/admin/products" className='btn btn-light my-3'>
            Go Back
        </Link>
    
    <FormContainer>
      <h1>Edit Products</h1>
      {loading ? <Loader/> : error ?<Message variant="danger">{error}</Message>:(
      <Form onSubmit={submitHandler} >
      <Form.Group controlId='name'>
        <Form.Label>Name</Form.Label>
        <Form.Control placeholder='enter your name' type='name' onChange={(e)=>setName(e.target.value)} value={name}/ >
      </Form.Group>
        <Form.Group controlId='price'>
        <Form.Label>Price</Form.Label>
        <Form.Control placeholder='enter your number' type='Number' onChange={(e)=>setPrice(e.target.value)} value={price}/ >
        </Form.Group>
        <Form.Group controlId='image'>
        <Form.Label>Image</Form.Label>
        <Form.Control placeholder='Enter image Url' type='text' onChange={(e)=>setImage(e.target.value)} value={image} >          
        </Form.Control>
          <Form.File id="image-file" label="Choose File" cust>
            
          </Form.File>
        </Form.Group>
        <Form.Group controlId='category'>
        <Form.Label>Category</Form.Label>
        <Form.Control placeholder='enter the category' type='text' onChange={(e)=>setCategory(e.target.value)} value={category}/ >
        </Form.Group>
        <Form.Group controlId='brand'>
        <Form.Label>Brand</Form.Label>
        <Form.Control placeholder='enter your Brand Name' type='text' onChange={(e)=>setBrand(e.target.value)} value={brand}/ >
        </Form.Group>
        <Form.Group controlId='countInStock'>
        <Form.Label>Count In Stock</Form.Label>
        <Form.Control placeholder='enter Count in Stock' type='Number' onChange={(e)=>setCountInStock(e.target.value)} value={countInStock}/ >
        </Form.Group>
        <Form.Group controlId='description'>
        <Form.Label>Description</Form.Label>
        <Form.Control placeholder='enter product description' type='text' onChange={(e)=>setDescription(e.target.value)} value={description}/ >
        </Form.Group>        
        <Button type="submit" variant="primary">
          Update
        </Button>
      </Form>
      )}
    </FormContainer>  
    </>
  )
}

export default ProductEditScreen
