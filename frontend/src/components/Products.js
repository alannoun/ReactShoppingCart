import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class Products extends Component {

    render() {
        return (
            <div>
                <ul className="products">
                    {this.props.products.map((product) => (
                        <li key={product._id} >
                            <div className = "product" >
                                <Link to={"/products/" + product._id}> 
                                    <img className ="product-image" src = {product.image} alt = {product.title}></img>
                                </Link>
                                <div className = "product-name">
                                    <Link to={"/products/" + product._id}> {product.title} </Link>
                                </div>
                                <div className = "product-brand"> {product.brand} </div> 
                                <div className ="product-price">
                                    <div>{product.price}</div>
                                    <button className="button-primary">
                                        Add to cart
                                    </button>
                                </div>
                                <div className = "product-rating"> {product.rating} Stars {product.numReview} </div>
                            </div>
                        </li>
                ))}
                </ul>
            </div>
        )
    }
}
