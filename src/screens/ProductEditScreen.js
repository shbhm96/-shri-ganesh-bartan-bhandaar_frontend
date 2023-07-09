import React, { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import { Button, Form } from 'react-bootstrap'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import { createProduct, productDetails } from '../action/productAction'
// import uploadImageApi from '../api/uploadImageAPI'
import axios from 'axios'
import Loader from '../components/Loader'

const ProductEditScreen = () => {
  const params = useParams()
  const productId = params.id
  const dispatch = useDispatch()
  const history = useNavigate()

  const {loading,error,product}=useSelector(state=>state.productDetails)

  const[Name,setName] = useState("Sample Product")
  const[Price,setPrice] = useState(0)
  const[Category,setCategory] = useState("sample")
  const[Brand,setBrand] = useState("sample")
  const[CountInStock,setCountInStock] = useState(0)
  const[Description,setDescription] = useState("This is a sample description.")
  const[Image,setImage] = useState("/images/sample.jpg")
  const[file,setFile]= useState("")
  const [MRP,setMRP]=useState(0)

  const[isImageUploading,setIsImageUploading] = useState()
  const formData = new FormData()
  // eslint-disable-next-line
  const [errorMsg,setErrorMsg] = useState(false)
  const [ProductUploadErrorMsg,setProductUploadErrorMsg]=useState("")

  const uploadImageAPI = useCallback(async (formData)=>{
    if(isImageUploading){
      return
    }
    setIsImageUploading(true)    
    axios
    .post(`${process.env.REACT_APP_BACKEND_SERVER_API}/api/images`,
    formData,
    {
      headers:
      {
        "Content-Type":"multipart/form-data"
      }
    }).then(result=>result)
    .then(data=>{
      console.log(data["data"]["imageUrl"])
      setImage(data["data"]["imageUrl"])
    })
    setIsImageUploading(false)
  },[formData,isImageUploading])


  const uploadImageHandler = (e)=>{
    setErrorMsg("")
    if(!(file.name && file.type)) {
      setErrorMsg("Please Choose File")
      return
    }
   formData.append("image",file)
   formData.append("description",Description)
   uploadImageAPI(formData)
  }  

  const submitHandler = (e) =>{
    e.preventDefault()
    if(product.name === Name && product.description ===Description && product.price === Price
      && product.image === Image && product.category === Category && product.brand === Brand 
      && product.countInStock === CountInStock){
        setProductUploadErrorMsg("No Changes were made!!!")
        return
      }
    dispatch(createProduct(Name,Price,Category,Brand,CountInStock,Description,Image,MRP))
  }

  useEffect(()=>{
    if(productId){
      dispatch(productDetails(productId))
    }
    setName(product.name)
    setCategory(product.category)
    setBrand(product.brand)
    setCountInStock(product.countInStock)
    setDescription(product.description)
    setImage(product.image)
    setPrice(product.price)
  },[productId,dispatch,product.name,product.category,product.price,product.Description])

  return (
    <>
      <Link to="/admin/products" className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        {ProductUploadErrorMsg && <Message variant="success">{ProductUploadErrorMsg}</Message>}
        <h1>Create Product</h1>
        {loading && <Loader/>}
        <Form className='py-4' onSubmit={submitHandler}>
          <Form.Group className="my-2"controlId='productName'>
            <Form.Label>Product Name</Form.Label>
            <Form.Control placeholder='Enter Product Name' type="text" onChange={(e)=>setName(e.target.value)} value={Name}  />
          </Form.Group>
          <Form.Group className="my-2"controlId='productPrice'>
            <Form.Label>Product Price</Form.Label>
            <Form.Control placeholder='Enter Product Price' type="Number" onChange={(e)=>setPrice(e.target.value)} value={Price}  />
          </Form.Group>
          <Form.Group className="my-2"controlId='productMRP'>
            <Form.Label>Product MRP</Form.Label>
            <Form.Control placeholder='Enter Product MRP' type="Number" onChange={(e)=>setMRP(e.target.value)} value={MRP}  />
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