import React from 'react';
import {BrowserRouter, Route, Link } from 'react-router-dom';
import CartScreen from './Screens/CartScreen';
import HomeScreen from "./Screens/HomeScreen";
import ProductScreen from "./Screens/ProductScreen";
import SigninScreen from './Screens/SigninScreen';
import RegisterScreen from './Screens/RegisterScreen'
import ProductsScreen from './Screens/ProductsScreen'
import {useSelector, useDispatch} from 'react-redux'
import {logout} from './actions/userActions'
import {useEffect, useState} from 'react'



//feature 2


function App (props) {
  
    const dispatch = useDispatch();
    const userSignin = useSelector(state=> state.userSignin)
    const userRegister = useSelector(state=> state.userRegister)


    const {userInfo} = userSignin.userInfo === null ? userRegister : userSignin;
 
    
    useEffect(() => {
        if (userInfo === null) {
            console.log("Sucess")
        }
        return () => {
    
        }
    }, [userInfo]) //If userInfo state changes, useEffect runs again.

    // const logout = (e) => {
    //   dispatch(logout())
    // }
    const openMenu = () => {
      document.querySelector(".sidebar").classList.add("open");
    }

    const closeMenu = () => {
      document.querySelector(".sidebar").classList.remove("open");
    }

    return (
      <BrowserRouter>
        <div className="grid-container">
          <header className = "header">
            <div className="brand">
              <button onClick={openMenu}> &#9776; </button>
            
              <Link to="/">ReactShop</Link>
            </div>
            <div className="header-links">
              
              {
                
                userInfo
                 ? <>
                <Link to='/profile'>{userInfo.name}</Link>
                <button type="button"onClick={(e) => dispatch(logout())}> Log out; </button>
                </>
                :
                <Link to="/signin">Sign in</Link>
              }
              
              
              

            </div>
            
            
            
          </header>
          <aside className="sidebar">
              <h3>Shopping List</h3>
              <ul>
                <li>
                  Pants
                </li>
                <li>
                  Shirts
                </li>
              </ul>
              <button className="sidebar-close-button" onClick={closeMenu}>x</button>
            </aside>

          <main className = "main">
              <div className="content"> 
                <Route path="/products" component={ProductsScreen}></Route>
                <Route path="/product/:id" component={ProductScreen}></Route>
                <Route path="/" exact={true} component={HomeScreen}></Route>
                <Route path ="/cart/:id?" component={CartScreen}></Route>
                <Route path="/signin" component={SigninScreen}></Route>
                <Route path="/register" component={RegisterScreen}></Route>
                
              </div>
          </main>
          <footer className ="footer">All Rights Reserved</footer>
        </div>
      </BrowserRouter>
    );

  
}

export default App;
