import { 
    USER_DELETE_FAIL,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_RESET,
    USER_DETAILS_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_REQUEST,
    USER_LIST_RESET,
    USER_LIST_SUCCESS,
    USER_LOGIN_FAIL, 
    USER_LOGIN_REQUEST, 
    USER_LOGIN_SUCCESS, 
    USER_LOGOUT, 
    USER_REGISTER_FAIL, 
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS
} 
    from "../constants/userConstant"
import backendApi from "../api/backend.js"
import { MY_ORDER_LIST_RESET } from "../constants/orderConstants"
import { PRODOCT_DETAILS_RESET, PRODOCT_LIST_RESET } from "../constants/productConstant"
import { CART_RESET } from "../constants/cartConstant"


export const loginUser =(email,password)=>async(dispatch)=>{
    try{
        dispatch({
            type:USER_LOGIN_REQUEST
        })
        const config = {
            headers:{
                'Content-type':'application/json'
            }
        }
        const {data}= await backendApi.post("/users/login",{email,password},config)

        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload:data,
            loading: false
        })
        localStorage.setItem("userInfo",JSON.stringify(data))
    }catch(err){
        const error = err.response && err.response.data.message ? err.response.data.message : err.message
        console.log(err.message)
        dispatch({type:USER_LOGIN_FAIL,payload:error,loading:true })
    }
}

export const logoutUser = () =>(dispatch)=>{   
        localStorage.clear()
        dispatch({type:USER_LOGOUT})  
        dispatch({type:USER_DETAILS_RESET})      
        dispatch({type:MY_ORDER_LIST_RESET})
        dispatch({type:PRODOCT_LIST_RESET})
        dispatch({type:PRODOCT_DETAILS_RESET})
        dispatch({type:CART_RESET})
        dispatch({type:USER_LIST_RESET})

}

export const registerUser =(name,email,password)=>async(dispatch)=>{
    try{
        dispatch({
            type:USER_REGISTER_REQUEST
        })
        const config = {
            headers:{
                'Content-type':'application/json'
            }
        }
        const {data}= await backendApi.post("/users",{name,email,password},config)

        dispatch({
            type:USER_REGISTER_SUCCESS,
            payload:data,
            loading: false
        })
        console.log("User registered")
        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload:data
        })
        console.log("New User Logged in")

        localStorage.setItem("userInfo",JSON.stringify(data))
        
    }catch(err){
        const error = err.response && err.response.data.message ? err.response.data.message : err.message
        console.log(err.message)
        dispatch({type:USER_REGISTER_FAIL,payload:error,loading:true })
    }
}

export const getUserDetails =()=>async(dispatch,getState)=>{
    try{
        dispatch({
            type:USER_DETAILS_REQUEST,
            loading:true
        })

        const {userLogin : {userInfo}} = getState()

        const config = {
            headers:{
                'Content-type':'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        const {data}= await backendApi.get(`/users/profile/update`,config)

        dispatch({
            type:USER_DETAILS_SUCCESS,
            payload:data,
        })
        
        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload:data
        })        
    }catch(err){
        const error = err.response && err.response.data.message ? err.response.data.message : err.message
        console.log(err.message)
        dispatch({type:USER_DETAILS_FAIL,payload:error,loading:true })
    }
}

export const updateUserProfile = (user) =>async(dispatch,getState)=>{
    try{
        dispatch({
            type:USER_UPDATE_PROFILE_REQUEST,
            loading:true
        })

        const {userLogin : { userInfo }} = getState()

        const config = {
            headers:{
                'Content-type':'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        const {data}= await backendApi.get(`/users/profile/update`,user,config)

        dispatch({
            type:USER_UPDATE_PROFILE_SUCCESS,
            payload:data,
        })
        
           
    }catch(err){
        const error = err.response && err.response.data.message ? err.response.data.message : err.message
        console.log(err.message)
        dispatch({type:USER_UPDATE_PROFILE_FAIL,payload:error,loading:true })
    }
}

export const usersList = () =>async(dispatch,getState)=>{
    try{
        dispatch({
            type:USER_LIST_REQUEST,
            loading:true
        })

        const {userLogin : { userInfo }} = getState()

        const config = {
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        const {data}= await backendApi.get(`/admin/allusers`,config)

        dispatch({
            type:USER_LIST_SUCCESS,
            payload:data,
        })        
           
    }catch(err){
        const error = err.response && err.response.data.message ? err.response.data.message : err.message
        console.log(err.message)
        dispatch({type:USER_LIST_FAIL,payload:error,loading:true })
    }
}

export const userDelete = (id) =>async(dispatch,getState)=>{
    try{
        dispatch({
            type:USER_DELETE_REQUEST,
            loading:true
        })

        const {userLogin : { userInfo }} = getState()

        const config = {
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        const {data}= await backendApi.delete(`/api/admin/deleteUser/${id}`,config)

        dispatch({
            type:USER_DELETE_SUCCESS,
            payload:data,
        })        
           
    }catch(err){
        const error = err.response && err.response.data.message ? err.response.data.message : err.message
        console.log(err.message)
        dispatch({type:USER_DELETE_FAIL,payload:error,loading:true })
    }
}

export const updateUser = (user) =>async(dispatch,getState)=>{
    try{
        dispatch({
            type:USER_UPDATE_REQUEST,
            loading:true
        })

        const {userLogin : { userInfo }} = getState()

        const config = {
            headers:{
                'Content-type':'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        const {data}= await backendApi.delete(`/api/admin/updateUser/${user._id}`,user,config)

        dispatch({type:USER_UPDATE_SUCCESS})        
           
        dispatch({type:USER_DETAILS_SUCCESS,payload:data})        
    }catch(err){
        const error = err.response && err.response.data.message ? err.response.data.message : err.message
        console.log(err.message)
        dispatch({type:USER_UPDATE_FAIL,payload:error,loading:true })
    }
}