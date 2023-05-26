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
    PRODOCT_CREATE_FAIL
 } from '../constants/productConstant'
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
    const {data} = await backendApi.get(`/products/${id}`)
    dispatch({
        type:PRODOCT_DETAILS_SUCCESS,
        payload: data
    })
    
    localStorage.setItem("productDetails",JSON.stringify(data))
    
}catch(err){
    const error = err.response && err.response.data.message ? err.response.data.message : err.message
    console.log(err.message)
    dispatch({type:PRODOCT_DETAILS_FAIL,payload:error })
}   
}

const deleteProduct = (id) =>async(dispatch,getState)=>{    
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
    await backendApi.get(`/admin/deleteProduct/${id}`,config)

    dispatch({
        type:PRODOCT_DELETE_SUCCESS,

    })           
}catch(err){
    const error = err.response && err.response.data.message ? err.response.data.message : err.message
    console.log(err.message)
    dispatch({type:PRODOCT_DELETE_FAIL,payload:error,loading:true })
}
}

const createProduct = () =>async(dispatch,getState)=>{    
console.log("Create Product")
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
    const {data} = await backendApi.get(`/admin/createProduct`, {}, config)

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

export {listProducts,deleteProduct,createProduct,productDetails}

