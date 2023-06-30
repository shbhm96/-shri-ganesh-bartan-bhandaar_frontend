import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import { Button, Form } from 'react-bootstrap'
import Message from '../components/Message'
import { useDispatch } from 'react-redux'
import { createProduct } from '../action/productAction'
import uploadImageApi from '../api/uploadImageAPI'

const ProductEditScreen = () => {
  const dispatch = useDispatch()

  const[Name,setName] = useState("Sample Product")
  const[Price,setPrice] = useState(0)
  const[Category,setCategory] = useState("sample")
  const[Brand,setBrand] = useState("sample")
  const[CountInStock,setCountInStock] = useState(0)
  const[Description,setDescription] = useState("This is a sample description.")
  const[Image,setImage] = useState("/images/sample.jpg")
  const[file,setFile]= useState("")
  // eslint-disable-next-line
  const [errorMsg,setErrorMsg] = useState("")

  const submitHandler = (e) =>{
    e.preventDefault()
    let list = (Description.split("\n"))
    console.log(list)
    let desc = "<br><ol type='circle'>"
    for(var i in list){
      desc= desc + "<li>"+list[i]+"</li>"
    }
    setDescription(desc.toString())
    dispatch(createProduct(Name,Price,Category,Brand,CountInStock,Description,Image))
  }

  const uploadImageHandler = (e)=>{
    if(!(file.name && file.type)) {
      setErrorMsg("Please Choose File")
      return
    }
   const formData = new FormData()
   formData.append("image",file)
   formData.append("description",Description)
   const result = uploadImageApi(formData)
   console.log(result)
   setImage(result)
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
            <Form.Control placeholder='Enter Product Description' as="textarea" rows={10} onChange={(e)=>setDescription(e.target.value)} value={Description}  />
          </Form.Group>
          <Form.Group className="my-2"controlId='productImage'>
            <Form.Label>Product Image</Form.Label>
            <Form.Control placeholder='Enter Product Description' type="text" value={Image} onChange={(e)=>console.log()} disabled/>
            <Form.Control type="file"  onChange={(e)=>{setFile(e.target.files[0])}} />
            <Button type="button" variant='primary' onClick={uploadImageHandler}>Upload</Button>
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