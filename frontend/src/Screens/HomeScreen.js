import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Link} from 'react-router-dom'
import { listProducts } from '../actions/productActions';


function HomeScreen(props) {
    // const [products, setProduct] = useState([]);
    const productList = useSelector(state => state.productList);
    const {products, loading, error} = productList;
    const dispatch = useDispatch();
    //useEffect runs when component mounts/renders
    useEffect(() => {

        dispatch(listProducts());

        // const fetchData = async () => {
        //     const {data} = await axios.get("/api/products");
        //     console.log(data)
        //     setProduct(data);
        // }
        // fetchData();
        return () => {
            
        }
    }, [])
    return loading ? <div>Loading...</div> :
    error ? <div>error</div> :
     <div>
        <ul className="products">
                    {products.map((product) => (
                        <li key={product._id} >
                            <div className = "product" >
                                <Link to={"/products/" + product._id}> 
                                    <img className ="product-image" src = {product.image} alt = {product.title}></img>
                                </Link>
                                <div className = "product-name">
                                    <Link to={"/products/" + product._id}> {product.name} </Link>
                                </div>
                                
                                <div className = "product-brand"> {product.brand} </div> 
                                <div className ="product-price">
                                    <div> ${product.price}</div>
                                    
                                </div>
                                <div className = "product-rating"> {product.rating} Stars {product.numReview} </div>
                            </div>
                        </li>
                ))}
                </ul>
    </div>
}

export default HomeScreen;