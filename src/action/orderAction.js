import backendApi from '../api/backend'
import { 
    AMOUNT_PAID_FAIL,
    AMOUNT_PAID_REQUEST,
    AMOUNT_PAID_SUCCESS,
    MY_ORDER_LIST_FAIL, 
    MY_ORDER_LIST_REQUEST, 
    MY_ORDER_LIST_SUCCESS, 
    ORDERS_LIST_FAIL, 
    ORDERS_LIST_REQUEST, 
    ORDERS_LIST_SUCCESS, 
    ORDER_CREATE_FAIL, 
    ORDER_CREATE_REQUEST, 
    ORDER_CREATE_SUCCESS, 
    ORDER_DELIVERED_FAIL, 
    ORDER_DELIVERED_REQUEST, 
    ORDER_DELIVERED_SUCCESS, 
    ORDER_DETAILS_FAIL, 
    ORDER_DETAILS_REQUEST, 
    ORDER_DETAILS_SUCCESS, 
    ORDER_PAY_FAIL, 
    ORDER_PAY_REQUEST, 
    ORDER_PAY_SUCCESS 
} from '../constants/orderConstants'

export const createOrder = (order) =>async(dispatch,getState)=>{
    
    try{
        dispatch({
            type:ORDER_CREATE_REQUEST,
            loading:true
        })

        const {userLogin : { userInfo }} = getState()
        console.log("order-->Action",order)

        const config = {
            headers:{
                'Content-type':'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        const {data}= await backendApi.post(`/orders`,order,config)

        dispatch({
            type:ORDER_CREATE_SUCCESS,
            payload:data,
        })
        localStorage.removeItem("cartItems")
        localStorage.removeItem("paymentMethod")
        
           
    }catch(err){
        const error = err.response && err.response.data.message ? err.response.data.message : err.message
        console.log(err.message)
        dispatch({type:ORDER_CREATE_FAIL,payload:error,loading:true })
    }
}
export const getOrderDetails = (id) =>async(dispatch,getState)=>{
    console.log("action ->Id",id)
    
    try{
        dispatch({
            type:ORDER_DETAILS_REQUEST,
            loading:true
        })

        const {userLogin : { userInfo }} = getState()


        const config = {
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        const {data}= await backendApi.get(`/orders/getOrder/${id}`,config)
        console.log(data)
        dispatch({
            type:ORDER_DETAILS_SUCCESS,
            payload:data,
        })           
    }catch(err){
        const error = err.response && err.response.data.message ? err.response.data.message : err.message
        console.log(err.message)
        dispatch({type:ORDER_DETAILS_FAIL,payload:error,loading:true })
    }
}

export const payOrder = (orderId,paymentResult) =>async(dispatch,getState)=>{
    console.log("Id",orderId)
    
    try{
        dispatch({
            type:ORDER_PAY_REQUEST,
            loading:true
        })

        const {userLogin : { userInfo }} = getState()


        const config = {
            headers:{
                'Content-type':'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        const {data}= await backendApi.put(`/orders/${orderId}/pay`,paymentResult,config)
        console.log(data)
        dispatch({
            type:ORDER_PAY_SUCCESS,
            payload:data,
        })           
    }catch(err){
        const error = err.response && err.response.data.message ? err.response.data.message : err.message
        console.log(err.message)
        dispatch({type:ORDER_PAY_FAIL,payload:error,loading:true })
    }
}

export const myOrderList = () =>async(dispatch,getState)=>{    
    try{
        dispatch({
            type:MY_ORDER_LIST_REQUEST,
            loading:true
        })

        const {userLogin : { userInfo }} = getState()


        const config = {
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        const {data}= await backendApi.get(`/orders/myorders`,config)
        console.log("Data Action",data)
        dispatch({
            type:MY_ORDER_LIST_SUCCESS,
            payload:data,
        })           
    }catch(err){
        const error = err.response && err.response.data.message ? err.response.data.message : err.message
        console.log(err.message)
        dispatch({type:MY_ORDER_LIST_FAIL,payload:error,loading:true })
    }
}

export const getAllOrdersList = () =>async(dispatch,getState)=>{
    try{
        dispatch({
            type:ORDERS_LIST_REQUEST,loading:true
        })

        const {userLogin : { userInfo }} = getState()

        const config = {
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        const {data}= await backendApi.get(`/admin/getAllOrders`,config)
        console.log("admin orders",data)
        dispatch({
            type:ORDERS_LIST_SUCCESS,
            payload:data,
        })           
    }catch(err){
        const error = err.response && err.response.data.message ? err.response.data.message : err.message
        console.log(err.message)
        dispatch({type:ORDERS_LIST_FAIL,payload:error,loading:true })
    }

}

export const amountPaid=(id)=>async(dispatch,getState)=>{
    try{
        dispatch({
            type:AMOUNT_PAID_REQUEST,loading:true
        })

        const {userLogin : { userInfo }} = getState()

        const config = {
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        const {data}= await backendApi.get(`/admin/order/paid/${id}`,config)
        console.log("admin orders",data)
        dispatch({
            type:AMOUNT_PAID_SUCCESS,
            payload:data,
        })           
    }catch(err){
        const error = err.response && err.response.data.message ? err.response.data.message : err.message
        console.log(err.message)
        dispatch({type:AMOUNT_PAID_FAIL,payload:error,loading:true })
    }
}

export const orderDelivered=(id)=>async(dispatch,getState)=>{
    try{
        dispatch({
            type:ORDER_DELIVERED_REQUEST,loading:true
        })

        const {userLogin : { userInfo }} = getState()

        const config = {
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        const {data}= await backendApi.get(`/admin/order/delivered/${id}`,config)
        console.log("admin orders",data)
        dispatch({
            type:ORDER_DELIVERED_SUCCESS,
            payload:data,
        })           
    }catch(err){
        const error = err.response && err.response.data.message ? err.response.data.message : err.message
        console.log(err.message)
        dispatch({type:ORDER_DELIVERED_FAIL,payload:error,loading:true })
    }
}