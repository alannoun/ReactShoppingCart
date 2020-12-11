import React, { useEffect } from 'react'; 
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
export default function CartScreen(props){

    const productId = props.match.params.id;
    const qty = props.location.search ? Number(props.location.search.split("=")[1]): 1;
    const cart = useSelector(state => state.cart)
    const {cartItems} = cart;
    const dispatch = useDispatch();

    const removeFromCartHandler = (productId) => {
        dispatch(removeFromCart(productId));
    }
    const checkoutHandler = () => {
        props.history.push("/signin?redirect=shipping");
    }
    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [])
    return <div className="cart">
         <div className="cart-list">
            <ul className="cart-list-container">
                <li>
                    <h3>Shopping Cart</h3>
                    <div>Price</div>
                </li>
                
                {
                    cartItems.length === 0 ?
                    <div>Cart is empty</div> :
                    cartItems.map(item => 
                        <li key={item.product}>
                            <div className="cart-image"> <img src={item.image} alt = "product"></img></div>
                            <div className="cart-name">
                                <div>
                                    <Link to={"/product/" + item.product}> {item.name}</Link>
                                    
                                </div>
                                <div>
                                    Qty:
                                    <select value = {item.qty} onChange={(e) => dispatch(addToCart(item.product, e.target.value))}>
                                    {[...Array(item.countInStock).keys()].map(x => 
                                    <option value = {x + 1} key = {x + 1}>{x + 1}</option> 
                                    )}
                                    </select>
                                    <button className="button" type="button" onClick={() => removeFromCartHandler(item.product)}>Delete</button>
                                </div>
                            </div>
                            <div className="cart-price"> ${item.price}</div>
                        </li>
                    )
                }

            </ul>
         </div>
         <div className = "cart-action">
             <h3>Subtotal ( {cartItems.reduce((a, c) => a + parseInt(c.qty), 0)} items) :
             $ {cartItems.reduce((a, c) => a + c.price * c.qty, 0).toFixed(2)}
             
             </h3>
             <button onClick={() => checkoutHandler()} className="button primary full-width" disabled={cartItems.length === 0}>
                 Proceed to checkout
             </button>
             
         </div>
         
         
         </div>
}