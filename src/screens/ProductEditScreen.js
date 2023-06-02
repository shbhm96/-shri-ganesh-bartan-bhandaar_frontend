import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import { Button, Form } from 'react-bootstrap'
import Message from '../components/Message'
import { useDispatch } from 'react-redux'
import { createProduct } from '../action/productAction'

const ProductEditScreen = () => {
  const dispatch = useDispatch()

  const[Name,setName] = useState("")
  const[Price,setPrice] = useState("")
  const[Category,setCategory] = useState("")
  const[Brand,setBrand] = useState("")
  const[CountInStock,setCountInStock] = useState("")
  const[Description,setDescription] = useState("")
  const[Image,setImage] = useState("")
  const[File,setFile] = useState("")
  const [errorMsg,setErrorMsg] = useState("")

  const submitHandler = (e) =>{
    e.preventDefault()
    const validFileTypes = ['image/jpg','image/jpeg','image/png']
    if(!validFileTypes.find(type => type === File.type)){
      setErrorMsg("Uploaded image must be in JPG/JPEG/PNG format")
      return
    }
    const form = new FormData();
    form.append("name",Name)
    form.append("price",Price)
    form.append("category",Category)
    form.append("brand",Brand)
    form.append("countInStock",CountInStock)
    form.append("Description",Description)
    form.append("Image",Image)
    form.append("category",Category)
    dispatch(createProduct(form))
  }


  return (
    <>
      <Link to="/admin/products" className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Create Product</h1>
        <Form className='py-4' onSubmit={submitHandler}>
          <Form.Group className="my-2"controlId='productName'>
            <Form.Label>Product Name</Form.Label>
            <Form.Control placeholder='Enter Product Name' type="text" onChange={(e)=>setName(e.target.value)} value={Name}  />
          </Form.Group>
          <Form.Group className="my-2"controlId='productPrice'>
            <Form.Label>Product Price</Form.Label>
            <Form.Control placeholder='Enter Product Price' type="Number" onChange={(e)=>setPrice(e.target.value)} value={Price}  />
          </Form.Group>
          <Form.Group className="my-2"controlId='productCategory'>
            <Form.Label>Product Category</Form.Label>
            <Form.Control placeholder='Enter Product Category' type="text" onChange={(e)=>setCategory(e.target.value)} value={Category}  />
          </Form.Group>
          <Form.Group className="my-2"controlId='productBrand'>
            <Form.Label>Product Brand</Form.Label>
            <Form.Control placeholder='Enter Product Brand' type="text" onChange={(e)=>setBrand(e.target.value)} value={Brand}  />
          </Form.Group>
          <Form.Group className="my-2"controlId='productCountInStock'>
            <Form.Label>Product Count In Stock</Form.Label>
            <Form.Control placeholder='Enter Product CountInStock' type="text" onChange={(e)=>setCountInStock(e.target.value)} value={CountInStock}  />
          </Form.Group>
          <Form.Group className="my-2"controlId='productDescription'>
            <Form.Label>Product Description</Form.Label>
            <Form.Control placeholder='Enter Product Description' type="text" onChange={(e)=>setDescription(e.target.value)} value={Description}  />
          </Form.Group>
          <Form.Group className="my-2"controlId='productImage'>
            <Form.Label>Product Image</Form.Label>
            <Form.Control type="file" onChange={(e)=>{
              setImage("/uploads/"+e.target.files[0].name)
              setFile(e.target.files[0])
              console.log(File)
              console.log(Image)
              }}  />
              {errorMsg && <Message variant="danger">{errorMsg}</Message>}
          </Form.Group>
          <Button type="submit" varinat="primary" className='my-2'>
            Submit
          </Button>
        </Form>
      </FormContainer>
    </>
  )
}

export default ProductEditScreen