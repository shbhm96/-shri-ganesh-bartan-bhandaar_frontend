import { combineReducers } from "redux";
import { 
    productCreateReducer, 
    productDeleteReducer, 
    productDetailsReducer, 
    productImageUploadReducer, 
    productListReducer,
    productUpdateReducer
} from "./productReducers";
import { cartReducer } from "./cartReducers";
import { userDeleteReducer, userDetailsReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer, userUpdateReducer, usersListReducer } from "./userReducers";
import { getAllOrdersListReducer, myOrderListReducer, orderCreateReducer, orderDetailsReducer, orderPayReducer,amountPaidReducer, orderDeliveredReducer } from "./orderReducers";

const rootReducer = combineReducers({
    productList      :   productListReducer,
    productDetails   :   productDetailsReducer,
    cart             :   cartReducer,
    userLogin        :   userLoginReducer,
    userRegister     :   userRegisterReducer,
    userDetails      :   userDetailsReducer,
    userUpdateProfile:   userUpdateProfileReducer,
    orderCreate      :   orderCreateReducer,
    orderDetails     :   orderDetailsReducer,
    orderPay         :   orderPayReducer,
    myOrderList      :   myOrderListReducer,
    usersList        :   usersListReducer,
    userDelete       :   userDeleteReducer,
    userUpdate       :   userUpdateReducer,
    productDelete    :   productDeleteReducer,
    productCreate    :   productCreateReducer,
    uploadProductImage:  productImageUploadReducer,
    getAllOrdersList :   getAllOrdersListReducer,
    amountPaid       :   amountPaidReducer,
    orderDelivered   :   orderDeliveredReducer,
    productUpdate    :   productUpdateReducer,
});

const cartItemsfromLocalStorage = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")):[]

const shippingAddressFromStorage = localStorage.getItem("shippingAddress") ? JSON.parse(localStorage.getItem("shippingAddress")) : {}
    
const userInfoFromLocalStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")):null

const initialState = {
    productList:{products:[]},
    productDetails:{product:{}},
    cart:{cartItems:cartItemsfromLocalStorage,shippingAddress : shippingAddressFromStorage},
    userLogin:{userInfo:userInfoFromLocalStorage},
    orderDetails:{orderItems:[],shippingAddress:{}},
    myOrderList:{orders:[]},
    uploadProductImage:{},
    getAllOrdersList:{},
}

export {rootReducer,initialState}