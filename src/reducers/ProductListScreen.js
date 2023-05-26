import React, { useEffect } from 'react'

import { Button,Col,Row,Table } from 'react-bootstrap';
import { Link, useNavigate, } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { deleteProduct, listProducts } from '../action/productAction';
import { PRODOCT_CREATE_RESET } from '../constants/productConstant';

const ProductiListScreen = ({getState}) => {
    const dispatch = useDispatch()
    const history = useNavigate()

    const {loading,products,error} = useSelector(state=>state.productList)
    const {userInfo} = useSelector(state=>state.userLogin)
    const {loading:loadingDelete, error:errorDelete,success:successDelete} = useSelector(state=>state.productDelete)
    const {loading:loadingCreate, error:errorCreate,success:successCreate,product:createdProduct} = useSelector(state=>state.productCreate)
    

    useEffect(()=>{
        dispatch({type:PRODOCT_CREATE_RESET})

        if(!userInfo.isAdmin){
            history("/login")
        }
        if(successCreate){
            history(`/admin/product/${createdProduct._id}/edit`)
        }else{
            dispatch(listProducts())
        }
    },[dispatch,history,userInfo,successCreate,createdProduct,successDelete,])

    const deleteHandler = (id) =>{
        if(window.confirm("Are you sure")){
            dispatch(deleteProduct(id))
        }
    }
    const createProductHandler= (product) =>{
        console.log("Create Product")
        history("/admin/product/createProduct")
    }


  return (
    <>
        <Row className='align-items-center'>
            <Col>
                <h1>Products</h1>
            </Col>
            <Col className='text-right'>
                <Button className='my-3' onClick={createProductHandler}>
                    <i className='fas fa-plus'></i>Create Product
                </Button>
            </Col>

        </Row>
        {loadingDelete && <Loader/>}
        {errorDelete && <Message variant="danger">{errorDelete}</Message>}
        {loadingCreate && <Loader/>}
        {errorCreate && <Message variant="danger">{errorCreate}</Message>}
        {loading ? <Loader/> : error ? <Message variant="danger">{error}</Message>:(
            <Table striped hover bordered responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Brand</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product=>{
                        return <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>${product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>
                            <td>
                                <Link to={`/admin/product/${product._id}/edit`}>
                                    <Button variant="light" className='btn-sm'>
                                        <i className='fas fa-edit'></i>
                                    </Button>
                                </Link>
                                <Button variant='danger' className='btn-sm' onClick={()=>
                                deleteHandler(product._id)}>
                                    <i className='fas fa-trash'></i>
                                </Button>
                            </td>
                        </tr>
                    })}
                </tbody>

            </Table>
        )}
    </>
  )
}

export default ProductiListScreen
