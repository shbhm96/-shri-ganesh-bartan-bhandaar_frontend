import { PRODOCT_DETAILS_FAIL, 
    PRODOCT_DETAILS_REQUEST, 
    PRODOCT_DETAILS_SUCCESS, 
    PRODOCT_LIST_FAIL, 
    PRODOCT_LIST_REQUEST, 
    PRODOCT_LIST_RESET, 
    PRODOCT_LIST_SUCCESS,
    PRODOCT_DELETE_REQUEST,
    PRODOCT_DELETE_SUCCESS,
    PRODOCT_DELETE_FAIL,
    PRODOCT_CREATE_REQUEST,
    PRODOCT_CREATE_SUCCESS,
    PRODOCT_CREATE_FAIL,
    PRODOCT_CREATE_RESET
 } 
from "../constants/productConstants"

export const productListReducer = (state={products:[],loading:true},action)=>{
switch (action.type){
    case PRODOCT_LIST_REQUEST:
        return {loading : true}
    case PRODOCT_LIST_SUCCESS:
        return {loading:false,products:action.payload}
    case PRODOCT_LIST_FAIL:
        return {loading:false,error:action.payload}
    case PRODOCT_LIST_RESET:
        return{
            products:[]
        }
    default:
        return state
}
}

export const productDetailsReducer = (state={},action)=>{
switch (action.type){
    case PRODOCT_DETAILS_REQUEST:
        return {loading : true,...state}
    case PRODOCT_DETAILS_SUCCESS:
        return {loading:false,success:true}
    case PRODOCT_DETAILS_FAIL:
        return {loading:false,error:action.payload}
    default:
        return state
}
}

export const productDeleteReducer = (state={},action)=>{
switch (action.type){
    case PRODOCT_DELETE_REQUEST:
        return {loading : true}
    case PRODOCT_DELETE_SUCCESS:
        return {loading:false,products:action.payload}
    case PRODOCT_DELETE_FAIL:
        return {loading:false,error:action.payload}
    default:
        return state
}
}

export const productCreateReducer = (state={},action)=>{
switch (action.type){
    case PRODOCT_CREATE_REQUEST:
        return {loading : true}
    case PRODOCT_CREATE_SUCCESS:
        return {loading:false,products:action.payload}
    case PRODOCT_CREATE_FAIL:
        return {loading:false,error:action.payload}
    case PRODOCT_CREATE_RESET:
        return{}
    default:
        return state
}
}