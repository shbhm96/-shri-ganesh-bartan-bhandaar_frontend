import { PRODOCT_LIST_FAIL, 
    PRODOCT_LIST_REQUEST, 
    PRODOCT_LIST_SUCCESS,
    PRODOCT_DETAILS_REQUEST,
    PRODOCT_DETAILS_SUCCESS,
    PRODOCT_DETAILS_FAIL,
    PRODOCT_DELETE_REQUEST,
    PRODOCT_DELETE_SUCCESS,
    PRODOCT_DELETE_FAIL,
    PRODOCT_CREATE_REQUEST,
    PRODOCT_CREATE_SUCCESS,
    PRODOCT_CREATE_FAIL,
    PRODUCT_IMAGE_UPLOAD_REQUEST,
    PRODUCT_IMAGE_UPLOAD_SUCCESS,
    PRODUCT_IMAGE_UPLOAD_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS
 } from '../constants/productConstants'
import backendApi from '../api/backend'

const listProducts = () =>async(dispatch)=>{
try{
    dispatch({type:PRODOCT_LIST_REQUEST})
    const {data} = await backendApi.get("/products")        
    dispatch({
        type:PRODOCT_LIST_SUCCESS,
        payload: data
    })
}catch(err){
    const error = err.response && err.response.data.message ? err.response.data.message : err.message
    console.log(err.message)
    dispatch({type:PRODOCT_LIST_FAIL,payload:error })
}   
}

const productDetails = (id) =>async(dispatch)=>{
try{
    dispatch({type:PRODOCT_DETAILS_REQUEST})
    const {data} = await backendApi.get(`/products/getProduct/${id}`)
    dispatch({
        type:PRODOCT_DETAILS_SUCCESS,
        payload: data
    })
    console.log(data)
    localStorage.setItem("productDetails",JSON.stringify(data))
    
}catch(err){
    const error = err.response && err.response.data.message ? err.response.data.message : err.message
    console.log(err.message)
    dispatch({type:PRODOCT_DETAILS_FAIL,payload:error })
}   
}

const deleteProduct = (id) =>async(dispatch,getState)=>{    
    console.log("Id",id)
try{
    dispatch({
        type:PRODOCT_DELETE_REQUEST,
        loading:true
    })

    const {userLogin : { userInfo }} = getState()


    const config = {
        headers:{
            Authorization:`Bearer ${userInfo.token}`
        }
    }
    await backendApi.delete(`/admin/product/delete/${id}`,config)

    dispatch({
        type:PRODOCT_DELETE_SUCCESS,
        payload:true
    })           
}catch(err){
    const error = err.response && err.response.data.message ? err.response.data.message : err.message
    console.log(err.message)
    dispatch({type:PRODOCT_DELETE_FAIL,payload:error,loading:false })
}
}

const updateProduct = (productId,Name,Price,Category,Brand,CountInStock,Description,Image,MRP) =>async(dispatch,getState)=>{
    const productData = {
        _id : productId,
        name : Name,
        price : Price,
        category : Category,
        brand : Brand,
        countInStock : CountInStock,
        description : Description,
        image : Image,
        mrp:MRP
    }
    try{
        dispatch({
            type:PRODUCT_UPDATE_REQUEST,
            loading:true
        })
        const {userLogin : { userInfo }} = getState()

    const config = {
        headers:{
            Authorization:`Bearer ${userInfo.token}`
        }
    }
    const {data} = await backendApi.post(`/admin/product/update`,{productData}, config)
    dispatch({
        type:PRODUCT_UPDATE_SUCCESS,
        payload:true
    })

    }catch(err){
        const error = err.response && err.response.data.message ? err.response.data.message : err.message
        console.log(err.message)
        dispatch({type:PRODOCT_CREATE_FAIL,payload:error,loading:true })
    }
}

const createProduct = (Name,Price,Category,Brand,CountInStock,Description,Image,MRP) =>async(dispatch,getState)=>{    

    const productData = {
        name : Name,
        price : Price,
        category : Category,
        brand : Brand,
        countInStock : CountInStock,
        description : Description,
        image : Image,
        mrp:MRP
    }
try{
    dispatch({
        type:PRODOCT_CREATE_REQUEST,
        loading:true
    })

    const {userLogin : { userInfo }} = getState()

    const config = {
        headers:{
            Authorization:`Bearer ${userInfo.token}`
        }
    }
    const {data} = await backendApi.post(`/admin/product/create`,{productData}, config)

    dispatch({
        type:PRODOCT_CREATE_SUCCESS,
        payload:data
    })           
}catch(err){
    const error = err.response && err.response.data.message ? err.response.data.message : err.message
    console.log(err.message)
    dispatch({type:PRODOCT_CREATE_FAIL,payload:error,loading:true })
}
}

const uploadProductImage = (formData)=>async(dispatch)=>{
    try{
        dispatch({type:PRODUCT_IMAGE_UPLOAD_REQUEST,loading:true})
        const config = {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }

          const {data} = await backendApi.post("/upload",formData,config)
          dispatch({
            type:PRODUCT_IMAGE_UPLOAD_SUCCESS,
            payload:data,
          })        

    }catch(err){
        const error = err.response && err.response.data.message ? err.response.data.message : err.message
        console.log(err.message)
        dispatch({type:PRODUCT_IMAGE_UPLOAD_FAIL,payload:error,loading:true })
    }
}

export {listProducts,deleteProduct,createProduct,productDetails,uploadProductImage,updateProduct}

