// import { create } from 'domain';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import { productListReducer, productDetailsReducer, productSaveReducer, productDeleteReducer } from './reducers/productReducers';
import {cartReducer} from './reducers/cartReducers';
import thunk from 'redux-thunk'
import Cookie from 'js-cookie'
import userReducers from './reducers/userReducers';

const cartItems = Cookie.getJSON("cartItems") || [];
const userInfo = Cookie.getJSON("userInfo") || null;

const initialState = {cart: {cartItems} , userSignin:{userInfo}, userRegister:{userInfo}, userLogout:{userInfo}};

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignin: userReducers,
    userRegister: userReducers,
    userLogout: userReducers,
    productSave: productSaveReducer,
    productDelete: productDeleteReducer
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState,composeEnhancer(applyMiddleware(thunk)))
export default store;