import Axios from "axios"
import Cookie from 'js-cookie';
import { ADD_TO_CART, CART_REMOVE_ITEM } from "../constants/cartConstants";

const addToCart = (productId, qty) => async (dispatch, getState) => {
    try {
        const {data} = await Axios.get("/api/products/" + productId);
        dispatch({type: ADD_TO_CART, payload: {
            product: data._id,
            name: data.title,
            image: data.image,
            price: data.price,
            countInStock: data.qty,
            qty
        }
    });
    const {cart: {cartItems}} = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems))
    } catch (error) {
        
    }
}

const removeFromCart = (productId) => async (dispatch, getState) => {
    dispatch({type: CART_REMOVE_ITEM, payload: productId})
    const {cart: {cartItems}} = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems))
}
export {addToCart, removeFromCart}