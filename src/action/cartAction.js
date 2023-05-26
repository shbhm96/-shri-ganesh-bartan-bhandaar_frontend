import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from "../constants/cartConstant"

export const addToCart = (id,qty)=>async(dispatch,getState)=>{

    const productDetails = getState().productDetails.product

    const cartItem = {
        product     : productDetails._id,
        name        : productDetails.name,
        image       : productDetails.image,
        countInStock: productDetails.countInStock,
        price       : Number(productDetails.price),
        qty
    }
    dispatch({
        type:CART_ADD_ITEM,
        payload:cartItem
    })

    localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) =>async(dispatch,getState)=>{
    dispatch({
        type:CART_REMOVE_ITEM,
        payload:id
    })
    localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (data) =>(dispatch)=>{
    dispatch({
        type:CART_SAVE_SHIPPING_ADDRESS,
        payload:data
    })
    localStorage.setItem("shipping",JSON.stringify(data))
}

export const savePaymentMethod = (data) =>(dispatch)=>{
    dispatch({
        type:CART_SAVE_PAYMENT_METHOD,
        payload:data
    })
    localStorage.setItem("paymentMethod",JSON.stringify(data))
}