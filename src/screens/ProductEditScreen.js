import React, { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import { Button, Col, Form, Row } from 'react-bootstrap'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import { createProduct, productDetails, updateProduct } from '../action/productAction'
// import uploadImageApi from '../api/uploadImageAPI'
import axios from 'axios'
import Loader from '../components/Loader'

const ProductEditScreen = () => {
  console.log("Heklko")
  const params = useParams()
  const productId = params.id
  const dispatch = useDispatch()
  const history = useNavigate()

  const {loading,error,product}=useSelector(state=>state.productDetails)
  const {loading:updateLoading,error:updateError,success}=useSelector(state=>state.productUpdate)
  const {success:createSuccess} = useSelector(state=>state.productCreate)

  const[Name,setName] = useState("Sample Product")
  const[Price,setPrice] = useState()
  const[Category,setCategory] = useState("sample")
  const[Brand,setBrand] = useState("sample")
  const[CountInStock,setCountInStock] = useState(0)
  const[Description,setDescription] = useState("This is a sample description.")
  const[Image,setImage] = useState("/images/sample.jpg")
  const[file,setFile]= useState("")
  const [MRP,setMRP]=useState()

  const[isImageUploading,setIsImageUploading] = useState()
  const formData = new FormData()
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
      && product.countInStock === CountInStock && product.MRP === MRP){
        setProductUploadErrorMsg("No Changes were made!!!")
        return
      }
      if(Price===0 || MRP === 0){
        setErrorMsg("Price / MRP cannot be Zero!!!")
        return
      }
      if(Number(Price)>Number(MRP)){
        setErrorMsg("Price Cannot be more than MRP!!!")
        return
      }
      if(!(file.name && file.type)) {
        setErrorMsg("Please Choose File")
        return
      }
      if(productId){
        dispatch(updateProduct(productId,Name,Price,Category,Brand,CountInStock,Description,Image,MRP))
      }else{
        dispatch(createProduct(Name,Price,Category,Brand,CountInStock,Description,Image,MRP))
      }
  }

  useEffect(()=>{
    if(productId){
      dispatch(productDetails(productId))
      setName(product.name)
      setCategory(product.category)
      setBrand(product.brand)
      setCountInStock(product.countInStock)
      setDescription(product.description)
      setImage(product.image)
      setPrice(product.price)
    }
    if(createSuccess){
      history("/")
    }
    if(success){
      history("/")
    }
   
  },[
    productId,
    dispatch,
    createSuccess,
    product.name,
    product.category,
    product.price,
    product.Description,
    success,
    history
  ])

  return (
    <>
      <Link to="/admin/products" className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        {error && <Message>Somnething Went Wrong!</Message>}
        {updateError && <Message variant="success">{updateError}</Message>}
        {success && <Message variant="success">Product Updated SuccessFully</Message>}
        {ProductUploadErrorMsg && <Message variant="success">{ProductUploadErrorMsg}</Message>}
        {updateLoading && <Loader/>}
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
            <Row>
              <Col xs={9}>
                <Form.Control type="file" className='my-2' onChange={(e)=>{setFile(e.target.files[0])}} />  
              </Col>
              <Col>
                <Button type="button" variant='primary' className='my-2' onClick={uploadImageHandler}>Upload</Button>
              </Col>
            </Row>
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