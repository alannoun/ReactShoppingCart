import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { detailsProduct } from '../actions/productActions';
function ProductScreen(props) {
    // console.log(props.match.params.id);
    const [qty, setQty] = useState(1);
    const productDetails = useSelector(state => state.productDetails)
    const {product, loading, error} = productDetails;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(detailsProduct(props.match.params.id));
        return () => {
    
        }
    }, [])

    const handleAddToCart = () => {
        props.history.push("/cart/" + props.match.params.id + "?qty=" + qty);
    }
    return <div>
            
            {loading ? <div>Loading...</div>: error ? error : (
                <div className="details">
                    {console.log("prod ",product)}
                <div className="details-image">
                    <img src={product.image} alt="sd"></img>
                </div>
                <div className="details-info">
                    <ul>
                        <li>
                            <h4>{product.title}</h4>
                        </li>
                        <li>
                            {product.rating} Stars {product.numReview}
                        </li>
                        <li>
                            <b>{product.price}</b>
                        </li>
                        <li>
                            Description
                            <div>{product.description}</div>
                        </li>
                    </ul>
                </div>
                <div className="details-action">
                    <ul>
                        <li>
                            Price: ${product.price}
                        </li>
                        <li>
                            Status: {product.qty > 0 ? product.status : "Unavailable"}
                        </li>
                        <li>
                            Qty: <select value = {qty} onChange={(e) => {setQty(e.target.value)}}>
                                    {[...Array(product.qty).keys()].map(x => 
                                    <option value = {x + 1} key = {x + 1}>{x + 1}</option> 
                                    )}
                                    
                                </select>
                        </li>
                        <li>
                            {product.qty > 0 ? <button className="button primary" onClick={handleAddToCart}>Add to cart</button> 
                            : 
                            <div>Out of Stock</div>
                            }
                            
                        </li>
                    </ul>
                </div>
            </div>
            )
            
            }
            

            
         </div>
}

export default ProductScreen;